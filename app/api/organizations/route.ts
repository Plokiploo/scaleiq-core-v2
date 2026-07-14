import { db, ok, fail, readBody } from "@/lib/api";

export async function GET() {
  const { data, error } = await db().from("organizations").select("*").order("created_at");
  if (error) return fail(error.message, 500);
  return ok(data);
}

export async function POST(req: Request) {
  const body = await readBody<{ name?: string; context?: string }>(req);
  if (!body?.name) return fail("name is required");
  const { data, error } = await db()
    .from("organizations")
    .insert({ name: body.name, context: body.context ?? null })
    .select()
    .single();
  if (error) return fail(error.message, 500);
  return ok(data, 201);
}
