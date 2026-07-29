# MATRICE DE SIMULATION — le plateau de jeu (v1)

## Principe
Comme au Go: peu de règles, un espace immense de parties. Une simulation =
NOYAU (cas de la banque, C1-C104) × TAILLE (P/M/G) × STADE (optionnel).
Les dimensions sont peu nombreuses et riches; leurs combinaisons couvrent
l'espace des situations réelles bien mieux qu'une liste plate.

## Dimensions
1. FRICTION (10): F1 contrainte, F2 ownership, F3 handoffs, F4 variabilité,
   F5 surproduction, F6 détection tardive, F7 standards, F8 feedback,
   F9 optimisation locale, F10 surcharge/multitâche.
2. DOMAINE (7): ops-service, industrie-logistique, ventes-marketing,
   management-organisation, finance-cash, produit-digital, terrain-branches.
3. TAILLE (3):
   - P (petite, 1-15): tout passe par le dirigeant; l'informel fonctionne
     encore; le risque dominant est la dépendance aux personnes (F7, F1 humaine).
   - M (moyenne, 15-100): la zone de transition — l'informel casse, le formel
     n'existe pas encore; le risque dominant est l'interface (F3, F2).
   - G (grande, 100+): le formel existe mais vit sa propre vie; le risque
     dominant est le systémique (F9, F8 — indicateurs, silos, politique).
4. STADE (4): croissance rapide / plateau / crise / transmission-reprise.

## Règles de composition (comment lire une simulation)
- Le noyau donne le mécanisme causal de base — il est invariant.
- La taille déforme: QUI porte la friction, comment elle se cache,
  quelle action est réaliste (voir modificateurs-taille.md).
- Le stade déforme l'urgence et la marge de manœuvre (voir modificateurs-stade.md).
- Une simulation n'est PAS une prédiction: c'est une partie plausible,
  avec ses conditions d'invalidation héritées du noyau.

## Usage par le moteur
- L'interview localise: friction candidate + domaine + taille + stade.
- La matrice pointe les simulations voisines → hypothèses et questions
  discriminantes, JAMAIS un diagnostic plaqué.
- Après chaque cas réel: la simulation la plus proche est confrontée au réel
  (confirme/nuance/contredit) — c'est ainsi que la banque apprend.

## Questions ouvertes (Under Observation — carte blanche exercée)
Q1. La taille est-elle la bonne 2e dimension, ou le degré de formalisation
    (qui ne suit pas toujours la taille) la remplacera-t-elle? Évidence requise:
    10 cas réels où formalisation ≠ taille.
Q2. Les frictions dominantes par taille prédites ici (P→F7, M→F3, G→F9)
    survivront-elles au terrain? C'est un prior de la littérature, pas une loi.
Q3. Faut-il une dimension SECTEUR distincte du domaine (réglementé vs non,
    B2B vs B2C)? À n'ajouter que si des cas réels l'exigent.
Q4. Le stade « transmission » est-il un stade ou un cas à part entière (C104)?
Q5. À quel volume l'INDEX plat devient-il insuffisant pour le moteur
    (déclencheur du RAG)? Mesure: qualité des analogies proposées en cas réel.
