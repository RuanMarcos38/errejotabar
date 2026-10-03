import { NextResponse } from "next/server";
import { dbFetch, isDatabaseConfigured } from "@/lib/supabase-rest";

function cleanPhone(value: string) {
  return value.replace(/\D/g, "").slice(-13);
}

function validDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function validTime(value: string) {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
}

export async function POST(request: Request) {
  try {
    if (!isDatabaseConfigured()) {
      return NextResponse.json(
        { message: "Reservas ainda não estão conectadas ao banco. Configure as variáveis do Supabase." },
        { status: 503 }
      );
    }

    const body = await request.json();
    const name = String(body.name || "").trim();
    const phone = cleanPhone(String(body.phone || ""));
    const email = String(body.email || "").trim().toLowerCase() || null;
    const date = String(body.date || "");
    const time = String(body.time || "");
    const partySize = Number(body.partySize || 0);
    const area = String(body.area || "Sem preferência").slice(0, 80);
    const occasion = String(body.occasion || "Resenha").slice(0, 80);
    const notes = String(body.notes || "").trim().slice(0, 300) || null;

    if (
      name.length < 2 ||
      phone.length < 10 ||
      !validDate(date) ||
      !validTime(time) ||
      !Number.isInteger(partySize) ||
      partySize < 1 ||
      partySize > 12
    ) {
      return NextResponse.json({ message: "Revise os dados da reserva e tente novamente." }, { status: 400 });
    }

    const existing = await dbFetch(
      `reservations?phone=eq.${encodeURIComponent(phone)}&reservation_date=eq.${date}&reservation_time=eq.${time}&status=in.(pending,confirmed,arrived)&select=id`
    );
    if (!existing.ok) throw new Error(await existing.text());
    const duplicates = await existing.json();
    if (duplicates.length) {
      return NextResponse.json(
        { message: "Já existe uma reserva ativa para este WhatsApp neste horário." },
        { status: 409 }
      );
    }

    const capacityResponse = await dbFetch(
      `reservations?reservation_date=eq.${date}&reservation_time=eq.${time}&status=in.(pending,confirmed,arrived)&select=party_size`
    );
    if (!capacityResponse.ok) throw new Error(await capacityResponse.text());

    const current = (await capacityResponse.json()) as Array<{ party_size: number }>;
    const used = current.reduce((sum, item) => sum + Number(item.party_size || 0), 0);
    const capacity = Number(process.env.RESERVATION_SLOT_CAPACITY || 60);

    if (used + partySize > capacity) {
      return NextResponse.json(
        { message: "Este horário acabou de atingir a capacidade. Escolha outro horário." },
        { status: 409 }
      );
    }

    const code = `RJ-${date.replaceAll("-", "")}-${crypto.randomUUID().slice(0, 5).toUpperCase()}`;
    const insert = await dbFetch("reservations", {
      method: "POST",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify({
        code,
        name,
        phone,
        email,
        reservation_date: date,
        reservation_time: time,
        party_size: partySize,
        area,
        occasion,
        notes,
        status: "confirmed",
        source: "website"
      })
    });

    if (!insert.ok) {
      const detail = await insert.text();
      throw new Error(detail);
    }

    return NextResponse.json({
      success: true,
      code,
      message: "Sua mesa entrou no painel do Errejota e está confirmada para a data e horário escolhidos."
    });
  } catch (error) {
    console.error("reservation_error", error);
    return NextResponse.json(
      { message: "Não foi possível concluir agora. Tente novamente em instantes." },
      { status: 500 }
    );
  }
}
