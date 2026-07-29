# Lois quantitatives des flux — v1 (statut: validated dans la littérature, candidate en contexte ScaleIQ)

Source principale: Factory Physics (Hopp & Spearman). Utiliser pour CADRER
les intuitions, pas pour faire des calculs devant le client.

## L1. Loi de Little
Encours (WIP) = Débit × Temps de traversée. Corollaire: à débit constant,
réduire l'encours réduit mécaniquement le délai. Si le délai explose, chercher
l'encours caché (files, boîtes mail, tickets ouverts).

## L2. Variabilité × Utilisation
Le temps d'attente croît de façon EXPONENTIELLE quand l'utilisation approche
100%, et la pente dépend de la variabilité. Un système chargé à 95% avec de la
variabilité a des files énormes — ce n'est pas de la mauvaise volonté, c'est
mathématique. Corollaire: viser 100% d'occupation des ressources est une
erreur de pilotage [aussi TOC].

## L3. Variabilité amont se propage
La variabilité se transmet vers l'aval: une étape irrégulière rend toutes les
suivantes irrégulières. Traiter la variabilité le plus en amont possible.

## L4. Lots et délais
Le temps de traversée croît avec la taille des lots (de production comme de
transfert). Réduire la taille des lots réduit le délai sans investissement.

## L5. Le pire ennemi du délai est le travail en attente
Dans la plupart des systèmes de service, >80% du lead time est de l'ATTENTE,
pas du travail. Toujours mesurer le ratio attente/travail avant d'accélérer
le travail lui-même.
