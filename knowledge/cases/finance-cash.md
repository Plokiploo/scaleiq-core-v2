# Cas — Finance, cash, rentabilité (statut: candidate)

### C73. Rentable sur le papier, à sec en banque [Financial Intelligence; Profit First]
Symptôme: « le compte de résultat est positif, la trésorerie est rouge ».
Observations: clients payés à 75 jours réels (60 contractuels), fournisseurs à 30; le BFR croît avec le chiffre; personne ne suit le cash hebdo.
Fausse piste: « vendre plus » (plus de ventes = plus de BFR = moins de cash à court terme).
Friction: F8 — le résultat est piloté, le cash ne l'est pas.
Action: prévision de trésorerie 13 semaines tenue chaque lundi + relance clients standardisée à J+3 du retard.
Validation: DSO -15 jours en un trimestre ↔ Invalidation: DSO stable = les retards viennent de litiges/facturation (investiguer la qualité de facturation, C76).

### C74. Le produit vedette qui perd de l'argent [Financial Intelligence; F9]
Symptôme: « on vend beaucoup de X mais la marge globale baisse ».
Observations: les coûts indirects sont répartis au chiffre d'affaires; X consomme 60% du temps machine/SAV pour 30% du CA; personne n'a calculé la marge par produit en coûts réels.
Fausse piste: « pousser encore X » (accélère la perte).
Friction: F8/F9 — comptabilité qui masque la réalité par produit.
Action: marge de contribution réelle sur le top 5 produits (temps contrainte consommé inclus [TOC: throughput accounting]).
Validation: décision prix/mix documentée sous 1 mois ↔ Invalidation: marges toutes correctes = la dérive est dans les frais fixes (autre chantier).

### C75. Devis au doigt mouillé [F7+F8]
Symptôme: « certains chantiers perdent de l'argent, on le découvre à la fin ».
Observations: devis basés sur « l'habitude »; aucun bouclage devis vs coût réel; les dépassements ne sont jamais analysés.
Fausse piste: « majorer tous les devis de 15% » (perd les affaires compétitives, garde les mauvaises).
Friction: F8 — pas de boucle devis→réel.
Action: post-mortem 30 min sur chaque chantier fini (écart par poste); base de temps réels alimentée en continu.
Validation: écart devis/réel médian <10% en 6 mois ↔ Invalidation: écarts aléatoires persistants = exécution instable (problème ops C34, pas chiffrage).

### C76. Facturation en retard chronique [F5 inversée; muda]
Symptôme: « on facture le 20 du mois suivant, parfois jamais ».
Observations: la facturation attend « toutes les infos »; les infos manquantes viennent du terrain (bons non signés); 5% des prestations ne sont jamais facturées.
Fausse piste: « embaucher en facturation ».
Friction: F3/F6 — la donnée de facturation n'est pas capturée à la source.
Action: signature/validation sur place à la fin de l'intervention (mobile); facturation à J+2.
Validation: délai prestation→facture <5 jours, fuites <1% ↔ Invalidation: refus terrain = le processus de fin d'intervention est irréaliste (le co-concevoir avec eux).

### C77. Les achats de chacun [F7; Profit First]
Symptôme: « les dépenses grimpent, personne ne sait où ».
Observations: 15 personnes peuvent engager des dépenses; abonnements dormants; doublons d'outils; personne ne revoit jamais rien.
Fausse piste: « geler toutes les dépenses » (punit tout le monde, revient en 3 mois).
Friction: F7/F8 — pas de propriétaire du poste de coût.
Action: revue trimestrielle des abonnements/récurrents (30 min, liste exhaustive, justifier ou couper) + un approbateur par catégorie.
Validation: -10-20% de récurrents au premier passage ↔ Invalidation: rien à couper = le problème est dans les gros postes contractuels (négociation, autre exercice).

### C78. Prix inchangés depuis 5 ans [Hormozi; Predictably Irrational]
Symptôme: « on est débordés et pas rentables ».
Observations: prix historiques jamais réévalués; les coûts ont monté de 20%; les clients ne partent jamais pour le prix; le carnet est plein à 3 mois.
Fausse piste: « réduire les coûts » (le problème est au numérateur).
Friction: F7 — le prix est un standard fossilisé (C27 version finance).
Action: +8-12% sur les nouveaux clients d'abord; offre premium testée sur le segment le moins sensible.
Validation: perte de volume < gain de marge (churn <10% des nouveaux) ↔ Invalidation: fuite massive = la valeur perçue est réellement au prix actuel (travailler l'offre C44 avant les prix).

### C79. Croissance financée par le découvert [Antifragile; F8]
Symptôme: « plus on grandit, plus la banque appelle ».
Observations: chaque nouveau contrat exige de l'avance de trésorerie (stock, salaires); la croissance est non contrainte par le cash disponible; un retard client majeur = crise.
Fausse piste: « lever des fonds en urgence » (résout l'instance, garde la fragilité).
Friction: F9/F10 — croissance non subordonnée à la contrainte réelle (le cash).
Action: règle de croissance soutenable (nouveaux contrats plafonnés par le cash disponible) + acomptes systématiques négociés.
Validation: zéro tension de paie sur 2 trimestres ↔ Invalidation: tensions malgré acomptes = la marge unitaire est insuffisante (C74 d'abord).

### C80. L'investissement qui devait tout changer [F8; Decisive]
Symptôme: « la machine/le logiciel acheté 200k$ n'a rien changé ».
Observations: décision prise sur le pitch du vendeur; aucun critère de succès défini avant l'achat; la contrainte réelle était ailleurs (la machine attend l'amont).
Fausse piste: « acheter le module complémentaire ».
Friction: F1 mal localisée — investissement sur une non-contrainte [The Goal].
Action: post-mortem honnête (qu'aurions-nous dû vérifier?) + règle: tout investissement >X exige l'identification préalable de la contrainte qu'il lève et son critère de succès chiffré.
Validation: la règle appliquée aux 2 prochains investissements ↔ Invalidation: — (le cas sert à installer la règle).
