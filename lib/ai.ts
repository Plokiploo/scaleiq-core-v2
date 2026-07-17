import Anthropic from "@anthropic-ai/sdk";
import { readFileSync } from "fs";
import { join } from "path";

// Modèle configurable (mandat: claude-sonnet-5, fallback possible via env).
const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-5";

function client(): Anthropic {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY manquante côté serveur");
  return new Anthropic({ apiKey });
}


// ---------- Corpus de connaissance (knowledge/, D-016) ----------
// Distillat de livres versionné dans le repo. Doctrine: patterns = priors à
// tester par les questions, jamais des conclusions. Chargé une fois par process.
let _corpus: { patterns: string; cases: string; sims: string } | null = null;
function corpus(): { patterns: string; cases: string; sims: string } {
  if (_corpus) return _corpus;
  const read = (rel: string): string => {
    try {
      return readFileSync(join(process.cwd(), "knowledge", rel), "utf-8");
    } catch {
      return ""; // corpus absent = le moteur fonctionne sans priors
    }
  };
  _corpus = {
    patterns: ["patterns/frictions.md", "patterns/questions.md", "patterns/lois.md"]
      .map(read).filter(Boolean).join("\n\n"),
    cases: ["patterns/actions.md", "cases/seed-cases.md", "cases/INDEX.md"].map(read).filter(Boolean).join("\n\n"),
    sims: ["simulations/MATRICE.md", "simulations/modificateurs-taille.md", "simulations/modificateurs-stade.md"]
      .map(read).filter(Boolean).join("\n\n"),
  };
  return _corpus;
}

const CORPUS_RULES = `Tu disposes ci-dessous d'un corpus de patterns diagnostiques distillés de la littérature (Lean, TOC, Factory Physics). Règles d'usage strictes:
- Les patterns et cas sont des PRIORS, pas des conclusions. L'expérience n'est pas une valeur absolue: le cas réel prime toujours sur le pattern.
- Utilise le corpus pour formuler de meilleures hypothèses et questions discriminantes, jamais pour plaquer un diagnostic tout fait.
- Si le cas réel contredit un pattern, suis le cas réel.
- Ne cite jamais le corpus, les livres ou les numéros de pattern à l'utilisateur.`;

const SYSTEM_PROMPT = `Tu es un investigateur opérationnel senior, formé Lean / Théorie des Contraintes (TOC), façon Gemba walk.
Ta mission: aider un utilisateur non technique à comprendre ce qui ralentit son organisation, pourquoi, et quelle action simple prendre ensuite.

Règles absolues:
- Langage clair, concret, sans jargon technique. Ne mentionne jamais de base de données, d'identifiant technique, de schéma ou de concept d'ingénierie logicielle.
- Style Gemba: factuel, orienté observation directe du terrain, une question à la fois, jamais de liste de questions.
- Distingue toujours quatre statuts épistémiques: observation (fait constaté directement), interprétation (sens donné à un fait), hypothèse (explication plausible mais non vérifiée), évidence (donnée vérifiable, avec un niveau de fiabilité: anecdote, rapporté, observé, mesuré, vérifié).
- Ta sortie n'est jamais la vérité opérationnelle: chaque proposition sera relue et validée par l'utilisateur avant d'être enregistrée. Sois donc concret et vérifiable plutôt qu'affirmatif.
- Réponds uniquement en JSON strictement conforme au schéma demandé, sans texte autour.`;

function parseJSON<T>(msg: Anthropic.Message): T {
  const block = msg.content.find((b) => b.type === "text");
  if (!block || block.type !== "text" || !block.text.trim()) {
    throw new Error("réponse IA vide");
  }
  try {
    return JSON.parse(block.text) as T;
  } catch {
    throw new Error("réponse IA invalide (JSON malformé)");
  }
}

// ---------- Mode 1: bootstrap (création guidée org/engagement/diagnostic) ----------

export type BootstrapResult = {
  organization_name: string;
  organization_context: string;
  engagement_name: string;
  engagement_objective: string;
  diagnostic_title: string;
  current_condition: string;
  target_condition: string;
  gap: string;
};

