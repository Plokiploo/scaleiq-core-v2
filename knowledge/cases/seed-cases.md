# Banque de cas seed — v1 (statut: candidate — expérience synthétique)

AVERTISSEMENT DOCTRINE: ces cas sont DÉDUITS des livres, jamais observés.
Ils servent de priors et de banc d'essai. L'expérience n'est pas une valeur
absolue: chaque cas réel qui contredit un cas seed prime sur lui, et chaque
nouveau cas réel affine la banque. Ne jamais présenter un cas seed comme
une expérience vécue.

Schéma: Contexte / Symptôme rapporté / Observations clés (ce que l'interview
révèle) / Fausse piste typique / Friction dominante / Cause probable / Action
simple / Signal de validation / CE QUI INVALIDERAIT ce diagnostic.

## C1. Entrepôt — commandes en retard [The Goal]
Contexte: distribution, 12 personnes. Symptôme: « on livre en retard malgré les heures sup ».
Observations: file stable devant le poste emballage; préparation sur-produit le matin; emballage interrompu 4×/jour pour urgences.
Fausse piste: « il faut embaucher partout ».
Friction dominante: F1 (contrainte = emballage, mal exploitée).
Cause probable: la contrainte perd ~25% de capacité en interruptions et attentes d'input.
Action: protéger l'emballage (zéro interruption, input préparé en amont), subordonner la préparation à son rythme.
Validation: débit quotidien d'emballage +20% en 2 semaines sans heure sup.
Invaliderait: si l'emballage a de la capacité inutilisée en fin de journée → la contrainte est ailleurs (probablement en amont: picking ou informations manquantes).

