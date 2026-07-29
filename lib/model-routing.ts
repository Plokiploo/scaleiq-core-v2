// Intelligent model routing (OCT-15) — implements the approved policy
// OCT-11 doc `model-routing` (v1). Board condition on funding Anthropic credits:
// do NOT run every AI call on the highest-cost model. Reserve the Deep tier for
// the invariant-critical reasoning; route everything else down.
//
// Single choke point: pickModel(step) → { model, tier }. No scattered model
// literals in the product runtime. Per-tier model IDs are read from config
// (env-overridable) so credits/limits can be tuned without a redeploy. Every AI
// call logs {step, tier, input_tokens, output_tokens} so the tier split is
// validated from runtime evidence, not assumptions (Runtime First).

export type Tier = "light" | "standard" | "deep";

// Per-tier model IDs. Env-overridable so tiers retune without a redeploy.
// Standard keeps back-compat with the previous single ANTHROPIC_MODEL constant.
const TIER_MODEL: Record<Tier, string> = {
  light: process.env.MODEL_LIGHT || "claude-haiku-4-5",
  standard: process.env.MODEL_STANDARD || process.env.ANTHROPIC_MODEL || "claude-sonnet-5",
  deep: process.env.MODEL_DEEP || "claude-opus-5",
};

// Diagnostic-loop steps that make an AI call, mapped to a tier per the policy.
export type Step =
  | "bootstrap" // propose editable default scaffold from a free-text problem — comprehension + drafting
  | "next_question" // Gemba interview, one question at a time — comprehension + short reasoning
  | "synthesize" // observation≠interpretation + correlation≠cause + root-cause/constraint — INVARIANT-CRITICAL
  | "observe_screen"; // one factual observation from a shared-screen image — simple, user-validated transform

// Routing table (policy: pick the lowest tier whose condition matches; never
// default to Deep). Deep is reserved for `synthesize`, the one step that does the
// observation/interpretation/hypothesis separation, correlation-vs-cause, and
// root-cause/constraint identification — where a wrong model degrades the
// product's validity. Everything else stays Light/Standard.
const STEP_TIER: Record<Step, Tier> = {
  bootstrap: "standard",
  next_question: "standard",
  synthesize: "deep",
  observe_screen: "light",
};

export function pickModel(step: Step): { model: string; tier: Tier } {
  const tier = STEP_TIER[step];
  return { model: TIER_MODEL[tier], tier };
}

// Per-call usage log — the runtime evidence that validates the tier split.
// Anthropic returns usage on every Message; we surface it here as one JSON line.
export function logModelUsage(
  step: Step,
  tier: Tier,
  usage?: { input_tokens?: number; output_tokens?: number } | null
): void {
  const rec = {
    kind: "model_usage",
    step,
    tier,
    model: TIER_MODEL[tier],
    input_tokens: usage?.input_tokens ?? null,
    output_tokens: usage?.output_tokens ?? null,
  };
  // Single structured line so proofs/log scrapers can validate the split.
  console.log(`[model-routing] ${JSON.stringify(rec)}`);
}