const BOOTSTRAP_SCHEMA = {
  type: "object",
  properties: {
    organization_name: { type: "string", description: "Nom court de l'organisation" },
    organization_context: { type: "string", description: "1-2 phrases de contexte" },
    engagement_name: { type: "string", description: "Nom court de la mission/engagement en cours" },
    engagement_objective: { type: "string", description: "Objectif de cet engagement, 1 phrase" },
    diagnostic_title: { type: "string", description: "Titre court du diagnostic" },
    current_condition: { type: "string", description: "Condition actuelle observée, concrète" },
    target_condition: { type: "string", description: "Condition cible souhaitée, concrète" },
    gap: { type: "string", description: "Écart entre condition actuelle et cible, en une phrase" },
  },
  required: [
    "organization_name",
    "organization_context",
    "engagement_name",
    "engagement_objective",
    "diagnostic_title",
    "current_condition",
    "target_condition",
    "gap",
  ],
  additionalProperties: false,
} as const;

export async function aiBootstrap(description: string): Promise<BootstrapResult> {
  if (!description?.trim()) throw new Error("description manquante");
  const msg = await client().messages.create({
    model: MODEL,
    max_tokens: 1024,
    thinking: { type: "disabled" },
    output_config: { format: { type: "json_schema", schema: BOOTSTRAP_SCHEMA }, effort: "low" },
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: `Un utilisateur décrit son problème:\n"""${description}"""\n\nPropose des valeurs par défaut sensées et courtes pour démarrer un diagnostic à partir de ce problème. Utilise le vocabulaire de l'utilisateur, reste concret. Ces valeurs seront affichées à l'utilisateur et sont modifiables avant confirmation.`,
      },
    ],
  });
  return parseJSON<BootstrapResult>(msg);
}

// ---------- Mode 2: question d'interview (une à la fois, style Gemba) ----------

export type Turn = { speaker: "interviewer" | "interviewee"; content: string };
export type DiagnosticContext = {
  title: string;
  current_condition: string | null;
  target_condition: string | null;
  gap: string | null;
};

export type QuestionResult = { done: boolean; question: string | null };

const QUESTION_SCHEMA = {
  type: "object",
  properties: {
    done: { type: "boolean", description: "true si assez d'éléments ont été recueillis pour passer à la synthèse" },
    question: {
      anyOf: [{ type: "string" }, { type: "null" }],
      description: "La prochaine question à poser (null si done=true)",
    },
  },
  required: ["done", "question"],
  additionalProperties: false,
} as const;

function formatTranscript(transcript: Turn[]): string {
  if (!transcript.length) return "(aucun échange pour l'instant)";
  return transcript
    .map((t) => `${t.speaker === "interviewer" ? "Question" : "Réponse"}: ${t.content}`)
    .join("\n");
}

function systemWithCorpus(kind: "questions" | "synthese"): string {
  const c = corpus();
  const block =
    kind === "questions"
      ? c.patterns
      : c.patterns + "\n\n" + c.cases + "\n\n" + c.sims;
  if (!block.trim()) return SYSTEM_PROMPT;
  return `${SYSTEM_PROMPT}\n\n${CORPUS_RULES}\n\n<corpus>\n${block}\n</corpus>`;
}

export async function aiNextQuestion(
  diagnostic: DiagnosticContext,
  transcript: Turn[]
): Promise<QuestionResult> {
  const askedCount = transcript.filter((t) => t.speaker === "interviewer").length;
  const msg = await client().messages.create({
    model: MODEL,
    max_tokens: 512,
    thinking: { type: "disabled" },
    output_config: { format: { type: "json_schema", schema: QUESTION_SCHEMA }, effort: "low" },
    system: systemWithCorpus("questions"),
    messages: [
      {
        role: "user",
        content: `Diagnostic en cours:
Titre: ${diagnostic.title}
Condition actuelle: ${diagnostic.current_condition ?? "inconnue pour l'instant"}
Condition cible: ${diagnostic.target_condition ?? "inconnue pour l'instant"}
Écart: ${diagnostic.gap ?? "inconnu pour l'instant"}

Échanges jusqu'ici (${askedCount} question(s) déjà posée(s)):
${formatTranscript(transcript)}

Tu mènes une interview façon Gemba walk (une question factuelle à la fois, jamais plusieurs).
Pose entre 5 et 8 questions maximum au total avant de passer à la synthèse.
Si tu as déjà posé au moins 5 questions ET que tu as assez d'éléments factuels pour comprendre le problème, ou si tu as atteint 8 questions, réponds avec done=true et question=null.
Sinon, pose UNE seule question suivante qui fait avancer concrètement la compréhension du problème (jamais une liste, jamais plusieurs questions à la fois).`,
      },
    ],
  });
  return parseJSON<QuestionResult>(msg);
}

