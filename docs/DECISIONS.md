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

## D-005 (2026-07-13) RLS deny-by-default dès la création
RLS activé sur les 12 tables sans aucune policy: la clé publique ne donne accès
à rien; toute lecture/écriture passe par les routes serveur (service role) pendant
le MVP. Policies fines à définir avec l'authentification (Phase 2). Justification:
advisor Supabase critique + loi "Security shortcuts become disasters".
Réversible: ajout de policies. Autorité: Ryokan (Decision Type 14).

## D-006 (2026-07-13) Projet Supabase
Projet `scaleiq-core-v2` (ref ojuiaixjnsbhvwgkqzdp) créé dans l'org 2R Ventures,
région ca-central-1, coût 0$/mois (free tier), Postgres 17. Migrations 0001+0002
appliquées et vérifiées (12 tables, RLS actif partout). Types TypeScript générés
depuis le schéma réel (lib/database.types.ts). Autorité: Jonathan (automatisation demandée).

## D-007 (2026-07-13) Services Phase 3 — API serveur de la boucle
10 routes app/api couvrant la boucle complète (organizations → engagements →
diagnostics → interviews/turns → findings → analyses causales → recommandations
→ outcomes), avec: transitions de statut forward-only validées côté serveur,
findings IA exigeant une confiance explicite, évidence exigeant un niveau,
liens évidence↔recommandation, journal decision_events sur chaque événement
structurant. Schéma validé bout-en-bout par smoke test SQL (boucle complète
insérée puis rollback; contrainte evidence_requires_level vérifiée en rejet).
Autorité: Ryokan.

## D-008 (2026-07-13) Interface Phase 4 minimale
4 pages client (organisations → engagements → diagnostics → vue diagnostic
complète). La vue diagnostic expose: statut + transition suivante, conditions
actuelle/cible/écart, interviews et tours persistés, findings avec badge
épistémique et provenance IA visible (avec % de confiance), analyses causales
avec marquage friction dominante, recommandations liées à l'évidence, outcomes.
Aucune lib UI: CSS minimal, clarté d'investigation > design décoratif (directive
Phase 4). Autorité: Ryokan.

## D-009 (2026-07-13) QA runtime bout-en-bout: conforme
Boucle complète exécutée via l'UI réelle (Chrome piloté) contre la base réelle:
création → investigation → findings typés → analyse dominante → recommandation
liée à l'évidence → outcome validé → clôture. Garde-fous vérifiés en rejet
(400/400/422). Écritures confirmées en SQL (15 decision_events). Données de test
purgées. Aucun défaut applicatif. Incidents d'environnement (hors app): cache
.next corrompu par sync pendant exécution → purge + redémarrage; ancien process
zombie sur port 3000 → serveur sain sur 3001. Autorité: Ryokan.

