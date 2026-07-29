// ScaleIQ V0.1 — Phase 3 (OCT-15): zero-credit routing-policy check.
//
// The board's condition on funding Anthropic credits is that we do NOT run every
// AI call on the highest-cost model (policy OCT-11 doc `model-routing`). The
// runtime proof (scripts/run-proof.ts) validates the tier split from live per-call
// logs, but that needs funded Anthropic + live Supabase. THIS check is different:
// it statically locks the routing policy so it cannot silently regress while the
// cost gates are still pending. No network, no DB, no credits — runs anywhere.
//
// It asserts:
//   1. Each diagnostic-loop step maps to the exact tier the policy assigns.
//   2. The Deep (highest-cost) tier is RESERVED: `synthesize` is the only Deep
//      step. If any other step ever routes to Deep, this fails — that is the
//      board condition, encoded as an executable invariant.
//   3. Per-tier default model IDs match the locked tier→model mapping.
//
// Usage:  npx tsx scripts/routing-policy-check.ts
// Exit:   0 = policy intact;  1 = a policy assertion failed.
import { pickModel, type Step, type Tier } from "../lib/model-routing";

// Expected policy (source of truth: OCT-11 doc `model-routing`, v1).
const EXPECTED_TIER: Record<Step, Tier> = {
  bootstrap: "standard",
  next_question: "standard",
  synthesize: "deep", // INVARIANT-CRITICAL: observation≠interpretation, correlation≠cause, root-cause
  observe_screen: "light",
};

const EXPECTED_MODEL: Record<Tier, string> = {
  light: "claude-haiku-4-5",
  standard: "claude-sonnet-5",
  deep: "claude-opus-5",
};

let failures = 0;
const check = (name: string, cond: boolean, detail: string) => {
  if (cond) {
    console.log(`PASS  ${name}`);
  } else {
    console.log(`FAIL  ${name} — ${detail}`);
    failures++;
  }
};

// 1. Each step routes to the policy-correct tier and default model.
for (const step of Object.keys(EXPECTED_TIER) as Step[]) {
  const { model, tier } = pickModel(step);
  const wantTier = EXPECTED_TIER[step];
  check(`step "${step}" → tier ${wantTier}`, tier === wantTier, `got tier ${tier}`);
  check(
    `step "${step}" → model ${EXPECTED_MODEL[wantTier]}`,
    model === EXPECTED_MODEL[wantTier],
    `got model ${model}`
  );
}

// 2. Deep is reserved — synthesize is the ONLY step allowed on the highest-cost tier.
const deepSteps = (Object.keys(EXPECTED_TIER) as Step[]).filter(
  (s) => pickModel(s).tier === "deep"
);
check(
  "Deep tier reserved (board cost condition)",
  deepSteps.length === 1 && deepSteps[0] === "synthesize",
  `Deep steps = [${deepSteps.join(", ")}] (expected exactly [synthesize])`
);

console.log(
  failures === 0
    ? "\nrouting-policy-check: OK — tier split locked, Deep reserved to synthesize."
    : `\nrouting-policy-check: ${failures} FAILURE(S) — routing policy has drifted.`
);
process.exit(failures === 0 ? 0 : 1);
