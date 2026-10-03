"use client";

import { useEffect, useState } from "react";

type Reservation = {
  id: string;
  code: string;
  name: string;
  phone: string;
  reservation_date: string;
  reservation_time: string;
  party_size: number;
  area: string;
  occasion: string;
  status: string;
  notes?: string | null;
};

export default function AdminDashboard() {
  const [key, setKey] = useState("");
  const [items, setItems] = useState<Reservation[]>([]);
  const [message, setMessage] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem("errejota-admin-key");
    if (saved) setKey(saved);
  }, []);

  async function load(customKey = key) {
    setMessage("Carregando...");
    const response = await fetch("/api/admin/reservations", {
      headers: { "x-admin-key": customKey }
    });
    if (!response.ok) {
      setAuthenticated(false);
      setMessage("Chave inválida ou painel indisponível.");
      return;
    }
    const data = await response.json();
    sessionStorage.setItem("errejota-admin-key", customKey);
    setAuthenticated(true);
    setItems(data.items || []);
    setMessage("");
  }

  async function updateStatus(id: string, status: string) {
    const response = await fetch("/api/admin/reservations", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": key
      },
      body: JSON.stringify({ id, status })
    });
    if (response.ok) await load();
  }

  if (!authenticated) {
    return (
      <div className="admin-login">
        <p>Digite a chave definida em <code>ADMIN_DASHBOARD_KEY</code>.</p>
        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Chave do painel"
        />
        <button className="button button-gold" onClick={() => load()}>Entrar</button>
        {message && <span>{message}</span>}
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-toolbar">
        <div>
          <strong>{items.length} reservas carregadas</strong>
          <span>Atualize os status conforme a operação da casa.</span>
        </div>
        <button className="button button-small button-gold" onClick={() => load()}>Atualizar</button>
      </div>

      <div className="reservation-list">
        {items.map((item) => (
          <article className="reservation-item" key={item.id}>
            <div className="reservation-main">
              <span className="reservation-code">{item.code}</span>
              <h3>{item.name}</h3>
              <p>{item.reservation_date.split("-").reverse().join("/")} • {item.reservation_time} • {item.party_size} pessoas</p>
            </div>
            <div>
              <small>Preferência</small>
              <strong>{item.area || "Sem preferência"}</strong>
              <small>Ocasião</small>
              <strong>{item.occasion || "—"}</strong>
            </div>
            <div>
              <small>Contato</small>
              <a href={`https://wa.me/55${item.phone.replace(/^55/, "")}`} target="_blank" rel="noreferrer">
                {item.phone}
              </a>
              {item.notes && <p className="admin-notes">{item.notes}</p>}
            </div>
            <div className="status-controls">
              <select value={item.status} onChange={(e) => updateStatus(item.id, e.target.value)}>
                <option value="confirmed">Confirmada</option>
                <option value="arrived">Chegou</option>
                <option value="cancelled">Cancelada</option>
                <option value="no_show">No-show</option>
              </select>
            </div>
          </article>
        ))}
        {!items.length && <p className="empty-state">Nenhuma reserva encontrada.</p>}
      </div>
    </div>
  );
}
