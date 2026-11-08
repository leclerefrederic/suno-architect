# Roadmap 🎛️

Des idées pour donner encore plus de personnalité aux morceaux, sans transformer la création musicale en formulaire administratif. Les éléments cochés sont présents dans la v1.6.0 ; les validations qui nécessitent une vraie interface ou de l’audio restent ouvertes. Voir le [compte rendu des essais](tests/EXPERIENCE.md).

## Prochaines améliorations

- [x] **Retoucher sans tout recommencer.** Proposer des ajustements ciblés : « Plus dansant », « Moins chargé », « Une fin plus marquée », tout en préservant ce qui plaît déjà.
- [x] **Passer d’un mode Suno à l’autre.** Adapter un prompt existant à Earn Credits, Creative Simple ou Creative Advanced en conservant son identité musicale et les limites de chaque champ.
- [x] **Deux directions, une même idée.** Sur demande, proposer deux interprétations courtes et contrastées, puis laisser choisir laquelle développer dans un seul menu.
- [ ] **Vérifier les parcours réels.** Essayer Express, Studio, description libre, mélange de styles, surprise et révision dans l’interface ; vérifier les menus, les langues et les limites de caractères. **16 scénarios simulés et leurs budgets ont été vérifiés ; l’interface native et l’import restent à tester.**

## Plus de jeu, plus de musique

- [x] **La surprise à dose réglable.** Choisir entre « Une petite touche inattendue », « Emmène-moi ailleurs » et « Carte blanche », en gardant toujours un point de départ reconnaissable.
- [x] **Des scènes pour démarrer.** Proposer des idées évocatrices : un dernier métro sous la pluie, un casse élégant, un dimanche au soleil… puis les traduire en musique.
- [x] **Des mélanges qui ont du sens.** Expliquer en une phrase le rôle de chaque style : « Le funk apporte le rythme, la soul apporte la chaleur ».
- [x] **Une série de morceaux qui se ressemblent juste assez.** Définir une signature commune pour plusieurs titres, avec une personnalité propre à chacun.

## Pour des usages concrets

- [x] **Musique pour une vidéo.** Affiner les moments forts, les respirations et les transitions à partir d’une description du montage, sans promettre un minutage exact.
- [x] **Place à la voix.** Adapter la densité musicale pour une présentation, un podcast ou une narration.
- [ ] **Une boucle agréable.** Préparer des indications de début et de fin adaptées à une musique qui tourne en boucle, avec une vérification du résultat à l’écoute. **Indications textuelles ajoutées en v1.6.0 ; validation audio encore à faire.**
- [x] **Des paroles quand on en veut.** Accompagner le thème, la langue et la structure d’une chanson, avec Style et Lyrics séparés en Advanced et aucune parole ajoutée par défaut aux instrumentaux.

## Faciliter l’installation et les mises à jour

- [x] **Construire le `.skill` automatiquement.** Produire l’archive depuis la source et vérifier qu’elle contient uniquement les fichiers nécessaires.
- [x] **Des versions faciles à retrouver.** Publier des versions GitHub avec le `.skill` prêt à télécharger et quelques lignes sur les nouveautés. [Version 1.6.0](https://github.com/leclerefrederic/suno-architect/releases/tag/v1.6.0).
- [x] **Des exemples avant/après.** Montrer comment une envie formulée simplement devient un prompt, puis une variante améliorée.

## Nos règles du jeu

- Express et Studio restent des expériences d’accompagnement indépendantes des trois modes Suno.
- Une seule question à la fois, en menu interactif lorsque l’interface le permet.
- Langue de l’utilisateur, mots accessibles, personnalité joyeuse et espiègle.
- Un brief suffisant mène directement au prompt, sans questions obligatoires supplémentaires.
- Les limites sont respectées par champ ; aucune promesse de résultat audio exact.
- Toute capacité d’écoute ou de conservation entre conversations dépend des outils réellement disponibles. Ne jamais la laisser entendre si elle n’existe pas.

## Comment on fait évoluer le projet

Le dépôt Git est la source de référence. Pour chaque évolution du skill :

1. Modifier la source dans `skills/suno-prompt-architect/`.
2. Vérifier le comportement concerné et mettre à jour la version et la documentation utiles.
3. Reconstruire et vérifier `suno-prompt-architect.skill`.
4. Mettre à jour le plugin privé existant depuis cette même source, puis relire les fichiers publiés pour confirmer leur concordance.
5. Cocher les éléments terminés ici.

Une modification documentaire de cette roadmap ne nécessite pas de republier le plugin.
