# Cas — Commerce, terrain, branches locales (statut: candidate)

### C89. Boutique: vendeurs occupés, clients ignorés [F9; Gemba]
Symptôme: « les clients attendent pendant que l'équipe fait autre chose ».
Observations: tâches de réassort/admin planifiées aux heures d'affluence; aucun signal de priorité client; les vendeurs sont évalués sur la tenue du magasin.
Fausse piste: « recruter du monde le samedi ».
Friction: F9 — les tâches mesurables écrasent la mission (vendre).
Action: règle d'or affichée (client > tout) + tâches déplacées aux heures creuses (le flux client est prévisible).
Validation: taux de clients abordés <2 min ×2 ↔ Invalidation: ventes stables malgré l'accueil = le problème est l'offre/le trafic, pas le service.

### C90. Restaurant: cuisine et salle en guerre [F3; mura]
Symptôme: « les plats sortent froids ou tous en même temps ».
Observations: la salle envoie les commandes par rafales; la cuisine n'a aucune visibilité sur le rythme; personne ne cadence.
Fausse piste: « changer le chef ».
Friction: F3/F4 — pas de cadencement entre salle et cuisine.
Action: envoi cadencé par table (règle simple d'espacement) + écran/rail visible des commandes en cours.
Validation: plats renvoyés/refaits -50% ↔ Invalidation: chaos persistant = capacité cuisine réelle insuffisante aux pics (contrainte F1: simplifier la carte aux heures de pointe).

### C91. Chantier: équipes qui s'attendent [F3+F10; Critical Chain]
Symptôme: « les corps de métier se bloquent mutuellement, les chantiers glissent ».
Observations: planification par métier, pas par chantier; chaque équipe est sur 4 chantiers et arrive « quand elle peut »; un retard en cascade tous les jours.
Fausse piste: « pénalités internes de retard ».
Friction: F10/F3 — multitâche entre chantiers + séquence non protégée.
Action: chantier pilote en « relay race »: séquence complète planifiée, équipe suivante prévenue à J-2 par l'équipe précédente, buffer unique en fin de chantier.
Validation: durée du chantier pilote -20% ↔ Invalidation: glissement identique = les retards viennent des approvisionnements (C29), pas de la coordination.

### C92. Salon de services: no-shows qui ruinent les journées [F4; incitations]
Symptôme: « 20% de rendez-vous non honorés ».
Observations: aucune confirmation; aucune conséquence; les créneaux perdus sont les plus demandés; la liste d'attente existe mais n'est jamais appelée.
Fausse piste: « surbooker » (dégrade l'expérience quand tout le monde vient).
Friction: F8 — aucune boucle sur le comportement client.
Action: rappel J-1 avec confirmation en un clic + liste d'attente activée dès annulation + empreinte/acompte sur les créneaux premium.
Validation: no-shows <8% ↔ Invalidation: no-shows stables malgré tout = clientèle structurellement volatile (changer le modèle de réservation, pas les rappels).

### C93. Immobilier/agence: mandats qui dorment [F8+F7]
Symptôme: « des mandats restent 6 mois sans action ni contact ».
Observations: chaque agent gère « son » portefeuille sans revue; pas de plan d'action daté par mandat; le vendeur n'a pas de nouvelles → il retire le mandat.
Fausse piste: « prendre plus de mandats ».
Friction: F8 — pas de boucle par mandat.
Action: revue de portefeuille bimensuelle: chaque mandat a une prochaine action datée + un contact vendeur programmé.
Validation: retraits de mandats -50%, délai de vente médian en baisse ↔ Invalidation: mandats actifs mais invendus = problème de prix d'entrée (discipline d'estimation, autre cas).

### C94. Franchise: le nouveau site sous-performe [F7; standards]
Symptôme: « le site ouvert il y a 8 mois fait -40% vs le modèle ».
Observations: l'ouverture a été faite « vite »; la moitié des standards d'exploitation n'est pas en place; l'équipe locale n'a jamais visité un site performant.
Fausse piste: « c'est l'emplacement » (peut-être — mais non prouvé).
Friction: F7 — le modèle n'a pas été transféré, seulement l'enseigne.
Action: audit d'écart aux standards (checklist du site modèle) + immersion du gérant 3 jours dans le meilleur site + plan de rattrapage à 60 jours.
Validation: remontée mesurable des indicateurs d'exploitation ↔ Invalidation: exploitation conforme mais ventes plates = c'est bien l'emplacement/zone (décision immobilière).

### C95. Garage/atelier: véhicules qui attendent des pièces [F1 politique; C29]
Symptôme: « les ponts sont occupés par des véhicules qui attendent des pièces ».
Observations: le diagnostic se fait quand le véhicule est SUR le pont; la commande de pièces part après; le pont (contrainte) sert de parking.
Fausse piste: « ajouter un pont ».
Friction: F1 — la contrainte (pont) est consommée par de l'attente.
Action: diagnostic et commande de pièces AVANT la prise de RDV atelier (pré-visite ou photos); le véhicule ne monte que pièces en main.
Validation: rotation par pont +30% ↔ Invalidation: attentes persistantes = fiabilité fournisseur de pièces (C25/C29).

### C96. Cabinet médical/dentaire: fauteuil vide entre deux patients [F1+F7]
Symptôme: « on refuse des patients mais le fauteuil est vide 90 min/jour ».
Observations: la préparation de salle se fait fauteuil vide; les annulations tardives ne sont pas comblées; les actes courts pourraient combler les trous.
Fausse piste: « allonger les journées ».
Friction: F1 — temps de contrainte (fauteuil/praticien) perdu en tâches déplaçables.
Action: préparation en temps masqué (assistante pendant l'acte précédent) + liste de rappel courte pour combler les trous du jour.
Validation: actes/jour +15% sans heure ajoutée ↔ Invalidation: trous incompressibles = structure de RDV à revoir (C7, tampons).

### C97. Association/OBNL: bénévoles qui s'évaporent [F2+F8; Multipliers]
Symptôme: « on recrute des bénévoles, ils partent en 2 mois ».
Observations: pas de rôle défini à l'arrivée; les tâches ingrates vont aux nouveaux; personne ne leur dit l'impact de leur travail.
Fausse piste: « recruter plus de bénévoles » (le seau fuit, C52 version RH).
Friction: F2/F8 — ni ownership ni feedback de sens.
Action: rôle écrit dès l'arrivée + parrain + retour d'impact mensuel concret (chiffres, histoires).
Validation: rétention à 6 mois ×2 ↔ Invalidation: départs constants = la mission réelle diverge de la promesse (problème de recrutement, pas de rétention).

### C98. Boulangerie/production du matin: invendus ET ruptures [F4; DDMRP micro]
Symptôme: « on jette le soir et on manque le matin ».
Observations: production au feeling du boulanger; aucune trace des ventes par créneau; la météo/le jour de semaine changent tout mais rien n'est noté.
Fausse piste: « produire plus de tout ».
Friction: F8 — aucune boucle données→production.
Action: 4 semaines de relevé simple (production/invendus/ruptures par produit×jour) puis gabarits de production par jour type.
Validation: invendus -30% et ruptures -30% simultanément ↔ Invalidation: variance résiduelle énorme = demande réellement imprévisible (passer en cuisson échelonnée, petits lots L4).

### C99. Transport/livraison: tournées qui débordent [F7+F4]
Symptôme: « les chauffeurs finissent à 20h, les clients se plaignent des créneaux ratés ».
Observations: tournées bâties à la main par habitude; les créneaux promis au client ne tiennent pas compte de la géographie; les imprévus (absent, accès) ne remontent jamais.
Fausse piste: « logiciel d'optimisation de tournées » (optimise des promesses intenables).
Friction: F7/F8 — promesses déconnectées de la capacité réelle, zéro boucle sur les échecs.
Action: créneaux par zone géographique (pas à la demande) + debrief hebdo des 5 pires échecs de livraison.
Validation: créneaux tenus >90%, fin de journée <18h30 ↔ Invalidation: débordements persistants = surcharge structurelle (capacité vs demande: décision de dimensionnement).

### C100. École/formation: absentéisme qui tue les cohortes [F8; Hooked léger]
Symptôme: « 40% d'abandon en cours de formation ».
Observations: les absences commencent dès la semaine 2 sans réaction; personne ne contacte l'absent avant 3 semaines; les raisons d'abandon ne sont pas collectées.
Fausse piste: « rendre la présence obligatoire » (traite le symptôme).
Friction: F8 — le signal d'alerte (1re absence) existe mais ne déclenche rien.
Action: contact humain sous 48h dès la 1re absence non excusée + entretien des abandons (données).
Validation: abandons -30% ↔ Invalidation: abandons pour raisons externes majoritaires (emploi, mobilité) = revoir le recrutement des cohortes, pas le suivi.

### C101. Hôtel/hébergement: avis moyens malgré de gros efforts [F8+F6]
Symptôme: « on investit partout, la note stagne à 3,8 ».
Observations: les efforts sont répartis uniformément; les avis négatifs citent 2 irritants précis (bruit, check-in lent) qui concentrent 70% des plaintes; personne n'analyse les avis systématiquement.
Fausse piste: « rénover les chambres » (cher, hors sujet).
Friction: F9 — effort uniforme vs douleur concentrée (Pareto ignoré) [Gemba Kaizen].
Action: traiter UNIQUEMENT les 2 irritants dominants (isolation des chambres concernées, check-in mobile/pré-enregistrement).
Validation: note >4,2 en 6 mois ↔ Invalidation: note stable = les irritants réels ne sont pas dans les avis (interviewer les clients silencieux).

### C102. Point de vente: démarque inconnue en hausse [F8+F7]
Symptôme: « l'écart d'inventaire double chaque année ».
Observations: pas de zone à risque identifiée; les procédures de réception sont sautées aux heures de pointe; personne n'ose parler de vol interne.
Fausse piste: « caméras partout » (cher, climat de suspicion, cause non identifiée).
Friction: F8 — l'écart est global donc personne n'est responsable de rien.
Action: mesurer par famille de produits/zone pendant 2 mois (où exactement?) puis traiter la zone dominante (réception? rayon? caisse?).
Validation: cause dominante localisée et écart -40% ↔ Invalidation: écart uniforme = problème de données d'inventaire (C35) avant problème de démarque.

### C103. Service à domicile: 30% du temps sur la route [F7; géographie]
Symptôme: « les intervenants passent plus de temps à rouler qu'à intervenir ».
Observations: les clients sont affectés au premier intervenant dispo, sans logique de secteur; deux intervenants se croisent dans la même rue.
Fausse piste: « payer les trajets » (compense, n'améliore pas).
Friction: F7 — pas de sectorisation.
Action: sectoriser les portefeuilles clients par zone; nouveaux clients affectés par secteur; échanges de clients existants progressifs.
Validation: temps facturable +15% ↔ Invalidation: gains faibles = la dispersion vient des urgences inter-secteurs (voie d'urgence à cadrer, C64).

### C104. Reprise d'entreprise: tout dans la tête du cédant [F7 critique; succession]
Symptôme: « le fondateur parti, les clients et le savoir partent aussi ».
Observations: zéro documentation; les relations clients sont personnelles; les prix, les tours de main, les fournisseurs: tout est oral.
Fausse piste: « clause de non-concurrence » (protège du cédant, pas de la perte de savoir).
Friction: F7 — l'entreprise EST une personne (bus factor = 1).
Action: 90 jours de transfert structuré: cartographie des 20 savoirs critiques, doublure sur chaque relation client clé, standards écrits des 10 opérations vitales.
Validation: rétention clients >90% à 12 mois ↔ Invalidation: départs malgré le transfert = les clients achetaient la personne (le prix d'acquisition aurait dû le refléter — leçon pour le prochain deal).
