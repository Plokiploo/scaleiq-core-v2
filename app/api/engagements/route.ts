import { db, ok, fail, readBody } from "@/lib/api";

export async function GET(req: Request) {
  const orgId = new URL(req.url).searchParams.get("organization_id");
  let q = db().from("engagements").select("*").order("created_at");
  if (orgId) q = q.eq("organization_id", orgId);
  const { data, error } = await q;
  if (error) return fail(error.message, 500);
  return ok(data);
}

export async function POST(req: Request) {
  const body = await readBody<{ organization_id?: string; name?: string; objective?: string }>(req);
  if (!body?.organization_id || !body?.name)
    return fail("organization_id and name are required");
  const { data, error } = await db()
    .from("engagements")
    .insert({
      organization_id: body.organization_id,
      name: body.name,
      objective: body.objective ?? null,
    })
    .select()
    .single();
  if (error) return fail(error.message, 500);
  return ok(data, 201);
}
