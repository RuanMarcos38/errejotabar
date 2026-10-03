import type { Metadata } from "next";
import AdminDashboard from "@/components/AdminDashboard";

export const metadata: Metadata = {
  title: "Painel de Reservas",
  robots: { index: false, follow: false }
};

export default function AdminPage() {
  return (
    <main className="admin-shell">
      <header className="admin-header">
        <a className="brand" href="/">
          <span>ERRE</span><strong>JOTA</strong>
        </a>
        <div>
          <p>Painel operacional</p>
          <h1>Reservas</h1>
        </div>
      </header>
      <AdminDashboard />
    </main>
  );
}
