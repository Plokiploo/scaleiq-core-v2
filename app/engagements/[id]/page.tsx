"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { api } from "@/lib/client";

type Eng = { id: string; name: string; objective: string | null; organization_id: string };
type Diag = { id: string; title: string; status: string; gap: string | null };

export default function EngagementPage() {
  const { id } = useParams<{ id: string }>();
  const [eng, setEng] = useState<Eng | null>(null);
  const [diags, setDiags] = useState<Diag[]>([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const load = () => {
    api<Eng>(`/api/engagements/${id}`).then(setEng).catch((e) => setError(e.message));
    api<Diag[]>(`/api/diagnostics?engagement_id=${id}`).then(setDiags).catch(() => {});
  };
  useEffect(() => { load(); }, [id]);

  async function createDiag(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      await api("/api/diagnostics", { method: "POST", body: JSON.stringify({ engagement_id: id, title }) });
      setTitle(""); load();
    } catch (e) { setError((e as Error).message); }
  }

  return (
    <main>
      <p>{eng && <Link href={`/organizations/${eng.organization_id}`}>← Organisation</Link>}</p>
      <h1>{eng?.name ?? "…"}</h1>
      {eng?.objective && <p className="muted">{eng.objective}</p>}
      <h2>Diagnostics</h2>
      <form className="row" onSubmit={createDiag}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titre du diagnostic" required />
        <button type="submit">Créer</button>
      </form>
      {error && <p className="error">{error}</p>}
      {diags.map((d) => (
        <div className="card" key={d.id}>
          <Link href={`/diagnostics/${d.id}`}><strong>{d.title}</strong></Link>
          <span className="badge">{d.status}</span>
          {d.gap && <p className="muted">Écart: {d.gap}</p>}
        </div>
      ))}
    </main>
  );
}
