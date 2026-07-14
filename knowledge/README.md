# Knowledge — corpus de raisonnement ScaleIQ

## Ce que c'est
Distillat de livres de référence (Lean, TPS, TOC, systèmes, résolution de
problèmes) converti en patterns diagnostiques exploitables par le moteur
d'investigation. ScaleIQ ne consomme JAMAIS les livres bruts — uniquement
ce distillat, versionné dans le repo.

## Doctrine (non négociable)
1. L'EXPÉRIENCE N'EST PAS UNE VALEUR ABSOLUE. Chaque pattern et chaque cas
   est un prior, pas une loi. Chaque nouveau cas réel affine le modèle:
   un cas réel qui contredit un pattern a plus de valeur que le pattern.
2. Statuts: `candidate` (déduit des livres, jamais confronté au réel) →
   `observed` (retrouvé dans ≥1 cas réel) → `validated` (récurrent, a survécu
   à la recherche de contradiction). Toute entrée porte son statut.
3. Chaque pattern cite sa source (livre/concept). Extraction avant invention.
4. Le moteur utilise les patterns comme HYPOTHÈSES à tester par les questions,
   jamais comme conclusions. Knowledge ≠ Reasoning.
5. Taille bornée: chaque fichier patterns doit rester injectable en prompt
   (≤ ~500 lignes). Si ça déborde: compresser ou scinder, pas empiler.

## Structure
- `patterns/frictions.md` — taxonomie des frictions et mécanismes causaux
- `patterns/questions.md` — playbook de questions Gemba par situation
- `patterns/actions.md` — gabarits d'actions simples
- `patterns/lois.md` — lois quantitatives des flux (Factory Physics)
- `cases/seed-cases.md` — 12 cas fondateurs détaillés (injectés au moteur)
- `cases/{ops-service, industrie-logistique, ventes-marketing,
  management-organisation, finance-cash, produit-digital, terrain-branches}.md
  — banque étendue (104 cas au total, format compact)
- `cases/INDEX.md` — index une-ligne-par-cas (injecté au moteur pour repérer
  les analogies; le fichier source contient le cas complet)

## Vague 1 (2026-07-14) — sources distillées
The Goal + Critical Chain (Goldratt), Toyota Production System (Ohno),
Gemba Kaizen (Imai), Toyota Kata (Rother), Managing to Learn (Shook),
Learning to See (Rother/Shook), Lean Thinking (Womack/Jones),
Factory Physics (Hopp/Spearman), Thinking in Systems (Meadows),
Bulletproof Problem Solving (Conn/McLean), The Phoenix Project (Kim).
Vague 2 souhaitée: Out of the Crisis (Deming), The Machine That Changed
the World (Womack) — à acquérir.
