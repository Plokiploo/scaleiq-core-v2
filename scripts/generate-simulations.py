#!/usr/bin/env python3
"""Générateur de simulations ScaleIQ — compose noyaux × tailles × stades.
Régénérable: python3 scripts/generate-simulations.py (écrit knowledge/simulations/SIMULATIONS.md)
Doctrine: chaque simulation hérite du statut candidate et des conditions
d'invalidation de son noyau. L'expérience n'est pas une valeur absolue."""
import re, os

ROOT = os.path.join(os.path.dirname(__file__), "..", "knowledge")

TAILLE = {
 "P": {"label": "petite (1-15)", 
  "F1": "la contrainte est une PERSONNE (souvent le dirigeant/l'expert); la décharger des tâches sous-qualifiées avant tout recrutement",
  "F2": "l'ownership est clair (le patron) mais tout converge vers lui: le vrai sujet est la délégation par seuils",
  "F3": "les handoffs critiques sont EXTERNES (clients, fournisseurs, sous-traitants): standardiser les 2 interfaces les plus fréquentes",
  "F4": "aucune masse pour amortir: une grosse commande/absence déstabilise tout; tampons simples (délais annoncés, polyvalence, cash)",
  "F5": "surproduction d'OFFRE plutôt que de stock: catalogue trop large pour la capacité; couper au top 20%",
  "F6": "le dirigeant EST le contrôle qualité: transférer une checklist de 5 points à l'équipe avant qu'il ne sature",
  "F7": "rien n'écrit + bus factor=1: risque existentiel; documenter les 5 savoirs critiques, une page chacun",
  "F8": "le feedback est immédiat mais non MESURÉ: les dérives lentes sont invisibles; 3 chiffres hebdo suffisent",
  "F9": "l'optimisation locale est TEMPORELLE (sacrifier demain pour aujourd'hui): rituel mensuel « qu'hypothèque-t-on? »",
  "F10": "multitâche structurel du dirigeant (7 casquettes): sanctuariser des blocs + déléguer par seuils",
  "SP": "à cette taille, la décision se joue au niveau du dirigeant: vitesse maximale, mais angle mort = personne pour contredire"},
 "M": {"label": "moyenne (15-100)",
  "F1": "la contrainte devient un poste/équipe et SE DÉPLACE quand on la traite: réévaluer trimestriellement",
  "F2": "la zone morte classique: « quelqu'un d'autre » existe mais rien n'est écrit; une page qui-décide-quoi",
  "F3": "le mur ventes→ops / terrain→admin: l'informel qui marchait à 10 casse à 30; fiches de passation co-écrites",
  "F4": "la variabilité AUTO-INFLIGÉE domine (urgences commerciales, replanifications): chasser le mura interne d'abord",
  "F5": "les premiers « au cas où » systémiques: rendre le coût du stock visible en jours de paie",
  "F6": "le contrôle se centralise en fin de chaîne (« le bureau vérifie »): revenir au contrôle à la source + droit d'arrêt",
  "F7": "standards partiels jamais maintenus, doublés de folklore local: un standard vivant = un propriétaire + une date de révision",
  "F8": "premiers tableaux de bord déconnectés du terrain: chaque indicateur doit changer une décision quelque part, sinon le supprimer",
  "F9": "naît avec les objectifs par équipe: un objectif COMMUN de flux au-dessus des objectifs locaux",
  "F10": "trop de projets, personne n'ose tuer: file d'attente explicite, finir avant de commencer",
  "SP": "à cette taille, l'enjeu est l'interface: ce qui tenait par l'habitude doit devenir explicite sans devenir bureaucratique"},
 "G": {"label": "grande (100+)",
  "F1": "la contrainte est souvent une POLITIQUE (comité, budget, règle d'approbation): cartographier le flux de DÉCISION",
  "F2": "ownership sur papier, autorité réelle ailleurs (matrice, politique): aligner autorité et responsabilité sur UN flux critique",
  "F3": "chaînes de 4+ handoffs, files invisibles, personne ne voit le bout-en-bout: cartographier UN flux entier avant toute action locale",
  "F4": "la variabilité se propage et s'amplifie entre départements: découpler par buffers aux points critiques, synchroniser les calendriers",
  "F5": "surproduction structurelle (budgets à consommer, machines à occuper): attaquer l'indicateur qui la récompense",
  "F6": "départements qualité en aval, le producteur ne voit jamais ses défauts: boucle de retour DIRECTE producteur↔défaut",
  "F7": "trop de standards, conformité sans sens, écart écrit/réel: confronter au gemba, supprimer autant qu'ajouter",
  "F8": "l'organisation optimise ses indicateurs, plus la réalité (pastèques): mesures côté client, auditer ce que les chiffres cachent",
  "F9": "le mode par défaut (silos, budgets défendus): changer LA règle qui paie le comportement, pas moraliser",
  "F10": "l'inflation de projets est politique: portefeuille unique, arbitrage à cadence fixe, coût du retard visible",
  "SP": "à cette taille, le systémique domine: chercher la règle du jeu (incitation, politique) derrière le comportement"},
}
STADE = {
 "croissance": "croissance rapide: tout casse en même temps par paliers (~10/~30/~80 pers.); stabiliser les 3 flux porteurs AVANT d'accélérer; piège: recruter avant de standardiser (on duplique le chaos)",
 "crise": "crise: le cash domine, horizon en semaines; trier explicitement (protéger/couper/geler); piège: couper 10% partout — tuer les forces avec les faiblesses",
}

