"use client";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { api } from "@/lib/client";

type Turn = { id: string; seq: number; speaker: string; content: string };
type Interview = { id: string; interviewee_role: string | null; interview_turns: Turn[] };
type Finding = { id: string; kind: string; content: string; provenance: string; confidence: number | null; evidence_level: string | null };
type Analysis = { id: string; method: string; probable_cause: string | null; is_dominant: boolean; causal_analysis_findings: { finding_id: string }[] };
type Outcome = { id: string; status: string; action_taken: string | null; observed_result: string | null };
type Rec = { id: string; title: string; action: string; owner: string | null; severity: string; priority: string; status: string; recommendation_evidence: { finding_id: string }[]; outcomes: Outcome[] };
type Diag = { id: string; title: string; status: string; current_condition: string | null; target_condition: string | null; gap: string | null };
type Full = { diagnostic: Diag; interviews: Interview[]; findings: Finding[]; causal_analyses: Analysis[]; recommendations: Rec[]; decision_events: unknown[] };

const NEXT_STATUS: Record<string, string> = {
  draft: "investigating", investigating: "analyzed", analyzed: "recommended",
  recommended: "validating", validating: "closed",
};

export default function DiagnosticPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<Full | null>(null);
  const [error, setError] = useState("");

  const load = useCallback(
    () => api<Full>(`/api/diagnostics/${id}`).then(setData).catch((e) => setError(e.message)),
    [id]
  );
  useEffect(() => { load(); }, [load]);

  async function act(path: string, body: unknown, method = "POST") {
    setError("");
    try { await api(path, { method, body: JSON.stringify(body) }); await load(); }
    catch (e) { setError((e as Error).message); }
  }

  if (!data) return <main><p className="muted">Chargement…</p>{error && <p className="error">{error}</p>}</main>;
  const d = data.diagnostic;
  const next = NEXT_STATUS[d.status];

  return (
    <main>
      <p><Link href="/">← Accueil</Link> · <Link href={`/diagnostics/${id}/guide`}>Mode guidé (IA) →</Link></p>
      <h1>{d.title}</h1>
      <p>
        <span className="badge">{d.status}</span>
        {next && (
          <button className="secondary" onClick={() => act(`/api/diagnostics/${id}`, { status: next }, "PATCH")}>
            Passer à « {next} »
          </button>
        )}
      </p>
      {error && <p className="error">{error}</p>}

      <ConditionsBlock d={d} onSave={(patch) => act(`/api/diagnostics/${id}`, patch, "PATCH")} />
      <InterviewsBlock interviews={data.interviews} diagnosticId={id} act={act} />
      <FindingsBlock findings={data.findings} diagnosticId={id} act={act} />
      <AnalysesBlock analyses={data.causal_analyses} findings={data.findings} diagnosticId={id} act={act} />
      <RecsBlock recs={data.recommendations} findings={data.findings} analyses={data.causal_analyses} diagnosticId={id} act={act} />
      <p className="muted">{data.decision_events.length} événements dans la trace de décision.</p>
    </main>
  );
}

type Act = (path: string, body: unknown, method?: string) => Promise<void>;

function ConditionsBlock({ d, onSave }: { d: Diag; onSave: (p: object) => Promise<void> }) {
  const [cur, setCur] = useState(d.current_condition ?? "");
  const [tgt, setTgt] = useState(d.target_condition ?? "");
  const [gap, setGap] = useState(d.gap ?? "");
  return (
    <section>
      <h2>Condition actuelle / cible / écart</h2>
      <form className="row" onSubmit={(e) => { e.preventDefault(); onSave({ current_condition: cur, target_condition: tgt, gap }); }}>
        <textarea value={cur} onChange={(e) => setCur(e.target.value)} placeholder="Condition actuelle (observée)" />
        <textarea value={tgt} onChange={(e) => setTgt(e.target.value)} placeholder="Condition cible" />
        <textarea value={gap} onChange={(e) => setGap(e.target.value)} placeholder="Écart" />
        <button type="submit">Enregistrer</button>
      </form>
    </section>
  );
}

