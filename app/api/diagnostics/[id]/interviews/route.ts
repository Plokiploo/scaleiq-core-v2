import { db, ok, fail, readBody, logEvent } from "@/lib/api";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const { data, error } = await db()
    .from("interviews")
    .select("*, interview_turns(*)")
    .eq("diagnostic_id", params.id)
    .order("started_at");
  if (error) return fail(error.message, 500);
  return ok(data);
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const body = await readBody<{ interviewee_role?: string; notes?: string }>(req);
  const { data, error } = await db()
    .from("interviews")
    .insert({
      diagnostic_id: params.id,
      interviewee_role: body?.interviewee_role ?? null,
      notes: body?.notes ?? null,
    })
    .select()
    .single();
  if (error) return fail(error.message, 500);
  await logEvent(params.id, "interview", data.id, "created", {
    interviewee_role: data.interviewee_role,
  });
  return ok(data, 201);
}
