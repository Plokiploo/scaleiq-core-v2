// Génération de simulations côté serveur (D-020). Server-only.
// Budget global persistant: knowledge/simulations/generated/_state.json
import Anthropic from "@anthropic-ai/sdk";
import { readFileSync, writeFileSync, appendFileSync, mkdirSync, readdirSync, existsSync } from "fs";
import { join } from "path";

const ROOT = process.cwd();
const GEN = join(ROOT, "knowledge", "simulations", "generated");
const STATE = join(GEN, "_state.json");

export const TIERS = {
  fable: { model: "claude-fable-5", priceIn: 10, priceOut: 50, quota: 100, maxTokens: 1200 },
  "fable-think": { model: "claude-fable-5", priceIn: 10, priceOut: 50, quota: 12, maxTokens: 13500, effort: "max" as const },
  sonnet: { model: "claude-sonnet-5", priceIn: 2, priceOut: 10, quota: 1300, maxTokens: 1200 },
  haiku: { model: "claude-haiku-4-5-20251001", priceIn: 1, priceOut: 5, quota: 2000, maxTokens: 1200 },
} as const;
export type Tier = keyof typeof TIERS;
export const MAX_COST_USD = 34; // D-022: +7 CAD haiku + +5 CAD fable-think autorisés par Jonathan
const COMPARISON_SET = 100; // les N premières coordonnées sont générées par TOUS les tiers

type Coord = { id: string; label: string; mod: string; kernel: string };
type Kernel = { title: string; dom: string; fcode: string; sym: string; act: string };

let _coords: Coord[] | null = null;
let _kernels: Record<string, Kernel> | null = null;

function load() {
  if (_coords) return;
  const md = readFileSync(join(ROOT, "knowledge", "simulations", "SIMULATIONS.md"), "utf-8");
  _kernels = {};
  const kernelRe = /## (C\d+) — ([^\[]+)\[([^\]·]+)· (\w+)\]\nSymptôme noyau: « ([^»]+) » · Action noyau: ([^\n]+)/g;
  let m: RegExpExecArray | null;
  while ((m = kernelRe.exec(md)) !== null)
    _kernels[m[1]] = { title: m[2].trim(), dom: m[3].trim(), fcode: m[4].trim(), sym: m[5], act: m[6] };
  _coords = [];
  const coordRe = /^- (S-(C\d+)-[PMG](?:-\w+)?) \((.+?)\): ([\s\S]+?) Réf:/gm;
  while ((m = coordRe.exec(md)) !== null)
    _coords.push({ id: m[1], kernel: m[2], label: m[3], mod: m[4] });
}

function state(): { costUsd: number; byTier: Record<string, number> } {
  if (existsSync(STATE)) return JSON.parse(readFileSync(STATE, "utf-8"));
  return { costUsd: 0, byTier: {} };
}
function saveState(s: ReturnType<typeof state>) {
  mkdirSync(GEN, { recursive: true });
  writeFileSync(STATE, JSON.stringify(s, null, 1));
}
function doneIds(tier: Tier): Set<string> {
  const dir = join(GEN, tier);
  const out = new Set<string>();
  if (!existsSync(dir)) return out;
  for (const f of readdirSync(dir).filter((f) => f.endsWith(".jsonl")))
    for (const line of readFileSync(join(dir, f), "utf-8").split("\n"))
      if (line.trim()) { try { out.add(JSON.parse(line).id); } catch {} }
  return out;
}

const SECTEURS = ["services B2B", "commerce/retail", "industrie/fabrication", "santé/services réglementés",
  "tech/digital", "construction/immobilier", "restauration/hôtellerie", "logistique/transport"];

const SYSTEM = `Tu écris des simulations d'investigation opérationnelle pour entraîner un système de diagnostic (ScaleIQ).
Chaque simulation est une PARTIE plausible et DISTINCTE: entreprise concrète (invente nom, chiffres réalistes), symptôme dans la voix du dirigeant, observations factuelles que révélerait une bonne interview Gemba, une fausse piste tentante, la friction dominante et sa cause, une action simple avec owner, un signal de validation et une CONDITION D'INVALIDATION honnête.
Règles: réalisme > élégance. La fausse piste doit être vraiment tentante. L'invalidation doit être plausible. Varie voix, secteurs, chiffres. Réponds UNIQUEMENT en JSON conforme.`;

