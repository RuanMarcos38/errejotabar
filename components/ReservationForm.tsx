"use client";

import { FormEvent, useMemo, useState } from "react";
import { site } from "@/lib/site";

type ReservationResult = {
  success: boolean;
  code?: string;
  message?: string;
};

export default function ReservationForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ReservationResult | null>(null);
  const minDate = useMemo(() => new Date().toISOString().split("T")[0], []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setResult(null);

    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") || ""),
      phone: String(form.get("phone") || ""),
      email: String(form.get("email") || ""),
      date: String(form.get("date") || ""),
      time: String(form.get("time") || ""),
      partySize: Number(form.get("partySize") || 0),
      area: String(form.get("area") || ""),
      occasion: String(form.get("occasion") || ""),
      notes: String(form.get("notes") || "")
    };

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Não foi possível concluir a reserva.");

      setResult({ success: true, code: data.code, message: data.message });
      event.currentTarget.reset();
    } catch (error) {
      setResult({
        success: false,
        message: error instanceof Error ? error.message : "Erro inesperado ao reservar."
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="reservation-card">
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>
            Seu nome
            <input name="name" required minLength={2} placeholder="Nome completo" />
          </label>
          <label>
            WhatsApp
            <input name="phone" required inputMode="tel" placeholder="(47) 99999-9999" />
          </label>
        </div>

        <div className="form-row">
          <label>
            Data
            <input name="date" type="date" min={minDate} required />
          </label>
          <label>
            Horário
            <select name="time" required defaultValue="">
              <option value="" disabled>Escolha</option>
              {["18:00","18:30","19:00","19:30","20:00","20:30","21:00","21:30","22:00","22:30"].map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="form-row">
          <label>
            Pessoas
            <select name="partySize" required defaultValue="2">
              {Array.from({ length: 12 }, (_, i) => i + 1).map(n => (
                <option key={n} value={n}>{n} {n === 1 ? "pessoa" : "pessoas"}</option>
              ))}
            </select>
          </label>
          <label>
            Preferência
            <select name="area" defaultValue="Sem preferência">
              <option>Sem preferência</option>
              <option>Perto do palco</option>
              <option>Salão</option>
              <option>Área família</option>
            </select>
          </label>
        </div>

        <div className="form-row">
          <label>
            Ocasião
            <select name="occasion" defaultValue="Resenha">
              <option>Resenha</option>
              <option>Aniversário</option>
              <option>Encontro</option>
              <option>Família</option>
              <option>Corporativo</option>
            </select>
          </label>
          <label>
            E-mail <span className="optional">(opcional)</span>
            <input name="email" type="email" placeholder="voce@email.com" />
          </label>
        </div>

        <label>
          Observação <span className="optional">(opcional)</span>
          <textarea name="notes" rows={3} maxLength={300} placeholder="Conte algo que precisamos saber." />
        </label>

        <label className="consent">
          <input type="checkbox" required />
          <span>Concordo com o uso dos dados exclusivamente para organizar e confirmar minha reserva.</span>
        </label>

        <button className="button button-gold form-submit" disabled={loading}>
          {loading ? "Confirmando..." : "Confirmar minha mesa"}
        </button>
      </form>

      {result && (
        <div className={result.success ? "form-message success" : "form-message error"} role="status">
          {result.success ? (
            <>
              <strong>Reserva confirmada! Código: {result.code}</strong>
              <p>{result.message}</p>
              <a
                href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
                  `Olá! Fiz uma reserva pelo site do Errejota. Meu código é ${result.code}.`
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                Abrir confirmação no WhatsApp ↗
              </a>
            </>
          ) : (
            <strong>{result.message}</strong>
          )}
        </div>
      )}
    </div>
  );
}
