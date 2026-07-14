-- Migration 0002 : RLS activé partout, aucune policy (deny by default).
-- Loi: "Security shortcuts become disasters".
-- L'accès aux données passe exclusivement par les routes serveur (service role)
-- pendant le MVP. Policies fines avec l'authentification (Phase 2).
alter table public.organizations enable row level security;
alter table public.engagements enable row level security;
alter table public.diagnostics enable row level security;
alter table public.interviews enable row level security;
alter table public.interview_turns enable row level security;
alter table public.findings enable row level security;
alter table public.causal_analyses enable row level security;
alter table public.causal_analysis_findings enable row level security;
alter table public.recommendations enable row level security;
alter table public.recommendation_evidence enable row level security;
alter table public.outcomes enable row level security;
alter table public.decision_events enable row level security;