## D-010 (2026-07-14) Phase 5 — investigation guidée par l'IA
Nouveau flux par défaut depuis l'accueil: bouton « Nouveau diagnostic » →
description libre du problème → l'IA (route serveur `app/api/ai/route.ts`,
Anthropic SDK, modèle `claude-sonnet-5` configurable via `ANTHROPIC_MODEL`,
sorties contraintes par JSON Schema via `output_config.format`) propose des
valeurs par défaut renommables pour organisation/engagement/diagnostic, sans
jamais afficher d'UUID ni de vocabulaire technique. Interview menée par l'IA en
chat (style Gemba, une question factuelle à la fois, 5 à 8 questions), chaque
tour persisté via les routes `interviews/[id]/turns` existantes (aucun nouveau
concept en schéma: les tours "interviewer"/"interviewee" portent déjà cette
distinction). Après l'interview, l'IA propose findings typés (provenance `ai` +
confiance obligatoire, evidence_level obligatoire si kind=evidence), une
analyse causale (5 pourquoi ou contrainte, cause probable, marquage dominante),
et 1 à 3 recommandations (action simple, owner suggéré, sévérité, priorité).
Chaque proposition est affichée éditable avec case à cocher: rien n'est écrit
en base avant validation explicite de l'utilisateur (loi #4 respectée).
L'ancienne vue détaillée reste accessible en « mode expert » (bouton sur
l'accueil, lien croisé depuis la vue diagnostic). Le flux guidé pilote les
transitions de statut forward-only existantes (draft→investigating au début de
l'entretien, investigating→analyzed puis analyzed→recommended après validation
des propositions correspondantes) via les mêmes routes PATCH que le mode
expert. Testé en runtime réel (Chrome piloté par Playwright + appels API directs
contre l'API Anthropic et Supabase réels): parcours complet accueil → entretien
IA (6 questions Gemba cohérentes) → synthèse (findings/cause/recommandations) →
validation → écritures confirmées en base → transitions de statut confirmées.
Aucune erreur console JS. L'IA a correctement refusé d'inventer une cause
probable quand les réponses de test étaient trop vagues (fidélité au
transcript vérifiée empiriquement). Données de test purgées après QA.
Autorité: Ryokan.

## D-011 (2026-07-14) Extension de périmètre Phase 5: partage d'écran + vision IA
Constat: pendant l'entretien, la personne interviewée veut souvent montrer un
cas concret (un écran, un outil, un blocage) plutôt que le décrire seulement
à l'oral/écrit. Jonathan juge cette évolution nécessaire, pas accessoire, et
autorise l'extension de périmètre directement (carte blanche d'implémentation,
sauf dépense significative — à valider avant engagement).

Décision: ajout d'un troisième mode de réponse « Montrer mon écran » dans
l'entretien guidé (`app/diagnostics/[id]/guide/page.tsx`), à côté des modes
clavier et vidéo existants (D-010). Mécanique:
- Capture du flux via `getDisplayMedia` (image uniquement, pas d'audio système).
- Une image du flux est capturée et envoyée à l'IA (nouveau mode `observe_screen`,
  `lib/ai.ts` / `app/api/ai/route.ts`, vision + sortie JSON structurée comme les
  autres modes) à intervalle de 6s, plafonné à 6 images par session de partage
  (maîtrise du coût — pas d'appel API sans plafond). Chaque image est
  redimensionnée et compressée côté client avant envoi (jamais stockée).
- L'IA retourne une observation factuelle courte, affichée en direct à
  l'utilisateur ("ce que l'IA remarque à l'écran"), avec un indicateur de
  pertinence pour ignorer le bruit (ex. écran de bureau vide).
- À la fin du partage, les observations retenues (+ un commentaire textuel
  optionnel de l'utilisateur) sont compilées en UN SEUL tour "interviewee"
  via la route existante `/api/interviews/[id]/turns` — aucun nouveau concept
  de schéma, aucune image ni vidéo persistée, seul le texte compilé l'est.
  Ce tour entre ensuite dans la boucle adaptative existante (prochaine
  question, puis synthèse) exactement comme une réponse tapée ou parlée.
Conformité aux lois du projet: loi #1 (route serveur, clé jamais exposée),
loi #4 (sortie IA = proposition affichée, rien d'écrit silencieusement en
base — les observations ne sont que du texte de transcript, pas des findings),
loi #6 (aucune colonne/concept de schéma ajouté).
Autorité: Jonathan.

## D-012 (2026-07-14) Phase 6 — vue de suivi manuelle des outcomes
Périmètre confirmé par Jonathan: "vue de suivi manuelle" — lister les
recommandations sans outcome résolu pour que l'utilisateur y revienne
lui-même enregistrer le résultat. Explicitement écarté: rappels automatiques
(email/notification), qui auraient exigé une nouvelle infrastructure d'envoi
et une tâche planifiée — non retenu pour l'instant.

Décision: nouvelle route `GET /api/recommendations?needs_outcome=true`
(`app/api/recommendations/route.ts`) qui retourne les recommandations dont
aucun outcome n'existe, ou dont le dernier outcome a le statut `pending` ou
`unresolved` (les statuts `validated`/`failed` sont considérés résolus).
Nouvelle page `/suivi` (`app/suivi/page.tsx`), accessible depuis l'accueil,
listant ces recommandations avec leur contexte (organisation → engagement →
diagnostic) et un formulaire d'enregistrement d'outcome direct, réutilisant
la route existante `/api/recommendations/[id]/outcomes` — aucune écriture
nouvelle, aucun nouveau concept de schéma, juste une lecture agrégée
cross-diagnostic.

Distinction avec la loi #5 (dashboard analytics générique interdit): cette
vue n'est pas un tableau de bord de métriques/graphiques — c'est une liste
d'actions concrètes à revoir, explicitement prévue dans le milestone MVP
("dashboard de revue" — SCALEIQ-CURRENT-STATE.md §7). Aucune agrégation
statistique, aucun graphique.

Testé en runtime: recommandation sans outcome apparaît dans `/suivi`,
disparaît après enregistrement d'un outcome `validated` (vérifié via API et
via navigateur piloté, zéro erreur console). Données de test purgées.
Autorité: Jonathan.

