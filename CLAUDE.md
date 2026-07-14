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

## État actuel (2026-07-14)
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

## QA runtime: FAITE (2026-07-13, D-009)
Boucle complète validée en conditions réelles, garde-fous vérifiés, zéro défaut
applicatif. Feedback de Jonathan après premier usage réel: « plus seamless,
dumbproof, et surtout plus automatique ». → Phase 5 AUTORISÉE.

## Mission immédiate: PHASE 5 — INVESTIGATION GUIDÉE PAR L'IA
Objectif: l'utilisateur ne pilote plus la mécanique; l'IA mène l'investigation,
l'utilisateur répond et valide. Interface en français, zéro jargon.

Périmètre exact:
1. Flux guidé unique depuis l'accueil: bouton « Nouveau diagnostic » →
   l'utilisateur décrit son problème en langage naturel → l'IA crée
   org/engagement/diagnostic avec des valeurs par défaut sensées (renommables),
   sans jamais montrer d'UUID ni de vocabulaire technique.
2. Interview menée par l'IA: écran de chat où l'IA pose UNE question à la fois
   (style Gemba: factuel, orienté observation), chaque échange persisté via
   /api/interviews/[id]/turns. 5 à 8 questions max avant synthèse.
3. Après l'interview, l'IA propose: findings typés (observation/interprétation/
   hypothèse — provenance 'ai' + confidence OBLIGATOIRE), une analyse causale
   avec cause probable, et 1 à 3 recommandations simples (titre + action + owner
   suggéré). L'utilisateur valide/modifie/rejette CHAQUE proposition avant
   insertion — jamais d'écriture IA silencieuse.
4. Tout passe par les routes API existantes. Aucun nouveau concept en schéma.
5. Implémentation LLM: route serveur (ex: app/api/ai/route.ts) appelant l'API
   Anthropic (modèle claude-sonnet-5, fallback configurable) avec ANTHROPIC_API_KEY
   depuis .env.local (server-only, jamais exposée). Prompt système: investigateur
   opérationnel Lean/TOC; sortie JSON structurée validée avant usage.
6. L'ancienne vue détaillée reste accessible (« mode expert ») mais le flux
   guidé devient le chemin par défaut.
7. Extension de périmètre (décidée par Jonathan, 2026-07-14, D-011): pendant
   l'entretien, l'utilisateur peut partager son écran pour montrer un cas
   concret. L'IA capture des images du flux à intervalle régulier (plafonné,
   coût maîtrisé — voir D-011) et produit une observation factuelle par image
   (nouveau mode `observe_screen` dans `app/api/ai/route.ts`, sortie JSON
   structurée comme les autres modes). Les observations retenues sont
   compilées en UN tour d'entretien « interviewee » via les routes de tours
   existantes — aucun nouveau concept en schéma, aucune vidéo/image stockée,
   seul le texte compilé est conservé. L'IA fusionne ensuite ces observations
   avec le reste du transcript dans la synthèse existante (mode `synthesize`)
   pour comprendre où ça bloque — pas de nouveau pipeline de compilation.

Definition of done:
- Un utilisateur qui ne connaît rien à ScaleIQ peut aller de « j'ai un problème »
  à « plan d'action validé » sans lire de documentation.
- npm run build vert, parcours guidé testé en runtime, garde-fous intacts.
- SCALEIQ-CURRENT-STATE.md et docs/DECISIONS.md mis à jour.

Prérequis (à demander à Jonathan si absent): ANTHROPIC_API_KEY dans .env.local.

## Mission courante: GÉNÉRATION DES 5000 SIMULATIONS (D-019)
1. Vérifier: `node scripts/generate-simulations-llm.mjs --target 50` (essai, ~0.20$).
   Contrôler la qualité de 5 sorties dans knowledge/simulations/generated/*.jsonl
   (réalisme, fausse piste tentante, invalidation honnête, variété).
2. Si OK: `node scripts/generate-simulations-llm.mjs --target 5000`.
   BUDGET DUR: 30 CAD (~21 USD). Le script s'arrête à 20 USD (MAX_COST_USD).
   Il est résumable (relancer reprend où il s'est arrêté). Modèle: Haiku 4.5.
3. Après génération: rapport (nombre, coût réel, échecs, 3 exemples cités),
   dédup grossière (titres identiques), commit des .jsonl + rapport.
4. Ne PAS injecter les 5000 au prompt du moteur — ils sont banc d'entraînement
   sur disque. L'injection reste: patterns + modificateurs + INDEX (bornée).

## Ensuite (avec accord de Jonathan)
- Évaluation du moteur contre les simulations (le vrai « entraînement »):
  faire tourner l'investigateur sur des simulations tirées au sort et mesurer
  s'il retrouve la friction/cause — AVANT le premier cas réel.
- Auth déjà en place; déploiement hors localhost quand Jonathan le demande.

## Escalade (STOP et demander à Jonathan/Ryokan)
- Tout changement de mission ou de périmètre produit — sauf le point 7 de la
  Phase 5 ci-dessus, déjà autorisé par Jonathan le 2026-07-14 (carte blanche,
  sauf coûts significatifs: demander avant toute dépense notable, ex. usage
  vision IA à grande échelle).
- Toute migration destructive ou changement d'ontologie du schéma.
- Toute envie d'ajouter agents/orchestration/plateformes.
- Tout conflit entre ce fichier et le code constaté : préserver le conflit,
  le documenter, ne pas trancher seul.

## Commandes
- dev : `npm run dev` · build : `npm run build` · types : `npx tsc --noEmit`
- test connexion Supabase : `bash scripts/test-connection.sh`
- Git : demander les identifiants à Jonathan si push nécessaire.
  Si `.git/index.lock` bloque : `rm -f .git/index.lock` (résidu connu, D-008).
