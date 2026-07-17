// SPARRING (D-024): le moteur joue contre une simulation tirée de la banque.
// Le moteur RÉEL (aiNextQuestion/aiSynthesize, corpus inclus) mène l'interview;
// un LLM joue le dirigeant (réalité secrète = la simulation); un juge note.
// Budget séparé: _sparring_state.json, plafond SPARRING_MAX_USD (défaut 8).
import Anthropic from "@anthropic-ai/sdk";
import { readFileSync, writeFileSync, appendFileSync, mkdirSync, readdirSync, existsSync } from "fs";
import { join } from "path";
import { aiNextQuestion, aiSynthesize, type Turn, type DiagnosticContext, type SynthesisResult } from "./ai";

// Retry simple: les appels moteur peuvent échouer transitoirement (réponse vide, 529).
async function withRetry<T>(fn: () => Promise<T>, tries = 3): Promise<T> {
  let last: unknown;
  for (let i = 0; i < tries; i++) {
    try { return await fn(); } catch (e) { last = e; await new Promise((r) => setTimeout(r, 1500 * (i + 1))); }
  }
  throw last;
}

const ROOT = process.cwd();
const GEN = join(ROOT, "knowledge", "simulations", "generated");
const SPAR = join(ROOT, "knowledge", "sparring");
const STATE = join(SPAR, "_sparring_state.json");
export const SPARRING_MAX_USD = parseFloat(process.env.SPARRING_MAX_USD ?? "8");

const ACTOR_MODEL = "claude-haiku-4-5-20251001";  // joue le dirigeant (pas cher, naturel)
const JUDGE_MODEL = "claude-sonnet-5";            // note le match (fiable)
const PRICES: Record<string, [number, number]> = {
  "claude-haiku-4-5-20251001": [1, 5], "claude-sonnet-5": [2, 10], "claude-fable-5": [10, 50],
};
const ENGINE_MODEL = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-5";

type Sim = {
  id: string; tier: string; titre: string; entreprise: string; symptome: string;
  observations: string[]; fausse_piste: string; friction: string; cause_probable: string;
  action: { quoi: string; owner: string; delai: string }; validation: string; invalidation: string;
};

function state(): { costUsd: number; matches: number } {
  if (existsSync(STATE)) return JSON.parse(readFileSync(STATE, "utf-8"));
  return { costUsd: 0, matches: 0 };
}
function saveState(s: ReturnType<typeof state>) { mkdirSync(SPAR, { recursive: true }); writeFileSync(STATE, JSON.stringify(s, null, 1)); }

export function loadSims(tiers: string[] = ["haiku", "sonnet"]): Sim[] {
  const sims: Sim[] = [];
  for (const t of tiers) {
    const dir = join(GEN, t);
    if (!existsSync(dir)) continue;
    for (const f of readdirSync(dir).filter((x) => x.endsWith(".jsonl")))
      for (const line of readFileSync(join(dir, f), "utf-8").split("\n"))
        if (line.trim()) { try { sims.push(JSON.parse(line)); } catch {} }
  }
  return sims;
}

let tally = { costUsd: 0 };
async function call(client: Anthropic, model: string, system: string, user: string, maxTokens = 700): Promise<string> {
  const msg = await client.messages.create({ model, max_tokens: maxTokens, system, messages: [{ role: "user", content: user }] });
  const [pi, po] = PRICES[model] ?? [2, 10];
  tally.costUsd += (msg.usage.input_tokens * pi + msg.usage.output_tokens * po) / 1e6;
  const b = msg.content.find((x) => x.type === "text");
  return b && b.type === "text" ? b.text : "";
}

