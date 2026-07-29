// usage: npx tsx scripts/run-sparring.ts [nombre de matchs]
import { readFileSync } from "fs";
for (const line of readFileSync(".env.local", "utf-8").split("\n")) {
  const m = line.match(/^([A-Z_]+)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
}
import { playMatch } from "../lib/sparring";
async function main() {
  const n = parseInt(process.argv[2] ?? "10", 10);
  const tally: Record<string, number> = {};
  for (let i = 0; i < n; i++) {
    const r = await playMatch();
    if ("stopped" in r && r.stopped === "budget") { console.log("⛔ budget sparring atteint"); break; }
    const v = (r as { judge?: { verdict?: string } }).judge?.verdict ?? "?";
    tally[v] = (tally[v] ?? 0) + 1;
    console.log(`match ${i + 1}/${n}: ${v} | sim ${(r as {sim_id?:string}).sim_id} | coût cumulé: ${(r as {totalCost?:number}).totalCost?.toFixed(2)}$`);
  }
  console.log("SCORE:", JSON.stringify(tally));
}
main();
