# OCT-13 — Phase 1: Re-preuve runtime de la boucle diagnostique bout-en-bout

Date: 2026-07-29
Auteur: Ryokan (Directeur technique ScaleIQ)
Issue: OCT-13 (parent OCT-11)
Méthode: exécution runtime réelle des vrais handlers de route Next.js contre
**Supabase en direct** et **Anthropic en direct**, via `scripts/oct13-runtime-proof.ts`.
Ce n'est pas une lecture de doc: le script instancie les mêmes fonctions que
Next.js appelle, écrit/lit en base réelle, puis nettoie (cascade delete de l'org de test).

## Comment ré-exécuter

```bash
cd ~/Desktop/scaleiq
npx tsx scripts/oct13-runtime-proof.ts
```

Sortie attendue (une fois les crédits Anthropic rétablis): `20/20 checks passed`.

## Résultat de la passe 2026-07-29 : 18/20

La **boucle diagnostique en 11 étapes + les 3 garde-fous sont VERTS au runtime.**
Les 2 seuls échecs sont les deux appels d'assistance IA, bloqués par une
condition **externe** (solde de crédits Anthropic insuffisant sur la clé de
`.env.local`) — **pas un défaut de code**.

| Check | Statut | Détail |
|---|---|---|
| AI/bootstrap (Anthropic) | ❌ BLOQUÉ | 502 → cause réelle: `credit balance too low` (billing) |
| 1. Créer organisation | ✅ | 201, id créé |
| 2. Créer engagement | ✅ | 201, id créé |
| 3. Diagnostic (draft) + contexte/écart | ✅ | 201, status=draft |
| transition draft→investigating | ✅ | 200 |
| 4. Mener l'interview (créer) | ✅ | 201 |
| persister 2 tours (seq forward) | ✅ | seq 1,2 |
| 5. Findings typés (obs/interp/hypo/évidence) | ✅ | 201×4, evidence_level=observed |
| 6. Analyse causale (contrainte dominante) | ✅ | 201, is_dominant=true |
| transition investigating→analyzed | ✅ | 200 |
| 7-8. Recommandation (évidence + sévérité/priorité/owner) | ✅ | 201, high/p1 |
| transition analyzed→recommended→validating | ✅ | 200 |
| 10. Outcome (validated) | ✅ | 201, validated_at renseigné |
| transition validating→closed | ✅ | 200 |
| 9. Revue dashboard (trace complète) | ✅ | interviews=1 findings=4 analyses=1 recos=1 |
| 11. Trace de raisonnement (decision_events) | ✅ | 14 événements (created/status_changed/recorded) |
| G1. evidence sans evidence_level → 400 | ✅ | garde-fou schéma |
| G2. finding provenance=ai sans confidence → 400 | ✅ | garde-fou provenance IA |
| G3. transition invalide (closed→draft) → 422 | ✅ | forward-only |
| AI/synthesize (Anthropic) | ❌ BLOQUÉ | même cause: `credit balance too low` |

## Diagnostic précis du blocage IA

Erreur brute renvoyée par l'API Anthropic sur la clé courante :

```
400 invalid_request_error:
"Your credit balance is too low to access the Anthropic API.
 Please go to Plans & Billing to upgrade or purchase credits."
(request_id: req_011CdWrqrqjCfXecSBWwf2s5)
```

Points importants :
- La clé **s'authentifie** (108 caractères, présente) et la requête **passe la
  validation structurelle** — le modèle `claude-sonnet-5`, `output_config`
  (json_schema), `thinking`, `effort` sont **acceptés** : la requête atteint la
  **grille de facturation**, pas une erreur de format. Le code d'assistance IA
  est donc structurellement correct ; seul le **solde de crédits** manque.
- `app/api/ai/route.ts` traduit toute exception en HTTP **502**, ce qui masquait
  la cause réelle (facturation) derrière un code générique. Comportement correct
  côté produit (ne pas fuiter le détail au client) ; pour le diagnostic on lit le
  message via un appel direct à `aiBootstrap`.

## Disposition

- **Cœur d'OCT-13 (boucle 11 étapes + garde-fous) : RE-PROUVÉ au runtime, VERT.**
- **Leg IA (bootstrap + synthesize) : BLOQUÉ** sur une dépendance externe.
  - Propriétaire du déblocage : **Jonathan**.
  - Action de déblocage : **créditer le compte Anthropic derrière la clé de
    `.env.local`** (Plans & Billing) **ou fournir une `ANTHROPIC_API_KEY` financée**.
  - Vérification post-déblocage : ré-exécuter la commande ci-dessus → doit passer 20/20.
