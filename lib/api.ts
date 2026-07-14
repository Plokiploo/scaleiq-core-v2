import { NextResponse } from "next/server";
import type { Json } from "./database.types";
import { supabaseService } from "./supabase";

export const db = () => supabaseService();

export const ok = (data: unknown, status = 200) =>
  NextResponse.json({ data }, { status });

export const fail = (error: string, status = 400) =>
  NextResponse.json({ error }, { status });

export async function readBody<T>(req: Request): Promise<T | null> {
  try {
    return (await req.json()) as T;
  } catch {
    return null;
  }
}

// Trace de décision: chaque événement structurant de la boucle est journalisé.
export async function logEvent(
  diagnosticId: string,
  entityType: string,
  entityId: string | null,
  event: string,
  detail?: Json
) {
  await db().from("decision_events").insert({
    diagnostic_id: diagnosticId,
    entity_type: entityType,
    entity_id: entityId,
    event,
    detail: detail ?? null,
  });
}
