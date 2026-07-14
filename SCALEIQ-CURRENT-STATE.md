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
- QA runtime complète le 2026-07-13 (UI réelle sur localhost, base Supabase réelle):
  boucle entière validée — org → engagement → diagnostic → interview + tours →
  findings 4 types → analyse causale dominante liée (2 findings) → recommandation
  high/p1 liée à l'évidence → outcome validated → transitions jusqu'à closed.
- Garde-fous vérifiés en rejet: evidence sans niveau (400), finding IA sans
  confiance (400), transition invalide closed→investigating (422).
- 15 événements decision_events générés sur le parcours. Données de test nettoyées.
- Phase 5 (investigation guidée par l'IA) livrée et testée en runtime le
  2026-07-14 (voir D-010): flux « Nouveau diagnostic » → description libre →
  IA propose org/engagement/diagnostic → interview IA en chat (Gemba, 5-8
  questions) → synthèse IA (findings/analyse causale/recommandations, chacun
  validé/modifié/rejeté par l'utilisateur avant écriture) → transitions de
  statut pilotées automatiquement. Testé bout-en-bout via navigateur piloté
  contre l'API Anthropic et Supabase réels, zéro erreur console, données de
  test purgées.
- Extension Phase 5 (D-011, 2026-07-14, autorisée par Jonathan): pendant
  l'entretien guidé, l'utilisateur peut aussi répondre en vidéo (webcam +
  reconnaissance vocale du navigateur, transcrite puis jetée) ou montrer son
  écran (`getDisplayMedia`, images capturées à intervalle de 6s, plafonnées à
  6 par session, analysées par l'IA en vision puis compilées en UN tour de
  texte — aucune image/vidéo stockée). Build et typecheck verts. Testé en
  navigateur réel: mode vidéo/voix validé de bout en bout (bascule
  clavier↔vidéo, transcription, synthèse) zéro erreur console; mode partage
  d'écran validé pour le rendu UI et le repli gracieux quand `getDisplayMedia`
  est refusé (limite d'environnement de test headless, pas un défaut
  applicatif); le pipeline de vision `observe_screen` a été vérifié séparément
  contre l'API Anthropic réelle (image non pertinente correctement ignorée,
  image pertinente correctement décrite sans invention).
- Phase 6 (D-012, 2026-07-14): vue de suivi manuelle à `/suivi` — liste les
  recommandations dont aucun outcome n'existe ou dont le dernier outcome est
  `pending`/`unresolved`, avec contexte (organisation → engagement →
  diagnostic) et formulaire d'enregistrement direct. Nouvelle route `GET
  /api/recommendations?needs_outcome=true`, aucun nouveau concept de schéma.
  Pas de rappels automatiques (email/notification) — écarté par Jonathan pour
  l'instant. Build/typecheck verts, testé bout-en-bout via API et navigateur
  piloté (apparition/disparition confirmée, zéro erreur console), données de
  test purgées.
- Phase 2 sécurité (D-013, 2026-07-14): authentification par lien magique
  (Supabase Auth, passwordless), un seul compte autorisé pour l'instant
  (jladjyn.jrr@gmail.com), pas d'inscription libre (`shouldCreateUser: false`
  — vérifié: email inconnu rejeté, aucun compte créé). Middleware
  (`middleware.ts`) bloque toute page/route API sans session valide
  (redirection `/login` pour les pages, `401` JSON pour `/api/*`). Migration
  `0003_auth_rls_policies.sql`: policies RLS pour le rôle `authenticated`
  (accès complet, modèle mono-espace de travail — pas de multi-tenant, loi
  #5), `anon` reste sans accès. Build/typecheck verts. Testé: blocage non
  authentifié confirmé (page + API), mécanisme OTP confirmé côté Supabase
  Auth pour le compte de Jonathan, rejet des emails non autorisés confirmé
  (base vérifiée: un seul utilisateur). Clic réel sur le lien reçu par email
  confirmé fonctionnel par Jonathan. Phase 2 sécurité close.
- Pivot design (D-014, 2026-07-14): refonte visuelle complète de
  `app/globals.css` (typographie, palette claire/sombre automatique, boutons
  pilule, cartes, bandeau de navigation) façon Apple — épuré, chaleureux,
  professionnel. Amende la loi #7 sur le volet visuel (la clarté
  d'investigation reste non négociable). Nouveau composant `.hint`
  (info-bulle) sur le jargon du produit dans l'entretien guidé et le mode
  expert. Aucun changement de logique métier ni de schéma. Build/typecheck
  verts, vérifié en clair/sombre via navigateur piloté (session réelle),
  un bug de contraste trouvé et corrigé.
- Manquant: rappels automatiques sur les outcomes (écarté pour l'instant,
  voir D-012), déploiement.

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
Chemin par défaut (Phase 5): accueil → « Nouveau diagnostic » → description
libre du problème → entretien mené par l'IA (chat, une question à la fois,
réponse au clavier, en vidéo/voix, ou en montrant son écran) → synthèse IA
relue/validée par l'utilisateur → diagnostic créé avec findings, analyse
causale et recommandations. Mode expert (Phase 4) toujours disponible
en parallèle (bouton « Mode expert » sur l'accueil, lien croisé depuis la vue
diagnostic) pour piloter manuellement toute la boucle et enregistrer les
outcomes. Vue « Suivi » (lien sur l'accueil) pour revenir enregistrer le
résultat des recommandations en attente. Accès à l'app entier maintenant
protégé par connexion (lien magique). Reste à faire: déploiement.

## 9. Couverture de tests
Pas de tests automatisés encore (à introduire). QA manuelle/pilotée complète
exécutée le 2026-07-13 (mode expert, D-009): parcours UI bout-en-bout + tests
négatifs API + vérification SQL des écritures. Résultat: 100% conforme, zéro
défaut applicatif. QA runtime du flux guidé Phase 5 exécutée le 2026-07-14
(D-010): navigateur piloté (Playwright/Chromium headless) contre l'API
Anthropic et Supabase réels, parcours complet accueil → entretien IA →
synthèse → validation → écritures confirmées, zéro erreur console JS, données
de test purgées.

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
Phases 1 à 6 livrées, ainsi que la Phase 2 sécurité (D-013, confirmée par
Jonathan). Reste: déploiement, avec accord de Jonathan.
