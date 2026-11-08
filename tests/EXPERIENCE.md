# Essais de la v1.6.0 — 8 novembre 2026

## Ce qui a réellement été fait

- **16 scénarios conversationnels simulés**, produits et relus par le même auteur à partir du skill et de sa référence. Les entrées, réponses et choix sont conservés dans [experience-samples.json](experience-samples.json).
- **9 tests automatisés exécutés** : frontières de chaque champ, séparation des budgets, Unicode et retours à la ligne, erreurs de champs, utilisation réelle du compteur en ligne de commande, archive reproductible, rejet d'une archive incorrecte, références locales et budgets des réponses simulées.
- Le compteur vérifie tous les textes finaux, y compris les trois prompts de la série. Les simulations ne sont pas un banc d'essai automatisé de génération : les tests de budget contrôlent des réponses enregistrées.
- Aucun morceau n'a été généré ni écouté. Aucun clic dans un menu natif ou import dans un assistant tiers n'a été testé.

## Revue de l'expérience

| Scénario | Jugement après simulation et relecture |
| --- | --- |
| express-free | Express ne force pas Earn Credits ; choix délégué respecté ; livraison directe. |
| studio-earn | Studio reste compatible avec 200 caractères ; compromis expliqué. |
| convert-advanced | Identité conservée ; aucun champ Lyrics utilisé comme débordement. |
| revision-under-speech | Retour complet sans questionnaire ; voix de narration distinguée de voix générée. |
| two-directions | Un menu unique ; deuxième tour sans nouvelle découverte du mode. |
| surprise-without-anchor | Choix intégral délégué : ancre choisie directement, pas de menu obligatoire. |
| surprise-intensity | Carte blanche conserve l'ancre et l'exclusion des voix. |
| spanish-complete | Langue explicite respectée partout ; pas de jargon imposé. |
| describe-route | Texte libre seulement après choix ; description interprétée sans exiger de genre. |
| blend-main-secondary | Deux genres et équilibre déjà connus : aucune question répétée. |
| advanced-lyrics | Deux champs ; langue déduite explicitement ici ; aucune consigne instrumental contradictoire. |
| loop | Aucune garantie de boucle parfaite ; pas de conclusion contradictoire. |
| video | Événements traduits en arc flexible, pas de synchronisation garantie. |
| series | Trois prompts autonomes ; signature répétée, rôle narratif variable. |
| unknown-destination | Une question utile, sans refaire le choix Express/Studio pour un brief déjà fourni. |
| missing-prior-context | Aucune fausse mémoire ; une seule sortie pour retrouver la source. |

## Changements guidés par cette revue

1. **Moins de friction.** L'ancienne formulation « exactement une question » pouvait entrer en conflit avec une réponse directe. Elle devient « au plus une, zéro quand on peut livrer ». Une demande complète ne déclenche ni menu d'expérience ni nouvelle collecte du brief.
2. **La délégation doit marcher.** « Surprends-moi, choisis tout » choisit une scène et avance ; l'ancre n'impose plus une question à quelqu'un qui vient précisément de déléguer.
3. **La fin dépend de l'usage.** Une boucle ne reçoit pas en même temps un grand coup final. La vérification du raccord reste une étape sur l'audio.
4. **Des variantes vraiment utiles.** Deux directions répondent à une demande explicite ; elles ne deviennent pas une étape systématique. Un choix développe le prompt sans recommencer le brief.
5. **Les limites restent indépendantes.** Une sortie Advanced instrumentale n'a pas besoin de Lyrics, et 5 000 caractères inutilisés ne rallongent jamais Style.

## Mon jugement

Les raccourcis sont la meilleure amélioration : le skill accepte une envie ordinaire et évite de faire choisir ce qui est déjà dit. Le ton reste vivant, mais tient en une phrase avant le texte utile. Les cas en français et en espagnol ne nécessitent pas de vocabulaire musical pour continuer.

Ces observations portent sur les exemples simulés et la cohérence des instructions. Elles ne prouvent ni un taux de réussite sur d'autres conversations, ni la qualité musicale du résultat Suno. Les parcours encore à vérifier dans l'interface restent ouverts dans la roadmap.

## Pour refaire les contrôles

```sh
python3 -m unittest discover -s tests -v
python3 scripts/build_skill.py --check
```
