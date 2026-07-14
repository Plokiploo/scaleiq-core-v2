import { ok, fail, readBody } from "@/lib/api";
import {
  aiBootstrap,
  aiNextQuestion,
  aiSynthesize,
  aiObserveScreen,
  type DiagnosticContext,
  type Turn,
} from "@/lib/ai";

// Route serveur unique pour l'assistance IA (Phase 5).
// server-only: la clé ANTHROPIC_API_KEY n'est jamais exposée au client.
// Chaque sortie IA est structurée (JSON schema validé côté API Anthropic) et
// reste une PROPOSITION: rien n'est écrit en base depuis cette route.

type Body =
  | { mode: "bootstrap"; description?: string }
  | { mode: "interview_question"; diagnostic?: DiagnosticContext; transcript?: Turn[] }
  | { mode: "synthesize"; diagnostic?: DiagnosticContext; transcript?: Turn[] }
  | {
      mode: "observe_screen";
      diagnostic?: DiagnosticContext;
      last_question?: string | null;
      prior_observations?: string[];
      image_base64?: string;
      media_type?: "image/jpeg" | "image/png";
    };

export async function POST(req: Request) {
  const body = await readBody<Body>(req);
  if (!body?.mode) return fail("mode is required");

  try {
    switch (body.mode) {
      case "bootstrap": {
        if (!body.description?.trim()) return fail("description is required");
        return ok(await aiBootstrap(body.description));
      }
      case "interview_question": {
        if (!body.diagnostic) return fail("diagnostic is required");
        return ok(await aiNextQuestion(body.diagnostic, body.transcript ?? []));
      }
      case "synthesize": {
        if (!body.diagnostic) return fail("diagnostic is required");
        return ok(await aiSynthesize(body.diagnostic, body.transcript ?? []));
      }
      case "observe_screen": {
        if (!body.diagnostic) return fail("diagnostic is required");
        if (!body.image_base64?.trim()) return fail("image_base64 is required");
        return ok(
          await aiObserveScreen(
            body.diagnostic,
            body.last_question ?? null,
            body.prior_observations ?? [],
            body.image_base64,
            body.media_type ?? "image/jpeg"
          )
        );
      }
      default:
        return fail(`mode inconnu: ${(body as { mode?: string }).mode}`);
    }
  } catch (e) {
    return fail((e as Error).message, 502);
  }
}
