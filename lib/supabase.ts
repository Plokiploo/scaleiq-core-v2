import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Client navigateur / composants: clé anon uniquement.
export function supabaseAnon(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Supabase anon env vars missing");
  return createClient(url, key);
}

// Server-only (routes app/api). Ne jamais importer côté client.
export function supabaseService(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase service env vars missing");
  return createClient(url, key, { auth: { persistSession: false } });
}
