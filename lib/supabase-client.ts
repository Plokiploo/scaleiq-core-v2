"use client";
import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./database.types";

// Client lié à la session, pour les composants client (login, déconnexion).
export function supabaseBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Supabase anon env vars missing");
  return createBrowserClient<Database>(url, key);
}
