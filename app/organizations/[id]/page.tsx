"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { api } from "@/lib/client";

type Org = { id: string; name: string; context: string | null };
type Eng = { id: string; name: string; objective: string | null };

export default function OrganizationPage() {
  const { id } = useParams<{ id: string }>();
  const [org, setOrg] = useState<Org | null>(null);
  const [engs, setEngs] = useState<Eng[]>([]);
  const [name, setName] = useState("");
  const [objective, setObjective] = useState("");
  const [error, setError] = useState("");

  const load = () => {
    api<Org>(`/api/organizations/${id}`).then(setOrg).catch((e) => setError(e.message));
    api<Eng[]>(`/api/engagements?organization_id=${id}`).then(setEngs).catch(() => {});
  };
  useEffect(() => { load(); }, [id]);

  async function createEng(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      await api("/api/engagements", {
        method: "POST",
        body: JSON.stringify({ organization_id: id, name, objective: objective || undefined }),
      });
      setName(""); setObjective(""); load();
    } catch (e) { setError((e as Error).message); }
  }

  return (
    <main>
      <p><Link href="/">← Organisations</Link></p>
      <h1>{org?.name ?? "…"}</h1>
      {org?.context && <p className="muted">{org.context}</p>}
      <h2>Engagements</h2>
      <form className="row" onSubmit={createEng}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nom de l'engagement" required />
        <input value={objective} onChange={(e) => setObjective(e.target.value)} placeholder="Objectif (optionnel)" />
        <button type="submit">Créer</button>
      </form>
      {error && <p className="error">{error}</p>}
      {engs.map((en) => (
        <div className="card" key={en.id}>
          <Link href={`/engagements/${en.id}`}><strong>{en.name}</strong></Link>
          {en.objective && <p className="muted">{en.objective}</p>}
        </div>
      ))}
    </main>
  );
}
