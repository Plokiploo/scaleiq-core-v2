import { ok, fail, readBody } from "@/lib/api";
import { playMatch } from "@/lib/sparring";

export const maxDuration = 300;

// POST {sim_id?} — joue UN match de sparring (D-024).
export async function POST(req: Request) {
  const body = await readBody<{ sim_id?: string }>(req);
  try {
    return ok(await playMatch(body?.sim_id));
  } catch (e) {
    return fail((e as Error).message, 500);
  }
}
