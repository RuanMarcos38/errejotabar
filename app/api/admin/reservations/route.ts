import { NextResponse } from "next/server";
import { dbFetch, isDatabaseConfigured } from "@/lib/supabase-rest";

function authorized(request: Request) {
  const expected = process.env.ADMIN_DASHBOARD_KEY;
  const received = request.headers.get("x-admin-key");
  return Boolean(expected && received && received === expected);
}

export async function GET(request: Request) {
  if (!authorized(request)) return NextResponse.json({ message: "Não autorizado." }, { status: 401 });
  if (!isDatabaseConfigured()) return NextResponse.json({ message: "Banco não configurado." }, { status: 503 });

  const response = await dbFetch(
    "reservations?select=id,code,name,phone,email,reservation_date,reservation_time,party_size,area,occasion,notes,status,created_at&order=reservation_date.asc,reservation_time.asc&limit=300"
  );
  if (!response.ok) return NextResponse.json({ message: "Erro ao carregar reservas." }, { status: 500 });

  return NextResponse.json({ items: await response.json() });
}

export async function PATCH(request: Request) {
  if (!authorized(request)) return NextResponse.json({ message: "Não autorizado." }, { status: 401 });
  if (!isDatabaseConfigured()) return NextResponse.json({ message: "Banco não configurado." }, { status: 503 });

  const body = await request.json();
  const id = String(body.id || "");
  const status = String(body.status || "");
  const allowed = new Set(["confirmed", "arrived", "cancelled", "no_show"]);

  if (!id || !allowed.has(status)) {
    return NextResponse.json({ message: "Dados inválidos." }, { status: 400 });
  }

  const response = await dbFetch(`reservations?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({ status })
  });

  if (!response.ok) return NextResponse.json({ message: "Erro ao atualizar." }, { status: 500 });
  return NextResponse.json({ success: true });
}
