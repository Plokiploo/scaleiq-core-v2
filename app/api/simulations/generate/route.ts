import { ok, fail, readBody } from "@/lib/api";
import { generateBatch, TIERS, type Tier } from "@/lib/simgen";

export const maxDuration = 300;

// POST {tier: "fable"|"sonnet"|"haiku", batch?: number}
// Génère un lot de simulations (D-020). Budget global plafonné dans lib/simgen.
export async function POST(req: Request) {
  const body = await readBody<{ tier?: Tier; batch?: number }>(req);
  if (!body?.tier || !(body.tier in TIERS)) return fail("tier requis: fable | sonnet | haiku");
  const batch = Math.min(Math.max(body.batch ?? 20, 1), 40);
  try {
    return ok(await generateBatch(body.tier, batch));
  } catch (e) {
    return fail((e as Error).message, 500);
  }
}
