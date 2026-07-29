"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/lib/client";

type Bootstrap = {
  organization_name: string;
  organization_context: string;
  engagement_name: string;
  engagement_objective: string;
  diagnostic_title: string;
  current_condition: string;
  target_condition: string;
  gap: string;
};

type Org = { id: string };
type Eng = { id: string };
type Diag = { id: string };

export default function NouveauDiagnostic() {
  const router = useRouter();
  const [step, setStep] = useState<"decrire" | "confirmer" | "creation">("decrire");
  const [description, setDescription] = useState("");
  const [proposal, setProposal] = useState<Bootstrap | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function analyser(e: React.FormEvent) {
    e.preventDefault();
    if (!description.trim()) return;
    setError("");
    setLoading(true);
    try {
      const result = await api<Bootstrap>("/api/ai", {
        method: "POST",
        body: JSON.stringify({ mode: "bootstrap", description }),
      });
      setProposal(result);
      setStep("confirmer");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function confirmer() {
    if (!proposal) return;
    setError("");
    setStep("creation");
    try {
      const org = await api<Org>("/api/organizations", {
        method: "POST",
        body: JSON.stringify({
          name: proposal.organization_name,
          context: proposal.organization_context || undefined,
        }),
      });
      const eng = await api<Eng>("/api/engagements", {
        method: "POST",
        body: JSON.stringify({
          organization_id: org.id,
          name: proposal.engagement_name,
          objective: proposal.engagement_objective || undefined,
        }),
      });
      const diag = await api<Diag>("/api/diagnostics", {
        method: "POST",
        body: JSON.stringify({
          engagement_id: eng.id,
          title: proposal.diagnostic_title,
          current_condition: proposal.current_condition || undefined,
          target_condition: proposal.target_condition || undefined,
          gap: proposal.gap || undefined,
        }),
      });
      router.push(`/diagnostics/${diag.id}/guide`);
    } catch (e) {
      setError((e as Error).message);
      setStep("confirmer");
    }
  }

  function updateField<K extends keyof Bootstrap>(key: K, value: string) {
    setProposal((p) => (p ? { ...p, [key]: value } : p));
  }

  return (
    <main>
      <p><Link href="/">← Accueil</Link></p>
      <h1>Nouveau diagnostic</h1>

      {step === "decrire" && (
        <>
          <p className="muted">
            Décris ton problème avec tes mots, comme si tu l&apos;expliquais à un collègue.
            L&apos;IA prépare le point de départ — tu pourras tout renommer avant de commencer.
          </p>
          <form onSubmit={analyser}>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: Les commandes prennent trop de temps à sortir de l'entrepôt, on dirait que ça bloque toujours au même endroit..."
              style={{ minHeight: 140, width: "100%" }}
              required
            />
            <p>
              <button type="submit" disabled={loading}>
                {loading ? "Analyse en cours…" : "Commencer le diagnostic"}
              </button>
            </p>
          </form>
        </>
      )}

      {step === "confirmer" && proposal && (
        <>
          <p className="muted">
            Voici le point de départ proposé. Tu peux tout modifier avant de confirmer.
          </p>
          <div className="card">
            <label>
              <span className="muted">Organisation</span>
              <input
                value={proposal.organization_name}
                onChange={(e) => updateField("organization_name", e.target.value)}
                style={{ width: "100%" }}
              />
            </label>
          </div>
          <div className="card">
            <label>
              <span className="muted">Mission en cours</span>
              <input
                value={proposal.engagement_name}
                onChange={(e) => updateField("engagement_name", e.target.value)}
                style={{ width: "100%" }}
              />
            </label>
            <label>
              <span className="muted">Objectif</span>
              <input
                value={proposal.engagement_objective}
                onChange={(e) => updateField("engagement_objective", e.target.value)}
                style={{ width: "100%" }}
              />
            </label>
          </div>
          <div className="card">
            <label>
              <span className="muted">Titre du diagnostic</span>
              <input
                value={proposal.diagnostic_title}
                onChange={(e) => updateField("diagnostic_title", e.target.value)}
                style={{ width: "100%" }}
              />
            </label>
            <label>
              <span className="muted">Ce qui se passe aujourd&apos;hui</span>
              <textarea
                value={proposal.current_condition}
                onChange={(e) => updateField("current_condition", e.target.value)}
                style={{ width: "100%" }}
              />
            </label>
            <label>
              <span className="muted">Ce qu&apos;on veut atteindre</span>
              <textarea
                value={proposal.target_condition}
                onChange={(e) => updateField("target_condition", e.target.value)}
                style={{ width: "100%" }}
              />
            </label>
            <label>
              <span className="muted">L&apos;écart en une phrase</span>
              <textarea
                value={proposal.gap}
                onChange={(e) => updateField("gap", e.target.value)}
                style={{ width: "100%" }}
              />
            </label>
          </div>
          {error && <p className="error">{error}</p>}
          <p className="row">
            <button className="secondary" onClick={() => setStep("decrire")}>
              ← Revenir
            </button>
            <button onClick={confirmer}>Confirmer et commencer l&apos;entretien</button>
          </p>
        </>
      )}

      {step === "creation" && (
        <p className="muted">Création en cours…</p>
      )}

      {error && step !== "confirmer" && <p className="error">{error}</p>}
    </main>
  );
}
