-- ScaleIQ core v2 — Migration 0001 : modèle de domaine initial
-- Concepts VALIDÉS uniquement (genome Ryokan). Rien d'Under Observation.
-- Règle: schema = belief made durable. Additif, réversible, minimal.

create extension if not exists "pgcrypto";

-- ===== Référentiels d'états =====
create type diagnostic_status as enum ('draft','investigating','analyzed','recommended','validating','closed');
create type finding_kind as enum ('observation','interpretation','hypothesis','evidence');
create type provenance_kind as enum ('user','ai');
create type evidence_level as enum ('anecdote','reported','observed','measured','verified');
create type severity_level as enum ('low','medium','high','critical');
create type priority_level as enum ('p3','p2','p1','p0');
create type recommendation_status as enum ('proposed','accepted','in_progress','implemented','rejected');
create type outcome_status as enum ('pending','validated','failed','unresolved');

-- ===== Cœur organisationnel =====
create table organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  context text,
  created_at timestamptz not null default now()
);

create table engagements (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  name text not null,
  objective text,
  created_at timestamptz not null default now()
);

-- ===== Diagnostic =====
create table diagnostics (
  id uuid primary key default gen_random_uuid(),
  engagement_id uuid not null references engagements(id) on delete cascade,
  title text not null,
  status diagnostic_status not null default 'draft',
  current_condition text,
  target_condition text,
  gap text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ===== Investigation =====
create table interviews (
  id uuid primary key default gen_random_uuid(),
  diagnostic_id uuid not null references diagnostics(id) on delete cascade,
  interviewee_role text,
  notes text,
  started_at timestamptz not null default now(),
  ended_at timestamptz
);

create table interview_turns (
  id uuid primary key default gen_random_uuid(),
  interview_id uuid not null references interviews(id) on delete cascade,
  seq int not null,
  speaker text not null check (speaker in ('interviewer','interviewee')),
  content text not null,
  created_at timestamptz not null default now(),
  unique (interview_id, seq)
);

-- Findings: distinction épistémique obligatoire.
-- Observation ≠ Interprétation ≠ Hypothèse ≠ Évidence.
create table findings (
  id uuid primary key default gen_random_uuid(),
  diagnostic_id uuid not null references diagnostics(id) on delete cascade,
  kind finding_kind not null,
  content text not null,
  provenance provenance_kind not null default 'user',
  confidence numeric(3,2) check (confidence between 0 and 1),
  evidence_level evidence_level,           -- requis si kind='evidence'
  source_turn_id uuid references interview_turns(id) on delete set null,
  created_at timestamptz not null default now(),
  constraint evidence_requires_level
    check (kind <> 'evidence' or evidence_level is not null)
);

-- ===== Analyse causale =====
create table causal_analyses (
  id uuid primary key default gen_random_uuid(),
  diagnostic_id uuid not null references diagnostics(id) on delete cascade,
  method text not null check (method in ('five_whys','constraint','other')),
  steps jsonb not null default '[]'::jsonb,  -- exploratoire: JSON avant promotion en colonnes
  probable_cause text,
  is_dominant boolean not null default false,
  created_at timestamptz not null default now()
);

create table causal_analysis_findings (
  causal_analysis_id uuid not null references causal_analyses(id) on delete cascade,
  finding_id uuid not null references findings(id) on delete cascade,
  primary key (causal_analysis_id, finding_id)
);

-- ===== Recommandation =====
create table recommendations (
  id uuid primary key default gen_random_uuid(),
  diagnostic_id uuid not null references diagnostics(id) on delete cascade,
  causal_analysis_id uuid references causal_analyses(id) on delete set null,
  title text not null,
  action text not null,                     -- action simple, orientée exécution
  owner text,
  severity severity_level not null default 'medium',
  priority priority_level not null default 'p2',
  status recommendation_status not null default 'proposed',
  provenance provenance_kind not null default 'user',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table recommendation_evidence (
  recommendation_id uuid not null references recommendations(id) on delete cascade,
  finding_id uuid not null references findings(id) on delete cascade,
  primary key (recommendation_id, finding_id)
);

-- ===== Validation & Outcome =====
create table outcomes (
  id uuid primary key default gen_random_uuid(),
  recommendation_id uuid not null references recommendations(id) on delete cascade,
  action_taken text,
  observed_result text,
  status outcome_status not null default 'pending',
  validated_at timestamptz,
  created_at timestamptz not null default now()
);

-- ===== Trace de décision (auditabilité de la boucle) =====
create table decision_events (
  id uuid primary key default gen_random_uuid(),
  diagnostic_id uuid not null references diagnostics(id) on delete cascade,
  entity_type text not null,
  entity_id uuid,
  event text not null,
  detail jsonb,
  created_at timestamptz not null default now()
);

create index on engagements (organization_id);
create index on diagnostics (engagement_id, status);
create index on interviews (diagnostic_id);
create index on findings (diagnostic_id, kind);
create index on recommendations (diagnostic_id, status);
create index on outcomes (recommendation_id);
create index on decision_events (diagnostic_id, created_at);

-- RLS: à activer en Phase 2 avec l'authentification.
-- Décision consignée: pas de policies avant que le modèle d'accès soit défini.
