import { db, ok, fail, readBody, logEvent } from "@/lib/api";
import type { Database } from "@/lib/database.types";

type Severity = Database["public"]["Enums"]["severity_level"];
type Priority = Database["public"]["Enums"]["priority_level"];

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const { data, error } = await db()
    .from("recommendations")
    .select("*, recommendation_evidence(finding_id), outcomes(*)")
    .eq("diagnostic_id", params.id)
    .order("created_at");
  if (error) return fail(error.message, 500);
  return ok(data);
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const body = await readBody<{
    title?: string;
    action?: string;
    owner?: string;
    severity?: Severity;
    priority?: Priority;
    provenance?: "user" | "ai";
    causal_analysis_id?: string;
    finding_ids?: string[];
  }>(req);
  if (!body?.title || !body?.action) return fail("title and action are required");

  const client = db();
  const { data, error } = await client
    .from("recommendations")
    .insert({
      diagnostic_id: params.id,
      title: body.title,
      action: body.action,
      owner: body.owner ?? null,
      severity: body.severity ?? "medium",
      priority: body.priority ?? "p2",
      provenance: body.provenance ?? "user",
      causal_analysis_id: body.causal_analysis_id ?? null,
    })
    .select()
    .single();
  if (error) return fail(error.message, 500);

  if (body.finding_ids?.length) {
    const { error: linkError } = await client.from("recommendation_evidence").insert(
      body.finding_ids.map((finding_id) => ({
        recommendation_id: data.id,
        finding_id,
      }))
    );
    if (linkError)
      return fail(`recommendation created but evidence linking failed: ${linkError.message}`, 500);
  }
  await logEvent(params.id, "recommendation", data.id, "created", {
    severity: data.severity,
    priority: data.priority,
    owner: data.owner,
    evidence_count: body.finding_ids?.length ?? 0,
  });
  return ok(data, 201);
}
