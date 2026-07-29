import { db, ok, fail } from "@/lib/api";

// Vue de suivi (Phase 6): recommandations dont l'outcome n'est pas encore résolu
// (aucun outcome enregistré, ou dernier statut pending/unresolved). Aucune notification
// automatique — l'utilisateur revient sur cette page pour enregistrer le résultat.
export async function GET(req: Request) {
  const needsOutcome = new URL(req.url).searchParams.get("needs_outcome");
  if (needsOutcome !== "true") return fail("only ?needs_outcome=true is supported");

  const { data, error } = await db()
    .from("recommendations")
    .select(
      "*, outcomes(*), diagnostics(id, title, status, engagements(id, name, organizations(id, name)))"
    )
    .order("created_at", { ascending: false });
  if (error) return fail(error.message, 500);

  const pending = (data ?? []).filter((r) => {
    const outcomes = r.outcomes ?? [];
    if (outcomes.length === 0) return true;
    const latest = [...outcomes].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )[0];
    return latest.status === "pending" || latest.status === "unresolved";
  });

  return ok(pending);
}
