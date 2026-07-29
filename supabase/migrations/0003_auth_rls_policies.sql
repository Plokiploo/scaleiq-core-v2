-- Migration 0003 : policies RLS pour utilisateurs authentifiés (Phase 2, D-013).
-- Modèle: un seul espace de travail partagé (pas de multi-tenant — interdit,
-- voir loi #5). Tout utilisateur authentifié (Supabase Auth) a accès complet
-- aux données; anon reste sans accès (deny by default, migration 0002).
-- Les routes serveur (app/api) continuent d'utiliser le service role et
-- contournent RLS — ces policies sont une défense en profondeur si la clé
-- anon (publique côté client) était utilisée directement.

do $$
declare
  t text;
begin
  for t in
    select unnest(array[
      'organizations', 'engagements', 'diagnostics', 'interviews',
      'interview_turns', 'findings', 'causal_analyses',
      'causal_analysis_findings', 'recommendations',
      'recommendation_evidence', 'outcomes', 'decision_events'
    ])
  loop
    execute format(
      'create policy "authenticated_full_access" on public.%I for all to authenticated using (true) with check (true);',
      t
    );
  end loop;
end $$;