function InterviewsBlock({ interviews, diagnosticId, act }: { interviews: Interview[]; diagnosticId: string; act: Act }) {
  const [role, setRole] = useState("");
  const [contents, setContents] = useState<Record<string, string>>({});
  const [speakers, setSpeakers] = useState<Record<string, string>>({});
  return (
    <section>
      <h2>Interviews</h2>
      <form className="row" onSubmit={(e) => { e.preventDefault(); act(`/api/diagnostics/${diagnosticId}/interviews`, { interviewee_role: role || undefined }); setRole(""); }}>
        <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Rôle de l'interviewé (ex: ops manager)" />
        <button type="submit">Nouvelle interview</button>
      </form>
      {interviews.map((iv) => (
        <div className="card" key={iv.id}>
          <strong>{iv.interviewee_role ?? "Sans rôle"}</strong>
          {[...iv.interview_turns].sort((a, b) => a.seq - b.seq).map((t) => (
            <p key={t.id}><span className="badge">{t.speaker}</span>{t.content}</p>
          ))}
          <form className="row" onSubmit={(e) => {
            e.preventDefault();
            act(`/api/interviews/${iv.id}/turns`, { speaker: speakers[iv.id] ?? "interviewee", content: contents[iv.id] ?? "" });
            setContents((c) => ({ ...c, [iv.id]: "" }));
          }}>
            <select value={speakers[iv.id] ?? "interviewee"} onChange={(e) => setSpeakers((s) => ({ ...s, [iv.id]: e.target.value }))}>
              <option value="interviewer">Intervieweur</option>
              <option value="interviewee">Interviewé</option>
            </select>
            <input value={contents[iv.id] ?? ""} onChange={(e) => setContents((c) => ({ ...c, [iv.id]: e.target.value }))} placeholder="Ajouter un tour de parole" required />
            <button type="submit">Ajouter</button>
          </form>
        </div>
      ))}
    </section>
  );
}

function FindingsBlock({ findings, diagnosticId, act }: { findings: Finding[]; diagnosticId: string; act: Act }) {
  const [kind, setKind] = useState("observation");
  const [content, setContent] = useState("");
  const [level, setLevel] = useState("observed");
  return (
    <section>
      <h2>Findings</h2>
      <p className="muted">Observation ≠ interprétation ≠ hypothèse ≠ évidence. Choisis le bon statut épistémique.</p>
      <form className="row" onSubmit={(e) => {
        e.preventDefault();
        act(`/api/diagnostics/${diagnosticId}/findings`, {
          kind, content, evidence_level: kind === "evidence" ? level : undefined,
        });
        setContent("");
      }}>
        <select value={kind} onChange={(e) => setKind(e.target.value)}>
          <option value="observation">Observation</option>
          <option value="interpretation">Interprétation</option>
          <option value="hypothesis">Hypothèse</option>
          <option value="evidence">Évidence</option>
        </select>
        {kind === "evidence" && (
          <select value={level} onChange={(e) => setLevel(e.target.value)}>
            <option value="anecdote">Anecdote</option>
            <option value="reported">Rapporté</option>
            <option value="observed">Observé</option>
            <option value="measured">Mesuré</option>
            <option value="verified">Vérifié</option>
          </select>
        )}
        <input value={content} onChange={(e) => setContent(e.target.value)} placeholder="Contenu" required />
        <button type="submit">Ajouter</button>
      </form>
      {findings.map((f) => (
        <div className="card" key={f.id}>
          <span className={`badge ${f.kind}`}>{f.kind}</span>
          {f.provenance === "ai" && <span className="badge ai">IA{f.confidence != null ? ` ${Math.round(f.confidence * 100)}%` : ""}</span>}
          {f.evidence_level && <span className="badge">{f.evidence_level}</span>}
          {f.content}
        </div>
      ))}
    </section>
  );
}

function AnalysesBlock({ analyses, findings, diagnosticId, act }: { analyses: Analysis[]; findings: Finding[]; diagnosticId: string; act: Act }) {
  const [method, setMethod] = useState("five_whys");
  const [cause, setCause] = useState("");
  const [dominant, setDominant] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (fid: string) =>
    setSelected((s) => (s.includes(fid) ? s.filter((x) => x !== fid) : [...s, fid]));
  return (
    <section>
      <h2>Analyses causales</h2>
      <form className="row" onSubmit={(e) => {
        e.preventDefault();
        act(`/api/diagnostics/${diagnosticId}/analyses`, { method, probable_cause: cause, is_dominant: dominant, finding_ids: selected });
        setCause(""); setSelected([]); setDominant(false);
      }}>
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="five_whys">5 Pourquoi</option>
          <option value="constraint">Contrainte</option>
          <option value="other">Autre</option>
        </select>
        <input value={cause} onChange={(e) => setCause(e.target.value)} placeholder="Cause probable" required />
        <label><input type="checkbox" checked={dominant} onChange={(e) => setDominant(e.target.checked)} /> <span className="hint" data-hint="La cause qui bloque le plus — celle à traiter en priorité s'il fallait n'en choisir qu'une.">Friction dominante</span></label>
        <button type="submit">Créer</button>
        <div style={{ width: "100%" }}>
          {findings.map((f) => (
            <label key={f.id} style={{ display: "block", fontSize: "0.85rem" }}>
              <input type="checkbox" checked={selected.includes(f.id)} onChange={() => toggle(f.id)} /> [{f.kind}] {f.content.slice(0, 80)}
            </label>
          ))}
        </div>
      </form>
      {analyses.map((a) => (
        <div className="card" key={a.id}>
          <span className="badge">{a.method}</span>
          {a.is_dominant && <span className="badge dominant">dominante</span>}
          <strong>{a.probable_cause ?? "—"}</strong>
          <p className="muted">{a.causal_analysis_findings.length} finding(s) lié(s)</p>
        </div>
      ))}
    </section>
  );
}

