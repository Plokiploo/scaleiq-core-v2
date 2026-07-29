# OCT-14 — Phase 2 : Harnais de test mince (verrouille la preuve runtime)

Date: 2026-07-29
Auteur: Ryokan (Directeur technique ScaleIQ)
Issue: OCT-14 (parent OCT-11)
Objectif: rendre **reproductible et durable** la preuve runtime de Phase 1
([OCT-13](OCT-13-runtime-proof.md)) — la même boucle 11 étapes + 3 garde-fous,
exécutée en une seule commande, contre les vrais handlers Next.js et Supabase en direct.

## Comment ré-exécuter

```bash
cd ~/Desktop/scaleiq
npm test          # équivaut à: npx tsx scripts/run-proof.ts
```

Sortie attendue : `18/18 core checks passed, 2 skipped (Anthropic pending)` →
**exit code 0**. Les deux checks IA (bootstrap, synthesize) sont **SKIP** (en
attente) tant que les crédits Anthropic ne sont pas financés — ils passeront
automatiquement en **PASS** une fois une clé financée présente (porte de Phase 3).

## Ce que le harnais couvre (18 checks cœur)

- **11 étapes de la boucle diagnostique** : org → engagement → diagnostic (draft)
  → interview + tours → findings typés → analyse causale dominante →
  recommandation (sévérité/priorité/owner) → outcome (validated) → revue dashboard
  (trace assemblée) → trace de raisonnement, avec les transitions d'état
  draft→investigating→analyzed→recommended→validating→closed.
- **3 garde-fous** (chemins négatifs) : evidence sans `evidence_level` → **400**,
  finding `provenance=ai` sans `confidence` → **400**, transition arrière
  `closed→draft` → **422**.
- **Trace `decision_events`** : assertion **exacte à 14 lignes**
  (`created` / `status_changed` / `recorded`).

## Différences avec `scripts/oct13-runtime-proof.ts`

| Aspect | Phase 1 (oct13) | Phase 2 (run-proof) |
|---|---|---|
| Statut IA hors crédits | `FAIL` (18/20) | `SKIP` (18/18, 2 pending) |
| Code de sortie | 0 seulement si 20/20 | **0 dès que les 18 cœur passent** |
| `decision_events` | `>= 6` | **`=== 14`** (exact, anti-régression) |
| Commande | `npx tsx scripts/oct13-runtime-proof.ts` | **`npm test`** |
| Rôle | preuve ponctuelle | **garde anti-régression durable** |

Un check IA qui **répond 200 mais viole son assertion** est traité comme un vrai
`FAIL` (régression réelle), pas un skip — le skip ne couvre que l'indisponibilité
externe (crédits).

## Si Supabase est en pause (free tier)

Le projet `ojuiaixjnsbhvwgkqzdp` (scaleiq-core-v2) peut s'auto-suspendre. Au
démarrage d'une passe, vérifier le statut ; s'il est en pause, le restaurer via le
plan de contrôle Supabase avant de relancer :

- Console Supabase → projet `scaleiq-core-v2` → **Restore**, ou API/MCP
  `restore_project(ojuiaixjnsbhvwgkqzdp)`.
- Statut sain attendu : `ACTIVE_HEALTHY`. Ne pas bloquer la livraison sur la
  suspension — c'est une opération de plan de contrôle, pas un défaut de code.

## Disposition

- **Harnais livré et VERT au runtime** : `npm test` → 18/18 cœur, exit 0.
- **Leg IA** : toujours en attente des crédits Anthropic (propriétaire du
  déblocage : **Jonathan**), désormais **non bloquant** pour la preuve cœur —
  les checks passent en SKIP au lieu de FAIL, et s'auto-vérifieront une fois la
  clé financée (Phase 3).
