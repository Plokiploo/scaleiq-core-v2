import { db, ok, fail, readBody } from "@/lib/api";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const { data, error } = await db()
    .from("interview_turns")
    .select("*")
    .eq("interview_id", params.id)
    .order("seq");
  if (error) return fail(error.message, 500);
  return ok(data);
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const body = await readBody<{ speaker?: string; content?: string }>(req);
  if (!body?.speaker || !body?.content) return fail("speaker and content are required");
  if (!["interviewer", "interviewee"].includes(body.speaker))
    return fail("speaker must be interviewer or interviewee");

  const client = db();
  const { data: last } = await client
    .from("interview_turns")
    .select("seq")
    .eq("interview_id", params.id)
    .order("seq", { ascending: false })
    .limit(1)
    .maybeSingle();

  const { data, error } = await client
    .from("interview_turns")
    .insert({
      interview_id: params.id,
      seq: (last?.seq ?? 0) + 1,
      speaker: body.speaker,
      content: body.content,
    })
    .select()
    .single();
  if (error) return fail(error.message, 500);
  return ok(data, 201);
}