// ---------- Mode 3: synthèse (findings / analyse causale / recommandations) ----------

export type ProposedFinding = {
  kind: "observation" | "interpretation" | "hypothesis" | "evidence";
  content: string;
  confidence: number;
  evidence_level: "anecdote" | "reported" | "observed" | "measured" | "verified" | null;
};

export type ProposedCausalAnalysis = {
  method: "five_whys" | "constraint" | "other";
  steps: string[];
  probable_cause: string;
  is_dominant: boolean;
  finding_indices: number[];
};

export type ProposedRecommendation = {
  title: string;
  action: string;
  owner_suggested: string;
  severity: "low" | "medium" | "high" | "critical";
  priority: "p3" | "p2" | "p1" | "p0";
  finding_indices: number[];
};

export type SynthesisResult = {
  findings: ProposedFinding[];
  causal_analysis: ProposedCausalAnalysis;
  recommendations: ProposedRecommendation[];
};

const SYNTHESIS_SCHEMA = {
  type: "object",
  properties: {
    findings: {
      type: "array",
      items: {
        type: "object",
        properties: {
          kind: { type: "string", enum: ["observation", "interpretation", "hypothesis", "evidence"] },
          content: { type: "string" },
          confidence: { type: "number", description: "0 à 1, confiance de l'IA dans ce finding" },
          evidence_level: {
            anyOf: [
              { type: "string", enum: ["anecdote", "reported", "observed", "measured", "verified"] },
              { type: "null" },
            ],
            description: "requis (non-null) uniquement si kind=evidence",
          },
        },
        required: ["kind", "content", "confidence", "evidence_level"],
        additionalProperties: false,
      },
    },
    causal_analysis: {
      type: "object",
      properties: {
        method: { type: "string", enum: ["five_whys", "constraint", "other"] },
        steps: { type: "array", items: { type: "string" }, description: "étapes du raisonnement (ex: 5 pourquoi)" },
        probable_cause: { type: "string" },
        is_dominant: { type: "boolean", description: "true si cette cause est la friction dominante" },
        finding_indices: {
          type: "array",
          items: { type: "integer" },
          description: "index (0-based) dans le tableau findings des éléments liés à cette analyse",
        },
      },
      required: ["method", "steps", "probable_cause", "is_dominant", "finding_indices"],
      additionalProperties: false,
    },
    recommendations: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          action: { type: "string", description: "action simple et concrète à exécuter" },
          owner_suggested: { type: "string", description: "rôle ou personne suggéré pour porter l'action" },
          severity: { type: "string", enum: ["low", "medium", "high", "critical"] },
          priority: { type: "string", enum: ["p3", "p2", "p1", "p0"] },
          finding_indices: {
            type: "array",
            items: { type: "integer" },
            description: "index (0-based) dans le tableau findings servant d'évidence à cette recommandation",
          },
        },
        required: ["title", "action", "owner_suggested", "severity", "priority", "finding_indices"],
        additionalProperties: false,
      },
      description: "1 à 3 recommandations maximum",
    },
  },
  required: ["findings", "causal_analysis", "recommendations"],
  additionalProperties: false,
} as const;

