#!/usr/bin/env node
/**
 * Génération LLM des simulations complètes ScaleIQ (objectif: 5000).
 * Usage: node scripts/generate-simulations-llm.mjs [--target 5000] [--model claude-sonnet-5]
 * - Résumable: saute les IDs déjà générés (knowledge/simulations/generated/*.jsonl)
 * - Plafond de coût: s'arrête à MAX_COST_USD (défaut 45$)
 * - Chaque simulation: scénario complet, distinct, JSON validé.
 * Doctrine: statut candidate, invalidation obligatoire, l'expérience n'est pas absolue.
 */
import Anthropic from "@anthropic-ai/sdk";
import { readFileSync, writeFileSync, appendFileSync, mkdirSync, existsSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const K = (p) => readFileSync(join(ROOT, "knowledge", p), "utf-8");
const OUT_DIR = join(ROOT, "knowledge", "simulations", "generated");
mkdirSync(OUT_DIR, { recursive: true });

// --- env ---
for (const line of readFileSync(join(ROOT, ".env.local"), "utf-8").split("\n")) {
  const m = line.match(/^([A-Z_]+)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
}
const args = Object.fromEntries(process.argv.slice(2).map((a, i, arr) =>
  a.startsWith("--") ? [a.slice(2), arr[i + 1]] : []).filter(x => x.length));
const TARGET = parseInt(args.target ?? "5000", 10);
const MODEL = args.model ?? "claude-haiku-4-5-20251001"; // Haiku par défaut: budget 30 CAD (D-019)
const MAX_COST = parseFloat(process.env.MAX_COST_USD ?? "20"); // ~28 CAD, marge sous le plafond de 30 CAD
// prix $/Mtoken selon modèle
const PRICES = { "claude-haiku-4-5-20251001": [1.0, 5.0], "claude-sonnet-5": [2.0, 10.0] };
const [PRICE_IN, PRICE_OUT] = PRICES[MODEL] ?? [2.0, 10.0];

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// --- coordonnées: parse SIMULATIONS.md (lignes "- S-Cx-T[-stade] ...") ---
const simsMd = K("simulations/SIMULATIONS.md");
const kernels = {};
for (const m of simsMd.matchAll(/## (C\d+) — ([^\[]+)\[([^\]·]+)· (\w+)\]\nSymptôme noyau: « ([^»]+) » · Action noyau: ([^\n]+)/g))
  kernels[m[1]] = { title: m[2].trim(), dom: m[3].trim(), fcode: m[4].trim(), sym: m[5], act: m[6] };
const coords = [...simsMd.matchAll(/^- (S-C\d+-[PMG](?:-\w+)?) \(([^)]+)\): (.+?) Réf:/gms)]
  .map(m => ({ id: m[1], label: m[2], mod: m[3] }));
console.log(`coordonnées: ${coords.length} | noyaux: ${Object.keys(kernels).length}`);

// variations par coordonnée pour atteindre TARGET (~4 pour 5000)
const PER_COORD = Math.max(1, Math.ceil(TARGET / coords.length));
const SECTEURS = ["services B2B", "commerce/retail", "industrie/fabrication", "santé/services réglementés",
  "tech/digital", "construction/immobilier", "restauration/hôtellerie", "logistique/transport"];

const matrice = K("simulations/MATRICE.md");
const stades = K("simulations/modificateurs-stade.md");

const SYSTEM = `Tu écris des simulations d'investigation opérationnelle pour entraîner un système de diagnostic (ScaleIQ).
Chaque simulation est une PARTIE plausible et DISTINCTE: entreprise concrète (invente nom, chiffres réalistes), symptôme dans la voix du dirigeant, observations factuelles que révélerait une bonne interview Gemba, une fausse piste tentante, la friction dominante et sa cause, une action simple avec owner, un signal de validation et une CONDITION D'INVALIDATION honnête.
Règles: réalisme > élégance. La fausse piste doit être vraiment tentante. L'invalidation doit être plausible (le diagnostic peut être faux). Varie les voix, les secteurs, les chiffres. Réponds UNIQUEMENT en JSON conforme.`;

function prompt(coord, kernel, secteur, seed) {
  return `Coordonnée: ${coord.id} (${coord.label})
Noyau: ${kernel.title} [${kernel.dom}, friction ${kernel.fcode}] — symptôme type: «${kernel.sym}» — action type: ${kernel.act}
Lecture taille/stade: ${coord.mod}
Secteur imposé pour cette variation: ${secteur} (graine de variation #${seed})
Contexte doctrine (extraits): ${stades.slice(0, 400)}

Écris UNE simulation distincte. JSON strict:
{"id":"${coord.id}-v${seed}","titre":"...","entreprise":"nom + taille + secteur en une phrase","symptome":"citation du dirigeant","observations":["fait 1","fait 2","fait 3"],"fausse_piste":"...","friction":"${kernel.fcode}","cause_probable":"...","action":{"quoi":"...","owner":"...","delai":"..."},"validation":"signal mesurable","invalidation":"ce qui prouverait que ce diagnostic est faux","statut":"candidate"}`;
}

// --- reprise: IDs déjà générés ---
const done = new Set();
for (const f of readdirSync(OUT_DIR).filter(f => f.endsWith(".jsonl")))
  for (const line of readFileSync(join(OUT_DIR, f), "utf-8").split("\n"))
    if (line.trim()) try { done.add(JSON.parse(line).id); } catch {}
console.log(`déjà générées: ${done.size} | cible: ${TARGET} | modèle: ${MODEL} | plafond: ${MAX_COST}$`);

let cost = 0, made = 0, failed = 0;
const CONCURRENCY = 4;

async function genOne(coord, seed) {
  const kernel = kernels[coord.id.match(/S-(C\d+)/)[1]];
  const secteur = SECTEURS[(coord.id.length * 7 + seed * 13) % SECTEURS.length];
  const msg = await client.messages.create({
    model: MODEL, max_tokens: 700, system: SYSTEM,
    messages: [{ role: "user", content: prompt(coord, kernel, secteur, seed) }],
  });
  cost += (msg.usage.input_tokens * PRICE_IN + msg.usage.output_tokens * PRICE_OUT) / 1e6;
  const text = msg.content.find(b => b.type === "text")?.text ?? "";
  const json = JSON.parse(text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1));
  if (!json.invalidation || !json.fausse_piste || !json.observations?.length)
    throw new Error("schéma incomplet");
  return json;
}

const queue = [];
for (const coord of coords)
  for (let seed = 1; seed <= PER_COORD; seed++) {
    if (done.size + queue.length >= TARGET) break;
    if (!done.has(`${coord.id}-v${seed}`)) queue.push({ coord, seed });
  }
console.log(`à générer: ${Math.min(queue.length, TARGET - done.size)}`);

async function worker(wid) {
  while (queue.length && done.size + made < TARGET && cost < MAX_COST) {
    const { coord, seed } = queue.shift();
    try {
      const sim = await genOne(coord, seed);
      const dom = kernels[coord.id.match(/S-(C\d+)/)[1]].dom;
      appendFileSync(join(OUT_DIR, `${dom}.jsonl`), JSON.stringify(sim) + "\n");
      made++;
      if (made % 100 === 0) console.log(`${made} générées | coût: ${cost.toFixed(2)}$`);
    } catch (e) {
      failed++;
      if (failed > 200) { console.error("trop d'échecs, arrêt"); process.exit(1); }
    }
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, (_, i) => worker(i)));
console.log(`FIN: ${made} nouvelles | total: ${done.size + made} | échecs: ${failed} | coût: ${cost.toFixed(2)}$`);
if (cost >= MAX_COST) console.log("⚠ plafond de coût atteint — relancer pour continuer (résumable).");
