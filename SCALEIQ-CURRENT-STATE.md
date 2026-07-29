# SCALEIQ-CURRENT-STATE

Date: 2026-07-29
Auteur: Ryokan (Directeur technique ScaleIQ) — Phase 0 Recovery, issue OCT-12
Statut: RECORD FACTUEL. Établi par vérification runtime, pas par lecture de docs.

> Méthode: ordre de vérité de la directive (comportement exécutable > doc). Ce qui
> suit distingue explicitement **[VÉRIFIÉ 2026-07-29]** (ré-exécuté par moi ce jour)
> de **[CONSIGNÉ]** (attesté par un decision record, non ré-exécuté dans cette passe).

---

## 1. Identité du repository
- **Repo canonique: `Plokiploo/scaleiq-core-v2`**, chemin local `~/Desktop/scaleiq`,
  branche `main`, dernier commit `ac3860f` (2026-07-18).
- **Détermination par runtime + records** (issue OCT-12, HARD STOP #1 NON déclenché — les
  candidats sont distinguables sans ambiguïté) :

  | Candidat | Remote | Commits | Dernier commit | Fichiers suivis | Build | Verdict |
  |---|---|---|---|---|---|---|
  | **scaleiq-core-v2** (ce repo) | Plokiploo/scaleiq-core-v2 | 8 | **2026-07-18** | 100 | ✅ vert | **CANONIQUE** |
  | scaleiq-app | Plokiploo/scaleiq-app | 35 | 2026-05-12 | 45 | ✅ vert | prototype abandonné |
  | scaleiq-core | 2R-Ventures/scaleiq-core | 1 | 2026-05-16 | 10 | non testé | squelette résiduel |

- **Preuves de canonicité** (convergentes) :
  1. Record de décision **D-001 (2026-07-12, autorité Jonathan)** : `scaleiq-core-v2` est
     le repo canonique unique ; `scaleiq-app` est explicitement classé « prototype abandonné » ;
     le doublon `2R-Ventures` est marqué supprimé (le squelette résiduel en est le reste).
  2. **Récence** : core-v2 travaillé jusqu'au 2026-07-18 ; scaleiq-app figé au 2026-05-12.
  3. **Alignement domaine** : le schéma de core-v2 mappe exactement la liste Phase 1 et la
     boucle en 11 étapes de la directive (diagnostic / findings épistémiques / analyse causale /
     recommandation / outcome / decision_events). scaleiq-app ne couvre qu'interviews +
     recommandations, sans organizations / diagnostics / findings / outcomes / decision_events.
  4. La **directive elle-même est datée 2026-07-12** — écrite pour core-v2, pas pour le
     prototype de mai.
  - Note : la mention « scaleiq-app = plus riche (587 fichiers) » de l'issue comptait le
    `node_modules`. En code suivi par git, core-v2 (100 fichiers, boucle complète) est plus riche.

