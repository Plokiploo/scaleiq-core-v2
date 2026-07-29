import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

// Server-only (routes app/api). Ne jamais importer côté client.
// Pour les clients liés à la session (auth), voir lib/supabase/server.ts et lib/supabase/client.ts.
export function supabaseService(): SupabaseClient<Database> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase service env vars missing");
  return createClient<Database>(url, key, { auth: { persistSession: false } });
}