export async function playMatch(simId?: string) {
  const st = state();
  if (st.costUsd >= SPARRING_MAX_USD) return { stopped: "budget", ...st };
  const sims = loadSims();
  const sim = simId ? sims.find((s) => s.id === simId) : sims[Math.floor(Math.random() * sims.length)];
  if (!sim) throw new Error("simulation introuvable");
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  tally = { costUsd: 0 };

  const ACTOR_SYS = `Tu joues le dirigeant de: ${sim.entreprise}.
RÉALITÉ TERRAIN (secrète, ne jamais la nommer en termes d'analyse): plainte initiale «${sim.symptome}»; faits que tu connais si on te pose les bonnes questions: ${sim.observations.join(" | ")}. Ta théorie personnelle (que tu crois): «${sim.fausse_piste}».
Règles: réponds en dirigeant pressé, factuel, 2-4 phrases, JAMAIS de vocabulaire d'analyste (pas de «friction», «contrainte», «goulot»). Si la question sort de ta réalité connue, improvise de façon cohérente sans contredire les faits. Tu défends spontanément ta théorie personnelle si on te demande ton avis.`;

  const diagnostic: DiagnosticContext = { title: sim.titre, current_condition: null, target_condition: null, gap: null };
  const transcript: Turn[] = [{ speaker: "interviewee", content: sim.symptome }];

  // Interview: le VRAI moteur pose les questions; l'acteur répond.
  for (let i = 0; i < 7; i++) {
    const q = await withRetry(() => aiNextQuestion(diagnostic, transcript));
    if (q.done || !q.question) break;
    transcript.push({ speaker: "interviewer", content: q.question });
    const a = await call(client, ACTOR_MODEL, ACTOR_SYS,
      `Historique:\n${transcript.map((t) => `${t.speaker === "interviewer" ? "Consultant" : "Toi"}: ${t.content}`).join("\n")}\n\nRéponds à la dernière question du consultant.`);
    transcript.push({ speaker: "interviewee", content: a });
  }
  const synthesis: SynthesisResult = await withRetry(() => aiSynthesize(diagnostic, transcript));

  // Juge: vérité terrain vs conclusion du moteur.
  const judgeRaw = await withRetry(() => call(client, JUDGE_MODEL,
    `Tu es juge d'un match d'entraînement diagnostique. Compare la conclusion du moteur à la vérité de la simulation. Sévère mais juste. Réponds UNIQUEMENT en JSON.`,
    `VÉRITÉ (simulation): friction=${sim.friction}; cause=«${sim.cause_probable}»; action attendue=«${sim.action?.quoi}»; fausse piste à éviter=«${sim.fausse_piste}»; invalidation=«${sim.invalidation}»
CONCLUSION DU MOTEUR: cause probable=«${synthesis.causal_analysis?.probable_cause}»; findings=${JSON.stringify(synthesis.findings?.map((f) => `[${f.kind}] ${f.content}`))}; recommandations=${JSON.stringify(synthesis.recommendations?.map((r) => r.title + ": " + (r as unknown as {action?: string}).action))}
JSON: {"cause_score":0|1|2,"action_score":0|1|2,"piege_evite":true|false,"epistemique_ok":true|false,"commentaire":"2 phrases max","verdict":"gagné|partiel|perdu"}`, 400));
  const judge = JSON.parse(judgeRaw.slice(judgeRaw.indexOf("{"), judgeRaw.lastIndexOf("}") + 1));

  const s2 = state(); s2.costUsd += tally.costUsd; s2.matches += 1; saveState(s2);
  const result = {
    at: new Date().toISOString(), sim_id: sim.id, sim_tier: sim.tier, friction: sim.friction,
    questions: transcript.filter((t) => t.speaker === "interviewer").length,
    engine_cause: synthesis.causal_analysis?.probable_cause ?? null,
    truth_cause: sim.cause_probable, fausse_piste: sim.fausse_piste,
    judge, cost_usd: Math.round(tally.costUsd * 1000) / 1000,
  };
  appendFileSync(join(SPAR, "results.jsonl"), JSON.stringify(result) + "\n");
  appendFileSync(join(SPAR, "transcripts.jsonl"), JSON.stringify({ sim_id: sim.id, at: result.at, transcript, synthesis }) + "\n");
  return { ...result, totalCost: s2.costUsd, totalMatches: s2.matches };
}