## C2. Services pro — devis trop lents [Shook; F2]
Contexte: bureau d'études, devis complexes. Symptôme: « les clients partent car les devis prennent 3 semaines ».
Observations: le devis passe par 4 personnes; chacune attend que « quelqu'un valide »; aucun cas récent où une seule personne a décidé.
Fausse piste: « il faut un logiciel de devis ».
Friction dominante: F2 (ownership) composée avec F3 (handoffs).
Cause probable: aucune autorité de décision définie sous le directeur; chaque devis escalade.
Action: seuils de délégation écrits (ex: <10 k$ = chargé d'affaires seul), publiés.
Validation: délai médian de devis divisé par 2 sur les devis sous le seuil.
Invaliderait: si les devis sous seuil restent lents → le blocage est ailleurs (info client manquante? technique? F3 à investiguer).

## C3. Restaurant/succursale — qualité irrégulière [Imai; F7]
Contexte: multi-sites. Symptôme: « le site B a deux fois plus de plaintes que le site A ».
Observations: mêmes produits, mêmes volumes; le site A a des routines d'ouverture écrites et un brief quotidien; B « fait confiance à l'expérience ».
Fausse piste: « le gérant de B est moins bon » (personne, pas système).
Friction dominante: F7 (standard absent/non vivant).
Cause probable: la performance de B dépend de qui est présent; pas de standard, donc pas d'apprentissage.
Action: transposer les 3 routines les plus critiques de A vers B, avec le gérant de B comme co-auteur.
Validation: plaintes de B convergent vers A en 4-6 semaines.
Invaliderait: si B reste au même niveau avec les standards tenus → chercher une variable cachée (équipement, mix client, effectif réel).

## C4. SAV — tickets qui traînent [Phoenix Project; F10+F4]
Contexte: support B2B, 6 agents. Symptôme: « on est débordés, les clients hurlent ».
Observations: 240 tickets ouverts; chaque agent travaille sur 15+ tickets en parallèle; 30% du travail arrive par messages directs hors outil.
Fausse piste: « il faut embaucher » (l'utilisation est déjà >95%, L2 prédit l'explosion des files).
Friction dominante: F10 (WIP non plafonné) aggravée par le travail invisible.
Cause probable: multitâche massif — chaque ticket attend 90% du temps (L5).
Action: WIP limit 3 tickets/agent + tout passe par l'outil (canal unique), en 2 semaines de test.
Validation: temps de résolution médian baisse alors que le nombre de tickets clos/semaine reste stable ou monte.
Invaliderait: si le débit chute avec le WIP limité → la contrainte est une compétence rare (F1 sur un expert), pas le multitâche.

## C5. PME industrielle — trésorerie étranglée par les stocks [TPS; F5]
Contexte: fabrication sur stock. Symptôme: « on manque de cash mais l'atelier tourne à fond ».
Observations: 4 mois de stock produit fini; l'atelier produit pour « occuper les machines »; des références dorment depuis 1 an.
Fausse piste: « il faut vendre plus ».
Friction dominante: F5 (surproduction poussée) + F9 (indicateur local: taux d'occupation machine).
Cause probable: la production est pilotée par l'efficience machine, pas par la demande.
Action: geler la production des références >2 mois de couverture; produire à la commande sur le top 20%.
Validation: stock -20% en 8 semaines sans rupture client.
Invaliderait: ruptures immédiates sur références gelées → la variabilité de demande exige un stock tampon dimensionné (pas zéro stock — nuance TPS).

## C6. Agence marketing — projets toujours en retard [Critical Chain; F10]
Contexte: 15 personnes, 20 projets actifs. Symptôme: « aucun projet ne sort à l'heure ».
Observations: chaque personne est sur 4-6 projets; les tâches « 3 jours » durent 3 semaines; les marges de sécurité sont consommées avant le début réel.
Fausse piste: « les estimations sont mauvaises, ajoutons du buffer » (le buffer sera consommé pareil).
Friction dominante: F10 (multitâche structurel).
Cause probable: 20 projets actifs pour une capacité de ~8: chaque projet passe 70% du temps à attendre sa ressource.
Action: geler la moitié des projets (file d'attente explicite), finir avant de commencer.
Validation: les projets actifs sortent; le débit TOTAL de projets finis par trimestre augmente.
Invaliderait: si les projets actifs restent lents à portefeuille réduit → contrainte de compétence unique (F1) ou validation client (F3 externe).

## C7. Clinique/cabinet — salle d'attente pleine à 11h [Factory Physics L2/L3; F4]
Contexte: rendez-vous du matin. Symptôme: « on prend du retard tous les jours dès le milieu de matinée ».
Observations: RDV planifiés au plus juste (utilisation ~100%); premiers retards à 9h se propagent (L3); aucun tampon.
Fausse piste: « les patients sont en retard » (la variabilité est normale, le système chargé à 100% ne l'absorbe pas).
Friction dominante: F4 (variabilité × utilisation).
Cause probable: planification à 100% sans tampon → L2 garantit l'effet boule de neige.
Action: un créneau tampon de 15 min à 9h30 et 11h; RDV longs en fin de bloc.
Validation: retard moyen à midi < 10 min.
Invaliderait: retards concentrés sur UN praticien → problème local (durée réelle vs planifiée de SES actes), pas systémique.

## C8. E-commerce — retours produits en hausse [jidoka; F6]
Contexte: préparation manuelle. Symptôme: « les erreurs de colis explosent ».
Observations: contrôle uniquement à l'expédition; les erreurs se découvrent chez le client; les préparateurs ne savent pas quelles erreurs ils font.
Fausse piste: « ajouter un contrôleur qualité » (contrôle aval = détection tardive, coût, zéro apprentissage).
Friction dominante: F6 (détection tardive, pas de boucle).
Cause probable: aucun feedback au préparateur; erreurs récurrentes jamais analysées.
Action: scan de vérification AU poste de préparation + affichage hebdo des 3 erreurs types avec l'équipe.
Validation: taux d'erreur divisé par 2 en 4 semaines.
Invaliderait: erreurs uniformément réparties et aléatoires malgré le feedback → chercher en amont (référentiel produit faux, photos ambiguës — F3 avec l'équipe catalogue).

## C9. Équipe commerciale — pipeline gonflé, ventes plates [F8+F9; Cracking the Sales Management Code]
Contexte: B2B, 8 commerciaux. Symptôme: « le pipeline a doublé mais les signatures stagnent ».
Observations: l'indicateur suivi est le nombre d'opportunités créées; personne ne mesure la conversion par étape; des opportunités mortes restent ouvertes.
Fausse piste: « il faut plus de leads ».
Friction dominante: F8 (pas de boucle sur la conversion) + F9 (l'indicateur récompense le remplissage).
Cause probable: le pipeline mesure l'activité, pas la progression; l'étape de qualification ne tue jamais rien.
Action: revue hebdo de conversion étape par étape; règle de péremption (60 jours sans mouvement = fermé).
Validation: taux de conversion global remonte quand le pipeline dégonfle.
Invaliderait: conversion stable après nettoyage → le problème est en amont (ciblage) ou en aval (closing) — investiguer l'étape à plus forte perte.

## C10. IT interne — « tout est prioritaire » [Phoenix Project; F10+F2]
Contexte: équipe IT 5 personnes, demandes de toute l'entreprise. Symptôme: « rien ne sort, tout le monde se plaint ».
Observations: 4 sources de demandes non arbitrées; les urgences directes des dirigeants court-circuitent tout; aucun travail planifié ne se termine.
Fausse piste: « l'équipe IT est lente ».
Friction dominante: F2 (personne ne possède l'arbitrage) → F10 en conséquence.
Cause probable: sans propriétaire unique de la file, chaque demandeur s'arbitre lui-même.
Action: une seule file d'entrée, un arbitre désigné, revue de priorités hebdo de 30 min avec les demandeurs.
Validation: % de travail planifié terminé par sprint double.
Invaliderait: si le débit reste nul avec une file propre → contrainte technique réelle (dette, environnements — F1).

## C11. Cabinet comptable — pics de charge saisonniers ingérables [F4; mura]
Contexte: fiscalité, pics trimestriels. Symptôme: « on meurt 4 fois par an, on se tourne les pouces entre ».
Observations: 80% des dossiers arrivent la dernière semaine; aucune incitation client à envoyer tôt; le lissage n'a jamais été tenté.
Fausse piste: « embaucher des saisonniers » (traite le muri, pas le mura).
Friction dominante: F4 (variabilité d'arrivée auto-infligée).
Cause probable: le système invite les clients à tout envoyer au dernier moment (deadline unique, pas de relance échelonnée).
Action: échéances échelonnées par lot de clients + relance à J-30 avec checklist.
Validation: % de dossiers reçus avant la dernière semaine passe de 20% à 50%.
Invaliderait: si les clients n'envoient pas plus tôt malgré tout → tester une incitation (remise early-bird) avant de conclure que le mura est incompressible.

## C12. Startup SaaS — onboarding client chaotique [F3; Learning to See]
Contexte: 30 clients/mois. Symptôme: « les nouveaux clients churnnent avant d'être actifs ».
Observations: vente → CSM → tech = 3 handoffs; le client répète 3 fois les mêmes infos; délai signature→activation: 6 semaines dont 5 d'attente (L5).
Fausse piste: « il faut un meilleur produit d'onboarding ».
Friction dominante: F3 (handoffs sans standard) — le ratio attente/travail (5/1) le prouve.
Cause probable: chaque handoff perd l'information et attend un créneau.
Action: fiche de passation unique remplie EN vente et lue par tous; RDV d'activation pris pendant la signature.
Validation: délai signature→activation < 2 semaines.
Invaliderait: activation rapide mais churn identique → le problème n'était pas l'onboarding (investiguer l'adéquation produit — hors périmètre ops).

## Méta-règles d'usage de la banque
1. Un cas seed SUGGÈRE des hypothèses et des questions; il ne DIAGNOSTIQUE pas.
2. Toujours chercher ce qui distingue le cas réel du cas seed avant de s'en inspirer.
3. Après chaque cas réel clos: noter s'il confirme, nuance ou contredit un seed;
   promouvoir (candidate→observed) ou corriger. C'est ainsi que l'expérience s'affine.
