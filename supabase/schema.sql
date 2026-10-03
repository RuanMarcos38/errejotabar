create extension if not exists pgcrypto;

create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  phone text not null,
  email text,
  reservation_date date not null,
  reservation_time time not null,
  party_size integer not null check (party_size between 1 and 12),
  area text not null default 'Sem preferência',
  occasion text not null default 'Resenha',
  notes text,
  status text not null default 'confirmed'
    check (status in ('pending','confirmed','arrived','cancelled','no_show')),
  source text not null default 'website',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists reservations_date_time_idx
  on public.reservations (reservation_date, reservation_time);

create index if not exists reservations_status_idx
  on public.reservations (status);

create unique index if not exists reservations_active_phone_slot_unique
  on public.reservations (phone, reservation_date, reservation_time)
  where status in ('pending','confirmed','arrived');

alter table public.reservations enable row level security;

-- Nenhuma policy pública é necessária: o site grava e lê pelo backend usando a Service Role.
-- Nunca exponha SUPABASE_SERVICE_ROLE_KEY no navegador.

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists reservations_updated_at on public.reservations;
create trigger reservations_updated_at
before update on public.reservations
for each row execute function public.set_updated_at();
