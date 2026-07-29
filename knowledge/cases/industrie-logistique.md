# Cas — Industrie, logistique, supply chain (statut: candidate)

### C29. Ruptures ET surstocks simultanés [DDMRP]
Symptôme: « on a trop de stock ET des ruptures ».
Observations: stock dimensionné sur des prévisions annuelles; les références A manquent, les C débordent; délai fournisseur variable jamais intégré.
Fausse piste: « améliorer les prévisions » (la prévision sera toujours fausse) [DDMRP].
Friction: F5/F4 — stock positionné par prévision au lieu de buffers pilotés par consommation réelle.
Action: buffers dynamiques sur les 20 références critiques (zones rouge/jaune/verte), réappro déclenché par consommation.
Validation: ruptures -60% à stock global égal ou moindre ↔ Invalidation: ruptures persistantes = délai fournisseur réel > hypothèse (mesurer d'abord).

### C30. La machine goulot en panne récurrente [F1; The Goal]
Symptôme: « quand la ligne 2 tombe, toute l'usine attend ».
Observations: ligne 2 = contrainte; maintenance corrective seulement; les pannes ont des signes avant-coureurs connus des opérateurs mais non remontés.
Fausse piste: « acheter une deuxième ligne » (élever avant d'exploiter).
Friction: F1 — contrainte non protégée.
Action: maintenance préventive prioritaire sur LA contrainte + remontée des signaux opérateurs (5 min/jour) + petit tampon amont.
Validation: arrêts non planifiés de la ligne 2 -50% ↔ Invalidation: débit global inchangé = la contrainte s'est déplacée (recommencer l'analyse, c'est normal).

### C31. Changements de série interminables [F1 exploitation; SMED implicite, Lean Thinking]
Symptôme: « on perd 2h à chaque changement de production ».
Observations: le changement se fait machine arrêtée à 100%; outils cherchés pendant l'arrêt; aucune préparation externe.
Fausse piste: « faire des lots plus gros » (aggrave délais et stocks, L4).
Friction: F1 — temps de contrainte gaspillé en setup interne.
Action: séparer préparation externe (machine tournante) / interne; kit de changement prêt avant l'arrêt.
Validation: temps d'arrêt -50% sans investissement ↔ Invalidation: gain <20% = la vraie perte est ailleurs (réglages/qualité au redémarrage).

### C32. Le cariste qui court partout [F3+F7; Gemba]
Symptôme: « la prépa attend le cariste en permanence ».
Observations: appels radio non priorisés; trajets à vide 60%; implantation: produits fréquents au fond.
Fausse piste: « un deuxième cariste ».
Friction: F7/F3 — pas de tournée standard, implantation contre le flux.
Action: tournée cadencée (toutes les 20 min, circuit fixe) + top 50 références près de la prépa.
Validation: attentes prépa -70% ↔ Invalidation: attentes persistantes = le besoin est en rafales imprévisibles (revoir le déclenchement, pas la tournée).

### C33. Qualité: le fournisseur accuse le transport [F3 externe+F6]
Symptôme: « produits abîmés à réception, chacun se renvoie la faute ».
Observations: pas de contrôle contradictoire au chargement; emballage non spécifié contractuellement; photos inexistantes.
Fausse piste: « pénalités au transporteur » (sans preuve, guerre de tranchées).
Friction: F3/F6 — interface sans standard ni point de contrôle.
Action: photo horodatée au chargement + spec d'emballage d'une page signée des deux côtés.
Validation: litiges divisés par 3, responsabilités claires ↔ Invalidation: casse persistante avec preuves = cause interne (manutention/palettisation).

### C34. L'atelier qui « optimise » ses déchets [F9; Lean Thinking]
Symptôme: « chaque poste est efficient, le délai global est catastrophique ».
Observations: chaque poste produit en grandes séries pour son propre rendement; encours entre postes = 3 semaines; délai client = 5 semaines pour 4h de travail réel.
Fausse piste: « accélérer les postes » (ils sont déjà « efficients »).
Friction: F9/F5 — optimisation locale, flux poussé.
Action: cartographier le flux (Learning to See), puis flux tiré sur la boucle la plus critique avec encours plafonné.
Validation: délai porte-à-porte -40% ↔ Invalidation: délai stable = l'attente est hors atelier (administratif amont/aval — étendre la carte).

### C35. Inventaire toujours faux [F6+F7]
Symptôme: « le système dit 12, l'étagère dit 3 ».
Observations: mouvements non scannés « quand ça presse »; corrections en masse à l'inventaire annuel; personne ne cherche pourquoi.
Fausse piste: « inventaires plus fréquents » (mesure plus souvent une donnée qui se corrompt pareil).
Friction: F6/F7 — la discipline de mouvement casse sous pression, sans boucle de correction.
Action: inventaire tournant sur 20 références + analyse de CHAQUE écart (5 pourquoi) pendant 1 mois.
Validation: causes identifiées et taux d'écart en baisse ↔ Invalidation: écarts aléatoires persistants = vol/process parallèle non documenté.

### C36. Expéditions du soir dans la douleur [F4 auto-infligée]
Symptôme: « tous les jours, rush à 17h pour le transporteur de 18h ».
Observations: les commandes arrivent toute la journée mais la préparation démarre à 14h « pour tout grouper »; le matin est calme.
Fausse piste: « décaler le transporteur » (déplace le mur).
Friction: F4/F5 — lissage inversé: on CRÉE le pic en lotissant.
Action: préparation au fil de l'eau dès le matin, coupure logique à 16h30.
Validation: rush éliminé, erreurs de fin de journée -50% ↔ Invalidation: si le picking matinal manque d'infos (commandes incomplètes le matin) = traiter l'amont d'abord.

### C37. Maintenance vs production: guerre froide [F9+F2]
Symptôme: « la maintenance n'a jamais accès aux machines ».
Observations: production jugée sur le volume du jour; chaque arrêt préventif est refusé; les pannes majeures coûtent 10× l'arrêt préventif refusé.
Fausse piste: « imposer la maintenance par la direction » (conflit permanent).
Friction: F9 — l'indicateur du jour écrase le coût du mois.
Action: créneau préventif hebdo inscrit au plan de production comme une commande client; coût des pannes affiché en heures de production perdues.
Validation: arrêts non planifiés -40% en 3 mois ↔ Invalidation: pannes stables = le préventif ne cible pas les bonnes machines (analyser l'historique d'abord).

### C38. Le tableau de bord usine que personne n'utilise [F8; Gemba]
Symptôme: « on a 40 KPI et aucune amélioration ».
Observations: KPI mensuels, agrégés, en salle de réunion; le terrain ne les voit jamais; aucun n'est lié à une action en cours.
Fausse piste: « ajouter des KPI temps réel » (plus de bruit).
Friction: F8 — mesure sans boucle terrain.
Action: UN indicateur par équipe, choisi avec elle, affiché AU poste, revu 5 min chaque matin avec une question: « qu'est-ce qui nous a empêchés hier? »
Validation: actions d'amélioration issues du terrain ≥2/semaine ↔ Invalidation: rituel sans actions = l'équipe ne croit pas pouvoir changer les choses (problème de management, pas de mesure).

### C39. Sous-charge cachée par la surqualité [F9; muda de surprocessing]
Symptôme: « on est débordés » mais le carnet baisse.
Observations: finitions au-delà de la spec client; contrôles doublés « par sécurité »; personne n'a demandé ces extras.
Fausse piste: « il faut plus de commandes ».
Friction: F9 — le travail s'étend pour remplir le temps (surprocessing).
Action: revue spec par spec avec 3 clients: qu'est-ce qui compte vraiment? Supprimer le reste.
Validation: heures/commande -20% sans réclamation ↔ Invalidation: réclamations = certains extras étaient différenciants (les facturer, pas les supprimer).

### C40. Réception fournisseur embouteillée [F4+F3]
Symptôme: « les camions attendent 3h, les chauffeurs hurlent ».
Observations: tous les fournisseurs livrent 8h-10h; aucun créneau; le quai traite premier arrivé premier servi.
Fausse piste: « agrandir le quai ».
Friction: F4 — arrivées non pilotées.
Action: créneaux de livraison obligatoires étalés, gros volumes l'après-midi.
Validation: attente moyenne <30 min ↔ Invalidation: fournisseurs ne respectent pas = pas de conséquence prévue (ajouter une règle simple, ex: sans RDV = fin de file).

### C41. La série économique qui coûte cher [F5; L4]
Symptôme: « on produit par 5000 pour amortir le réglage, le client commande par 200 ».
Observations: 96% de la série va au stock; obsolescence 8%/an; le calcul de « série économique » date d'un coût de setup divisé par 3 depuis.
Fausse piste: garder la règle (le paramètre a changé, pas la formule).
Friction: F5 — taille de lot fossilisée.
Action: recalculer avec le setup actuel; tester lot ÷4 sur 5 références.
Validation: stock -30% sur ces références, coût unitaire quasi stable ↔ Invalidation: coût unitaire explose = le setup réel est plus lourd que mesuré (retour SMED, C31).

### C42. Saisonnalité subie [F4; DDMRP+Antifragile]
Symptôme: « chaque haute saison est une crise ».
Observations: la saison est connue et récurrente; embauches en panique au pic; formation bâclée → erreurs → surcharge aggravée.
Fausse piste: « c'est la nature du métier ».
Friction: F4 — variabilité PRÉVISIBLE traitée comme une surprise.
Action: plan de montée en charge à J-60 (recrutement, formation courte standardisée C19, pré-production des références stables).
Validation: heures sup au pic -40%, erreurs stables ↔ Invalidation: crise identique = le pic réel dépasse toute capacité planifiable (décision stratégique: lisser la demande par l'offre).
