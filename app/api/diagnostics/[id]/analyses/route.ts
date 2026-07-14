import { db, ok, fail, readBody, logEvent } from "@/lib/api";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const { data, error } = await db()
    .from("causal_analyses")
    .select("*, causal_analysis_findings(finding_id)")
    .eq("diagnostic_id", params.id)
    .order("created_at");
  if (error) return fail(error.message, 500);
  return ok(data);
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const body = await readBody<{
    method?: "five_whys" | "constraint" | "other";
    steps?: unknown[];
    probable_cause?: string;
    is_dominant?: boolean;
    finding_ids?: string[];
  }>(req);
  if (!body?.method) return fail("method is required (five_whys | constraint | other)");

  const client = db();
  const { data, error } = await client
    .from("causal_analyses")
    .insert({
      diagnostic_id: params.id,
      method: body.method,
      steps: (body.steps ?? []) as never,
      probable_cause: body.probable_cause ?? null,
      is_dominant: body.is_dominant ?? false,
    })
    .select()
    .single();
  if (error) return fail(error.message, 500);

  if (body.finding_ids?.length) {
    const { error: linkError } = await client.from("causal_analysis_findings").insert(
      body.finding_ids.map((finding_id) => ({
        causal_analysis_id: data.id,
        finding_id,
      }))
    );
    if (linkError) return fail(`analysis created but linking failed: ${linkError.message}`, 500);
  }
  await logEvent(params.id, "causal_analysis", data.id, "created", {
    method: data.method,
    is_dominant: data.is_dominant,
    linked_findings: body.finding_ids?.length ?? 0,
  });
  return ok(data, 201);
}