// Plan d'attribution: comparaison (100 coords communes) puis coordonnées suivantes réparties.
function plan(tier: Tier): { coordIdx: number; seed: number; id: string }[] {
  load();
  const quota = TIERS[tier].quota;
  const items: { coordIdx: number; seed: number; id: string }[] = [];
  // 1) set de comparaison: mêmes 100 coordonnées pour tous, seed=1
  for (let i = 0; i < COMPARISON_SET && items.length < quota; i++)
    items.push({ coordIdx: i, seed: 1, id: `${_coords![i].id}-v1` });
  // 2) au-delà: zones distinctes par tier pour maximiser la couverture
  const offset = tier === "sonnet" ? COMPARISON_SET : tier === "haiku" ? 800 : 0; // fable-think: quota<=100 → reste dans le set de comparaison
  let i = COMPARISON_SET + offset, seed = 1;
  while (items.length < quota) {
    if (i >= _coords!.length) { i = COMPARISON_SET; seed++; }
    items.push({ coordIdx: i, seed, id: `${_coords![i].id}-v${seed}` });
    i++;
  }
  return items;
}

export async function generateBatch(tier: Tier, batchSize: number) {
  load();
  const st = state();
  if (st.costUsd >= MAX_COST_USD)
    return { generated: 0, done: st.byTier[tier] ?? 0, costUsd: st.costUsd, stopped: "budget" };
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY manquante");
  const client = new Anthropic({ apiKey });
  const cfg = TIERS[tier];
  const done = doneIds(tier);
  const todo = plan(tier).filter((x) => !done.has(x.id)).slice(0, batchSize);
  mkdirSync(join(GEN, tier), { recursive: true });

  let generated = 0, failed = 0;
  const CONC = 4;
  const queue = [...todo];
  async function worker() {
    while (queue.length) {
      const item = queue.shift()!;
      const cur = state();
      if (cur.costUsd >= MAX_COST_USD) return;
      const coord = _coords![item.coordIdx];
      const kernel = _kernels![coord.kernel];
      const secteur = SECTEURS[(coord.id.length * 7 + item.seed * 13) % SECTEURS.length];
      try {
        const msg = await client.messages.create({
          model: cfg.model,
          max_tokens: cfg.maxTokens,
          ...("effort" in cfg ? { output_config: { effort: cfg.effort } } : {}),
          system: SYSTEM,
          messages: [{ role: "user", content:
`Coordonnée: ${coord.id} (${coord.label})
Noyau: ${kernel.title} [${kernel.dom}, friction ${kernel.fcode}] — symptôme type: «${kernel.sym}» — action type: ${kernel.act}
Lecture taille/stade: ${coord.mod}
Secteur imposé: ${secteur} (variation #${item.seed})

Écris UNE simulation distincte. JSON strict:
{"id":"${item.id}","tier":"${tier}","titre":"...","entreprise":"nom + taille + secteur en une phrase","symptome":"citation du dirigeant","observations":["fait 1","fait 2","fait 3"],"fausse_piste":"...","friction":"${kernel.fcode}","cause_probable":"...","action":{"quoi":"...","owner":"...","delai":"..."},"validation":"signal mesurable","invalidation":"ce qui prouverait que ce diagnostic est faux","statut":"candidate"}` }],
        });
        const cost = (msg.usage.input_tokens * cfg.priceIn + msg.usage.output_tokens * cfg.priceOut) / 1e6;
        const s2 = state(); s2.costUsd += cost; saveState(s2);
        const text = msg.content.find((b) => b.type === "text");
        const raw = text && text.type === "text" ? text.text : "";
        try {
          const json = JSON.parse(raw.slice(raw.indexOf("{"), raw.lastIndexOf("}") + 1));
          if (!json.invalidation || !json.fausse_piste || !json.observations?.length) throw new Error("schéma incomplet");
          appendFileSync(join(GEN, tier, `${kernel.dom}.jsonl`), JSON.stringify(json) + "\n");
          const s3 = state(); s3.byTier[tier] = (s3.byTier[tier] ?? 0) + 1; saveState(s3);
          generated++;
        } catch (pe) {
          appendFileSync(join(GEN, "_errors.log"),
            `${new Date().toISOString()} ${tier} ${item.id} PARSE: ${(pe as Error).message} RAW[0..300]: ${raw.slice(0, 300).replace(/\n/g, " ")}\n`);
          failed++;
        }
      } catch (e) {
        appendFileSync(join(GEN, "_errors.log"),
          `${new Date().toISOString()} ${tier} ${item.id} API: ${(e as Error).message}\n`);
        failed++;
      }
    }
  }
  await Promise.all(Array.from({ length: CONC }, worker));
  const fin = state();
  return { generated, failed, done: (fin.byTier[tier] ?? 0), costUsd: Math.round(fin.costUsd * 100) / 100,
    remainingQuota: cfg.quota - (fin.byTier[tier] ?? 0), stopped: fin.costUsd >= MAX_COST_USD ? "budget" : null };
}
