# DECISIONS — ScaleIQ core v2

Format: date — décision — evidence/justification — réversibilité — autorité.

## D-001 (2026-07-12) Repo canonique
`Plokiploo/scaleiq-core-v2` est le repo canonique unique. Doublon 2R-Ventures
supprimé; `scaleiq-app` = prototype abandonné. Autorité: Jonathan. Irréversible sans nouvel arbitrage.

## D-002 (2026-07-12) Repart de zéro
Aucun code hérité. La directive V1 « fermer la boucle existante » est amendée en
« construire la plus petite boucle complète from scratch », périmètre inchangé.
Autorité: Jonathan (changement de mission validé explicitement).

## D-003 (2026-07-12) Stack Next.js + Supabase
Stack validée par l'historique ScaleIQ. Le projet Supabase sera recréé de zéro.
Réversible: domaine en SQL standard, pas de lock-in applicatif. Autorité: Jonathan sur recommandation Ryokan.

## D-004 (2026-07-12) Modèle de domaine minimal
Schéma 0001 limité aux concepts validés de la boucle diagnostique. Les findings
portent un type épistémique (observation/interpretation/hypothesis/evidence),
une provenance (user/ai) et un niveau d'évidence. Aucun concept Under Observation
en schéma. Réversible: additif uniquement. Autorité: Ryokan (dans son ownership).
