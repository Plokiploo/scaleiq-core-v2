# scaleiq-core-v2

ScaleIQ — AI-powered operational diagnostic system.
Detect frictions, identify probable causes, produce simple action plans.

- État du projet: voir `SCALEIQ-CURRENT-STATE.md`
- Décisions: `docs/DECISIONS.md`
- Modèle de domaine: `supabase/migrations/0001_initial_domain.sql`

## Setup
1. `npm install`
2. Créer un projet Supabase, appliquer `supabase/migrations/0001_initial_domain.sql`
3. Copier `.env.example` → `.env.local` et remplir
4. `npm run dev`