## 2. Stack réelle [VÉRIFIÉ 2026-07-29]
- **Next.js 14.2.35** (App Router) + **React 18.3** + **TypeScript strict**.
- **Supabase** (Postgres 17, projet `ojuiaixjnsbhvwgkqzdp`, ca-central-1) ; SDK `@supabase/ssr`.
- **Anthropic SDK `@anthropic-ai/sdk` ^0.111** ; modèle `claude-sonnet-5` (`ANTHROPIC_MODEL` override).
- Gestionnaire de paquets **npm** (`package-lock.json`). Auth : Supabase magic-link.
- Entrées : `app/` (App Router). Middleware : `middleware.ts` (garde d'auth). Node 25 local.

## 3. Ce qui fonctionne, prouvé par runtime [VÉRIFIÉ 2026-07-29]
- `npm run build` : **vert** (exit 0). 15 routes compilées (pages + `/api/*`).
- `npm run start` : **serveur démarre** (Ready ~136 ms) et **sert en HTTP** :
  - `GET /` → **307** vers `/login` (garde d'auth active).
  - `GET /login` → **200**.
  - `GET /nouveau` → **307** (route protégée redirigée sans session).
  → Le middleware deny-by-default fonctionne au runtime.
- Schéma de domaine `0001` : **12 tables + 8 enums** présents, contraintes lisibles en SQL
  (dont `evidence_requires_level`).
- **Note honnête** : je n'ai PAS ré-exécuté la boucle complète bout-en-bout contre Supabase/
  Anthropic en direct dans cette passe Phase 0 (nécessiterait des données live). Les preuves de
  parcours complet ci-dessous sont **[CONSIGNÉ]**, à re-valider en P1 (voir §13).

## 4. Ce qui fonctionne partiellement / [CONSIGNÉ] non ré-exécuté ce jour
- **QA bout-en-bout mode expert (D-009, 2026-07-13)** : boucle entière via UI réelle contre
  base réelle, garde-fous vérifiés en rejet (400/400/422), 15 `decision_events` écrits.
- **Flux guidé IA Phase 5 (D-010/D-011, 2026-07-14)** : « Nouveau diagnostic » → description
  libre → l'IA propose org/engagement/diagnostic → interview IA (chat Gemba) → synthèse
  (findings typés, analyse causale, recommandations) validée pièce par pièce avant écriture.
  Extension vidéo/voix + partage d'écran (`observe_screen`) consignée.
- **Suivi outcomes Phase 6 (D-012)** et **auth magic-link Phase 2 (D-013)** consignés verts.
  → Ces preuves datent d'avant le pivot design D-014 et d'avant les changements non commités
    actuels ; leur valeur runtime doit être **re-confirmée sur le code présent** (§13).

## 5. Cassé / manquant [VÉRIFIÉ 2026-07-29]
- **Aucun test automatisé.** Pas de framework (ni vitest/jest/playwright), pas de script `test`,
  pas de dossier `tests/`. Couverture automatisée = **0 %** sur les 11 étapes.
- **Déploiement : aucun.** Local-first ; jamais exposé hors localhost.
- **Pas de rappels automatiques** sur outcomes (écarté par Jonathan, D-012).

## 6. Modèle de données [VÉRIFIÉ 2026-07-29 — `supabase/migrations/0001_initial_domain.sql`]
- **12 tables** : `organizations`, `engagements`, `diagnostics`, `interviews`,
  `interview_turns`, `findings`, `causal_analyses`, `causal_analysis_findings`,
  `recommendations`, `recommendation_evidence`, `outcomes`, `decision_events`.
- **8 enums** : `diagnostic_status` (draft→investigating→analyzed→recommended→validating→closed),
  `finding_kind` (observation/interpretation/hypothesis/evidence), `provenance_kind` (user/ai),
  `evidence_level` (anecdote→verified), `severity_level`, `priority_level`, `recommendation_status`,
  `outcome_status`.
- **Invariants au niveau schéma** : `evidence_requires_level` (un finding `evidence` exige un
  niveau) ; `confidence` ∈ [0,1] ; clés étrangères en cascade ; `interview_turns` unique (interview, seq).
- Migrations : `0001` domaine, `0002` RLS deny-by-default, `0003` policies auth (`authenticated`).
  **`0003` est non commité** (voir §11).

## 7. Parcours utilisateur [VÉRIFIÉ présent au build 2026-07-29]
- **Chemin par défaut** : accueil → `/nouveau` (flux guidé IA) → `/diagnostics/[id]/guide` → synthèse.
- **Mode expert** : `/organizations/[id]` → `/engagements/[id]` → `/diagnostics/[id]` (vue complète :
  statut+transition, condition actuelle/cible/écart, interviews+tours, findings à badge épistémique
  et provenance IA, analyses causales avec friction dominante, recommandations liées à l'évidence, outcomes).
- **Suivi** : `/suivi` (recommandations en attente d'outcome). Tout protégé par `/login` (magic-link).

## 8. Couverture de tests [VÉRIFIÉ 2026-07-29]
- **Automatisée : nulle.** Seule QA manuelle/pilotée navigateur consignée (D-009/D-010), non
  reproductible en CI, non ré-exécutée ce jour. C'est le principal déficit de fiabilité.

## 9. État de déploiement [VÉRIFIÉ 2026-07-29]
- **Aucun.** Fonctionne en local (build + start OK). Supabase provisionné (free tier, 0 $/mois).
  Variables requises : `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
  `SUPABASE_SERVICE_ROLE_KEY`, `ANTHROPIC_API_KEY` (présentes dans `.env.local`, non commitées).

## 10. Risques critiques
1. **PRÉSERVATION (le plus grave) [VÉRIFIÉ 2026-07-29].** Le produit démontrable n'existe qu'en
   copie de travail locale. HEAD (`ac3860f`) = **49 fichiers** (Phases 0–3 + données de simulation).
   L'index/copie de travail = **100 fichiers** : **51 fichiers non commités** — TOUTE l'UI Phase 4,
   le moteur IA Phase 5 (`lib/ai.ts`, 390 l., `app/api/ai/route.ts`), l'auth Phase 2
   (`middleware.ts`, `lib/supabase-*`, migration `0003`), le `CLAUDE.md`, le corpus `knowledge/`.
   De plus **HEAD est en avance de 2 commits sur `origin/main`** : le remote GitHub ne contient
   même pas les Phases 4/5/6/2. Un `git reset --hard` ou une perte disque détruit le produit.
2. **Zéro test automatisé** : aucune protection contre régression sur les 11 étapes.
3. **Contenu LLM traité comme vérité** : mitigé par contraintes (provenance/confiance obligatoires),
   mais à re-vérifier au runtime sur le code présent.
4. **Dérive vers dashboard/summarizer générique** (anti-goals de la directive).

## 11. Contradictions code ↔ documentation [VÉRIFIÉ 2026-07-29]
- La version précédente de ce fichier était datée 2026-07-12 et affirmait (§2) « le repo ne
  contenait qu'un commit initial, aucun code » — **contredit** par l'état actuel (produit complet,
  8 commits, boucle qui build/boot). Corrigé par le présent record.
- Les records D-009/D-010/D-013 attestent des QA runtime « bout-en-bout » ; or le code
  correspondant (Phases 4/5/6/2) **n'est pas commité** et a évolué depuis (pivot design D-014).
  Contradiction préservée : la preuve documentée précède le code présent → re-validation requise (§13).
- `git status` montre un `.gitignore~tmp` suivi (résidu à nettoyer).

## 12. Milestone de clôture MVP recommandé
Mappage de la **boucle diagnostique en 11 étapes** de la directive. Toutes ont code + schéma et
**buildent vert** ; « à réparer » = préservation + preuve runtime + tests, pas absence de code.

| # | Étape (directive) | Code/schéma | Statut |
|---|---|---|---|
| 1 | Créer/ouvrir organisation & engagement | routes + pages `organizations`/`engagements` | ✅ présent, ⚠ UI non commitée |
| 2 | Créer un diagnostic | route `diagnostics` + enum statut | ✅ présent |
| 3 | Capturer contexte & évidence structurée | `diagnostics.current/target/gap` + `findings` | ✅ présent |
| 4 | Mener & persister l'interview | `interviews` + `interview_turns` + chat IA | ✅ présent, ⚠ IA non commitée |
| 5 | Distinguer observation/interprétation/hypothèse/évidence | `finding_kind` + contrainte `evidence_requires_level` | ✅ présent, invariant DB |
| 6 | Analyse cause racine / contrainte | `causal_analyses` (five_whys/constraint) + `is_dominant` | ✅ présent |
| 7 | Recommandations liées à l'évidence | `recommendations` + `recommendation_evidence` | ✅ présent |
| 8 | Sévérité / priorité / owner / statut | colonnes + enums | ✅ présent |
| 9 | Revue en dashboard utile | page `diagnostics/[id]` + `/suivi` | ✅ présent, ⚠ UI non commitée |
| 10 | Enregistrer validation & outcome | `outcomes` + route + formulaire `/suivi` | ✅ présent |
| 11 | Préserver la trace de raisonnement | `decision_events` | ✅ présent |

**Plus petit milestone de clôture MVP (ordonné) :**
1. **Préserver le travail** (bloquant) : commiter la copie de travail sur la branche
   `claude/scaleiq-mvp-closure` et pousser vers `origin`. *Bloqueur : identifiants Git push
   (à fournir par Jonathan — directive « ask Jonathan for credentials if push needed »).*
2. **Re-valider une passe runtime bout-en-bout des 11 étapes** contre Supabase + Anthropic en
   direct sur le code présent (rétablir la preuve D-009/D-010 après pivot D-014), en distinguant
   les 11 étapes et en confirmant les garde-fous (evidence sans niveau → 400, finding IA sans
   confiance → 400, transition invalide → 422).
3. **Poser une base de tests automatisés** : e2e de la boucle primaire + unitaires des règles de
   domaine (transitions forward-only, `evidence_requires_level`, confiance IA obligatoire).
4. Restant après cela : **déploiement** (avec accord de Jonathan) = seul écart réel vers MVP-ready.

> Conclusion pour l'arbitrage V0.1 : les 11 étapes existent en code et compilent ; aucune n'est à
> réécrire. Le travail P1 n'est pas « construire la boucle » mais **préserver, re-prouver au
> runtime, et tester** ce qui existe — puis déployer.
