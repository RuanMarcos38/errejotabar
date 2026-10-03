const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function isDatabaseConfigured() {
  return Boolean(url && key);
}

export async function dbFetch(path: string, init: RequestInit = {}) {
  if (!url || !key) {
    throw new Error("Banco de dados não configurado. Defina SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY.");
  }

  const headers = new Headers(init.headers);
  headers.set("apikey", key);
  headers.set("Authorization", `Bearer ${key}`);
  headers.set("Content-Type", "application/json");

  return fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers,
    cache: "no-store"
  });
}
