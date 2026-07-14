# SCALEIQ-CURRENT-STATE

Date: 2026-07-12
Auteur: Ryokan (Directeur technique ScaleIQ)
Statut: RECORD FACTUEL — Phase 0 close

## 1. Identité du repository
- Repo canonique unique: `Plokiploo/scaleiq-core-v2` (confirmé par Jonathan, 2026-07-12).
- Doublon `2R-Ventures/scaleiq-core-v2`: supprimé (confirmé par Jonathan).
- Ancien prototype `Plokiploo/scaleiq-app`: abandonné, sans valeur, à ignorer (confirmé par Jonathan).

## 2. État réel constaté (observation, pas interprétation)
- Le repo ne contenait qu'un commit initial et un README d'une ligne.
- Aucun code, aucune migration, aucun historique antérieur.
- Le projet Supabase sera lui aussi recréé de zéro (décision Jonathan).

## 3. Amendement de mission (validé par Jonathan, 2026-07-12)
La DIRECTIVE-SCALEIQ-CLAUDE-CODE-V1 supposait un projet existant à récupérer
(persistance d'interviews, résumés, recommandations, dashboard). Cette prémisse
est caduque: il n'existe aucun acquis logiciel.

Mission amendée: construire from scratch la plus petite boucle diagnostique
complète. Le périmètre cible et l'ordre des phases 1→6 de la directive restent
inchangés. Les « acquis supposés » de la directive sont reclassés en objectifs.

## 4. Stack retenue
- Next.js (App Router, TypeScript) + Supabase (Postgres, migrations SQL).
- Justification: stack validée dans l'historique ScaleIQ, patterns connus,
  zéro coût d'apprentissage. Décision réversible tant que le domaine reste en SQL standard.

## 5. Ce qui fonctionne / ne fonctionne pas
- Fonctionne: rien (projet neuf). Ce document et le squelette sont le premier état.
- Manquant: tout le produit (voir §7).

## 6. Modèle de données
- Défini dans `supabase/migrations/0001_initial_domain.sql`.
- Concepts VALIDÉS uniquement: organisation, engagement, diagnostic, interview,
  tours d'interview, findings typés (observation / interprétation / hypothèse / évidence,
  avec provenance et niveau d'évidence), analyse causale, recommandation
  (sévérité, priorité, owner, statut), validation/outcome, historique de décision.
- EXCLUS (Under Observation — interdit de construire): Dominant Outcome,
  structures de raisonnement en schéma, capture d'hypothèses comme primitive produit
  au-delà du typage findings, modèle de variance.

## 7. Milestone de clôture MVP (cible)
Un utilisateur peut: créer une organisation/engagement → créer un diagnostic →
capturer contexte et évidence structurée → mener une interview persistée →
distinguer observation/interprétation/hypothèse/évidence → analyse cause
racine/contrainte → recommandations liées à l'évidence → sévérité/priorité/
owner/statut → dashboard de revue → enregistrer validation et outcome →
conserver la trace de raisonnement complète.

## 8. Parcours utilisateur actuels
Aucun. À construire dans l'ordre: Phase 1 (domaine) → 2 (intégrité) →
3 (services) → 4 (UX minimale) → 5 (support IA avec provenance) → 6 (boucle outcome).

## 9. Couverture de tests
Aucune. Framework de test à introduire en Phase 2/3.

## 10. Déploiement
Aucun. Local-first (doctrine: bootstrap locally, expose later).
Variables d'environnement: voir `.env.example`. Projet Supabase: créé (ref ojuiaixjnsbhvwgkqzdp, ca-central-1), migrations 0001+0002 appliquées, RLS deny-by-default actif.

## 11. Risques critiques
1. Re-dérive vers un dashboard générique ou un summarizer IA (anti-goals).
2. Sur-modélisation du schéma avant validation terrain (schema = belief made durable).
3. Contenu LLM traité comme vérité opérationnelle — interdit: provenance et
   confiance obligatoires dès la Phase 5.
4. Absence d'utilisateur réel: chaque phase doit rester réversible.

## 12. Contradictions code/documentation
Aucune (pas de code antérieur). La directive V1 est amendée par le §3.

## 13. Prochaine étape recommandée
Phase 1-2: appliquer la migration 0001 sur un projet Supabase neuf, brancher
l'app, vérifier les transitions de statut, puis Phase 3 (services de la boucle).
