import { db, ok, fail, readBody, logEvent } from "@/lib/api";

export async function GET(req: Request) {
  const engagementId = new URL(req.url).searchParams.get("engagement_id");
  let q = db().from("diagnostics").select("*").order("created_at");
  if (engagementId) q = q.eq("engagement_id", engagementId);
  const { data, error } = await q;
  if (error) return fail(error.message, 500);
  return ok(data);
}

export async function POST(req: Request) {
  const body = await readBody<{
    engagement_id?: string;
    title?: string;
    current_condition?: string;
    target_condition?: string;
    gap?: string;
  }>(req);
  if (!body?.engagement_id || !body?.title)
    return fail("engagement_id and title are required");
  const { data, error } = await db()
    .from("diagnostics")
    .insert({
      engagement_id: body.engagement_id,
      title: body.title,
      current_condition: body.current_condition ?? null,
      target_condition: body.target_condition ?? null,
      gap: body.gap ?? null,
    })
    .select()
    .single();
  if (error) return fail(error.message, 500);
  await logEvent(data.id, "diagnostic", data.id, "created", { title: data.title });
  return ok(data, 201);
}
