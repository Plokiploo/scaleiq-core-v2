// OCT-13 — Phase 1: re-prove the end-to-end diagnostic loop at RUNTIME.
// Invokes the REAL route handlers (same functions Next.js calls) against the
// LIVE Supabase database and LIVE Anthropic API. Not a doc read: real execution.
// Usage: npx tsx scripts/oct13-runtime-proof.ts
import { readFileSync } from "fs";
for (const line of readFileSync(".env.local", "utf-8").split("\n")) {
  const m = line.match(/^([A-Z_]+)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
}

import { supabaseService } from "../lib/supabase";
import { POST as orgPost } from "../app/api/organizations/route";
import { POST as engPost } from "../app/api/engagements/route";
import { POST as diagPost } from "../app/api/diagnostics/route";
import { GET as diagGet, PATCH as diagPatch } from "../app/api/diagnostics/[id]/route";
import { POST as intPost } from "../app/api/diagnostics/[id]/interviews/route";
import { POST as turnPost } from "../app/api/interviews/[id]/turns/route";
import { POST as findPost } from "../app/api/diagnostics/[id]/findings/route";
import { POST as anaPost } from "../app/api/diagnostics/[id]/analyses/route";
import { POST as recPost } from "../app/api/diagnostics/[id]/recommendations/route";
import { POST as outPost } from "../app/api/recommendations/[id]/outcomes/route";
import { POST as aiPost } from "../app/api/ai/route";

type Ctx = { params: { id: string } };
type Res = { status: number; json: any };

async function call(fn: any, opts: { method?: string; body?: any; params?: { id: string } }): Promise<Res> {
  const req = new Request("http://runtime.local/api", {
    method: opts.method ?? "POST",
    headers: { "content-type": "application/json" },
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });
  const res = opts.params ? await fn(req, { params: opts.params } as Ctx) : await fn(req);
  const json = await res.json().catch(() => null);
  return { status: res.status, json };
}

const results: { step: string; pass: boolean; detail: string }[] = [];
function check(step: string, pass: boolean, detail: string) {
  results.push({ step, pass, detail });
  console.log(`${pass ? "PASS" : "FAIL"}  ${step}  —  ${detail}`);
}

let orgId = "";
async function main() {
  console.log("=== OCT-13 runtime proof: live Supabase + live Anthropic ===\n");

  // -- AI live 1: bootstrap (Anthropic) --
  let bootstrap: any = null;
  try {
    const r = await call(aiPost, { body: { mode: "bootstrap", description: "Notre atelier livre les commandes avec 2 semaines de retard; on ne sait pas pourquoi." } });
    bootstrap = r.json?.data;
    check("AI/bootstrap (Anthropic live)", r.status === 200 && !!bootstrap?.organization_name && !!bootstrap?.diagnostic_title,
      `status=${r.status} org="${bootstrap?.organization_name ?? "?"}" diag="${bootstrap?.diagnostic_title ?? "?"}"`);
  } catch (e) { check("AI/bootstrap (Anthropic live)", false, `threw: ${(e as Error).message}`); }

  // -- Step 1: organization --
  const org = await call(orgPost, { body: { name: bootstrap?.organization_name || "Atelier Test OCT-13", context: bootstrap?.organization_context } });
  orgId = org.json?.data?.id;
  check("1. Créer organisation", org.status === 201 && !!orgId, `status=${org.status} id=${orgId}`);

  // -- Step 2: engagement --
  const eng = await call(engPost, { body: { organization_id: orgId, name: bootstrap?.engagement_name || "Engagement diag", objective: bootstrap?.engagement_objective } });
  const engId = eng.json?.data?.id;
  check("2. Créer engagement", eng.status === 201 && !!engId, `status=${eng.status} id=${engId}`);

  // -- Step 3: diagnostic (draft) + context/gap --
  const diag = await call(diagPost, { body: { engagement_id: engId, title: bootstrap?.diagnostic_title || "Retard de livraison", current_condition: bootstrap?.current_condition, target_condition: bootstrap?.target_condition, gap: bootstrap?.gap } });
  const diagId = diag.json?.data?.id;
  check("3. Créer diagnostic (draft) + contexte/écart", diag.status === 201 && diag.json?.data?.status === "draft" && !!diagId, `status=${diag.status} diagStatus=${diag.json?.data?.status} id=${diagId}`);
  const P: Ctx["params"] = { id: diagId };

  // transition draft -> investigating (step 4 begins)
  const t1 = await call(diagPatch, { method: "PATCH", body: { status: "investigating" }, params: P });
  check("   transition draft→investigating", t1.status === 200 && t1.json?.data?.status === "investigating", `status=${t1.status} → ${t1.json?.data?.status}`);

  // -- Step 4: interview + turns --
  const int = await call(intPost, { body: { interviewee_role: "Chef d'atelier" }, params: P });
  const intId = int.json?.data?.id;
  check("4. Mener l'interview (créer)", int.status === 201 && !!intId, `status=${int.status} id=${intId}`);
  const IP: Ctx["params"] = { id: intId };
  const turnA = await call(turnPost, { body: { speaker: "interviewer", content: "Où voyez-vous la commande s'arrêter le plus longtemps ?" }, params: IP });
  const turnB = await call(turnPost, { body: { speaker: "interviewee", content: "Devant le poste de contrôle qualité; les pièces s'y accumulent." }, params: IP });
  check("   persister 2 tours (seq forward)", turnA.status === 201 && turnB.status === 201 && turnB.json?.data?.seq === 2, `seqA=${turnA.json?.data?.seq} seqB=${turnB.json?.data?.seq}`);

  const transcript = [
    { speaker: "interviewer", content: "Où voyez-vous la commande s'arrêter le plus longtemps ?" },
    { speaker: "interviewee", content: "Devant le poste de contrôle qualité; les pièces s'y accumulent." },
    { speaker: "interviewer", content: "Combien de personnes tiennent ce poste ?" },
    { speaker: "interviewee", content: "Une seule, et elle part souvent aider ailleurs." },
  ];

  // -- Step 5: findings typés + distinction épistémique --
  const fObs = await call(findPost, { body: { kind: "observation", content: "Les pièces s'accumulent devant le contrôle qualité." }, params: P });
  const fInt = await call(findPost, { body: { kind: "interpretation", content: "Le contrôle qualité semble être le goulot." }, params: P });
  const fHyp = await call(findPost, { body: { kind: "hypothesis", content: "Le poste QC est sous-staffé aux heures de pointe." }, params: P });
  const fEvi = await call(findPost, { body: { kind: "evidence", content: "1 seule personne au QC vs 3 en amont.", evidence_level: "observed" }, params: P });
  const evidenceId = fEvi.json?.data?.id;
  check("5. Findings typés (obs/interp/hypo/évidence)",
    [fObs, fInt, fHyp, fEvi].every((r) => r.status === 201) && fEvi.json?.data?.evidence_level === "observed",
    `codes=${[fObs, fInt, fHyp, fEvi].map((r) => r.status).join(",")} evidence_level=${fEvi.json?.data?.evidence_level}`);

  // -- Step 6: causal analysis (dominant) --
  const ana = await call(anaPost, { body: { method: "constraint", steps: ["Retard", "Accumulation au QC", "1 seul opérateur QC", "Opérateur détourné"], probable_cause: "Le poste de contrôle qualité est la contrainte (sous-capacité).", is_dominant: true, finding_ids: [fEvi.json?.data?.id, fHyp.json?.data?.id].filter(Boolean) }, params: P });
  check("6. Analyse causale (contrainte dominante)", ana.status === 201 && ana.json?.data?.is_dominant === true, `status=${ana.status} dominant=${ana.json?.data?.is_dominant}`);

  // transition investigating -> analyzed
  const t2 = await call(diagPatch, { method: "PATCH", body: { status: "analyzed" }, params: P });
  check("   transition investigating→analyzed", t2.status === 200 && t2.json?.data?.status === "analyzed", `→ ${t2.json?.data?.status}`);

  // -- Step 7+8: recommendation liée à l'évidence + severity/priority/owner --
  const rec = await call(recPost, { body: { title: "Renforcer le poste QC en heures de pointe", action: "Affecter un second opérateur QC de 10h à 14h.", owner: "Chef d'atelier", severity: "high", priority: "p1", finding_ids: [evidenceId].filter(Boolean) }, params: P });
  const recId = rec.json?.data?.id;
  check("7-8. Recommandation (évidence + sévérité/priorité/owner)",
    rec.status === 201 && rec.json?.data?.severity === "high" && rec.json?.data?.priority === "p1" && !!recId,
    `status=${rec.status} sev=${rec.json?.data?.severity} pri=${rec.json?.data?.priority} owner=${rec.json?.data?.owner}`);

  // transition analyzed -> recommended -> validating
  const t3 = await call(diagPatch, { method: "PATCH", body: { status: "recommended" }, params: P });
  const t4 = await call(diagPatch, { method: "PATCH", body: { status: "validating" }, params: P });
  check("   transition analyzed→recommended→validating", t3.status === 200 && t4.status === 200 && t4.json?.data?.status === "validating", `→ ${t3.json?.data?.status} → ${t4.json?.data?.status}`);

  // -- Step 10: outcome (validation) --
  const out = await call(outPost, { body: { action_taken: "Second opérateur QC ajouté 10h-14h pendant 2 semaines.", observed_result: "Retard réduit de 2 semaines à 3 jours.", status: "validated" }, params: { id: recId } });
  check("10. Enregistrer outcome (validated)", out.status === 201 && out.json?.data?.status === "validated" && !!out.json?.data?.validated_at, `status=${out.status} outcome=${out.json?.data?.status} validated_at=${!!out.json?.data?.validated_at}`);

  // transition validating -> closed
  const t5 = await call(diagPatch, { method: "PATCH", body: { status: "closed" }, params: P });
  check("   transition validating→closed", t5.status === 200 && t5.json?.data?.status === "closed", `→ ${t5.json?.data?.status}`);

  // -- Step 9 + 11: dashboard review (full trace) + decision_events --
  const full = await call(diagGet, { method: "GET", params: P });
  const d = full.json?.data;
  const events = d?.decision_events ?? [];
  check("9. Revue dashboard (trace complète assemblée)",
    full.status === 200 && d?.interviews?.length >= 1 && d?.findings?.length >= 4 && d?.causal_analyses?.length >= 1 && d?.recommendations?.length >= 1,
    `interviews=${d?.interviews?.length} findings=${d?.findings?.length} analyses=${d?.causal_analyses?.length} recos=${d?.recommendations?.length}`);
  check("11. Trace de raisonnement (decision_events)", events.length >= 6, `decision_events=${events.length} (${Array.from(new Set(events.map((e: any) => e.event))).join(",")})`);

  // -- Guardrails (negative paths) --
  const g1 = await call(findPost, { body: { kind: "evidence", content: "évidence sans niveau" }, params: P });
  check("G1. evidence sans evidence_level → 400", g1.status === 400, `status=${g1.status} error="${g1.json?.error}"`);
  const g2 = await call(findPost, { body: { kind: "observation", content: "finding IA sans confiance", provenance: "ai" }, params: P });
  check("G2. finding provenance=ai sans confidence → 400", g2.status === 400, `status=${g2.status} error="${g2.json?.error}"`);
  const g3 = await call(diagPatch, { method: "PATCH", body: { status: "draft" }, params: P }); // closed -> draft (backward)
  check("G3. transition invalide (closed→draft) → 422", g3.status === 422, `status=${g3.status} error="${g3.json?.error}"`);

  // -- AI live 2: synthesize (Anthropic) --
  try {
    const syn = await call(aiPost, { body: { mode: "synthesize", diagnostic: { title: d?.diagnostic?.title ?? "Retard", current_condition: d?.diagnostic?.current_condition ?? null, target_condition: d?.diagnostic?.target_condition ?? null, gap: d?.diagnostic?.gap ?? null }, transcript } });
    const s = syn.json?.data;
    const aiFinding = s?.findings?.[0];
    const confOk = Array.isArray(s?.findings) && s.findings.every((f: any) => typeof f.confidence === "number");
    check("AI/synthesize (Anthropic live, confiance obligatoire)",
      syn.status === 200 && s?.findings?.length >= 1 && confOk && !!s?.causal_analysis && s?.recommendations?.length >= 1,
      `status=${syn.status} findings=${s?.findings?.length} allHaveConfidence=${confOk} recos=${s?.recommendations?.length} sampleConf=${aiFinding?.confidence}`);
  } catch (e) { check("AI/synthesize (Anthropic live)", false, `threw: ${(e as Error).message}`); }
}

main()
  .catch((e) => { console.error("\nHARNESS ERROR:", e); results.push({ step: "HARNESS", pass: false, detail: String(e?.message ?? e) }); })
  .finally(async () => {
    // cleanup test data (cascade from organization)
    if (orgId) {
      try { await supabaseService().from("organizations").delete().eq("id", orgId); console.log(`\ncleanup: deleted test org ${orgId} (cascade)`); }
      catch (e) { console.log(`\ncleanup FAILED for org ${orgId}: ${(e as Error).message}`); }
    }
    const passed = results.filter((r) => r.pass).length;
    const total = results.length;
    console.log(`\n=== RESULT: ${passed}/${total} checks passed ===`);
    process.exit(passed === total ? 0 : 1);
  });
