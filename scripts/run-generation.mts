// Runner terminal de la génération (D-020) — usage: npx tsx scripts/run-generation.ts <fable|sonnet|haiku> [total]
// Boucle generateBatch jusqu'au quota du tier, au total demandé, ou au plafond budget.
import { readFileSync } from "fs";
for (const line of readFileSync(".env.local", "utf-8").split("\n")) {
  const m = line.match(/^([A-Z_]+)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
}
import { generateBatch, TIERS, type Tier } from "../lib/simgen";

const tier = process.argv[2] as Tier;
if (!tier || !(tier in TIERS)) { console.error("usage: npx tsx scripts/run-generation.ts <fable|sonnet|haiku> [total]"); process.exit(1); }
const total = parseInt(process.argv[3] ?? String(TIERS[tier].quota), 10);

let doneThisRun = 0, consecutiveZero = 0;
for (;;) {
  const r = await generateBatch(tier, 20);
  doneThisRun += r.generated;
  console.log(`[${tier}] +${r.generated} (échecs ${r.failed ?? 0}) | total tier: ${r.done}/${TIERS[tier].quota} | coût global: ${r.costUsd}$`);
  if (r.stopped === "budget") { console.log("⛔ plafond budget atteint"); break; }
  if (r.done >= Math.min(total, TIERS[tier].quota)) { console.log("✅ quota atteint"); break; }
  consecutiveZero = r.generated === 0 ? consecutiveZero + 1 : 0;
  if (consecutiveZero >= 2) { console.log("⚠ échecs répétés — voir knowledge/simulations/generated/_errors.log"); break; }
}