## D-013 (2026-07-14) Phase 2 — authentification par lien magique + policies RLS
Décision confirmée par Jonathan: lien magique (passwordless, Supabase Auth),
un seul compte autorisé pour l'instant (le sien), pas d'inscription libre,
pas de rappels/notifications à construire pour cette phase.

Décision technique:
- `middleware.ts` (racine) + `lib/supabase-middleware.ts`: toute requête sans
  session valide est bloquée — redirection vers `/login` pour les pages,
  réponse `401 {"error":"authentification requise"}` en JSON pour `/api/*`
  (évite qu'un `fetch()` client reçoive du HTML de redirection à la place du
  JSON attendu). Seul `/login` reste public.
- Le même middleware intercepte et échange le `?code=` du lien magique quel
  que soit le chemin d'atterrissage (plutôt qu'une route `/auth/callback`
  dédiée) — la configuration "Redirect URLs" du projet Supabase renvoie vers
  l'URL racine par défaut; router l'échange dans le middleware évite une
  dépendance à cette configuration externe.
- `lib/supabase-server.ts` (Server Components/Route Handlers) et
  `lib/supabase-client.ts` (composants client) : clients liés à la session
  (clé anon + cookies), respectent RLS — distincts de `supabaseService()`
  dans `lib/supabase.ts` qui reste service-role et contourne RLS pour toutes
  les routes `app/api` existantes (loi #1 inchangée).
- `app/login/page.tsx`: un champ email, `signInWithOtp({ shouldCreateUser:
  false, ... })` — empêche toute création de compte par un email non déjà
  enregistré (vérifié: email inconnu → 422, aucun compte créé; email
  autorisé → fonctionne).
- Compte de Jonathan créé directement via l'API Admin Supabase
  (`jladjyn.jrr@gmail.com`, confirmé sans passer par un flux d'inscription).
- Migration `0003_auth_rls_policies.sql`: policy `authenticated_full_access`
  (`for all using (true) with check (true)`) sur les 12 tables — modèle un
  seul espace de travail partagé (pas de colonne owner/tenant: le
  multi-tenant est explicitement interdit, loi #5). `anon` reste sans accès
  (deny-by-default, migration 0002 inchangée). Ces policies sont une défense
  en profondeur: les routes serveur utilisent déjà le service role et ne les
  consultent jamais; elles ne protégeraient qu'un futur usage direct de la
  clé anon côté client (actuellement inexistant — vérifié, aucun appel
  Supabase direct côté client dans le code).
- Avertissements `rls_policy_always_true` du linter Supabase: attendus et
  documentés (conséquence directe du modèle mono-espace de travail voulu,
  pas un oubli). Avertissement `auth_leaked_password_protection`: non
  applicable, aucun mot de passe utilisé (lien magique uniquement).

Testé: accès non authentifié bloqué (page → redirection `/login`, API →
401 JSON) — vérifié en runtime. Mécanisme OTP vérifié directement contre
l'API Auth Supabase pour le compte de Jonathan (jeton valide obtenu).
Tentative de connexion avec un email non autorisé: rejetée (422), aucun
compte créé (vérifié en base: 1 seul utilisateur après test). Clic réel sur
le lien reçu par email confirmé par Jonathan (2026-07-14): connexion
fonctionnelle de bout en bout. Phase 2 sécurité close.
Autorité: Jonathan.

## D-014 (2026-07-14) Pivot design: refonte visuelle « aussi pro et accueillant qu'Apple »
Constat: la loi #7 (« Surface simple, structure profonde. Clarté d'investigation
> design décoratif. ») et D-008 (« Aucune lib UI: CSS minimal ») visaient un
MVP fonctionnel, pas un produit fini. Jonathan demande maintenant un design
visuel abouti, chaleureux et professionnel, qui accompagne l'utilisateur et
répond à ses questions sans qu'il quitte l'écran. Ceci amende la loi #7 sur
le volet visuel — la clarté d'investigation reste non négociable, mais elle
n'exclut plus un travail de direction artistique explicite.

Décision technique (aucune nouvelle lib UI — toujours du CSS pur, `app/globals.css`):
- Système de tokens CSS (`:root` + `@media (prefers-color-scheme: dark)`):
  typographie façon système Apple (-apple-system/SF Pro), palette neutre
  (fond quasi blanc `#fbfbfd` / quasi noir `#1d1d1f`, accent bleu `#0071e3`
  clair / `#2997ff` sombre), rayons généreux, ombres douces, transitions.
  Mode sombre automatique via `prefers-color-scheme` — pas de bouton toggle
  (scope minimal). `color-scheme: light dark` sur `:root` pour éviter que le
  navigateur applique son propre style natif en conflit sur les champs/boutons
  (bug de contraste trouvé et corrigé en test).
- Boutons en pilule (`border-radius: 980px`, esthétique Apple), cartes avec
  ombre légère et hover, bandeau de navigation collant avec effet de flou
  (`backdrop-filter`).
- Nouveau composant CSS `.hint` (info-bulle au survol/focus, `data-hint="..."`)
  appliqué sur le jargon (type de finding, niveau de fiabilité, sévérité,
  priorité, friction dominante) dans l'entretien guidé et le mode expert —
  répond à la question sur place, sans quitter l'écran ni consulter une doc.
- Accueil et connexion restructurés autour d'un bloc hero/carte centré, plus
  engageants. Aucun changement de logique métier, aucune nouvelle route,
  aucun nouveau concept de schéma — uniquement CSS + réarrangement JSX des
  pages existantes.

Testé: build/typecheck verts. Captures d'écran (navigateur piloté, session
authentifiée réelle) en clair et en sombre pour accueil, nouveau diagnostic,
connexion, et suivi (avec carte de recommandation réelle) — bug de contraste
du bouton de déconnexion en mode sombre trouvé et corrigé. Données de test
purgées.
Autorité: Jonathan.

## D-015 (2026-07-14) Revue de conformité Ryokan des phases exécutées par Claude Code
Verdict: conforme. Lois vérifiées: provenance ai + confiance obligatoires (UI et
API), aucune écriture IA sans validation explicite, clé API server-only, schéma
inchangé hors migration 0003 (policies uniquement, additive), transitions
forward-only intactes, aucun concept Under Observation introduit.
Correction doctrinale: D-013 justifie le modèle mono-espace par « multi-tenant
interdit (loi #5) » — lecture erronée. La loi #5 interdit la plateforme
multi-projets prématurée, pas l'isolation des données clients. DETTE CONNUE:
`authenticated_full_access using(true)` est acceptable tant qu'il n'y a qu'un
utilisateur; dès le premier client réel, l'isolation par organisation devient
obligatoire (colonne owner/org sur les tables racines + policies par appartenance
— changement additif, chemin de sortie connu). Statut: dette consignée, à payer
avant toute mise en production multi-clients.
Risque process corrigé: le travail local n'était pas commité (git local bloqué
depuis D-008) — commit + push effectués depuis l'environnement Ryokan.
Autorité: Ryokan.

## D-016 (2026-07-14) Corpus de connaissance: distillation de livres + banque de cas
Décision Jonathan: usage A (améliorer le raisonnement en direct) + usage B
(déduction de cas comme expérience synthétique), avec la règle explicite:
« l'expérience n'est pas une valeur absolue — chaque nouveau cas affine la
manière de fonctionner ».
Implémentation minimale (pas de RAG, pas de base vectorielle — non mérités):
- `knowledge/` versionné dans le repo: README doctrine (statuts candidate/
  observed/validated, taille bornée, source citée), patterns/ (frictions,
  questions Gemba, actions, lois Factory Physics), cases/seed-cases.md
  (12 scénarios multi-secteurs déduits, chacun avec fausse piste typique,
  signal de validation et CONDITION D'INVALIDATION).
- Vague 1 distillée de: The Goal, Critical Chain, TPS (Ohno), Gemba Kaizen,
  Toyota Kata, Managing to Learn, Learning to See, Lean Thinking, Factory
  Physics, Thinking in Systems, Bulletproof Problem Solving, Phoenix Project
  — tous présents dans la bibliothèque ECOSYSTEME de Jonathan (vérifié).
  Vague 2 à acquérir: Out of the Crisis (Deming), The Machine That Changed
  the World (Womack).
- Câblage `lib/ai.ts`: corpus chargé du disque (cache process, fallback
  silencieux si absent), injecté dans les prompts interview (patterns) et
  synthèse (patterns + actions + cas), avec règles d'usage strictes dans le
  prompt: priors pas conclusions, le cas réel prime, jamais cité à l'utilisateur.
  Bootstrap et observe_screen restent sans corpus (inutile, coût).
- Chemin d'évolution si le corpus dépasse la taille de prompt: compression
  d'abord, RAG seulement si mérité par la récurrence.
Ownership: l'acquisition/extraction de livres reste le territoire de Booky;
ScaleIQ ne consomme que le distillat.
Autorité: Jonathan (périmètre), Ryokan (architecture).

## D-017 (2026-07-14) Banque de cas étendue: 104 scénarios multi-domaines
Demande Jonathan: minimum 100 cas, toute la bibliothèque mobilisée, possibilité
de demander de nouveaux livres. Livré: 104 cas (12 fondateurs détaillés + 92
compacts) répartis en 7 domaines: ops service/back-office, industrie/logistique/
supply (dont DDMRP), ventes/marketing/acquisition, management/organisation/
direction, finance/cash/rentabilité, produit/digital/UX/tech, commerce/terrain/
branches locales. Sources élargies au-delà du canon Lean/TOC: Hormozi, StoryBrand,
Moore, Dunford, Blount, Jordan (sales code), Grove, Wiseman, Rumelt, Collins,
Doerr, Heath, Cialdini, Voss, Ariely, Taleb, DDMRP, Croll (Lean Analytics),
Cagan, Krug, Kim (Lean Enterprise), Berman (Financial Intelligence), Michalowicz.
Architecture d'injection (taille bornée): le moteur reçoit patterns + actions +
12 cas fondateurs complets + INDEX une-ligne des 104 (repérage d'analogies);
les cas complets restent sur disque. Le RAG ne sera construit que si l'index
prouve son insuffisance (chemin d'évolution documenté D-016).
Chaque cas porte fausse piste typique + condition d'invalidation. Statut
uniforme: candidate. Règle Jonathan encodée: l'expérience n'est pas une valeur
absolue, chaque cas réel affine la banque (méta-règles seed-cases.md).
Livres à acquérir (vague 2): Out of the Crisis (Deming), The Machine That
Changed the World (Womack), It's Not Luck (Goldratt — thinking processes),
The Checklist Manifesto (Gawande), Thinking Fast and Slow (Kahneman),
The E-Myth Revisited (Gerber — franchise/PME terrain).
Autorité: Jonathan (volume/périmètre), Ryokan (architecture).

## D-018 (2026-07-14) Banque de simulations: 520 parties composées (objectif 500 dépassé)
Demande Jonathan: 500 simulations minimum, petites/moyennes/grandes sociétés,
approche « jeu de Go », carte blanche. Architecture retenue: COMPOSITION plutôt
qu'énumération — la valeur est dans le plateau (dimensions) pas dans la liste.
- `simulations/MATRICE.md`: 4 dimensions (10 frictions × 7 domaines × 3 tailles
  × 4 stades) + règles de composition + 5 questions ouvertes (Under Observation).
- `modificateurs-taille.md`: distillat central — comment chaque friction se
  déforme à 1-15 / 15-100 / 100+ personnes (mécanisme, fausse piste, inflexion
  d'action). Priors littérature: P→F7/bus factor, M→F3/interfaces, G→F9/systémique
  (explicitement marqués à confronter au terrain, Q2).
- `modificateurs-stade.md`: croissance (casse par paliers), plateau (frictions
  invisibles), crise (cash + triage), transmission (savoir tacite).
- `scripts/generate-simulations.py`: compose 104 noyaux × (3 tailles + 2 stades)
  = 520 simulations référencées (S-Cx-P/M/G/croissance/crise), régénérables à
  chaque évolution des noyaux ou modificateurs. SIMULATIONS.md vit sur disque
  (référence), n'est PAS injecté au prompt.
- Injection moteur (bornée): MATRICE + modificateurs ajoutés au bundle de
  synthèse; le moteur lit désormais taille/stade de l'entreprise comme
  dimensions de diagnostic.
Doctrine préservée: statut candidate uniforme, invalidations héritées des
noyaux, « l'expérience n'est pas une valeur absolue » en tête de fichier généré.
Autorité: Jonathan (volume, dimensions taille), Ryokan (architecture compositionnelle).

## D-019 (2026-07-14) Passage à 5000 simulations: pipeline de génération LLM
Doctrine Jonathan: « la simulation est l'entraînement, le cas réel est la
compétition ». Décision: au-delà de ~1500, la composition mécanique dilue;
les 5000 seront des scénarios DISTINCTS écrits par LLM depuis les coordonnées
de la matrice. Livré:
- Grille déterministe v2: 104 noyaux × 3 tailles × (4 stades + neutre)
  = 1560 coordonnées (SIMULATIONS.md).
- `scripts/generate-simulations-llm.mjs`: génération résumable, concurrence 4,
  validation de schéma (invalidation et fausse piste OBLIGATOIRES), dédup par
  ID, ventilation par domaine (generated/*.jsonl), 8 secteurs × variations.
- BUDGET: plafond utilisateur 30 CAD; plafond dur script 20 USD; modèle
  Haiku 4.5 (qualité suffisante pour scénarios structurés courts, coût ÷3
  vs Sonnet). Estimation 5000 sims ≈ 16 USD.
- Exécution: sur la machine de Jonathan (clé API locale) via Claude Code —
  la sandbox Ryokan n'a pas accès réseau à l'API. Essai 50 avant les 5000.
- Les 5000 ne sont PAS injectées au prompt: banc d'entraînement sur disque.
  Usage prévu: évaluation du moteur (retrouve-t-il la friction plantée?)
  avant la première compétition réelle.
Autorité: Jonathan (volume, budget), Ryokan (architecture, garde-fous).

## D-020 (2026-07-14) Test comparatif de génération: Fable 100 / Sonnet 1300 / Haiku 2000
Décision Jonathan: panachage des trois modèles + comparaison, plafond relevé à
35 CAD. Implémentation:
- `lib/simgen.ts` + route `POST /api/simulations/generate` {tier, batch}:
  génération par lots côté serveur (la clé ne quitte jamais la machine),
  budget global persistant (_state.json), PLAFOND DUR 25 USD (~34,5 CAD),
  reprise automatique (IDs déjà générés sautés).
- Design de comparaison: les 100 PREMIÈRES coordonnées sont générées par les
  TROIS modèles (comparaison appariée); au-delà, zones distinctes par modèle
  pour maximiser la couverture (sonnet: coords 100+, haiku: coords 900+).
- Estimation: fable 3,2$ + sonnet 8,2$ + haiku 6,3$ ≈ 18 USD (~25 CAD).
- Pilotage: Ryokan déclenche les lots via le navigateur (session authentifiée);
  les fichiers générés (generated/{tier}/*.jsonl) sont lus directement pour le
  contrôle qualité et la comparaison finale (grille: réalisme/spécificité,
  qualité de la fausse piste, honnêteté de l'invalidation, variété, coût/sim).
Autorité: Jonathan (volume, budget, panachage), Ryokan (architecture, exécution).

## D-021 (2026-07-16) Verdict comparatif Fable 5 / Sonnet 5 / Haiku 4.5 (100 coordonnées appariées)
Données: fable 100 sims (24 échecs parse, 19,4%), sonnet 1300 (5,1% échec),
haiku 1389/2000 (3,1% échec — arrêté par le plafond budget à 25,02 USD).
Grille (réalisme/spécificité, fausse piste, invalidation, variété, fiabilité):
- FABLE: la meilleure profondeur causale — mécanismes non évidents cohérents
  avec le stade (ex: gel des achats en crise qui affame l'emballage en
  consommables), fausses pistes les plus tentantes. MAIS 19% de déchet parse
  (facturé), prix 5-7× — inadapté au volume. Usage recommandé: gold set de
  référence (les 100 servent d'étalon qualité) et, plus tard, juge d'évaluation.
- SONNET: fiable, propre, cohérent, légèrement plus générique (fausses pistes
  convenues type « embaucher »). Bon rapport qualité/coût pour du volume soigné.
- HAIKU: le plus concret (24,7 chiffres/sim, 99% d'entreprises uniques),
  le moins cher, le plus fiable en parse — quelques incohérences secteur/noyau
  (hybrides étranges) et JSON fragile sur textes longs. Meilleur rapport
  valeur/coût pour le volume d'entraînement.
Décision d'usage: banque = haiku (volume) + sonnet (couverture soignée) +
fable (étalon). Banque actuelle: 2789 simulations générées + 104 cas rédigés
+ grille de 1560 coordonnées. Reste 611 haiku pour compléter les 2000
(≈ +5 USD ≈ 7 CAD — nécessite accord budget de Jonathan).
Autorité: Ryokan (analyse), Jonathan (budget résiduel).

## D-022 (2026-07-16) Rallonge budget: haiku complété + tier fable-think
Décision Jonathan: +7 CAD pour finir les 611 haiku manquants, +5 CAD de Fable 5
en réflexion maximale. Implémentation: plafond dur relevé à 34 USD; nouveau
tier `fable-think` (thinking budget 12 000 tokens, max_tokens 13 500, quota 12
— ce que ~3,6 USD permettent à ~0,30-0,45$/sim), généré sur les MÊMES
coordonnées que le set de comparaison → 4e bras appariable de l'étude
(mesure de l'apport réel de la réflexion profonde vs Fable standard).
Autorité: Jonathan (budget), Ryokan (implémentation).

## D-023 (2026-07-16) Verdict fable-think vs fable standard (12 coordonnées appariées)
Mesures: longueur ×1,9 (3545 vs 1897 chars), concrétude ×2,2 (45,8 vs 20,5
chiffres/sim), invalidations ×2,2 (428 vs 197 chars). Qualitativement: la
réflexion profonde produit des mécanismes plus fins (la contrainte « affamée
et hachée », le savoir tacite qui « ne travaille qu'en pointillés ») et surtout
des INVALIDATIONS QUANTIFIÉES (seuils mesurables: « si la cadence plafonne à
2 kits/h en créneau protégé, le goulot est la config elle-même ») — c'est la
propriété la plus précieuse pour l'entraînement: chaque simulation d'élite
embarque son protocole de test.
Décision d'usage: les 12 fable-think = étalon-or du corpus et futurs juges/
modèles de correction pour l'évaluation du moteur. Pas de génération de volume
à ce prix (~0,30$/sim).
Corpus final: 104 cas rédigés + 3412 simulations générées (100 fable, 12
fable-think, 1300 sonnet, 2000 haiku) + grille 1560 coordonnées.
Dépense totale: 33,72 USD (~46,5 CAD) — dans le cumul autorisé (30+5+7+5 CAD).
Prochaine étape proposée: SPARRING — le moteur joue contre des simulations
tirées au sort (symptôme donné, retrouve-t-il friction/cause/action?), mesuré
contre l'étalon fable-think, AVANT la première vraie partie.
Autorité: Ryokan (analyse), Jonathan (validation à venir du sparring).
