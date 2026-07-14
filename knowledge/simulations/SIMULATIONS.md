# SIMULATIONS — banque générée (v1)
# Générée par scripts/generate-simulations.py — NE PAS ÉDITER À LA MAIN (éditer noyaux/modificateurs, régénérer).
# Chaque simulation = noyau × taille (× stade). Statut: candidate. Conditions
# d'invalidation: voir le noyau référencé. L'expérience n'est pas une valeur absolue.
# Volume: 104 noyaux × (3 tailles + 2 stades) = 520 simulations.


## C1 — Entrepôt — commandes en retard [seed-cases · F1]
Symptôme noyau: « on livre en retard malgré les heures sup » · Action noyau: protéger l'emballage (zéro interruption, input préparé en amont), subordonner la préparation à son rythme.
- S-C1-P (petite (1-15)): la contrainte est une PERSONNE (souvent le dirigeant/l'expert); la décharger des tâches sous-qualifiées avant tout recrutement. Réf: cases/seed-cases.md §C1
- S-C1-M (moyenne (15-100)): la contrainte devient un poste/équipe et SE DÉPLACE quand on la traite: réévaluer trimestriellement. Réf: cases/seed-cases.md §C1
- S-C1-G (grande (100+)): la contrainte est souvent une POLITIQUE (comité, budget, règle d'approbation): cartographier le flux de DÉCISION. Réf: cases/seed-cases.md §C1
- S-C1-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C1-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C2 — Services pro — devis trop lents [seed-cases · F2]
Symptôme noyau: « les clients partent car les devis prennent 3 semaines » · Action noyau: seuils de délégation écrits (ex: <10 k$ = chargé d'affaires seul), publiés.
- S-C2-P (petite (1-15)): l'ownership est clair (le patron) mais tout converge vers lui: le vrai sujet est la délégation par seuils. Réf: cases/seed-cases.md §C2
- S-C2-M (moyenne (15-100)): la zone morte classique: « quelqu'un d'autre » existe mais rien n'est écrit; une page qui-décide-quoi. Réf: cases/seed-cases.md §C2
- S-C2-G (grande (100+)): ownership sur papier, autorité réelle ailleurs (matrice, politique): aligner autorité et responsabilité sur UN flux critique. Réf: cases/seed-cases.md §C2
- S-C2-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C2-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C3 — Restaurant/succursale — qualité irrégulière [seed-cases · F7]
Symptôme noyau: « le site B a deux fois plus de plaintes que le site A » · Action noyau: transposer les 3 routines les plus critiques de A vers B, avec le gérant de B comme co-auteur.
- S-C3-P (petite (1-15)): rien n'écrit + bus factor=1: risque existentiel; documenter les 5 savoirs critiques, une page chacun. Réf: cases/seed-cases.md §C3
- S-C3-M (moyenne (15-100)): standards partiels jamais maintenus, doublés de folklore local: un standard vivant = un propriétaire + une date de révision. Réf: cases/seed-cases.md §C3
- S-C3-G (grande (100+)): trop de standards, conformité sans sens, écart écrit/réel: confronter au gemba, supprimer autant qu'ajouter. Réf: cases/seed-cases.md §C3
- S-C3-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C3-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C4 — SAV — tickets qui traînent [seed-cases · F10]
Symptôme noyau: « on est débordés, les clients hurlent » · Action noyau: WIP limit 3 tickets/agent + tout passe par l'outil (canal unique), en 2 semaines de test.
- S-C4-P (petite (1-15)): multitâche structurel du dirigeant (7 casquettes): sanctuariser des blocs + déléguer par seuils. Réf: cases/seed-cases.md §C4
- S-C4-M (moyenne (15-100)): trop de projets, personne n'ose tuer: file d'attente explicite, finir avant de commencer. Réf: cases/seed-cases.md §C4
- S-C4-G (grande (100+)): l'inflation de projets est politique: portefeuille unique, arbitrage à cadence fixe, coût du retard visible. Réf: cases/seed-cases.md §C4
- S-C4-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C4-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C5 — PME industrielle — trésorerie étranglée par les stocks [seed-cases · F5]
Symptôme noyau: « on manque de cash mais l'atelier tourne à fond » · Action noyau: geler la production des références >2 mois de couverture; produire à la commande sur le top 20%.
- S-C5-P (petite (1-15)): surproduction d'OFFRE plutôt que de stock: catalogue trop large pour la capacité; couper au top 20%. Réf: cases/seed-cases.md §C5
- S-C5-M (moyenne (15-100)): les premiers « au cas où » systémiques: rendre le coût du stock visible en jours de paie. Réf: cases/seed-cases.md §C5
- S-C5-G (grande (100+)): surproduction structurelle (budgets à consommer, machines à occuper): attaquer l'indicateur qui la récompense. Réf: cases/seed-cases.md §C5
- S-C5-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C5-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C6 — Agence marketing — projets toujours en retard [seed-cases · F10]
Symptôme noyau: « aucun projet ne sort à l'heure » · Action noyau: geler la moitié des projets (file d'attente explicite), finir avant de commencer.
- S-C6-P (petite (1-15)): multitâche structurel du dirigeant (7 casquettes): sanctuariser des blocs + déléguer par seuils. Réf: cases/seed-cases.md §C6
- S-C6-M (moyenne (15-100)): trop de projets, personne n'ose tuer: file d'attente explicite, finir avant de commencer. Réf: cases/seed-cases.md §C6
- S-C6-G (grande (100+)): l'inflation de projets est politique: portefeuille unique, arbitrage à cadence fixe, coût du retard visible. Réf: cases/seed-cases.md §C6
- S-C6-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C6-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C7 — Clinique/cabinet — salle d'attente pleine à 11h [seed-cases · F4]
Symptôme noyau: « on prend du retard tous les jours dès le milieu de matinée » · Action noyau: un créneau tampon de 15 min à 9h30 et 11h; RDV longs en fin de bloc.
- S-C7-P (petite (1-15)): aucune masse pour amortir: une grosse commande/absence déstabilise tout; tampons simples (délais annoncés, polyvalence, cash). Réf: cases/seed-cases.md §C7
- S-C7-M (moyenne (15-100)): la variabilité AUTO-INFLIGÉE domine (urgences commerciales, replanifications): chasser le mura interne d'abord. Réf: cases/seed-cases.md §C7
- S-C7-G (grande (100+)): la variabilité se propage et s'amplifie entre départements: découpler par buffers aux points critiques, synchroniser les calendriers. Réf: cases/seed-cases.md §C7
- S-C7-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C7-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C8 — E-commerce — retours produits en hausse [seed-cases · F6]
Symptôme noyau: « les erreurs de colis explosent » · Action noyau: scan de vérification AU poste de préparation + affichage hebdo des 3 erreurs types avec l'équipe.
- S-C8-P (petite (1-15)): le dirigeant EST le contrôle qualité: transférer une checklist de 5 points à l'équipe avant qu'il ne sature. Réf: cases/seed-cases.md §C8
- S-C8-M (moyenne (15-100)): le contrôle se centralise en fin de chaîne (« le bureau vérifie »): revenir au contrôle à la source + droit d'arrêt. Réf: cases/seed-cases.md §C8
- S-C8-G (grande (100+)): départements qualité en aval, le producteur ne voit jamais ses défauts: boucle de retour DIRECTE producteur↔défaut. Réf: cases/seed-cases.md §C8
- S-C8-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C8-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C9 — Équipe commerciale — pipeline gonflé, ventes plates [seed-cases · F8]
Symptôme noyau: « le pipeline a doublé mais les signatures stagnent » · Action noyau: revue hebdo de conversion étape par étape; règle de péremption (60 jours sans mouvement = fermé).
- S-C9-P (petite (1-15)): le feedback est immédiat mais non MESURÉ: les dérives lentes sont invisibles; 3 chiffres hebdo suffisent. Réf: cases/seed-cases.md §C9
- S-C9-M (moyenne (15-100)): premiers tableaux de bord déconnectés du terrain: chaque indicateur doit changer une décision quelque part, sinon le supprimer. Réf: cases/seed-cases.md §C9
- S-C9-G (grande (100+)): l'organisation optimise ses indicateurs, plus la réalité (pastèques): mesures côté client, auditer ce que les chiffres cachent. Réf: cases/seed-cases.md §C9
- S-C9-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C9-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C10 — IT interne — « tout est prioritaire » [seed-cases · F2]
Symptôme noyau: « rien ne sort, tout le monde se plaint » · Action noyau: une seule file d'entrée, un arbitre désigné, revue de priorités hebdo de 30 min avec les demandeurs.
- S-C10-P (petite (1-15)): l'ownership est clair (le patron) mais tout converge vers lui: le vrai sujet est la délégation par seuils. Réf: cases/seed-cases.md §C10
- S-C10-M (moyenne (15-100)): la zone morte classique: « quelqu'un d'autre » existe mais rien n'est écrit; une page qui-décide-quoi. Réf: cases/seed-cases.md §C10
- S-C10-G (grande (100+)): ownership sur papier, autorité réelle ailleurs (matrice, politique): aligner autorité et responsabilité sur UN flux critique. Réf: cases/seed-cases.md §C10
- S-C10-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C10-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C11 — Cabinet comptable — pics de charge saisonniers ingérables [seed-cases · F4]
Symptôme noyau: « on meurt 4 fois par an, on se tourne les pouces entre » · Action noyau: échéances échelonnées par lot de clients + relance à J-30 avec checklist.
- S-C11-P (petite (1-15)): aucune masse pour amortir: une grosse commande/absence déstabilise tout; tampons simples (délais annoncés, polyvalence, cash). Réf: cases/seed-cases.md §C11
- S-C11-M (moyenne (15-100)): la variabilité AUTO-INFLIGÉE domine (urgences commerciales, replanifications): chasser le mura interne d'abord. Réf: cases/seed-cases.md §C11
- S-C11-G (grande (100+)): la variabilité se propage et s'amplifie entre départements: découpler par buffers aux points critiques, synchroniser les calendriers. Réf: cases/seed-cases.md §C11
- S-C11-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C11-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C12 — Startup SaaS — onboarding client chaotique [seed-cases · F3]
Symptôme noyau: « les nouveaux clients churnnent avant d'être actifs » · Action noyau: fiche de passation unique remplie EN vente et lue par tous; RDV d'activation pris pendant la signature.
- S-C12-P (petite (1-15)): les handoffs critiques sont EXTERNES (clients, fournisseurs, sous-traitants): standardiser les 2 interfaces les plus fréquentes. Réf: cases/seed-cases.md §C12
- S-C12-M (moyenne (15-100)): le mur ventes→ops / terrain→admin: l'informel qui marchait à 10 casse à 30; fiches de passation co-écrites. Réf: cases/seed-cases.md §C12
- S-C12-G (grande (100+)): chaînes de 4+ handoffs, files invisibles, personne ne voit le bout-en-bout: cartographier UN flux entier avant toute action locale. Réf: cases/seed-cases.md §C12
- S-C12-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C12-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C13 — Demandes clients perdues entre canaux [ops-service · F3]
Symptôme noyau: « des demandes tombent dans les trous, on l'apprend quand le client rappelle fâché » · Action noyau: un canal officiel unique + transfert systématique des autres canaux vers lui pendant 2 semaines.
- S-C13-P (petite (1-15)): les handoffs critiques sont EXTERNES (clients, fournisseurs, sous-traitants): standardiser les 2 interfaces les plus fréquentes. Réf: cases/ops-service.md §C13
- S-C13-M (moyenne (15-100)): le mur ventes→ops / terrain→admin: l'informel qui marchait à 10 casse à 30; fiches de passation co-écrites. Réf: cases/ops-service.md §C13
- S-C13-G (grande (100+)): chaînes de 4+ handoffs, files invisibles, personne ne voit le bout-en-bout: cartographier UN flux entier avant toute action locale. Réf: cases/ops-service.md §C13
- S-C13-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C13-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C14 — Dossier « complet » jamais complet [ops-service · F6]
Symptôme noyau: « on renvoie les dossiers 3 fois au client pour pièces manquantes » · Action noyau: checklist unique publiée au client + contrôle de complétude à la RÉCEPTION (5 min) avant mise en file.
- S-C14-P (petite (1-15)): le dirigeant EST le contrôle qualité: transférer une checklist de 5 points à l'équipe avant qu'il ne sature. Réf: cases/ops-service.md §C14
- S-C14-M (moyenne (15-100)): le contrôle se centralise en fin de chaîne (« le bureau vérifie »): revenir au contrôle à la source + droit d'arrêt. Réf: cases/ops-service.md §C14
- S-C14-G (grande (100+)): départements qualité en aval, le producteur ne voit jamais ses défauts: boucle de retour DIRECTE producteur↔défaut. Réf: cases/ops-service.md §C14
- S-C14-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C14-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C15 — Le back-office « fantôme » du samedi [ops-service · F4]
Symptôme noyau: « le lundi est infernal, le reste de la semaine ça va » · Action noyau: 2h de traitement asynchrone le samedi OU annonce claire de délai J+2 le week-end + créneau protégé lundi matin
- S-C15-P (petite (1-15)): aucune masse pour amortir: une grosse commande/absence déstabilise tout; tampons simples (délais annoncés, polyvalence, cash). Réf: cases/ops-service.md §C15
- S-C15-M (moyenne (15-100)): la variabilité AUTO-INFLIGÉE domine (urgences commerciales, replanifications): chasser le mura interne d'abord. Réf: cases/ops-service.md §C15
- S-C15-G (grande (100+)): la variabilité se propage et s'amplifie entre départements: découpler par buffers aux points critiques, synchroniser les calendriers. Réf: cases/ops-service.md §C15
- S-C15-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C15-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C16 — Approbations en cascade [ops-service · F2]
Symptôme noyau: « la moindre dépense de 50$ prend 2 semaines » · Action noyau: seuil d'auto-approbation (ex: <200$) avec audit a posteriori par échantillon.
- S-C16-P (petite (1-15)): l'ownership est clair (le patron) mais tout converge vers lui: le vrai sujet est la délégation par seuils. Réf: cases/ops-service.md §C16
- S-C16-M (moyenne (15-100)): la zone morte classique: « quelqu'un d'autre » existe mais rien n'est écrit; une page qui-décide-quoi. Réf: cases/ops-service.md §C16
- S-C16-G (grande (100+)): ownership sur papier, autorité réelle ailleurs (matrice, politique): aligner autorité et responsabilité sur UN flux critique. Réf: cases/ops-service.md §C16
- S-C16-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C16-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C17 — L'expert qui est partout [ops-service · F1]
Symptôme noyau: « tout passe par Marc, sans lui rien ne sort » · Action noyau: exploiter avant d'élever — FAQ des 10 questions récurrentes + retirer à Marc tout ce qui ne requiert pas son e
- S-C17-P (petite (1-15)): la contrainte est une PERSONNE (souvent le dirigeant/l'expert); la décharger des tâches sous-qualifiées avant tout recrutement. Réf: cases/ops-service.md §C17
- S-C17-M (moyenne (15-100)): la contrainte devient un poste/équipe et SE DÉPLACE quand on la traite: réévaluer trimestriellement. Réf: cases/ops-service.md §C17
- S-C17-G (grande (100+)): la contrainte est souvent une POLITIQUE (comité, budget, règle d'approbation): cartographier le flux de DÉCISION. Réf: cases/ops-service.md §C17
- S-C17-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C17-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C18 — Réunions de suivi qui ne suivent rien [ops-service · F8]
Symptôme noyau: « on se réunit chaque semaine mais rien n'avance entre les réunions » · Action noyau: format imposé 20 min: 3 indicateurs, écarts, engagements nominatifs datés, revue des engagements précédents d'
- S-C18-P (petite (1-15)): le feedback est immédiat mais non MESURÉ: les dérives lentes sont invisibles; 3 chiffres hebdo suffisent. Réf: cases/ops-service.md §C18
- S-C18-M (moyenne (15-100)): premiers tableaux de bord déconnectés du terrain: chaque indicateur doit changer une décision quelque part, sinon le supprimer. Réf: cases/ops-service.md §C18
- S-C18-G (grande (100+)): l'organisation optimise ses indicateurs, plus la réalité (pastèques): mesures côté client, auditer ce que les chiffres cachent. Réf: cases/ops-service.md §C18
- S-C18-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C18-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C19 — Onboarding nouvel employé de 3 mois [ops-service · F7]
Symptôme noyau: « un nouveau met un trimestre à être utile » · Action noyau: les 5 tâches les plus fréquentes documentées en une page chacune par les meilleurs; binôme désigné 2 semaines.
- S-C19-P (petite (1-15)): rien n'écrit + bus factor=1: risque existentiel; documenter les 5 savoirs critiques, une page chacun. Réf: cases/ops-service.md §C19
- S-C19-M (moyenne (15-100)): standards partiels jamais maintenus, doublés de folklore local: un standard vivant = un propriétaire + une date de révision. Réf: cases/ops-service.md §C19
- S-C19-G (grande (100+)): trop de standards, conformité sans sens, écart écrit/réel: confronter au gemba, supprimer autant qu'ajouter. Réf: cases/ops-service.md §C19
- S-C19-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C19-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C20 — Planning refait 3 fois par jour [ops-service · F4]
Symptôme noyau: « le planificateur passe sa journée à replanifier » · Action noyau: gel du planning à J-1 16h; les demandes après-coup vont au lendemain sauf urgence définie par critères écrits.
- S-C20-P (petite (1-15)): aucune masse pour amortir: une grosse commande/absence déstabilise tout; tampons simples (délais annoncés, polyvalence, cash). Réf: cases/ops-service.md §C20
- S-C20-M (moyenne (15-100)): la variabilité AUTO-INFLIGÉE domine (urgences commerciales, replanifications): chasser le mura interne d'abord. Réf: cases/ops-service.md §C20
- S-C20-G (grande (100+)): la variabilité se propage et s'amplifie entre départements: découpler par buffers aux points critiques, synchroniser les calendriers. Réf: cases/ops-service.md §C20
- S-C20-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C20-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C21 — La file invisible des « petites faveurs » [ops-service · F10]
Symptôme noyau: « on n'arrive plus à faire notre vrai travail » · Action noyau: 2 semaines de comptage simple (bâtons par catégorie) puis arbitrage explicite avec les demandeurs sur la base 
- S-C21-P (petite (1-15)): multitâche structurel du dirigeant (7 casquettes): sanctuariser des blocs + déléguer par seuils. Réf: cases/ops-service.md §C21
- S-C21-M (moyenne (15-100)): trop de projets, personne n'ose tuer: file d'attente explicite, finir avant de commencer. Réf: cases/ops-service.md §C21
- S-C21-G (grande (100+)): l'inflation de projets est politique: portefeuille unique, arbitrage à cadence fixe, coût du retard visible. Réf: cases/ops-service.md §C21
- S-C21-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C21-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C22 — Astreinte qui épuise [ops-service · F6]
Symptôme noyau: « les mêmes incidents nous réveillent chaque semaine » · Action noyau: règle « tout incident ×3 = analyse cause racine + correctif planifié prioritaire ».
- S-C22-P (petite (1-15)): le dirigeant EST le contrôle qualité: transférer une checklist de 5 points à l'équipe avant qu'il ne sature. Réf: cases/ops-service.md §C22
- S-C22-M (moyenne (15-100)): le contrôle se centralise en fin de chaîne (« le bureau vérifie »): revenir au contrôle à la source + droit d'arrêt. Réf: cases/ops-service.md §C22
- S-C22-G (grande (100+)): départements qualité en aval, le producteur ne voit jamais ses défauts: boucle de retour DIRECTE producteur↔défaut. Réf: cases/ops-service.md §C22
- S-C22-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C22-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C23 — Guichet saturé à heures fixes [ops-service · F4]
Symptôme noyau: « files énormes 11h-13h, personnel inoccupé à 15h » · Action noyau: horaires décalés du personnel sur le pic + déviation des 3 motifs simples vers formulaire/téléphone.
- S-C23-P (petite (1-15)): aucune masse pour amortir: une grosse commande/absence déstabilise tout; tampons simples (délais annoncés, polyvalence, cash). Réf: cases/ops-service.md §C23
- S-C23-M (moyenne (15-100)): la variabilité AUTO-INFLIGÉE domine (urgences commerciales, replanifications): chasser le mura interne d'abord. Réf: cases/ops-service.md §C23
- S-C23-G (grande (100+)): la variabilité se propage et s'amplifie entre départements: découpler par buffers aux points critiques, synchroniser les calendriers. Réf: cases/ops-service.md §C23
- S-C23-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C23-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C24 — Le rapport que personne ne lit [ops-service · F9]
Symptôme noyau: « on passe 2 jours/mois sur un rapport dont on doute qu'il serve » · Action noyau: arrêter l'envoi un mois (test du mort): qui réclame, pour quelle décision?
- S-C24-P (petite (1-15)): l'optimisation locale est TEMPORELLE (sacrifier demain pour aujourd'hui): rituel mensuel « qu'hypothèque-t-on? ». Réf: cases/ops-service.md §C24
- S-C24-M (moyenne (15-100)): naît avec les objectifs par équipe: un objectif COMMUN de flux au-dessus des objectifs locaux. Réf: cases/ops-service.md §C24
- S-C24-G (grande (100+)): le mode par défaut (silos, budgets défendus): changer LA règle qui paie le comportement, pas moraliser. Réf: cases/ops-service.md §C24
- S-C24-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C24-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C25 — Sous-traitant toujours en retard [ops-service · F3]
Symptôme noyau: « notre sous-traitant nous met en retard chez nos clients » · Action noyau: dates réelles + revue mensuelle 30 min sur les 3 derniers retards (faits, pas reproches) [tactiques d'écoute a
- S-C25-P (petite (1-15)): les handoffs critiques sont EXTERNES (clients, fournisseurs, sous-traitants): standardiser les 2 interfaces les plus fréquentes. Réf: cases/ops-service.md §C25
- S-C25-M (moyenne (15-100)): le mur ventes→ops / terrain→admin: l'informel qui marchait à 10 casse à 30; fiches de passation co-écrites. Réf: cases/ops-service.md §C25
- S-C25-G (grande (100+)): chaînes de 4+ handoffs, files invisibles, personne ne voit le bout-en-bout: cartographier UN flux entier avant toute action locale. Réf: cases/ops-service.md §C25
- S-C25-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C25-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C26 — Erreurs de saisie en bout de chaîne [ops-service · F3]
Symptôme noyau: « la compta corrige des erreurs de saisie toute la journée » · Action noyau: saisie unique à la source dans un format contraint (liste déroulante, pas texte libre), les autres consomment.
- S-C26-P (petite (1-15)): les handoffs critiques sont EXTERNES (clients, fournisseurs, sous-traitants): standardiser les 2 interfaces les plus fréquentes. Réf: cases/ops-service.md §C26
- S-C26-M (moyenne (15-100)): le mur ventes→ops / terrain→admin: l'informel qui marchait à 10 casse à 30; fiches de passation co-écrites. Réf: cases/ops-service.md §C26
- S-C26-G (grande (100+)): chaînes de 4+ handoffs, files invisibles, personne ne voit le bout-en-bout: cartographier UN flux entier avant toute action locale. Réf: cases/ops-service.md §C26
- S-C26-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C26-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C27 — « On a toujours fait comme ça » [ops-service · F7]
Symptôme noyau: « procédure lourde dont personne ne connaît la raison. » · Action noyau: test contrôlé 1 mois sans l'étape sur un périmètre limité, avec le risque d'origine surveillé explicitement.
- S-C27-P (petite (1-15)): rien n'écrit + bus factor=1: risque existentiel; documenter les 5 savoirs critiques, une page chacun. Réf: cases/ops-service.md §C27
- S-C27-M (moyenne (15-100)): standards partiels jamais maintenus, doublés de folklore local: un standard vivant = un propriétaire + une date de révision. Réf: cases/ops-service.md §C27
- S-C27-G (grande (100+)): trop de standards, conformité sans sens, écart écrit/réel: confronter au gemba, supprimer autant qu'ajouter. Réf: cases/ops-service.md §C27
- S-C27-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C27-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C28 — Deux services, deux vérités [ops-service · F9]
Symptôme noyau: « les ventes promettent ce que les ops ne peuvent pas tenir » · Action noyau: calendrier de capacité visible des ventes + règle d'engagement (toute promesse hors calendrier = accord ops pr
- S-C28-P (petite (1-15)): l'optimisation locale est TEMPORELLE (sacrifier demain pour aujourd'hui): rituel mensuel « qu'hypothèque-t-on? ». Réf: cases/ops-service.md §C28
- S-C28-M (moyenne (15-100)): naît avec les objectifs par équipe: un objectif COMMUN de flux au-dessus des objectifs locaux. Réf: cases/ops-service.md §C28
- S-C28-G (grande (100+)): le mode par défaut (silos, budgets défendus): changer LA règle qui paie le comportement, pas moraliser. Réf: cases/ops-service.md §C28
- S-C28-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C28-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C29 — Ruptures ET surstocks simultanés [industrie-logistique · F5]
Symptôme noyau: « on a trop de stock ET des ruptures » · Action noyau: buffers dynamiques sur les 20 références critiques (zones rouge/jaune/verte), réappro déclenché par consommati
- S-C29-P (petite (1-15)): surproduction d'OFFRE plutôt que de stock: catalogue trop large pour la capacité; couper au top 20%. Réf: cases/industrie-logistique.md §C29
- S-C29-M (moyenne (15-100)): les premiers « au cas où » systémiques: rendre le coût du stock visible en jours de paie. Réf: cases/industrie-logistique.md §C29
- S-C29-G (grande (100+)): surproduction structurelle (budgets à consommer, machines à occuper): attaquer l'indicateur qui la récompense. Réf: cases/industrie-logistique.md §C29
- S-C29-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C29-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C30 — La machine goulot en panne récurrente [industrie-logistique · F1]
Symptôme noyau: « quand la ligne 2 tombe, toute l'usine attend » · Action noyau: maintenance préventive prioritaire sur LA contrainte + remontée des signaux opérateurs (5 min/jour) + petit ta
- S-C30-P (petite (1-15)): la contrainte est une PERSONNE (souvent le dirigeant/l'expert); la décharger des tâches sous-qualifiées avant tout recrutement. Réf: cases/industrie-logistique.md §C30
- S-C30-M (moyenne (15-100)): la contrainte devient un poste/équipe et SE DÉPLACE quand on la traite: réévaluer trimestriellement. Réf: cases/industrie-logistique.md §C30
- S-C30-G (grande (100+)): la contrainte est souvent une POLITIQUE (comité, budget, règle d'approbation): cartographier le flux de DÉCISION. Réf: cases/industrie-logistique.md §C30
- S-C30-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C30-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C31 — Changements de série interminables [industrie-logistique · F1]
Symptôme noyau: « on perd 2h à chaque changement de production » · Action noyau: séparer préparation externe (machine tournante) / interne; kit de changement prêt avant l'arrêt.
- S-C31-P (petite (1-15)): la contrainte est une PERSONNE (souvent le dirigeant/l'expert); la décharger des tâches sous-qualifiées avant tout recrutement. Réf: cases/industrie-logistique.md §C31
- S-C31-M (moyenne (15-100)): la contrainte devient un poste/équipe et SE DÉPLACE quand on la traite: réévaluer trimestriellement. Réf: cases/industrie-logistique.md §C31
- S-C31-G (grande (100+)): la contrainte est souvent une POLITIQUE (comité, budget, règle d'approbation): cartographier le flux de DÉCISION. Réf: cases/industrie-logistique.md §C31
- S-C31-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C31-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C32 — Le cariste qui court partout [industrie-logistique · F7]
Symptôme noyau: « la prépa attend le cariste en permanence » · Action noyau: tournée cadencée (toutes les 20 min, circuit fixe) + top 50 références près de la prépa.
- S-C32-P (petite (1-15)): rien n'écrit + bus factor=1: risque existentiel; documenter les 5 savoirs critiques, une page chacun. Réf: cases/industrie-logistique.md §C32
- S-C32-M (moyenne (15-100)): standards partiels jamais maintenus, doublés de folklore local: un standard vivant = un propriétaire + une date de révision. Réf: cases/industrie-logistique.md §C32
- S-C32-G (grande (100+)): trop de standards, conformité sans sens, écart écrit/réel: confronter au gemba, supprimer autant qu'ajouter. Réf: cases/industrie-logistique.md §C32
- S-C32-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C32-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C33 — Qualité: le fournisseur accuse le transport [industrie-logistique · F3]
Symptôme noyau: « produits abîmés à réception, chacun se renvoie la faute » · Action noyau: photo horodatée au chargement + spec d'emballage d'une page signée des deux côtés.
- S-C33-P (petite (1-15)): les handoffs critiques sont EXTERNES (clients, fournisseurs, sous-traitants): standardiser les 2 interfaces les plus fréquentes. Réf: cases/industrie-logistique.md §C33
- S-C33-M (moyenne (15-100)): le mur ventes→ops / terrain→admin: l'informel qui marchait à 10 casse à 30; fiches de passation co-écrites. Réf: cases/industrie-logistique.md §C33
- S-C33-G (grande (100+)): chaînes de 4+ handoffs, files invisibles, personne ne voit le bout-en-bout: cartographier UN flux entier avant toute action locale. Réf: cases/industrie-logistique.md §C33
- S-C33-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C33-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C34 — L'atelier qui « optimise » ses déchets [industrie-logistique · F9]
Symptôme noyau: « chaque poste est efficient, le délai global est catastrophique » · Action noyau: cartographier le flux (Learning to See), puis flux tiré sur la boucle la plus critique avec encours plafonné.
- S-C34-P (petite (1-15)): l'optimisation locale est TEMPORELLE (sacrifier demain pour aujourd'hui): rituel mensuel « qu'hypothèque-t-on? ». Réf: cases/industrie-logistique.md §C34
- S-C34-M (moyenne (15-100)): naît avec les objectifs par équipe: un objectif COMMUN de flux au-dessus des objectifs locaux. Réf: cases/industrie-logistique.md §C34
- S-C34-G (grande (100+)): le mode par défaut (silos, budgets défendus): changer LA règle qui paie le comportement, pas moraliser. Réf: cases/industrie-logistique.md §C34
- S-C34-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C34-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C35 — Inventaire toujours faux [industrie-logistique · F6]
Symptôme noyau: « le système dit 12, l'étagère dit 3 » · Action noyau: inventaire tournant sur 20 références + analyse de CHAQUE écart (5 pourquoi) pendant 1 mois.
- S-C35-P (petite (1-15)): le dirigeant EST le contrôle qualité: transférer une checklist de 5 points à l'équipe avant qu'il ne sature. Réf: cases/industrie-logistique.md §C35
- S-C35-M (moyenne (15-100)): le contrôle se centralise en fin de chaîne (« le bureau vérifie »): revenir au contrôle à la source + droit d'arrêt. Réf: cases/industrie-logistique.md §C35
- S-C35-G (grande (100+)): départements qualité en aval, le producteur ne voit jamais ses défauts: boucle de retour DIRECTE producteur↔défaut. Réf: cases/industrie-logistique.md §C35
- S-C35-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C35-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C36 — Expéditions du soir dans la douleur [industrie-logistique · F4]
Symptôme noyau: « tous les jours, rush à 17h pour le transporteur de 18h » · Action noyau: préparation au fil de l'eau dès le matin, coupure logique à 16h30.
- S-C36-P (petite (1-15)): aucune masse pour amortir: une grosse commande/absence déstabilise tout; tampons simples (délais annoncés, polyvalence, cash). Réf: cases/industrie-logistique.md §C36
- S-C36-M (moyenne (15-100)): la variabilité AUTO-INFLIGÉE domine (urgences commerciales, replanifications): chasser le mura interne d'abord. Réf: cases/industrie-logistique.md §C36
- S-C36-G (grande (100+)): la variabilité se propage et s'amplifie entre départements: découpler par buffers aux points critiques, synchroniser les calendriers. Réf: cases/industrie-logistique.md §C36
- S-C36-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C36-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C37 — Maintenance vs production: guerre froide [industrie-logistique · F9]
Symptôme noyau: « la maintenance n'a jamais accès aux machines » · Action noyau: créneau préventif hebdo inscrit au plan de production comme une commande client; coût des pannes affiché en he
- S-C37-P (petite (1-15)): l'optimisation locale est TEMPORELLE (sacrifier demain pour aujourd'hui): rituel mensuel « qu'hypothèque-t-on? ». Réf: cases/industrie-logistique.md §C37
- S-C37-M (moyenne (15-100)): naît avec les objectifs par équipe: un objectif COMMUN de flux au-dessus des objectifs locaux. Réf: cases/industrie-logistique.md §C37
- S-C37-G (grande (100+)): le mode par défaut (silos, budgets défendus): changer LA règle qui paie le comportement, pas moraliser. Réf: cases/industrie-logistique.md §C37
- S-C37-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C37-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C38 — Le tableau de bord usine que personne n'utilise [industrie-logistique · F8]
Symptôme noyau: « on a 40 KPI et aucune amélioration » · Action noyau: UN indicateur par équipe, choisi avec elle, affiché AU poste, revu 5 min chaque matin avec une question: « qu'
- S-C38-P (petite (1-15)): le feedback est immédiat mais non MESURÉ: les dérives lentes sont invisibles; 3 chiffres hebdo suffisent. Réf: cases/industrie-logistique.md §C38
- S-C38-M (moyenne (15-100)): premiers tableaux de bord déconnectés du terrain: chaque indicateur doit changer une décision quelque part, sinon le supprimer. Réf: cases/industrie-logistique.md §C38
- S-C38-G (grande (100+)): l'organisation optimise ses indicateurs, plus la réalité (pastèques): mesures côté client, auditer ce que les chiffres cachent. Réf: cases/industrie-logistique.md §C38
- S-C38-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C38-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C39 — Sous-charge cachée par la surqualité [industrie-logistique · F9]
Symptôme noyau: « on est débordés » · Action noyau: revue spec par spec avec 3 clients: qu'est-ce qui compte vraiment? Supprimer le reste.
- S-C39-P (petite (1-15)): l'optimisation locale est TEMPORELLE (sacrifier demain pour aujourd'hui): rituel mensuel « qu'hypothèque-t-on? ». Réf: cases/industrie-logistique.md §C39
- S-C39-M (moyenne (15-100)): naît avec les objectifs par équipe: un objectif COMMUN de flux au-dessus des objectifs locaux. Réf: cases/industrie-logistique.md §C39
- S-C39-G (grande (100+)): le mode par défaut (silos, budgets défendus): changer LA règle qui paie le comportement, pas moraliser. Réf: cases/industrie-logistique.md §C39
- S-C39-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C39-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C40 — Réception fournisseur embouteillée [industrie-logistique · F4]
Symptôme noyau: « les camions attendent 3h, les chauffeurs hurlent » · Action noyau: créneaux de livraison obligatoires étalés, gros volumes l'après-midi.
- S-C40-P (petite (1-15)): aucune masse pour amortir: une grosse commande/absence déstabilise tout; tampons simples (délais annoncés, polyvalence, cash). Réf: cases/industrie-logistique.md §C40
- S-C40-M (moyenne (15-100)): la variabilité AUTO-INFLIGÉE domine (urgences commerciales, replanifications): chasser le mura interne d'abord. Réf: cases/industrie-logistique.md §C40
- S-C40-G (grande (100+)): la variabilité se propage et s'amplifie entre départements: découpler par buffers aux points critiques, synchroniser les calendriers. Réf: cases/industrie-logistique.md §C40
- S-C40-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C40-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C41 — La série économique qui coûte cher [industrie-logistique · F5]
Symptôme noyau: « on produit par 5000 pour amortir le réglage, le client commande par 200 » · Action noyau: recalculer avec le setup actuel; tester lot ÷4 sur 5 références.
- S-C41-P (petite (1-15)): surproduction d'OFFRE plutôt que de stock: catalogue trop large pour la capacité; couper au top 20%. Réf: cases/industrie-logistique.md §C41
- S-C41-M (moyenne (15-100)): les premiers « au cas où » systémiques: rendre le coût du stock visible en jours de paie. Réf: cases/industrie-logistique.md §C41
- S-C41-G (grande (100+)): surproduction structurelle (budgets à consommer, machines à occuper): attaquer l'indicateur qui la récompense. Réf: cases/industrie-logistique.md §C41
- S-C41-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C41-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C42 — Saisonnalité subie [industrie-logistique · F4]
Symptôme noyau: « chaque haute saison est une crise » · Action noyau: plan de montée en charge à J-60 (recrutement, formation courte standardisée C19, pré-production des références
- S-C42-P (petite (1-15)): aucune masse pour amortir: une grosse commande/absence déstabilise tout; tampons simples (délais annoncés, polyvalence, cash). Réf: cases/industrie-logistique.md §C42
- S-C42-M (moyenne (15-100)): la variabilité AUTO-INFLIGÉE domine (urgences commerciales, replanifications): chasser le mura interne d'abord. Réf: cases/industrie-logistique.md §C42
- S-C42-G (grande (100+)): la variabilité se propage et s'amplifie entre départements: découpler par buffers aux points critiques, synchroniser les calendriers. Réf: cases/industrie-logistique.md §C42
- S-C42-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C42-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C43 — Prospection en dents de scie [ventes-marketing · F4]
Symptôme noyau: « un mois on signe, le mois suivant le pipeline est vide » · Action noyau: bloc de prospection quotidien non négociable (1h, même en période faste), mesuré en activités pas en résultats
- S-C43-P (petite (1-15)): aucune masse pour amortir: une grosse commande/absence déstabilise tout; tampons simples (délais annoncés, polyvalence, cash). Réf: cases/ventes-marketing.md §C43
- S-C43-M (moyenne (15-100)): la variabilité AUTO-INFLIGÉE domine (urgences commerciales, replanifications): chasser le mura interne d'abord. Réf: cases/ventes-marketing.md §C43
- S-C43-G (grande (100+)): la variabilité se propage et s'amplifie entre départements: découpler par buffers aux points critiques, synchroniser les calendriers. Réf: cases/ventes-marketing.md §C43
- S-C43-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C43-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C44 — « Notre offre n'intéresse personne » [ventes-marketing · SP]
Symptôme noyau: « taux de réponse dérisoire malgré le volume d'outreach. » · Action noyau: reformuler UNE offre pour UN segment: résultat précis + délai + réduction de risque (garantie conditionnelle),
- S-C44-P (petite (1-15)): à cette taille, la décision se joue au niveau du dirigeant: vitesse maximale, mais angle mort = personne pour contredire. Réf: cases/ventes-marketing.md §C44
- S-C44-M (moyenne (15-100)): à cette taille, l'enjeu est l'interface: ce qui tenait par l'habitude doit devenir explicite sans devenir bureaucratique. Réf: cases/ventes-marketing.md §C44
- S-C44-G (grande (100+)): à cette taille, le systémique domine: chercher la règle du jeu (incitation, politique) derrière le comportement. Réf: cases/ventes-marketing.md §C44
- S-C44-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C44-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C45 — Le message qui parle de nous [ventes-marketing · SP]
Symptôme noyau: « les gens ne comprennent pas ce qu'on fait » · Action noyau: réécrire la page d'accueil: problème du client → plan simple → appel à l'action unique; test A/B si trafic suf
- S-C45-P (petite (1-15)): à cette taille, la décision se joue au niveau du dirigeant: vitesse maximale, mais angle mort = personne pour contredire. Réf: cases/ventes-marketing.md §C45
- S-C45-M (moyenne (15-100)): à cette taille, l'enjeu est l'interface: ce qui tenait par l'habitude doit devenir explicite sans devenir bureaucratique. Réf: cases/ventes-marketing.md §C45
- S-C45-G (grande (100+)): à cette taille, le systémique domine: chercher la règle du jeu (incitation, politique) derrière le comportement. Réf: cases/ventes-marketing.md §C45
- S-C45-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C45-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C46 — Pipeline qui ment [ventes-marketing · F7]
Symptôme noyau: « les prévisions de vente sont toujours fausses de 40% » · Action noyau: critères de sortie objectifs par étape (ex: « accès au décideur = a participé à un RDV »), nettoyage du pipeli
- S-C46-P (petite (1-15)): rien n'écrit + bus factor=1: risque existentiel; documenter les 5 savoirs critiques, une page chacun. Réf: cases/ventes-marketing.md §C46
- S-C46-M (moyenne (15-100)): standards partiels jamais maintenus, doublés de folklore local: un standard vivant = un propriétaire + une date de révision. Réf: cases/ventes-marketing.md §C46
- S-C46-G (grande (100+)): trop de standards, conformité sans sens, écart écrit/réel: confronter au gemba, supprimer autant qu'ajouter. Réf: cases/ventes-marketing.md §C46
- S-C46-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C46-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C47 — Remises en fin de trimestre [ventes-marketing · F9]
Symptôme noyau: « on brade chaque fin de trimestre pour faire le chiffre » · Action noyau: autorité de remise plafonnée + toute remise s'échange contre une contrepartie (engagement durée, volume, référ
- S-C47-P (petite (1-15)): l'optimisation locale est TEMPORELLE (sacrifier demain pour aujourd'hui): rituel mensuel « qu'hypothèque-t-on? ». Réf: cases/ventes-marketing.md §C47
- S-C47-M (moyenne (15-100)): naît avec les objectifs par équipe: un objectif COMMUN de flux au-dessus des objectifs locaux. Réf: cases/ventes-marketing.md §C47
- S-C47-G (grande (100+)): le mode par défaut (silos, budgets défendus): changer LA règle qui paie le comportement, pas moraliser. Réf: cases/ventes-marketing.md §C47
- S-C47-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C47-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C48 — Salon coûteux, zéro client [ventes-marketing · F8]
Symptôme noyau: « on fait 4 salons par an, on ne sait pas ce que ça rapporte » · Action noyau: sur le prochain salon: tag CRM dédié, rappel sous 48h standardisé, coût complet vs pipeline généré à 90 jours.
- S-C48-P (petite (1-15)): le feedback est immédiat mais non MESURÉ: les dérives lentes sont invisibles; 3 chiffres hebdo suffisent. Réf: cases/ventes-marketing.md §C48
- S-C48-M (moyenne (15-100)): premiers tableaux de bord déconnectés du terrain: chaque indicateur doit changer une décision quelque part, sinon le supprimer. Réf: cases/ventes-marketing.md §C48
- S-C48-G (grande (100+)): l'organisation optimise ses indicateurs, plus la réalité (pastèques): mesures côté client, auditer ce que les chiffres cachent. Réf: cases/ventes-marketing.md §C48
- S-C48-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C48-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C49 — Croissance qui cale au 2e segment [ventes-marketing · SP]
Symptôme noyau: « nos premiers clients adoraient, les nouveaux n'achètent pas » · Action noyau: choisir UNE niche tête de pont, construire le cas de référence complet, discours 100% niche.
- S-C49-P (petite (1-15)): à cette taille, la décision se joue au niveau du dirigeant: vitesse maximale, mais angle mort = personne pour contredire. Réf: cases/ventes-marketing.md §C49
- S-C49-M (moyenne (15-100)): à cette taille, l'enjeu est l'interface: ce qui tenait par l'habitude doit devenir explicite sans devenir bureaucratique. Réf: cases/ventes-marketing.md §C49
- S-C49-G (grande (100+)): à cette taille, le systémique domine: chercher la règle du jeu (incitation, politique) derrière le comportement. Réf: cases/ventes-marketing.md §C49
- S-C49-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C49-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C50 — Publicité qui rapporte des curieux [ventes-marketing · F9]
Symptôme noyau: « beaucoup de leads, aucun n'achète » · Action noyau: aligner le message pub sur l'offre réelle + juger le canal au coût par CLIENT.
- S-C50-P (petite (1-15)): l'optimisation locale est TEMPORELLE (sacrifier demain pour aujourd'hui): rituel mensuel « qu'hypothèque-t-on? ». Réf: cases/ventes-marketing.md §C50
- S-C50-M (moyenne (15-100)): naît avec les objectifs par équipe: un objectif COMMUN de flux au-dessus des objectifs locaux. Réf: cases/ventes-marketing.md §C50
- S-C50-G (grande (100+)): le mode par défaut (silos, budgets défendus): changer LA règle qui paie le comportement, pas moraliser. Réf: cases/ventes-marketing.md §C50
- S-C50-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C50-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C51 — Le commercial star qui ne transmet rien [ventes-marketing · F7]
Symptôme noyau: « sans Sarah, l'équipe vend moitié moins » · Action noyau: 5 appels de Sarah écoutés/décortiqués avec l'équipe (ce qu'elle DEMANDE, pas ce qu'elle dit); trame de qualifi
- S-C51-P (petite (1-15)): rien n'écrit + bus factor=1: risque existentiel; documenter les 5 savoirs critiques, une page chacun. Réf: cases/ventes-marketing.md §C51
- S-C51-M (moyenne (15-100)): standards partiels jamais maintenus, doublés de folklore local: un standard vivant = un propriétaire + une date de révision. Réf: cases/ventes-marketing.md §C51
- S-C51-G (grande (100+)): trop de standards, conformité sans sens, écart écrit/réel: confronter au gemba, supprimer autant qu'ajouter. Réf: cases/ventes-marketing.md §C51
- S-C51-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C51-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C52 — Churn silencieux des petits comptes [ventes-marketing · F8]
Symptôme noyau: « le chiffre est stable mais on remplace 30% de clients chaque année » · Action noyau: mesurer le churn par cohorte + 10 entretiens de départ (faits: qu'est-ce qui a déclenché?).
- S-C52-P (petite (1-15)): le feedback est immédiat mais non MESURÉ: les dérives lentes sont invisibles; 3 chiffres hebdo suffisent. Réf: cases/ventes-marketing.md §C52
- S-C52-M (moyenne (15-100)): premiers tableaux de bord déconnectés du terrain: chaque indicateur doit changer une décision quelque part, sinon le supprimer. Réf: cases/ventes-marketing.md §C52
- S-C52-G (grande (100+)): l'organisation optimise ses indicateurs, plus la réalité (pastèques): mesures côté client, auditer ce que les chiffres cachent. Réf: cases/ventes-marketing.md §C52
- S-C52-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C52-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C53 — Négociation qui donne tout [ventes-marketing · F7]
Symptôme noyau: « on gagne des deals mais à des conditions terribles » · Action noyau: trame: question calibrée (« qu'est-ce qui est trop cher par rapport à quoi? ») + silence + concession uniqueme
- S-C53-P (petite (1-15)): rien n'écrit + bus factor=1: risque existentiel; documenter les 5 savoirs critiques, une page chacun. Réf: cases/ventes-marketing.md §C53
- S-C53-M (moyenne (15-100)): standards partiels jamais maintenus, doublés de folklore local: un standard vivant = un propriétaire + une date de révision. Réf: cases/ventes-marketing.md §C53
- S-C53-G (grande (100+)): trop de standards, conformité sans sens, écart écrit/réel: confronter au gemba, supprimer autant qu'ajouter. Réf: cases/ventes-marketing.md §C53
- S-C53-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C53-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C54 — Contenu marketing sans suite [ventes-marketing · F5]
Symptôme noyau: « on publie 3 articles/semaine, aucun résultat » · Action noyau: les 10 questions les plus posées en RDV commercial deviennent les 10 prochains contenus, chacun avec un appel 
- S-C54-P (petite (1-15)): surproduction d'OFFRE plutôt que de stock: catalogue trop large pour la capacité; couper au top 20%. Réf: cases/ventes-marketing.md §C54
- S-C54-M (moyenne (15-100)): les premiers « au cas où » systémiques: rendre le coût du stock visible en jours de paie. Réf: cases/ventes-marketing.md §C54
- S-C54-G (grande (100+)): surproduction structurelle (budgets à consommer, machines à occuper): attaquer l'indicateur qui la récompense. Réf: cases/ventes-marketing.md §C54
- S-C54-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C54-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C55 — Lancement produit vers personne [ventes-marketing · SP]
Symptôme noyau: « le nouveau produit ne se vend pas alors qu'il est meilleur » · Action noyau: repositionner: pour quel client nos différences comptent-elles le plus? Choisir la catégorie qui rend nos forc
- S-C55-P (petite (1-15)): à cette taille, la décision se joue au niveau du dirigeant: vitesse maximale, mais angle mort = personne pour contredire. Réf: cases/ventes-marketing.md §C55
- S-C55-M (moyenne (15-100)): à cette taille, l'enjeu est l'interface: ce qui tenait par l'habitude doit devenir explicite sans devenir bureaucratique. Réf: cases/ventes-marketing.md §C55
- S-C55-G (grande (100+)): à cette taille, le systémique domine: chercher la règle du jeu (incitation, politique) derrière le comportement. Réf: cases/ventes-marketing.md §C55
- S-C55-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C55-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C56 — Référencement client jamais demandé [ventes-marketing · F7]
Symptôme noyau: « nos clients sont contents mais on n'a ni témoignages ni référence » · Action noyau: demande systématique au moment du succès mesuré (pas à la signature): témoignage 3 questions + accord de référ
- S-C56-P (petite (1-15)): rien n'écrit + bus factor=1: risque existentiel; documenter les 5 savoirs critiques, une page chacun. Réf: cases/ventes-marketing.md §C56
- S-C56-M (moyenne (15-100)): standards partiels jamais maintenus, doublés de folklore local: un standard vivant = un propriétaire + une date de révision. Réf: cases/ventes-marketing.md §C56
- S-C56-G (grande (100+)): trop de standards, conformité sans sens, écart écrit/réel: confronter au gemba, supprimer autant qu'ajouter. Réf: cases/ventes-marketing.md §C56
- S-C56-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C56-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C57 — Équipe de vente qui « visite » [ventes-marketing · F7]
Symptôme noyau: « beaucoup de RDV, peu de propositions » · Action noyau: règle: aucun RDV sans objectif d'avancement écrit avant, et prochaine étape datée obtenue pendant.
- S-C57-P (petite (1-15)): rien n'écrit + bus factor=1: risque existentiel; documenter les 5 savoirs critiques, une page chacun. Réf: cases/ventes-marketing.md §C57
- S-C57-M (moyenne (15-100)): standards partiels jamais maintenus, doublés de folklore local: un standard vivant = un propriétaire + une date de révision. Réf: cases/ventes-marketing.md §C57
- S-C57-G (grande (100+)): trop de standards, conformité sans sens, écart écrit/réel: confronter au gemba, supprimer autant qu'ajouter. Réf: cases/ventes-marketing.md §C57
- S-C57-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C57-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C58 — Le dirigeant goulot [management-organisation · F1]
Symptôme noyau: « tout attend ma validation, je travaille 70h » · Action noyau: pour les 5 types de décisions les plus fréquents: règle écrite + délégataire + revue a posteriori hebdo (au li
- S-C58-P (petite (1-15)): la contrainte est une PERSONNE (souvent le dirigeant/l'expert); la décharger des tâches sous-qualifiées avant tout recrutement. Réf: cases/management-organisation.md §C58
- S-C58-M (moyenne (15-100)): la contrainte devient un poste/équipe et SE DÉPLACE quand on la traite: réévaluer trimestriellement. Réf: cases/management-organisation.md §C58
- S-C58-G (grande (100+)): la contrainte est souvent une POLITIQUE (comité, budget, règle d'approbation): cartographier le flux de DÉCISION. Réf: cases/management-organisation.md §C58
- S-C58-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C58-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C59 — Réorganisation qui n'a rien changé [management-organisation · F9]
Symptôme noyau: « on a changé l'organigramme, les problèmes sont identiques » · Action noyau: prendre LE problème le plus cité et suivre son flux réel de bout en bout (qui attend quoi de qui) — corriger l
- S-C59-P (petite (1-15)): l'optimisation locale est TEMPORELLE (sacrifier demain pour aujourd'hui): rituel mensuel « qu'hypothèque-t-on? ». Réf: cases/management-organisation.md §C59
- S-C59-M (moyenne (15-100)): naît avec les objectifs par équipe: un objectif COMMUN de flux au-dessus des objectifs locaux. Réf: cases/management-organisation.md §C59
- S-C59-G (grande (100+)): le mode par défaut (silos, budgets défendus): changer LA règle qui paie le comportement, pas moraliser. Réf: cases/management-organisation.md §C59
- S-C59-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C59-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C60 — Objectifs annuels morts en mars [management-organisation · F8]
Symptôme noyau: « on fixe des objectifs en janvier, personne n'en parle en juin » · Action noyau: 3 objectifs max au trimestre, revue de 30 min toutes les 2 semaines, un propriétaire par objectif.
- S-C60-P (petite (1-15)): le feedback est immédiat mais non MESURÉ: les dérives lentes sont invisibles; 3 chiffres hebdo suffisent. Réf: cases/management-organisation.md §C60
- S-C60-M (moyenne (15-100)): premiers tableaux de bord déconnectés du terrain: chaque indicateur doit changer une décision quelque part, sinon le supprimer. Réf: cases/management-organisation.md §C60
- S-C60-G (grande (100+)): l'organisation optimise ses indicateurs, plus la réalité (pastèques): mesures côté client, auditer ce que les chiffres cachent. Réf: cases/management-organisation.md §C60
- S-C60-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C60-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C61 — La réunion d'équipe monologue [management-organisation · SP]
Symptôme noyau: « je parle, ils écoutent, rien ne sort » · Action noyau: inverser le format: l'équipe présente, le chef pose des questions et parle en dernier; toute idée reçoit un te
- S-C61-P (petite (1-15)): à cette taille, la décision se joue au niveau du dirigeant: vitesse maximale, mais angle mort = personne pour contredire. Réf: cases/management-organisation.md §C61
- S-C61-M (moyenne (15-100)): à cette taille, l'enjeu est l'interface: ce qui tenait par l'habitude doit devenir explicite sans devenir bureaucratique. Réf: cases/management-organisation.md §C61
- S-C61-G (grande (100+)): à cette taille, le systémique domine: chercher la règle du jeu (incitation, politique) derrière le comportement. Réf: cases/management-organisation.md §C61
- S-C61-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C61-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C62 — Recrutement au feeling [management-organisation · F7]
Symptôme noyau: « une embauche sur deux est un échec » · Action noyau: scorecard écrite avant diffusion (3 résultats attendus à 12 mois) + mise en situation réelle + entretiens stru
- S-C62-P (petite (1-15)): rien n'écrit + bus factor=1: risque existentiel; documenter les 5 savoirs critiques, une page chacun. Réf: cases/management-organisation.md §C62
- S-C62-M (moyenne (15-100)): standards partiels jamais maintenus, doublés de folklore local: un standard vivant = un propriétaire + une date de révision. Réf: cases/management-organisation.md §C62
- S-C62-G (grande (100+)): trop de standards, conformité sans sens, écart écrit/réel: confronter au gemba, supprimer autant qu'ajouter. Réf: cases/management-organisation.md §C62
- S-C62-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C62-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C63 — Le middle manager pris en sandwich [management-organisation · F2]
Symptôme noyau: « mes chefs d'équipe n'arbitrent rien, tout remonte ou pourrit » · Action noyau: contrat de rôle explicite (décide seul / décide et informe / propose) + la direction s'interdit le court-circu
- S-C63-P (petite (1-15)): l'ownership est clair (le patron) mais tout converge vers lui: le vrai sujet est la délégation par seuils. Réf: cases/management-organisation.md §C63
- S-C63-M (moyenne (15-100)): la zone morte classique: « quelqu'un d'autre » existe mais rien n'est écrit; une page qui-décide-quoi. Réf: cases/management-organisation.md §C63
- S-C63-G (grande (100+)): ownership sur papier, autorité réelle ailleurs (matrice, politique): aligner autorité et responsabilité sur UN flux critique. Réf: cases/management-organisation.md §C63
- S-C63-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C63-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C64 — Culture de l'urgence permanente [management-organisation · F9]
Symptôme noyau: « ici tout est pour hier, les gens s'épuisent » · Action noyau: une seule voie d'urgence avec critères écrits et coût visible (ce qui est dépriorisé est nommé); tout le reste
- S-C64-P (petite (1-15)): l'optimisation locale est TEMPORELLE (sacrifier demain pour aujourd'hui): rituel mensuel « qu'hypothèque-t-on? ». Réf: cases/management-organisation.md §C64
- S-C64-M (moyenne (15-100)): naît avec les objectifs par équipe: un objectif COMMUN de flux au-dessus des objectifs locaux. Réf: cases/management-organisation.md §C64
- S-C64-G (grande (100+)): le mode par défaut (silos, budgets défendus): changer LA règle qui paie le comportement, pas moraliser. Réf: cases/management-organisation.md §C64
- S-C64-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C64-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C65 — Les valeurs affichées, pas vécues [management-organisation · F9]
Symptôme noyau: « on a des valeurs au mur, le comportement réel est autre » · Action noyau: aligner UNE décision visible et coûteuse sur les valeurs (promotion, sanction, client refusé) — les valeurs se
- S-C65-P (petite (1-15)): l'optimisation locale est TEMPORELLE (sacrifier demain pour aujourd'hui): rituel mensuel « qu'hypothèque-t-on? ». Réf: cases/management-organisation.md §C65
- S-C65-M (moyenne (15-100)): naît avec les objectifs par équipe: un objectif COMMUN de flux au-dessus des objectifs locaux. Réf: cases/management-organisation.md §C65
- S-C65-G (grande (100+)): le mode par défaut (silos, budgets défendus): changer LA règle qui paie le comportement, pas moraliser. Réf: cases/management-organisation.md §C65
- S-C65-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C65-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C66 — Le comité qui re-décide [management-organisation · F7]
Symptôme noyau: « les décisions prises reviennent sur la table 3 semaines après » · Action noyau: registre: décision, critères, qui a tranché, conditions de réouverture (fait nouveau matériel uniquement).
- S-C66-P (petite (1-15)): rien n'écrit + bus factor=1: risque existentiel; documenter les 5 savoirs critiques, une page chacun. Réf: cases/management-organisation.md §C66
- S-C66-M (moyenne (15-100)): standards partiels jamais maintenus, doublés de folklore local: un standard vivant = un propriétaire + une date de révision. Réf: cases/management-organisation.md §C66
- S-C66-G (grande (100+)): trop de standards, conformité sans sens, écart écrit/réel: confronter au gemba, supprimer autant qu'ajouter. Réf: cases/management-organisation.md §C66
- S-C66-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C66-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C67 — Expansion qui dilue tout [management-organisation · F10]
Symptôme noyau: « on fait 6 activités, aucune ne décolle » · Action noyau: classer les 6 par avantage réel défendable; concentrer 70% des ressources sur la première; mettre 2 en veille 
- S-C67-P (petite (1-15)): multitâche structurel du dirigeant (7 casquettes): sanctuariser des blocs + déléguer par seuils. Réf: cases/management-organisation.md §C67
- S-C67-M (moyenne (15-100)): trop de projets, personne n'ose tuer: file d'attente explicite, finir avant de commencer. Réf: cases/management-organisation.md §C67
- S-C67-G (grande (100+)): l'inflation de projets est politique: portefeuille unique, arbitrage à cadence fixe, coût du retard visible. Réf: cases/management-organisation.md §C67
- S-C67-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C67-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C68 — Le franchisé/gérant qui n'applique rien [management-organisation · F3]
Symptôme noyau: « le siège décide, le terrain n'applique pas » · Action noyau: chaque directive part avec son pourquoi + un pilote sur 2 sites volontaires avant généralisation + retour terr
- S-C68-P (petite (1-15)): les handoffs critiques sont EXTERNES (clients, fournisseurs, sous-traitants): standardiser les 2 interfaces les plus fréquentes. Réf: cases/management-organisation.md §C68
- S-C68-M (moyenne (15-100)): le mur ventes→ops / terrain→admin: l'informel qui marchait à 10 casse à 30; fiches de passation co-écrites. Réf: cases/management-organisation.md §C68
- S-C68-G (grande (100+)): chaînes de 4+ handoffs, files invisibles, personne ne voit le bout-en-bout: cartographier UN flux entier avant toute action locale. Réf: cases/management-organisation.md §C68
- S-C68-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C68-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C69 — Conflit de deux associés [management-organisation · F2]
Symptôme noyau: « les décisions stratégiques sont paralysées depuis des mois » · Action noyau: protocole: domaines de dernière parole répartis par associé + arbitre externe pour le reste + désaccords docum
- S-C69-P (petite (1-15)): l'ownership est clair (le patron) mais tout converge vers lui: le vrai sujet est la délégation par seuils. Réf: cases/management-organisation.md §C69
- S-C69-M (moyenne (15-100)): la zone morte classique: « quelqu'un d'autre » existe mais rien n'est écrit; une page qui-décide-quoi. Réf: cases/management-organisation.md §C69
- S-C69-G (grande (100+)): ownership sur papier, autorité réelle ailleurs (matrice, politique): aligner autorité et responsabilité sur UN flux critique. Réf: cases/management-organisation.md §C69
- S-C69-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C69-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C70 — Croissance des effectifs, chute de la vitesse [management-organisation · F3]
Symptôme noyau: « à 10 on allait vite, à 40 tout est lent » · Action noyau: pour les 3 flux transverses les plus fréquents: qui fournit quoi à qui, sous quel format, en combien de temps 
- S-C70-P (petite (1-15)): les handoffs critiques sont EXTERNES (clients, fournisseurs, sous-traitants): standardiser les 2 interfaces les plus fréquentes. Réf: cases/management-organisation.md §C70
- S-C70-M (moyenne (15-100)): le mur ventes→ops / terrain→admin: l'informel qui marchait à 10 casse à 30; fiches de passation co-écrites. Réf: cases/management-organisation.md §C70
- S-C70-G (grande (100+)): chaînes de 4+ handoffs, files invisibles, personne ne voit le bout-en-bout: cartographier UN flux entier avant toute action locale. Réf: cases/management-organisation.md §C70
- S-C70-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C70-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C71 — L'indicateur pastèque [management-organisation · F8]
Symptôme noyau: « tous les voyants sont verts mais les clients partent » · Action noyau: remplacer 3 indicateurs internes par 3 mesures côté client (résolu du point de vue DU client, délai perçu, réa
- S-C71-P (petite (1-15)): le feedback est immédiat mais non MESURÉ: les dérives lentes sont invisibles; 3 chiffres hebdo suffisent. Réf: cases/management-organisation.md §C71
- S-C71-M (moyenne (15-100)): premiers tableaux de bord déconnectés du terrain: chaque indicateur doit changer une décision quelque part, sinon le supprimer. Réf: cases/management-organisation.md §C71
- S-C71-G (grande (100+)): l'organisation optimise ses indicateurs, plus la réalité (pastèques): mesures côté client, auditer ce que les chiffres cachent. Réf: cases/management-organisation.md §C71
- S-C71-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C71-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C72 — Le projet transformation enlisé [management-organisation · F10]
Symptôme noyau: « le grand projet dure depuis 18 mois, plus personne n'y croit » · Action noyau: découper: quelle amélioration mesurable en 4 semaines? Livrer, montrer, itérer; tuer les lots du périmètre san
- S-C72-P (petite (1-15)): multitâche structurel du dirigeant (7 casquettes): sanctuariser des blocs + déléguer par seuils. Réf: cases/management-organisation.md §C72
- S-C72-M (moyenne (15-100)): trop de projets, personne n'ose tuer: file d'attente explicite, finir avant de commencer. Réf: cases/management-organisation.md §C72
- S-C72-G (grande (100+)): l'inflation de projets est politique: portefeuille unique, arbitrage à cadence fixe, coût du retard visible. Réf: cases/management-organisation.md §C72
- S-C72-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C72-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C73 — Rentable sur le papier, à sec en banque [finance-cash · F8]
Symptôme noyau: « le compte de résultat est positif, la trésorerie est rouge » · Action noyau: prévision de trésorerie 13 semaines tenue chaque lundi + relance clients standardisée à J+3 du retard.
- S-C73-P (petite (1-15)): le feedback est immédiat mais non MESURÉ: les dérives lentes sont invisibles; 3 chiffres hebdo suffisent. Réf: cases/finance-cash.md §C73
- S-C73-M (moyenne (15-100)): premiers tableaux de bord déconnectés du terrain: chaque indicateur doit changer une décision quelque part, sinon le supprimer. Réf: cases/finance-cash.md §C73
- S-C73-G (grande (100+)): l'organisation optimise ses indicateurs, plus la réalité (pastèques): mesures côté client, auditer ce que les chiffres cachent. Réf: cases/finance-cash.md §C73
- S-C73-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C73-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C74 — Le produit vedette qui perd de l'argent [finance-cash · F8]
Symptôme noyau: « on vend beaucoup de X mais la marge globale baisse » · Action noyau: marge de contribution réelle sur le top 5 produits (temps contrainte consommé inclus [TOC: throughput accounti
- S-C74-P (petite (1-15)): le feedback est immédiat mais non MESURÉ: les dérives lentes sont invisibles; 3 chiffres hebdo suffisent. Réf: cases/finance-cash.md §C74
- S-C74-M (moyenne (15-100)): premiers tableaux de bord déconnectés du terrain: chaque indicateur doit changer une décision quelque part, sinon le supprimer. Réf: cases/finance-cash.md §C74
- S-C74-G (grande (100+)): l'organisation optimise ses indicateurs, plus la réalité (pastèques): mesures côté client, auditer ce que les chiffres cachent. Réf: cases/finance-cash.md §C74
- S-C74-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C74-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C75 — Devis au doigt mouillé [finance-cash · F8]
Symptôme noyau: « certains chantiers perdent de l'argent, on le découvre à la fin » · Action noyau: post-mortem 30 min sur chaque chantier fini (écart par poste); base de temps réels alimentée en continu.
- S-C75-P (petite (1-15)): le feedback est immédiat mais non MESURÉ: les dérives lentes sont invisibles; 3 chiffres hebdo suffisent. Réf: cases/finance-cash.md §C75
- S-C75-M (moyenne (15-100)): premiers tableaux de bord déconnectés du terrain: chaque indicateur doit changer une décision quelque part, sinon le supprimer. Réf: cases/finance-cash.md §C75
- S-C75-G (grande (100+)): l'organisation optimise ses indicateurs, plus la réalité (pastèques): mesures côté client, auditer ce que les chiffres cachent. Réf: cases/finance-cash.md §C75
- S-C75-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C75-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C76 — Facturation en retard chronique [finance-cash · F3]
Symptôme noyau: « on facture le 20 du mois suivant, parfois jamais » · Action noyau: signature/validation sur place à la fin de l'intervention (mobile); facturation à J+2.
- S-C76-P (petite (1-15)): les handoffs critiques sont EXTERNES (clients, fournisseurs, sous-traitants): standardiser les 2 interfaces les plus fréquentes. Réf: cases/finance-cash.md §C76
- S-C76-M (moyenne (15-100)): le mur ventes→ops / terrain→admin: l'informel qui marchait à 10 casse à 30; fiches de passation co-écrites. Réf: cases/finance-cash.md §C76
- S-C76-G (grande (100+)): chaînes de 4+ handoffs, files invisibles, personne ne voit le bout-en-bout: cartographier UN flux entier avant toute action locale. Réf: cases/finance-cash.md §C76
- S-C76-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C76-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C77 — Les achats de chacun [finance-cash · F7]
Symptôme noyau: « les dépenses grimpent, personne ne sait où » · Action noyau: revue trimestrielle des abonnements/récurrents (30 min, liste exhaustive, justifier ou couper) + un approbateu
- S-C77-P (petite (1-15)): rien n'écrit + bus factor=1: risque existentiel; documenter les 5 savoirs critiques, une page chacun. Réf: cases/finance-cash.md §C77
- S-C77-M (moyenne (15-100)): standards partiels jamais maintenus, doublés de folklore local: un standard vivant = un propriétaire + une date de révision. Réf: cases/finance-cash.md §C77
- S-C77-G (grande (100+)): trop de standards, conformité sans sens, écart écrit/réel: confronter au gemba, supprimer autant qu'ajouter. Réf: cases/finance-cash.md §C77
- S-C77-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C77-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C78 — Prix inchangés depuis 5 ans [finance-cash · F7]
Symptôme noyau: « on est débordés et pas rentables » · Action noyau: +8-12% sur les nouveaux clients d'abord; offre premium testée sur le segment le moins sensible.
- S-C78-P (petite (1-15)): rien n'écrit + bus factor=1: risque existentiel; documenter les 5 savoirs critiques, une page chacun. Réf: cases/finance-cash.md §C78
- S-C78-M (moyenne (15-100)): standards partiels jamais maintenus, doublés de folklore local: un standard vivant = un propriétaire + une date de révision. Réf: cases/finance-cash.md §C78
- S-C78-G (grande (100+)): trop de standards, conformité sans sens, écart écrit/réel: confronter au gemba, supprimer autant qu'ajouter. Réf: cases/finance-cash.md §C78
- S-C78-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C78-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C79 — Croissance financée par le découvert [finance-cash · F9]
Symptôme noyau: « plus on grandit, plus la banque appelle » · Action noyau: règle de croissance soutenable (nouveaux contrats plafonnés par le cash disponible) + acomptes systématiques n
- S-C79-P (petite (1-15)): l'optimisation locale est TEMPORELLE (sacrifier demain pour aujourd'hui): rituel mensuel « qu'hypothèque-t-on? ». Réf: cases/finance-cash.md §C79
- S-C79-M (moyenne (15-100)): naît avec les objectifs par équipe: un objectif COMMUN de flux au-dessus des objectifs locaux. Réf: cases/finance-cash.md §C79
- S-C79-G (grande (100+)): le mode par défaut (silos, budgets défendus): changer LA règle qui paie le comportement, pas moraliser. Réf: cases/finance-cash.md §C79
- S-C79-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C79-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C80 — L'investissement qui devait tout changer [finance-cash · F1]
Symptôme noyau: « la machine/le logiciel acheté 200k$ n'a rien changé » · Action noyau: post-mortem honnête (qu'aurions-nous dû vérifier?) + règle: tout investissement >X exige l'identification préa
- S-C80-P (petite (1-15)): la contrainte est une PERSONNE (souvent le dirigeant/l'expert); la décharger des tâches sous-qualifiées avant tout recrutement. Réf: cases/finance-cash.md §C80
- S-C80-M (moyenne (15-100)): la contrainte devient un poste/équipe et SE DÉPLACE quand on la traite: réévaluer trimestriellement. Réf: cases/finance-cash.md §C80
- S-C80-G (grande (100+)): la contrainte est souvent une POLITIQUE (comité, budget, règle d'approbation): cartographier le flux de DÉCISION. Réf: cases/finance-cash.md §C80
- S-C80-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C80-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C81 — Inscription massive, usage nul [produit-digital · F8]
Symptôme noyau: « 1000 inscrits, 30 actifs » · Action noyau: définir l'action d'activation (le « aha »), mesurer le funnel jusqu'à elle, raccourcir le chemin (première val
- S-C81-P (petite (1-15)): le feedback est immédiat mais non MESURÉ: les dérives lentes sont invisibles; 3 chiffres hebdo suffisent. Réf: cases/produit-digital.md §C81
- S-C81-M (moyenne (15-100)): premiers tableaux de bord déconnectés du terrain: chaque indicateur doit changer une décision quelque part, sinon le supprimer. Réf: cases/produit-digital.md §C81
- S-C81-G (grande (100+)): l'organisation optimise ses indicateurs, plus la réalité (pastèques): mesures côté client, auditer ce que les chiffres cachent. Réf: cases/produit-digital.md §C81
- S-C81-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C81-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C82 — Le site refait, conversions en baisse [produit-digital · F7]
Symptôme noyau: « le nouveau site est plus beau et convertit moins » · Action noyau: restaurer les 3 parcours principaux à leur logique connue; A/B sur toute modification future de parcours.
- S-C82-P (petite (1-15)): rien n'écrit + bus factor=1: risque existentiel; documenter les 5 savoirs critiques, une page chacun. Réf: cases/produit-digital.md §C82
- S-C82-M (moyenne (15-100)): standards partiels jamais maintenus, doublés de folklore local: un standard vivant = un propriétaire + une date de révision. Réf: cases/produit-digital.md §C82
- S-C82-G (grande (100+)): trop de standards, conformité sans sens, écart écrit/réel: confronter au gemba, supprimer autant qu'ajouter. Réf: cases/produit-digital.md §C82
- S-C82-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C82-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C83 — Backlog infini, moral à zéro [produit-digital · F5]
Symptôme noyau: « 400 tickets au backlog, l'équipe dev désespère » · Action noyau: déclarer faillite du backlog: archiver tout ce qui a >6 mois; ce qui compte reviendra; file courante plafonnée
- S-C83-P (petite (1-15)): surproduction d'OFFRE plutôt que de stock: catalogue trop large pour la capacité; couper au top 20%. Réf: cases/produit-digital.md §C83
- S-C83-M (moyenne (15-100)): les premiers « au cas où » systémiques: rendre le coût du stock visible en jours de paie. Réf: cases/produit-digital.md §C83
- S-C83-G (grande (100+)): surproduction structurelle (budgets à consommer, machines à occuper): attaquer l'indicateur qui la récompense. Réf: cases/produit-digital.md §C83
- S-C83-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C83-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C84 — Bug récurrent, rustines empilées [produit-digital · F6]
Symptôme noyau: « le même module casse chaque mois » · Action noyau: chiffrer le coût annuel des rustines (heures × incidents), décision refonte/refonte partielle sur ce chiffre; 
- S-C84-P (petite (1-15)): le dirigeant EST le contrôle qualité: transférer une checklist de 5 points à l'équipe avant qu'il ne sature. Réf: cases/produit-digital.md §C84
- S-C84-M (moyenne (15-100)): le contrôle se centralise en fin de chaîne (« le bureau vérifie »): revenir au contrôle à la source + droit d'arrêt. Réf: cases/produit-digital.md §C84
- S-C84-G (grande (100+)): départements qualité en aval, le producteur ne voit jamais ses défauts: boucle de retour DIRECTE producteur↔défaut. Réf: cases/produit-digital.md §C84
- S-C84-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C84-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C85 — Feature demandée par le client star [produit-digital · F9]
Symptôme noyau: « on développe ce que demande notre plus gros client, le produit devient un monstre » · Action noyau: séparer: socle produit (roadmap protégée) vs développements spécifiques facturés à leur coût complet.
- S-C85-P (petite (1-15)): l'optimisation locale est TEMPORELLE (sacrifier demain pour aujourd'hui): rituel mensuel « qu'hypothèque-t-on? ». Réf: cases/produit-digital.md §C85
- S-C85-M (moyenne (15-100)): naît avec les objectifs par équipe: un objectif COMMUN de flux au-dessus des objectifs locaux. Réf: cases/produit-digital.md §C85
- S-C85-G (grande (100+)): le mode par défaut (silos, budgets défendus): changer LA règle qui paie le comportement, pas moraliser. Réf: cases/produit-digital.md §C85
- S-C85-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C85-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C86 — Déploiements du vendredi soir [produit-digital · F4]
Symptôme noyau: « chaque mise en production est un événement à risque » · Action noyau: réduire la taille des releases (hebdo, petites), automatiser le test de rollback d'abord.
- S-C86-P (petite (1-15)): aucune masse pour amortir: une grosse commande/absence déstabilise tout; tampons simples (délais annoncés, polyvalence, cash). Réf: cases/produit-digital.md §C86
- S-C86-M (moyenne (15-100)): la variabilité AUTO-INFLIGÉE domine (urgences commerciales, replanifications): chasser le mura interne d'abord. Réf: cases/produit-digital.md §C86
- S-C86-G (grande (100+)): la variabilité se propage et s'amplifie entre départements: découpler par buffers aux points critiques, synchroniser les calendriers. Réf: cases/produit-digital.md §C86
- S-C86-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C86-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C87 — Support qui répond 50 fois la même chose [produit-digital · F5]
Symptôme noyau: « le support croule sous des questions identiques » · Action noyau: corriger les 3 écrans responsables + réponses types pour le reste + FAQ au point de friction (pas dans un cent
- S-C87-P (petite (1-15)): surproduction d'OFFRE plutôt que de stock: catalogue trop large pour la capacité; couper au top 20%. Réf: cases/produit-digital.md §C87
- S-C87-M (moyenne (15-100)): les premiers « au cas où » systémiques: rendre le coût du stock visible en jours de paie. Réf: cases/produit-digital.md §C87
- S-C87-G (grande (100+)): surproduction structurelle (budgets à consommer, machines à occuper): attaquer l'indicateur qui la récompense. Réf: cases/produit-digital.md §C87
- S-C87-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C87-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C88 — La démo qui vend un produit qui n'existe pas [produit-digital · F3]
Symptôme noyau: « les ventes promettent, la prod découvre en réunion client » · Action noyau: kit de démo versionné = uniquement l'existant + registre des engagements pris (visible produit) + toute promes
- S-C88-P (petite (1-15)): les handoffs critiques sont EXTERNES (clients, fournisseurs, sous-traitants): standardiser les 2 interfaces les plus fréquentes. Réf: cases/produit-digital.md §C88
- S-C88-M (moyenne (15-100)): le mur ventes→ops / terrain→admin: l'informel qui marchait à 10 casse à 30; fiches de passation co-écrites. Réf: cases/produit-digital.md §C88
- S-C88-G (grande (100+)): chaînes de 4+ handoffs, files invisibles, personne ne voit le bout-en-bout: cartographier UN flux entier avant toute action locale. Réf: cases/produit-digital.md §C88
- S-C88-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C88-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C89 — Boutique: vendeurs occupés, clients ignorés [terrain-branches · F9]
Symptôme noyau: « les clients attendent pendant que l'équipe fait autre chose » · Action noyau: règle d'or affichée (client > tout) + tâches déplacées aux heures creuses (le flux client est prévisible).
- S-C89-P (petite (1-15)): l'optimisation locale est TEMPORELLE (sacrifier demain pour aujourd'hui): rituel mensuel « qu'hypothèque-t-on? ». Réf: cases/terrain-branches.md §C89
- S-C89-M (moyenne (15-100)): naît avec les objectifs par équipe: un objectif COMMUN de flux au-dessus des objectifs locaux. Réf: cases/terrain-branches.md §C89
- S-C89-G (grande (100+)): le mode par défaut (silos, budgets défendus): changer LA règle qui paie le comportement, pas moraliser. Réf: cases/terrain-branches.md §C89
- S-C89-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C89-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C90 — Restaurant: cuisine et salle en guerre [terrain-branches · F3]
Symptôme noyau: « les plats sortent froids ou tous en même temps » · Action noyau: envoi cadencé par table (règle simple d'espacement) + écran/rail visible des commandes en cours.
- S-C90-P (petite (1-15)): les handoffs critiques sont EXTERNES (clients, fournisseurs, sous-traitants): standardiser les 2 interfaces les plus fréquentes. Réf: cases/terrain-branches.md §C90
- S-C90-M (moyenne (15-100)): le mur ventes→ops / terrain→admin: l'informel qui marchait à 10 casse à 30; fiches de passation co-écrites. Réf: cases/terrain-branches.md §C90
- S-C90-G (grande (100+)): chaînes de 4+ handoffs, files invisibles, personne ne voit le bout-en-bout: cartographier UN flux entier avant toute action locale. Réf: cases/terrain-branches.md §C90
- S-C90-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C90-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C91 — Chantier: équipes qui s'attendent [terrain-branches · F10]
Symptôme noyau: « les corps de métier se bloquent mutuellement, les chantiers glissent » · Action noyau: chantier pilote en « relay race »: séquence complète planifiée, équipe suivante prévenue à J-2 par l'équipe pr
- S-C91-P (petite (1-15)): multitâche structurel du dirigeant (7 casquettes): sanctuariser des blocs + déléguer par seuils. Réf: cases/terrain-branches.md §C91
- S-C91-M (moyenne (15-100)): trop de projets, personne n'ose tuer: file d'attente explicite, finir avant de commencer. Réf: cases/terrain-branches.md §C91
- S-C91-G (grande (100+)): l'inflation de projets est politique: portefeuille unique, arbitrage à cadence fixe, coût du retard visible. Réf: cases/terrain-branches.md §C91
- S-C91-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C91-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C92 — Salon de services: no-shows qui ruinent les journées [terrain-branches · F8]
Symptôme noyau: « 20% de rendez-vous non honorés » · Action noyau: rappel J-1 avec confirmation en un clic + liste d'attente activée dès annulation + empreinte/acompte sur les c
- S-C92-P (petite (1-15)): le feedback est immédiat mais non MESURÉ: les dérives lentes sont invisibles; 3 chiffres hebdo suffisent. Réf: cases/terrain-branches.md §C92
- S-C92-M (moyenne (15-100)): premiers tableaux de bord déconnectés du terrain: chaque indicateur doit changer une décision quelque part, sinon le supprimer. Réf: cases/terrain-branches.md §C92
- S-C92-G (grande (100+)): l'organisation optimise ses indicateurs, plus la réalité (pastèques): mesures côté client, auditer ce que les chiffres cachent. Réf: cases/terrain-branches.md §C92
- S-C92-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C92-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C93 — Immobilier/agence: mandats qui dorment [terrain-branches · F8]
Symptôme noyau: « des mandats restent 6 mois sans action ni contact » · Action noyau: revue de portefeuille bimensuelle: chaque mandat a une prochaine action datée + un contact vendeur programmé.
- S-C93-P (petite (1-15)): le feedback est immédiat mais non MESURÉ: les dérives lentes sont invisibles; 3 chiffres hebdo suffisent. Réf: cases/terrain-branches.md §C93
- S-C93-M (moyenne (15-100)): premiers tableaux de bord déconnectés du terrain: chaque indicateur doit changer une décision quelque part, sinon le supprimer. Réf: cases/terrain-branches.md §C93
- S-C93-G (grande (100+)): l'organisation optimise ses indicateurs, plus la réalité (pastèques): mesures côté client, auditer ce que les chiffres cachent. Réf: cases/terrain-branches.md §C93
- S-C93-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C93-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C94 — Franchise: le nouveau site sous-performe [terrain-branches · F7]
Symptôme noyau: « le site ouvert il y a 8 mois fait -40% vs le modèle » · Action noyau: audit d'écart aux standards (checklist du site modèle) + immersion du gérant 3 jours dans le meilleur site + p
- S-C94-P (petite (1-15)): rien n'écrit + bus factor=1: risque existentiel; documenter les 5 savoirs critiques, une page chacun. Réf: cases/terrain-branches.md §C94
- S-C94-M (moyenne (15-100)): standards partiels jamais maintenus, doublés de folklore local: un standard vivant = un propriétaire + une date de révision. Réf: cases/terrain-branches.md §C94
- S-C94-G (grande (100+)): trop de standards, conformité sans sens, écart écrit/réel: confronter au gemba, supprimer autant qu'ajouter. Réf: cases/terrain-branches.md §C94
- S-C94-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C94-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C95 — Garage/atelier: véhicules qui attendent des pièces [terrain-branches · F1]
Symptôme noyau: « les ponts sont occupés par des véhicules qui attendent des pièces » · Action noyau: diagnostic et commande de pièces AVANT la prise de RDV atelier (pré-visite ou photos); le véhicule ne monte qu
- S-C95-P (petite (1-15)): la contrainte est une PERSONNE (souvent le dirigeant/l'expert); la décharger des tâches sous-qualifiées avant tout recrutement. Réf: cases/terrain-branches.md §C95
- S-C95-M (moyenne (15-100)): la contrainte devient un poste/équipe et SE DÉPLACE quand on la traite: réévaluer trimestriellement. Réf: cases/terrain-branches.md §C95
- S-C95-G (grande (100+)): la contrainte est souvent une POLITIQUE (comité, budget, règle d'approbation): cartographier le flux de DÉCISION. Réf: cases/terrain-branches.md §C95
- S-C95-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C95-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C96 — Cabinet médical/dentaire: fauteuil vide entre deux patients [terrain-branches · F1]
Symptôme noyau: « on refuse des patients mais le fauteuil est vide 90 min/jour » · Action noyau: préparation en temps masqué (assistante pendant l'acte précédent) + liste de rappel courte pour combler les tr
- S-C96-P (petite (1-15)): la contrainte est une PERSONNE (souvent le dirigeant/l'expert); la décharger des tâches sous-qualifiées avant tout recrutement. Réf: cases/terrain-branches.md §C96
- S-C96-M (moyenne (15-100)): la contrainte devient un poste/équipe et SE DÉPLACE quand on la traite: réévaluer trimestriellement. Réf: cases/terrain-branches.md §C96
- S-C96-G (grande (100+)): la contrainte est souvent une POLITIQUE (comité, budget, règle d'approbation): cartographier le flux de DÉCISION. Réf: cases/terrain-branches.md §C96
- S-C96-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C96-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C97 — Association/OBNL: bénévoles qui s'évaporent [terrain-branches · F2]
Symptôme noyau: « on recrute des bénévoles, ils partent en 2 mois » · Action noyau: rôle écrit dès l'arrivée + parrain + retour d'impact mensuel concret (chiffres, histoires).
- S-C97-P (petite (1-15)): l'ownership est clair (le patron) mais tout converge vers lui: le vrai sujet est la délégation par seuils. Réf: cases/terrain-branches.md §C97
- S-C97-M (moyenne (15-100)): la zone morte classique: « quelqu'un d'autre » existe mais rien n'est écrit; une page qui-décide-quoi. Réf: cases/terrain-branches.md §C97
- S-C97-G (grande (100+)): ownership sur papier, autorité réelle ailleurs (matrice, politique): aligner autorité et responsabilité sur UN flux critique. Réf: cases/terrain-branches.md §C97
- S-C97-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C97-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C98 — Boulangerie/production du matin: invendus ET ruptures [terrain-branches · F8]
Symptôme noyau: « on jette le soir et on manque le matin » · Action noyau: 4 semaines de relevé simple (production/invendus/ruptures par produit×jour) puis gabarits de production par jo
- S-C98-P (petite (1-15)): le feedback est immédiat mais non MESURÉ: les dérives lentes sont invisibles; 3 chiffres hebdo suffisent. Réf: cases/terrain-branches.md §C98
- S-C98-M (moyenne (15-100)): premiers tableaux de bord déconnectés du terrain: chaque indicateur doit changer une décision quelque part, sinon le supprimer. Réf: cases/terrain-branches.md §C98
- S-C98-G (grande (100+)): l'organisation optimise ses indicateurs, plus la réalité (pastèques): mesures côté client, auditer ce que les chiffres cachent. Réf: cases/terrain-branches.md §C98
- S-C98-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C98-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C99 — Transport/livraison: tournées qui débordent [terrain-branches · F7]
Symptôme noyau: « les chauffeurs finissent à 20h, les clients se plaignent des créneaux ratés » · Action noyau: créneaux par zone géographique (pas à la demande) + debrief hebdo des 5 pires échecs de livraison.
- S-C99-P (petite (1-15)): rien n'écrit + bus factor=1: risque existentiel; documenter les 5 savoirs critiques, une page chacun. Réf: cases/terrain-branches.md §C99
- S-C99-M (moyenne (15-100)): standards partiels jamais maintenus, doublés de folklore local: un standard vivant = un propriétaire + une date de révision. Réf: cases/terrain-branches.md §C99
- S-C99-G (grande (100+)): trop de standards, conformité sans sens, écart écrit/réel: confronter au gemba, supprimer autant qu'ajouter. Réf: cases/terrain-branches.md §C99
- S-C99-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C99-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C100 — École/formation: absentéisme qui tue les cohortes [terrain-branches · F8]
Symptôme noyau: « 40% d'abandon en cours de formation » · Action noyau: contact humain sous 48h dès la 1re absence non excusée + entretien des abandons (données).
- S-C100-P (petite (1-15)): le feedback est immédiat mais non MESURÉ: les dérives lentes sont invisibles; 3 chiffres hebdo suffisent. Réf: cases/terrain-branches.md §C100
- S-C100-M (moyenne (15-100)): premiers tableaux de bord déconnectés du terrain: chaque indicateur doit changer une décision quelque part, sinon le supprimer. Réf: cases/terrain-branches.md §C100
- S-C100-G (grande (100+)): l'organisation optimise ses indicateurs, plus la réalité (pastèques): mesures côté client, auditer ce que les chiffres cachent. Réf: cases/terrain-branches.md §C100
- S-C100-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C100-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C101 — Hôtel/hébergement: avis moyens malgré de gros efforts [terrain-branches · F9]
Symptôme noyau: « on investit partout, la note stagne à 3,8 » · Action noyau: traiter UNIQUEMENT les 2 irritants dominants (isolation des chambres concernées, check-in mobile/pré-enregistr
- S-C101-P (petite (1-15)): l'optimisation locale est TEMPORELLE (sacrifier demain pour aujourd'hui): rituel mensuel « qu'hypothèque-t-on? ». Réf: cases/terrain-branches.md §C101
- S-C101-M (moyenne (15-100)): naît avec les objectifs par équipe: un objectif COMMUN de flux au-dessus des objectifs locaux. Réf: cases/terrain-branches.md §C101
- S-C101-G (grande (100+)): le mode par défaut (silos, budgets défendus): changer LA règle qui paie le comportement, pas moraliser. Réf: cases/terrain-branches.md §C101
- S-C101-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C101-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C102 — Point de vente: démarque inconnue en hausse [terrain-branches · F8]
Symptôme noyau: « l'écart d'inventaire double chaque année » · Action noyau: mesurer par famille de produits/zone pendant 2 mois (où exactement?) puis traiter la zone dominante (réception
- S-C102-P (petite (1-15)): le feedback est immédiat mais non MESURÉ: les dérives lentes sont invisibles; 3 chiffres hebdo suffisent. Réf: cases/terrain-branches.md §C102
- S-C102-M (moyenne (15-100)): premiers tableaux de bord déconnectés du terrain: chaque indicateur doit changer une décision quelque part, sinon le supprimer. Réf: cases/terrain-branches.md §C102
- S-C102-G (grande (100+)): l'organisation optimise ses indicateurs, plus la réalité (pastèques): mesures côté client, auditer ce que les chiffres cachent. Réf: cases/terrain-branches.md §C102
- S-C102-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C102-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C103 — Service à domicile: 30% du temps sur la route [terrain-branches · F7]
Symptôme noyau: « les intervenants passent plus de temps à rouler qu'à intervenir » · Action noyau: sectoriser les portefeuilles clients par zone; nouveaux clients affectés par secteur; échanges de clients exis
- S-C103-P (petite (1-15)): rien n'écrit + bus factor=1: risque existentiel; documenter les 5 savoirs critiques, une page chacun. Réf: cases/terrain-branches.md §C103
- S-C103-M (moyenne (15-100)): standards partiels jamais maintenus, doublés de folklore local: un standard vivant = un propriétaire + une date de révision. Réf: cases/terrain-branches.md §C103
- S-C103-G (grande (100+)): trop de standards, conformité sans sens, écart écrit/réel: confronter au gemba, supprimer autant qu'ajouter. Réf: cases/terrain-branches.md §C103
- S-C103-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C103-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md

## C104 — Reprise d'entreprise: tout dans la tête du cédant [terrain-branches · F7]
Symptôme noyau: « le fondateur parti, les clients et le savoir partent aussi » · Action noyau: 90 jours de transfert structuré: cartographie des 20 savoirs critiques, doublure sur chaque relation client cl
- S-C104-P (petite (1-15)): rien n'écrit + bus factor=1: risque existentiel; documenter les 5 savoirs critiques, une page chacun. Réf: cases/terrain-branches.md §C104
- S-C104-M (moyenne (15-100)): standards partiels jamais maintenus, doublés de folklore local: un standard vivant = un propriétaire + une date de révision. Réf: cases/terrain-branches.md §C104
- S-C104-G (grande (100+)): trop de standards, conformité sans sens, écart écrit/réel: confronter au gemba, supprimer autant qu'ajouter. Réf: cases/terrain-branches.md §C104
- S-C104-croissance: en croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos). Réf: modificateurs-stade.md
- S-C104-crise: en crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses. Réf: modificateurs-stade.md
