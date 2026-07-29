# Cas — Produit, digital, UX, tech (statut: candidate)

### C81. Inscription massive, usage nul [Hooked; Lean Analytics]
Symptôme: « 1000 inscrits, 30 actifs ».
Observations: l'inscription est optimisée, la première valeur arrive au 4e écran; personne ne mesure le taux d'activation; l'équipe travaille sur de nouvelles features.
Fausse piste: « plus de features ».
Friction: F8 — la métrique suivie (inscrits) n'est pas la métrique de valeur (activés).
Action: définir l'action d'activation (le « aha »), mesurer le funnel jusqu'à elle, raccourcir le chemin (première valeur < 5 min).
Validation: activation ×2 ↔ Invalidation: activation stable = la promesse d'inscription ne correspond pas au produit (C50, message).

### C82. Le site refait, conversions en baisse [Krug; Conversion Optimization]
Symptôme: « le nouveau site est plus beau et convertit moins ».
Observations: refonte pilotée par l'esthétique; les parcours qui convertissaient ont été déplacés; aucun test avant bascule; le bouton principal est « original ».
Fausse piste: « campagne pour compenser ».
Friction: F7 — les conventions UX violées (l'utilisateur ne doit pas réfléchir) [Krug].
Action: restaurer les 3 parcours principaux à leur logique connue; A/B sur toute modification future de parcours.
Validation: conversion revient à J-30 ↔ Invalidation: toujours bas = le trafic a changé en même temps (isoler les variables — analytics par source).

### C83. Backlog infini, moral à zéro [F10; Lean Enterprise]
Symptôme: « 400 tickets au backlog, l'équipe dev désespère ».
Observations: rien n'est jamais refusé; le backlog sert de cimetière poli; le tri prend plus de temps que le développement.
Fausse piste: « prioriser le backlog » (trier 400 cadavres).
Friction: F5/F10 — stock de travail mort.
Action: déclarer faillite du backlog: archiver tout ce qui a >6 mois; ce qui compte reviendra; file courante plafonnée à 30.
Validation: lead time des demandes actives ÷2, moral en hausse ↔ Invalidation: repousse instantanée à 400 = pas de filtre d'entrée (règle d'admission à créer, C10).

### C84. Bug récurrent, rustines empilées [F6; Phoenix Project]
Symptôme: « le même module casse chaque mois ».
Observations: chaque incident est rustiné sous pression; la dette du module est connue de tous; « pas le temps » de le refondre; le temps de rustinage annuel dépasse le coût de refonte.
Fausse piste: « plus de tests manuels avant release ».
Friction: F6/F9 — l'urgence gagne toujours contre la cause racine.
Action: chiffrer le coût annuel des rustines (heures × incidents), décision refonte/refonte partielle sur ce chiffre; créneau protégé.
Validation: incidents du module -80% post-refonte ↔ Invalidation: incidents ailleurs = la dette est systémique (standards de dev, revue d'architecture — plus gros chantier).

### C85. Feature demandée par le client star [F9; Inspired]
Symptôme: « on développe ce que demande notre plus gros client, le produit devient un monstre ».
Observations: 40% de la roadmap = demandes d'UN client; les autres clients n'utilisent pas ces features; la maintenance explose; le produit perd sa cible.
Fausse piste: « dire oui, c'est 30% du CA ».
Friction: F9 — un client capture la roadmap [Cagan: product vs custom].
Action: séparer: socle produit (roadmap protégée) vs développements spécifiques facturés à leur coût complet.
Validation: ratio roadmap produit >70% + le client star paie ou renonce ↔ Invalidation: le client menace de partir = décision stratégique consciente (dépendance assumée ou non — Jonathan tranche ce type de cas).

### C86. Déploiements du vendredi soir [F4+F6; Phoenix/Lean Enterprise]
Symptôme: « chaque mise en production est un événement à risque ».
Observations: déploiements gros et rares (tous les 2 mois); rollback non testé; le stress monte à chaque release; les correctifs post-release durent une semaine.
Fausse piste: « geler les mises en production » (agrandit les lots, aggrave L4).
Friction: F4/L4 — gros lots de changement = gros risques.
Action: réduire la taille des releases (hebdo, petites), automatiser le test de rollback d'abord.
Validation: incidents post-release ÷3 malgré des releases ×4 ↔ Invalidation: incidents stables = qualité amont (tests) insuffisante, traiter avant la cadence.

### C87. Support qui répond 50 fois la même chose [F5+F7]
Symptôme: « le support croule sous des questions identiques ».
Observations: top 10 questions = 60% du volume; les réponses sont réécrites à chaque fois; le produit provoque 3 de ces questions par un écran confus.
Fausse piste: « chatbot IA sur tout » (automatise la confusion, C-doctrine).
Friction: F5/F6 — le produit fabrique les tickets, le support les absorbe.
Action: corriger les 3 écrans responsables + réponses types pour le reste + FAQ au point de friction (pas dans un centre d'aide lointain).
Validation: volume -40% en 6 semaines ↔ Invalidation: volume stable = les questions viennent d'un segment nouveau mal ciblé (onboarding C12).

### C88. La démo qui vend un produit qui n'existe pas [F9; Inspired]
Symptôme: « les ventes promettent, la prod découvre en réunion client ».
Observations: la démo montre des maquettes présentées comme livrées; chaque signature crée une dette de développement d'urgence; la roadmap est pilotée par les promesses.
Fausse piste: « interdire les démos » .
Friction: F3/F9 — ventes et produit sans contrat d'interface.
Action: kit de démo versionné = uniquement l'existant + registre des engagements pris (visible produit) + toute promesse hors kit = accord produit préalable (cf. C28).
Validation: urgences post-signature -70% ↔ Invalidation: contournements = incitation commerciale à corriger (C47 logique).
