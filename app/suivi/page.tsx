"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/client";

type Outcome = {
  id: string;
  status: "pending" | "validated" | "failed" | "unresolved";
  action_taken: string | null;
  observed_result: string | null;
  created_at: string;
};
type Org = { id: string; name: string };
type Eng = { id: string; name: string; organizations: Org | null };
type Diag = { id: string; title: string; status: string; engagements: Eng | null };
type Rec = {
  id: string;
  title: string;
  action: string;
  owner: string | null;
  severity: string;
  priority: string;
  outcomes: Outcome[];
  diagnostics: Diag | null;
};

export default function SuiviPage() {
  const [recs, setRecs] = useState<Rec[] | null>(null);
  const [error, setError] = useState("");

  const load = () =>
    api<Rec[]>("/api/recommendations?needs_outcome=true").then(setRecs).catch((e) => setError(e.message));
  useEffect(() => { load(); }, []);

  return (
    <main>
      <p><Link href="/">← Accueil</Link></p>
      <h1>Suivi</h1>
      <p className="muted">
        Recommandations validées dont le résultat n&apos;a pas encore été enregistré. Reviens ici quand tu as du nouveau.
      </p>
      {error && <p className="error">{error}</p>}
      {recs && recs.length === 0 && !error && (
        <p className="muted">Rien en attente — tout est à jour.</p>
      )}
      {recs?.map((r) => (
        <RecFollowUp key={r.id} r={r} onSaved={load} />
      ))}
    </main>
  );
}

function RecFollowUp({ r, onSaved }: { r: Rec; onSaved: () => void }) {
  const [status, setStatus] = useState<Outcome["status"]>("validated");
  const [actionTaken, setActionTaken] = useState("");
  const [observedResult, setObservedResult] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const diag = r.diagnostics;
  const eng = diag?.engagements;
  const org = eng?.organizations;

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      await api(`/api/recommendations/${r.id}/outcomes`, {
        method: "POST",
        body: JSON.stringify({
          status,
          action_taken: actionTaken || undefined,
          observed_result: observedResult || undefined,
        }),
      });
      onSaved();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="card">
      <p className="muted">
        {org?.name ?? "…"} · {eng?.name ?? "…"} ·{" "}
        {diag ? <Link href={`/diagnostics/${diag.id}`}>{diag.title}</Link> : "…"}
      </p>
      <span className="badge">{r.severity}</span>
      <span className="badge">{r.priority}</span>
      {r.owner && <span className="badge">→ {r.owner}</span>}
      <strong>{r.title}</strong>
      <p>{r.action}</p>
      {r.outcomes.length > 0 && (
        <p className="muted">
          Dernier essai: <span className="badge">{r.outcomes[r.outcomes.length - 1].status}</span>{" "}
          {r.outcomes[r.outcomes.length - 1].observed_result}
        </p>
      )}
      <form className="row" onSubmit={save}>
        <select value={status} onChange={(e) => setStatus(e.target.value as Outcome["status"])}>
          <option value="validated">Validé</option>
          <option value="failed">Échec</option>
          <option value="unresolved">Non résolu</option>
          <option value="pending">Toujours en attente</option>
        </select>
        <input value={actionTaken} onChange={(e) => setActionTaken(e.target.value)} placeholder="Action réalisée" />
        <input value={observedResult} onChange={(e) => setObservedResult(e.target.value)} placeholder="Résultat observé" />
        <button type="submit" disabled={saving}>Enregistrer</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
