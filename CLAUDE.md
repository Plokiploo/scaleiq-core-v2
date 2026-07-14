# CLAUDE.md — scaleiq-core-v2

## Identité du projet
ScaleIQ : système de diagnostic opérationnel par IA.
Promesse client : identifier ce qui ralentit une organisation, pourquoi,
et quelle action simple prendre ensuite.
Directeur technique : Ryokan (autorité architecturale). Toi, Claude Code, tu exécutes
son mandat technique. Autorité finale : Jonathan.

## Lire avant d'agir
1. `SCALEIQ-CURRENT-STATE.md` — état factuel du projet.
2. `docs/DECISIONS.md` — décisions D-001 à D-008 et leurs justifications.

## État actuel (2026-07-13)
- Repo canonique unique. Reparti de zéro (décision Jonathan, D-002).
- Stack : Next.js 14 App Router + TypeScript strict + Supabase (Postgres 17).
- Supabase : projet `ojuiaixjnsbhvwgkqzdp` (ca-central-1), migrations 0001+0002
  appliquées, RLS activé partout SANS policies (deny by default).
- 12 routes API serveur couvrant la boucle complète, 4 pages UI.
- Build et typecheck : verts. Schéma : smoke-testé en SQL.
- JAMAIS testé en runtime HTTP de bout en bout. C'est ta mission immédiate.
- `.env.local` existe localement avec la clé secrète (jamais commité).

## La boucle produit (à préserver telle quelle)
organisation → engagement → diagnostic → interviews/tours →
findings (observation ≠ interprétation ≠ hypothèse ≠ évidence) →
analyse causale (5 whys / contrainte, friction dominante) →
recommandations (action simple, sévérité, priorité, owner, liées à l'évidence) →
outcomes (validated / failed / unresolved) → trace decision_events.

## Lois non négociables
1. RLS reste deny-by-default. Toute donnée passe par les routes serveur
   (service role, server-only). Jamais de service key côté client.
2. Un finding de provenance `ai` DOIT avoir une confiance explicite.
   Un finding `evidence` DOIT avoir un `evidence_level`. (Contraintes DB + API.)
3. Transitions de statut diagnostic : forward-only
   (draft→investigating→analyzed→recommended→validating→closed).
4. Output LLM ≠ vérité opérationnelle. Toute future feature IA garde
   provenance + confiance, et n'écrase jamais un contenu utilisateur.
5. Ne PAS construire : agents, orchestration, plateforme multi-projets,
   module "Dominant Outcome", structures de raisonnement en schéma,
   dashboard analytics générique. (Concepts Under Observation — interdits.)
6. Schéma : additif uniquement. Nouveau concept en JSONB avant colonne.
   Toute décision structurante → nouvelle entrée dans docs/DECISIONS.md.
7. Surface simple, structure profonde. Clarté d'investigation > design.

## Mission immédiate (ordre strict)
1. `npm install && npm run dev` — vérifier que l'app démarre.
2. Dérouler la boucle COMPLÈTE via l'UI sur localhost:3000 :
   org → engagement → diagnostic → interview + tours → findings des 4 types
   (vérifier que evidence sans niveau est refusée) → analyse causale liée →
   recommandation liée à l'évidence → outcome validé → transitions de statut
   jusqu'à closed (vérifier qu'une transition invalide est refusée en 422).
3. Corriger chaque défaut trouvé. Commits atomiques, messages clairs.
4. Mettre à jour SCALEIQ-CURRENT-STATE.md (sections 5, 9) avec les résultats réels.
5. Rapporter : ce qui marche, ce qui a été réparé, ce qui manque avant MVP-ready.

## Ensuite seulement (Phase 5-6, avec accord de Jonathan)
- Phase 5 : assistance IA (suggestions de questions d'interview, aide à la
  formulation d'hypothèses, brouillons de recommandations) — chaque sortie IA
  entre par les routes existantes avec provenance `ai` + confidence.
- Phase 6 : consolider la boucle validation/outcome (relances, statuts).

## Escalade (STOP et demander à Jonathan/Ryokan)
- Tout changement de mission ou de périmètre produit.
- Toute migration destructive ou changement d'ontologie du schéma.
- Toute envie d'ajouter agents/orchestration/plateformes.
- Tout conflit entre ce fichier et le code constaté : préserver le conflit,
  le documenter, ne pas trancher seul.

## Commandes
- dev : `npm run dev` · build : `npm run build` · types : `npx tsc --noEmit`
- test connexion Supabase : `bash scripts/test-connection.sh`
- Git : demander les identifiants à Jonathan si push nécessaire.
  Si `.git/index.lock` bloque : `rm -f .git/index.lock` (résidu connu, D-008).
