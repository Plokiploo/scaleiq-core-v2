import { db, ok, fail, readBody, logEvent } from "@/lib/api";
import { FINDING_KINDS, type FindingKind, type EvidenceLevel } from "@/lib/domain";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const kind = new URL(req.url).searchParams.get("kind");
  let q = db().from("findings").select("*").eq("diagnostic_id", params.id).order("created_at");
  if (kind) q = q.eq("kind", kind as FindingKind);
  const { data, error } = await q;
  if (error) return fail(error.message, 500);
  return ok(data);
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const body = await readBody<{
    kind?: FindingKind;
    content?: string;
    provenance?: "user" | "ai";
    confidence?: number;
    evidence_level?: EvidenceLevel;
    source_turn_id?: string;
  }>(req);
  if (!body?.kind || !body?.content) return fail("kind and content are required");
  if (!FINDING_KINDS.includes(body.kind))
    return fail(`kind must be one of: ${FINDING_KINDS.join(", ")}`);
  // Distinction épistémique: une évidence exige un niveau d'évidence.
  if (body.kind === "evidence" && !body.evidence_level)
    return fail("evidence_level is required when kind is evidence");
  // Provenance IA: la confiance doit être explicite (LLM output ≠ vérité opérationnelle).
  if (body.provenance === "ai" && body.confidence === undefined)
    return fail("confidence is required for ai-provenance findings");

  const { data, error } = await db()
    .from("findings")
    .insert({
      diagnostic_id: params.id,
      kind: body.kind,
      content: body.content,
      provenance: body.provenance ?? "user",
      confidence: body.confidence ?? null,
      evidence_level: body.evidence_level ?? null,
      source_turn_id: body.source_turn_id ?? null,
    })
    .select()
    .single();
  if (error) return fail(error.message, 500);
  await logEvent(params.id, "finding", data.id, "created", {
    kind: data.kind,
    provenance: data.provenance,
  });
  return ok(data, 201);
}