def parse_cases():
    files = ["cases/seed-cases.md","cases/ops-service.md","cases/industrie-logistique.md",
             "cases/ventes-marketing.md","cases/management-organisation.md",
             "cases/finance-cash.md","cases/produit-digital.md","cases/terrain-branches.md"]
    kernels = []
    for f in files:
        txt = open(os.path.join(ROOT, f), encoding="utf-8").read()
        dom = f.split("/")[1].replace(".md","")
        for m in re.finditer(r'#{2,3} (C\d+)\. ([^\n\[]+)(?:\[([^\]]*)\])?\n(.*?)(?=\n#{2,3} C|\n## M|$)', txt, re.S):
            cid, title, src, body = m.group(1), m.group(2).strip(), (m.group(3) or "").strip(), m.group(4)
            sym = re.search(r'Sympt[oô]me[^:]*: ?«? ?([^»\n]+)', body)
            fr  = re.search(r'Friction(?:\s+dominante)?: ([^\n]+)', body)
            act = re.search(r'Action: ([^\n]+)', body)
            fcode = "SP"
            if fr:
                fm = re.search(r'F(\d+)', fr.group(1))
                if fm: fcode = "F"+fm.group(1)
            kernels.append(dict(id=cid, title=title, dom=dom, file=f, fcode=fcode,
                sym=(sym.group(1).strip() if sym else "")[:100],
                act=(act.group(1).strip() if act else "")[:110]))
    return kernels

def main():
    ks = parse_cases()
    out = ["# SIMULATIONS — banque générée (v1)",
    "# Générée par scripts/generate-simulations.py — NE PAS ÉDITER À LA MAIN (éditer noyaux/modificateurs, régénérer).",
    "# Chaque simulation = noyau × taille (× stade). Statut: candidate. Conditions",
    "# d'invalidation: voir le noyau référencé. L'expérience n'est pas une valeur absolue.",""]
    n = 0
    for k in ks:
        out.append(f"\n## {k['id']} — {k['title']} [{k['dom']} · {k['fcode']}]")
        out.append(f"Symptôme noyau: « {k['sym']} » · Action noyau: {k['act']}")
        for t in ["P","M","G"]:
            mod = TAILLE[t].get(k['fcode'], TAILLE[t]["SP"])
            out.append(f"- S-{k['id']}-{t} ({TAILLE[t]['label']}): {mod}. Réf: {k['file']} §{k['id']}")
            n += 1
        for s, stxt in STADE.items():
            out.append(f"- S-{k['id']}-{s}: en {stxt}. Réf: modificateurs-stade.md")
            n += 1
    out.insert(4, f"# Volume: {len(ks)} noyaux × (3 tailles + 2 stades) = {n} simulations.")
    open(os.path.join(ROOT,"simulations","SIMULATIONS.md"),"w",encoding="utf-8").write("\n".join(out)+"\n")
    print(f"noyaux: {len(ks)} | simulations: {n}")

if __name__ == "__main__":
    main()