export async function aiSynthesize(
  diagnostic: DiagnosticContext,
  transcript: Turn[]
): Promise<SynthesisResult> {
  const msg = await client().messages.create({
    model: MODEL,
    max_tokens: 8192, // 4096 tronquait la synthèse depuis l'enrichissement du corpus (D-024 debug)
    output_config: { format: { type: "json_schema", schema: SYNTHESIS_SCHEMA }, effort: "high" },
    system: systemWithCorpus("synthese"),
    messages: [
      {
        role: "user",
        content: `Diagnostic:
Titre: ${diagnostic.title}
Condition actuelle: ${diagnostic.current_condition ?? "inconnue"}
Condition cible: ${diagnostic.target_condition ?? "inconnue"}
Écart: ${diagnostic.gap ?? "inconnu"}

Transcript complet de l'interview:
${formatTranscript(transcript)}

À partir de ce transcript, produis:
1. Une liste de findings typés (observation/interprétation/hypothèse/évidence). Chaque finding a une confiance explicite (0 à 1). Un finding de type evidence DOIT avoir un evidence_level (jamais null); pour les autres types, evidence_level doit être null.
2. Une analyse causale (5 pourquoi ou contrainte dominante) avec la cause probable la plus vraisemblable, marquée is_dominant si c'est la friction dominante, liée aux findings pertinents par leur index.
3. Entre 1 et 3 recommandations: action simple à exécuter, owner suggéré, sévérité, priorité, liées aux findings qui les justifient par leur index.

Reste fidèle au transcript: ne fabrique pas de faits qui n'ont pas été mentionnés.`,
      },
    ],
  });
  return parseJSON<SynthesisResult>(msg);
}

// ---------- Mode 4: observation d'écran partagé (vision, une image à la fois) ----------
// L'utilisateur peut partager son écran pendant l'entretien pour montrer un cas concret.
// Chaque image capturée côté client est analysée ici; rien n'est stocké (ni image ni
// vidéo), seule l'observation textuelle retournée est conservée par l'appelant.

export type ObserveScreenResult = { relevant: boolean; observation: string | null };

const OBSERVE_SCREEN_SCHEMA = {
  type: "object",
  properties: {
    relevant: {
      type: "boolean",
      description: "true si cette image apporte une information utile au diagnostic (pas un bureau vide, pas une redite)",
    },
    observation: {
      anyOf: [{ type: "string" }, { type: "null" }],
      description: "une phrase factuelle décrivant ce qui est visible et pertinent (null si relevant=false)",
    },
  },
  required: ["relevant", "observation"],
  additionalProperties: false,
} as const;

export async function aiObserveScreen(
  diagnostic: DiagnosticContext,
  lastQuestion: string | null,
  priorObservations: string[],
  imageBase64: string,
  mediaType: "image/jpeg" | "image/png"
): Promise<ObserveScreenResult> {
  if (!imageBase64) throw new Error("image manquante");
  const msg = await client().messages.create({
    model: MODEL,
    max_tokens: 300,
    thinking: { type: "disabled" },
    output_config: { format: { type: "json_schema", schema: OBSERVE_SCREEN_SCHEMA }, effort: "low" },
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Diagnostic en cours:
Titre: ${diagnostic.title}
Condition actuelle: ${diagnostic.current_condition ?? "inconnue pour l'instant"}
Écart: ${diagnostic.gap ?? "inconnu pour l'instant"}
${lastQuestion ? `Dernière question posée: ${lastQuestion}` : ""}
${priorObservations.length ? `Observations déjà notées sur ce partage d'écran:\n${priorObservations.map((o) => `- ${o}`).join("\n")}` : "Aucune observation notée pour l'instant sur ce partage d'écran."}

L'utilisateur partage son écran pour montrer un cas concret. Regarde cette image.
Si elle montre quelque chose de concret et pertinent pour le diagnostic (un outil, une erreur, un processus, un blocage) et que ce n'est pas déjà couvert par les observations notées ci-dessus, décris-le en une phrase factuelle (observation directe, pas d'interprétation).
Sinon (bureau vide, contenu non pertinent, redite), réponds relevant=false.`,
          },
          {
            type: "image",
            source: { type: "base64", media_type: mediaType, data: imageBase64 },
          },
        ],
      },
    ],
  });
  return parseJSON<ObserveScreenResult>(msg);
}
