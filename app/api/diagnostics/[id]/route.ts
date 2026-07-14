import { db, ok, fail, readBody, logEvent } from "@/lib/api";
import { canTransition, type DiagnosticStatus } from "@/lib/domain";

// Vue complète du diagnostic: toute la trace de raisonnement.
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const client = db();
  const { data: diagnostic, error } = await client
    .from("diagnostics")
    .select("*")
    .eq("id", params.id)
    .single();
  if (error) return fail("diagnostic not found", 404);

  const [interviews, findings, analyses, recommendations, events] = await Promise.all([
    client.from("interviews").select("*, interview_turns(*)").eq("diagnostic_id", params.id),
    client.from("findings").select("*").eq("diagnostic_id", params.id).order("created_at"),
    client.from("causal_analyses").select("*, causal_analysis_findings(finding_id)").eq("diagnostic_id", params.id),
    client.from("recommendations").select("*, recommendation_evidence(finding_id), outcomes(*)").eq("diagnostic_id", params.id),
    client.from("decision_events").select("*").eq("diagnostic_id", params.id).order("created_at"),
  ]);

  return ok({
    diagnostic,
    interviews: interviews.data ?? [],
    findings: findings.data ?? [],
    causal_analyses: analyses.data ?? [],
    recommendations: recommendations.data ?? [],
    decision_events: events.data ?? [],
  });
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const body = await readBody<{
    status?: DiagnosticStatus;
    current_condition?: string;
    target_condition?: string;
    gap?: string;
  }>(req);
  if (!body) return fail("empty body");

  const client = db();
  const { data: current, error: notFound } = await client
    .from("diagnostics")
    .select("id, status")
    .eq("id", params.id)
    .single();
  if (notFound) return fail("diagnostic not found", 404);

  if (body.status && body.status !== current.status) {
    if (!canTransition(current.status, body.status))
      return fail(`invalid transition: ${current.status} -> ${body.status}`, 422);
  }

  const { data, error } = await client
    .from("diagnostics")
    .update({
      ...(body.status ? { status: body.status } : {}),
      ...(body.current_condition !== undefined ? { current_condition: body.current_condition } : {}),
      ...(body.target_condition !== undefined ? { target_condition: body.target_condition } : {}),
      ...(body.gap !== undefined ? { gap: body.gap } : {}),
      updated_at: new Date().toISOString(),
    })
    .eq("id", params.id)
    .select()
    .single();
  if (error) return fail(error.message, 500);

  if (body.status && body.status !== current.status)
    await logEvent(params.id, "diagnostic", params.id, "status_changed", {
      from: current.status,
      to: body.status,
    });
  return ok(data);
}
