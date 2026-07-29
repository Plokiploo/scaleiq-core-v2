"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/client";

type Org = { id: string; name: string; context: string | null; created_at: string };

export default function Home() {
  const [orgs, setOrgs] = useState<Org[]>([]);
  const [name, setName] = useState("");
  const [context, setContext] = useState("");
  const [error, setError] = useState("");
  const [expert, setExpert] = useState(false);

  const load = () => api<Org[]>("/api/organizations").then(setOrgs).catch((e) => setError(e.message));
  useEffect(() => { load(); }, []);

  async function createOrg(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      await api("/api/organizations", { method: "POST", body: JSON.stringify({ name, context: context || undefined }) });
      setName(""); setContext(""); load();
    } catch (e) { setError((e as Error).message); }
  }

  return (
    <main>
      <div className="hero">
        <h1>Identifie ce qui ralentit ton organisation.</h1>
        <p>Décris ton problème, l&apos;IA t&apos;accompagne question par question jusqu&apos;au plan d&apos;action.</p>
        <Link href="/nouveau"><button>Nouveau diagnostic</button></Link>
      </div>

      <p className="row" style={{ justifyContent: "center" }}>
        <Link href="/suivi"><button className="secondary">Suivi →</button></Link>
        <button className="secondary" onClick={() => setExpert((v) => !v)}>
          {expert ? "Masquer le mode expert" : "Mode expert →"}
        </button>
      </p>

      {expert && (
      <>
      <h2>Organisations</h2>
      <form className="row" onSubmit={createOrg}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nom de l'organisation" required />
        <input value={context} onChange={(e) => setContext(e.target.value)} placeholder="Contexte (optionnel)" />
        <button type="submit">Créer</button>
      </form>
      {error && <p className="error">{error}</p>}
      {orgs.map((o) => (
        <div className="card" key={o.id}>
          <Link href={`/organizations/${o.id}`}><strong>{o.name}</strong></Link>
          {o.context && <p className="muted">{o.context}</p>}
        </div>
      ))}
      {orgs.length === 0 && !error && <p className="muted">Aucune organisation. Crée la première.</p>}
      </>
      )}
    </main>
  );
}
