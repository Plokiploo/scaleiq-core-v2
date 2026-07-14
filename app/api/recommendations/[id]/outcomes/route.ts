import { db, ok, fail, readBody, logEvent } from "@/lib/api";
import type { Database } from "@/lib/database.types";

type OutcomeStatus = Database["public"]["Enums"]["outcome_status"];

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const { data, error } = await db()
    .from("outcomes")
    .select("*")
    .eq("recommendation_id", params.id)
    .order("created_at");
  if (error) return fail(error.message, 500);
  return ok(data);
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const body = await readBody<{
    action_taken?: string;
    observed_result?: string;
    status?: OutcomeStatus;
  }>(req);
  if (!body) return fail("empty body");

  const client = db();
  const { data: rec, error: notFound } = await client
    .from("recommendations")
    .select("id, diagnostic_id")
    .eq("id", params.id)
    .single();
  if (notFound) return fail("recommendation not found", 404);

  const status = body.status ?? "pending";
  const { data, error } = await client
    .from("outcomes")
    .insert({
      recommendation_id: params.id,
      action_taken: body.action_taken ?? null,
      observed_result: body.observed_result ?? null,
      status,
      validated_at: status === "validated" ? new Date().toISOString() : null,
    })
    .select()
    .single();
  if (error) return fail(error.message, 500);
  await logEvent(rec.diagnostic_id, "outcome", data.id, "recorded", { status });
  return ok(data, 201);
}
