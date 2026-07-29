# Frictions & mécanismes causaux — v1 (statut: candidate)

Format: FRICTION → signaux typiques → mécanismes causaux probables (ordonnés) → variable cachée à vérifier. Source entre [].

## F1. Goulot / contrainte de capacité [The Goal, TOC]
Signaux: file d'attente stable devant UNE étape; ressources aval sous-chargées; heures sup localisées; le débit global ne bouge pas malgré les efforts ailleurs.
Mécanismes: capacité de la contrainte < demande; contrainte mal exploitée (pauses, pannes, setup, travail non conforme qui y repasse); non-subordination (l'amont produit à son rythme, pas au rythme de la contrainte).
Variable cachée: la contrainte est parfois une POLITIQUE (règle d'approbation, lot minimum), pas une machine/personne.
Anti-pattern d'action: améliorer une non-contrainte (aucun effet débit) [TOC: une heure gagnée sur une non-contrainte est un mirage].

## F2. Ownership ambigu / décision sans propriétaire [Shook, Managing to Learn]
Signaux: « tout le monde » est responsable; chaque cas se règle par escalade; délais d'attente entre intervenants; débats récurrents sur qui décide.
Mécanismes: responsabilité définie par fonction et non par processus; pas de propriétaire de problème (A3 owner); autorité de décision non déléguée au niveau qui a l'information.
Variable cachée: un owner officiel existe parfois sur papier mais n'a ni le temps ni l'autorité réelle.

## F3. Handoff / interface entre rôles [Gemba Kaizen; Phoenix Project]
Signaux: le travail attend ENTRE les étapes, pas DANS les étapes; reprises fréquentes (« il manque une info »); chacun optimise son segment.
Mécanismes: pas de standard de transmission (quoi, format, quand); pas de déclencheur explicite; taille de lot de transfert trop grande; files invisibles (boîtes mail, tickets).
Variable cachée: le travail invisible — demandes qui arrivent hors canal officiel [Phoenix Project].

## F4. Variabilité non maîtrisée [Factory Physics; Ohno]
Signaux: performance en dents de scie; les moyennes semblent bonnes mais les délais explosent par vagues; urgences permanentes.
Mécanismes: variabilité d'arrivée (demande par à-coups) ou de traitement (durées imprévisibles, interruptions); forte utilisation + forte variabilité = files exponentielles (voir lois.md L2); mura (irrégularité) créant muri (surcharge) puis muda (gaspillage) [Ohno].
Variable cachée: les interruptions/multitâche comme source de variabilité de traitement.

## F5. Surproduction / stock intermédiaire [Ohno, TPS; Learning to See]
Signaux: encours importants; on « avance » du travail non demandé; retouches massives quand un défaut est découvert tard.
Mécanismes: production poussée (push) déconnectée de la demande; taille de lots excessive; chaque étape optimise sa propre efficience.
Variable cachée: l'encours cache les problèmes (pannes, défauts, absences) — le réduire les révèle [TPS].

## F6. Défauts détectés tard / boucle de reprise [Ohno jidoka; Gemba Kaizen]
Signaux: % de reprises élevé; le client détecte les erreurs; la même erreur revient.
Mécanismes: contrôle en fin de chaîne au lieu de à la source; pas d'arrêt au défaut (jidoka); cause racine jamais traitée (on corrige l'instance, pas le système); standard absent ou non tenu.
Variable cachée: la peur de signaler (on cache les défauts au lieu de les remonter).

## F7. Standard absent ou non vivant [Imai, Gemba Kaizen; Rother, Kata]
Signaux: chacun fait « à sa façon »; la performance dépend de QUI fait; l'intégration des nouveaux est longue; les améliorations ne tiennent pas.
Mécanismes: pas de standard écrit du travail; standard écrit mais jamais confronté au terrain; amélioration sans standardisation (retour à l'ancien état) [Imai: pas de kaizen sans standard].
Variable cachée: le standard réel (ce que font les gens) diverge du standard officiel.

## F8. Boucle de rétroaction manquante [Meadows; Kata]
Signaux: les mêmes problèmes reviennent; personne ne sait si les actions passées ont marché; les décisions se prennent sur des impressions.
Mécanismes: pas de mesure de l'écart current/target; résultat des actions jamais vérifié; délai de feedback trop long pour apprendre.
Variable cachée: une mesure existe mais personne ne la regarde au bon rythme.

## F9. Optimisation locale contre le système [TOC; Meadows]
Signaux: chaque équipe atteint ses objectifs, le résultat global se dégrade; conflits d'objectifs entre services (ventes vs ops, vitesse vs qualité).
Mécanismes: indicateurs locaux récompensant un comportement globalement nuisible; le point de levier est ailleurs que là où on agit [Meadows: leverage points].
Variable cachée: l'indicateur qui pilote réellement les comportements (souvent informel: ce que le chef regarde).

## F10. Surcharge chronique / multitâche [Critical Chain; Phoenix Project]
Signaux: tout est urgent; les délais promis ne sont jamais tenus; les gens jonglent entre 5+ sujets; le lead time s'allonge alors que tout le monde est débordé.
Mécanismes: trop de travaux lancés en parallèle (WIP non plafonné); le multitâche allonge TOUS les délais; sécurité gaspillée en début de tâche (syndrome de l'étudiant) [Critical Chain].
Variable cachée: qui/quoi injecte du travail non planifié dans le système.

## Règle de dominance [TOC + doctrine ScaleIQ]
Plusieurs frictions coexistent toujours. La dominante est celle dont la levée
changerait le plus le débit/délai global. Test: « si on ne réglait QUE ça,
qu'est-ce qui changerait? » Une friction qui explique la variance observée
(pourquoi ça marche parfois et pas d'autres fois) est meilleure candidate
qu'une friction toujours présente.
