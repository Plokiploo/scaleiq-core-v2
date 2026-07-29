# Cas — Opérations de service & back-office (statut: candidate)
Format compact: Symptôme / Observations / Fausse piste / Friction→Cause / Action / Validation ↔ Invalidation.

### C13. Demandes clients perdues entre canaux [F3; Phoenix Project]
Symptôme: « des demandes tombent dans les trous, on l'apprend quand le client rappelle fâché ».
Observations: 4 canaux d'entrée (mail perso, mail générique, téléphone, passage); aucun registre unique; chacun traite « ses » demandes.
Fausse piste: « il faut un CRM » (l'outil sans canal unique reproduira le problème).
Friction: F3 — pas de point d'entrée unique ni de propriétaire de la file.
Action: un canal officiel unique + transfert systématique des autres canaux vers lui pendant 2 semaines.
Validation: zéro demande découverte « perdue » sur la période ↔ Invalidation: pertes persistantes = le tri APRÈS entrée est en cause, pas l'entrée.

### C14. Dossier « complet » jamais complet [F6; Gemba Kaizen]
Symptôme: « on renvoie les dossiers 3 fois au client pour pièces manquantes ».
Observations: la liste des pièces exigées varie selon l'agent; le contrôle arrive après 10 jours de file.
Fausse piste: « les clients sont négligents ».
Friction: F6+F7 — exigences non standardisées, contrôle tardif.
Action: checklist unique publiée au client + contrôle de complétude à la RÉCEPTION (5 min) avant mise en file.
Validation: taux de dossiers complets premier envoi > 70% ↔ Invalidation: taux inchangé = la checklist est ambiguë ou le client ne la voit pas.

### C15. Le back-office « fantôme » du samedi [F4; variance]
Symptôme: « le lundi est infernal, le reste de la semaine ça va ».
Observations: les demandes du week-end s'accumulent sans traitement; le lundi cumule 3 jours d'arrivées + les urgences du jour.
Fausse piste: « il faut du renfort le lundi » (traite le symptôme).
Friction: F4 — variabilité d'arrivée structurelle non lissée.
Action: 2h de traitement asynchrone le samedi OU annonce claire de délai J+2 le week-end + créneau protégé lundi matin.
Validation: pic du lundi -50% ↔ Invalidation: pic persistant = les urgences du lundi viennent d'ailleurs (chercher la source).

### C16. Approbations en cascade [F2; High Output Management]
Symptôme: « la moindre dépense de 50$ prend 2 semaines ».
Observations: 3 niveaux de signature quel que soit le montant; chaque niveau ajoute 2-4 jours d'attente; aucun refus enregistré depuis 6 mois.
Fausse piste: « digitaliser le formulaire » (accélère un circuit inutile).
Friction: F2/F9 — contrôle sans valeur ajoutée (100% d'approbation = le contrôle ne discrimine rien) [Grove: déléguer avec seuils].
Action: seuil d'auto-approbation (ex: <200$) avec audit a posteriori par échantillon.
Validation: délai médian <2 jours, zéro dérive à l'audit ↔ Invalidation: dérives à l'audit = le seuil est trop haut, pas le principe faux.

### C17. L'expert qui est partout [F1 humaine; Critical Chain]
Symptôme: « tout passe par Marc, sans lui rien ne sort ».
Observations: Marc est sur le chemin de 80% des dossiers; sa file d'attente est de 2 semaines; il passe 40% de son temps à répondre à des questions simples.
Fausse piste: « cloner Marc / embaucher un autre Marc ».
Friction: F1 — contrainte humaine mal exploitée (surchargée de tâches sans valeur).
Action: exploiter avant d'élever — FAQ des 10 questions récurrentes + retirer à Marc tout ce qui ne requiert pas son expertise; ses priorités affichées.
Validation: file de Marc -50% en 3 semaines ↔ Invalidation: file stable = le flux entrant vers lui est le problème (qui lui envoie quoi et pourquoi).

### C18. Réunions de suivi qui ne suivent rien [F8; Measure What Matters]
Symptôme: « on se réunit chaque semaine mais rien n'avance entre les réunions ».
Observations: pas d'écart mesuré, pas d'engagements datés, le compte-rendu liste des discussions pas des décisions; les mêmes sujets reviennent 4 semaines de suite.
Fausse piste: « supprimer les réunions » (supprime le seul feedback existant au lieu de le réparer).
Friction: F8 — boucle de feedback sans contenu (pas de current/target/écart).
Action: format imposé 20 min: 3 indicateurs, écarts, engagements nominatifs datés, revue des engagements précédents d'abord.
Validation: >80% des engagements tenus semaine suivante ↔ Invalidation: engagements non tenus malgré le format = problème de charge (F10) ou d'autorité (F2), pas de format.

### C19. Onboarding nouvel employé de 3 mois [F7; Kata]
Symptôme: « un nouveau met un trimestre à être utile ».
Observations: pas de parcours écrit; l'apprentissage dépend de qui a le temps; chaque nouveau réinvente ses méthodes.
Fausse piste: « recruter des gens plus expérimentés » (coût, et le problème reste).
Friction: F7 — savoir non standardisé, transmission orale aléatoire.
Action: les 5 tâches les plus fréquentes documentées en une page chacune par les meilleurs; binôme désigné 2 semaines.
Validation: nouveau autonome sur les 5 tâches en 3 semaines ↔ Invalidation: toujours 3 mois = la complexité est réelle (segmenter le rôle) ou la doc n'est pas utilisée (demander pourquoi).

### C20. Planning refait 3 fois par jour [F4+F9]
Symptôme: « le planificateur passe sa journée à replanifier ».
Observations: toute demande client modifie le planning immédiatement; les équipes terrain découvrent les changements en route; personne ne mesure le coût des replanifications.
Fausse piste: « meilleur logiciel de planning ».
Friction: F4 — le système amplifie la variabilité au lieu de l'amortir (nervosité) [DDMRP: découplage].
Action: gel du planning à J-1 16h; les demandes après-coup vont au lendemain sauf urgence définie par critères écrits.
Validation: replanifications intra-jour -80%, ponctualité stable ou meilleure ↔ Invalidation: clients perdus à cause du gel = segmenter (voie urgente payante).

### C21. La file invisible des « petites faveurs » [F10; Phoenix Project]
Symptôme: « on n'arrive plus à faire notre vrai travail ».
Observations: 30-40% du temps part en demandes latérales non enregistrées (collègues, autres services); aucune trace, donc aucune charge visible.
Fausse piste: « les gens manquent de rigueur ».
Friction: F10 — travail invisible non arbitré.
Action: 2 semaines de comptage simple (bâtons par catégorie) puis arbitrage explicite avec les demandeurs sur la base des chiffres.
Validation: la direction voit la charge réelle et tranche ↔ Invalidation: le comptage montre <10% = le problème est ailleurs (chercher F4 ou F7).

### C22. Astreinte qui épuise [F6 récurrence; Phoenix Project]
Symptôme: « les mêmes incidents nous réveillent chaque semaine ».
Observations: les incidents sont résolus mais jamais analysés; le top 3 des causes représente 70% des réveils; aucune tâche de fond planifiée pour les traiter.
Fausse piste: « élargir la rotation d'astreinte » (dilue la douleur, garde les causes).
Friction: F6/F8 — correction d'instances, jamais de causes.
Action: règle « tout incident ×3 = analyse cause racine + correctif planifié prioritaire ».
Validation: réveils/semaine -50% en 6 semaines ↔ Invalidation: nouveaux incidents remplacent les anciens = fragilité systémique (revoir la robustesse, pas les correctifs).

### C23. Guichet saturé à heures fixes [F4; Factory Physics L2]
Symptôme: « files énormes 11h-13h, personnel inoccupé à 15h ».
Observations: demande prévisible et concentrée; effectif constant toute la journée; 60% des motifs de visite pourraient se traiter à distance.
Fausse piste: « ouvrir plus de guichets » (surcapacité 80% du temps).
Friction: F4 — offre rigide face à demande variable mais PRÉVISIBLE.
Action: horaires décalés du personnel sur le pic + déviation des 3 motifs simples vers formulaire/téléphone.
Validation: attente au pic <15 min ↔ Invalidation: attente stable = les motifs « simples » ne se déportent pas (comprendre pourquoi le client vient physiquement).

### C24. Le rapport que personne ne lit [F9; muda]
Symptôme: « on passe 2 jours/mois sur un rapport dont on doute qu'il serve ».
Observations: le rapport existe « depuis toujours »; 3 destinataires sur 12 l'ouvrent; aucune décision tracée ne s'y réfère.
Fausse piste: « l'automatiser » (automatiser un gaspillage reste un gaspillage) [Ohno].
Friction: F9 — production sans client réel.
Action: arrêter l'envoi un mois (test du mort): qui réclame, pour quelle décision?
Validation: 0-1 réclamation = supprimer ou réduire à l'essentiel ↔ Invalidation: réclamations argumentées = le format est en cause, pas l'existence.

### C25. Sous-traitant toujours en retard [F3 externe; Never Split the Difference]
Symptôme: « notre sous-traitant nous met en retard chez nos clients ».
Observations: les commandes partent sans date de besoin réelle (marge cachée); le sous-traitant a appris que les dates ne sont pas vraies; aucune revue régulière commune.
Fausse piste: « changer de sous-traitant » (le suivant apprendra pareil).
Friction: F3/F8 — interface sans vérité partagée ni boucle.
Action: dates réelles + revue mensuelle 30 min sur les 3 derniers retards (faits, pas reproches) [tactiques d'écoute active].
Validation: ponctualité +30% en 2 mois ↔ Invalidation: aucun progrès = contrainte de capacité réelle chez lui (décision différente: second fournisseur).

### C26. Erreurs de saisie en bout de chaîne [F6+F3]
Symptôme: « la compta corrige des erreurs de saisie toute la journée ».
Observations: la donnée est saisie 3 fois (terrain, admin, compta); chaque re-saisie introduit des erreurs; le format d'origine est libre.
Fausse piste: « former la compta » (elle subit, elle ne cause pas).
Friction: F3/F6 — re-saisies multiples, qualité non contrôlée à la source.
Action: saisie unique à la source dans un format contraint (liste déroulante, pas texte libre), les autres consomment.
Validation: corrections compta -70% ↔ Invalidation: erreurs persistantes = le référentiel source est faux (produits/codes obsolètes).

### C27. « On a toujours fait comme ça » [F7 fossile; Kata]
Symptôme: procédure lourde dont personne ne connaît la raison.
Observations: l'étape contestée date d'un incident d'il y a 5 ans; le risque d'origine a disparu ou est couvert ailleurs; coût: 1h/jour.
Fausse piste: la garder « par prudence » (prudence non chiffrée = coût infini accepté).
Friction: F7 — standard fossilisé jamais réinterrogé.
Action: test contrôlé 1 mois sans l'étape sur un périmètre limité, avec le risque d'origine surveillé explicitement.
Validation: zéro matérialisation du risque → suppression ↔ Invalidation: risque réapparaît = l'étape était utile, la documenter cette fois.

### C28. Deux services, deux vérités [F9+F3; Meadows]
Symptôme: « les ventes promettent ce que les ops ne peuvent pas tenir ».
Observations: les ventes sont payées à la signature, les ops jugées sur la marge de réalisation; aucune donnée partagée de capacité; l'escalade tranche au cas par cas.
Fausse piste: « mettre les deux chefs dans la même pièce » (traite l'humeur, pas la structure).
Friction: F9 — indicateurs antagonistes sans contrainte partagée.
Action: calendrier de capacité visible des ventes + règle d'engagement (toute promesse hors calendrier = accord ops préalable).
Validation: engagements intenables -80% ↔ Invalidation: contournements persistants = le système d'incitation doit changer (décision direction).
