import { db, ok, fail } from "@/lib/api";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const { data, error } = await db().from("organizations").select("*").eq("id", params.id).single();
  if (error) return fail("organization not found", 404);
  return ok(data);
}