function RecsBlock({ recs, findings, analyses, diagnosticId, act }: { recs: Rec[]; findings: Finding[]; analyses: Analysis[]; diagnosticId: string; act: Act }) {
  const [title, setTitle] = useState("");
  const [action, setAction] = useState("");
  const [owner, setOwner] = useState("");
  const [severity, setSeverity] = useState("medium");
  const [priority, setPriority] = useState("p2");
  const [analysisId, setAnalysisId] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const evidence = findings.filter((f) => f.kind === "evidence" || f.kind === "observation");
  const toggle = (fid: string) =>
    setSelected((s) => (s.includes(fid) ? s.filter((x) => x !== fid) : [...s, fid]));
  return (
    <section>
      <h2>Recommandations</h2>
      <form className="row" onSubmit={(e) => {
        e.preventDefault();
        act(`/api/diagnostics/${diagnosticId}/recommendations`, {
          title, action, owner: owner || undefined, severity, priority,
          causal_analysis_id: analysisId || undefined, finding_ids: selected,
        });
        setTitle(""); setAction(""); setOwner(""); setSelected([]);
      }}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titre" required />
        <input value={action} onChange={(e) => setAction(e.target.value)} placeholder="Action simple à exécuter" required />
        <input value={owner} onChange={(e) => setOwner(e.target.value)} placeholder="Owner" />
        <span className="muted hint" data-hint="L'impact si cette action n'est pas faite — de faible à critique.">Sévérité</span>
        <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
          <option value="low">Faible</option><option value="medium">Moyenne</option>
          <option value="high">Élevée</option><option value="critical">Critique</option>
        </select>
        <span className="muted hint" data-hint="L'urgence relative par rapport aux autres actions — P0 est la plus urgente, P3 la moins urgente.">Priorité</span>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="p3">P3</option><option value="p2">P2</option>
          <option value="p1">P1</option><option value="p0">P0</option>
        </select>
        <select value={analysisId} onChange={(e) => setAnalysisId(e.target.value)}>
          <option value="">— Analyse liée (optionnel) —</option>
          {analyses.map((a) => <option key={a.id} value={a.id}>{a.probable_cause ?? a.method}</option>)}
        </select>
        <div style={{ width: "100%" }}>
          <span className="muted">Évidence à lier:</span>
          {evidence.map((f) => (
            <label key={f.id} style={{ display: "block", fontSize: "0.85rem" }}>
              <input type="checkbox" checked={selected.includes(f.id)} onChange={() => toggle(f.id)} /> [{f.kind}] {f.content.slice(0, 80)}
            </label>
          ))}
        </div>
        <button type="submit">Créer</button>
      </form>
      {recs.map((r) => <RecCard key={r.id} r={r} act={act} />)}
    </section>
  );
}

function RecCard({ r, act }: { r: Rec; act: Act }) {
  const [status, setStatus] = useState("validated");
  const [taken, setTaken] = useState("");
  const [result, setResult] = useState("");
  return (
    <div className="card">
      <span className="badge">{r.severity}</span><span className="badge">{r.priority}</span>
      <span className="badge">{r.status}</span>
      {r.owner && <span className="badge">→ {r.owner}</span>}
      <strong>{r.title}</strong>
      <p>{r.action}</p>
      <p className="muted">{r.recommendation_evidence.length} évidence(s) liée(s)</p>
      {r.outcomes.map((o) => (
        <p key={o.id}><span className="badge">{o.status}</span>{o.action_taken ?? ""} {o.observed_result ? `→ ${o.observed_result}` : ""}</p>
      ))}
      <form className="row" onSubmit={(e) => {
        e.preventDefault();
        act(`/api/recommendations/${r.id}/outcomes`, { status, action_taken: taken || undefined, observed_result: result || undefined });
        setTaken(""); setResult("");
      }}>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="pending">En attente</option><option value="validated">Validé</option>
          <option value="failed">Échec</option><option value="unresolved">Non résolu</option>
        </select>
        <input value={taken} onChange={(e) => setTaken(e.target.value)} placeholder="Action réalisée" />
        <input value={result} onChange={(e) => setResult(e.target.value)} placeholder="Résultat observé" />
        <button type="submit">Enregistrer l'outcome</button>
      </form>
    </div>
  );
}
