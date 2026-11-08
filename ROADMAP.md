# Roadmap 🎛️

Des idées pour donner encore plus de personnalité aux morceaux, sans transformer la création musicale en formulaire administratif. Les éléments cochés sont présents dans les versions publiées ; les validations qui nécessitent l’interface conversationnelle de chaque assistant ou de l’audio restent ouvertes. Voir le [compte rendu des essais](tests/EXPERIENCE.md).

## Atelier Advanced — v1.7.0

- [x] **Mini-app hébergée et entrée courte — v1.10.0.** Deux blocs visibles dès l’ouverture, aucun questionnaire préalable, réglages repliés et hébergement privé sur Sites depuis la même source.
- [x] **Description composable — v1.9.0.** Style, ambiance, texture, rythme et instruments ; application explicite avec annulation.
- [x] **Projets et versions — v1.9.0.** Enregistrement local, duplication, comparaison avec une sauvegarde et export/import portable.
- [x] **Repérer des contradictions — v1.9.0.** Indications non bloquantes sur les voix, boucles et fins ; elles restent des heuristiques.
- [ ] **Courbe d’énergie manipulable.** Déplacer les points d’une courbe pour ajuster les sections, en complément des réglages actuels.
- [x] **Les deux blocs Suno — v1.8.0.** Lyrics et Description · Styles, compteurs 5 000 / 1 000, copies indépendantes et description préservée lors du travail sur la structure.
- [x] **Une mini-interface, sans questionnaire.** Ajouter, réordonner et retirer des moments ; régler intensité, longueur relative, instrument du solo et type de fin.
- [x] **Transposer dans Lyrics.** Générer les balises instrumentales en direct, séparément du Style, sans inventer de paroles chantées.
- [x] **Un éditeur transportable.** Source incluse dans le `.skill`, version autonome hors ligne et libellés français, anglais et espagnol.
- [x] **Tester les interactions réelles.** 25 contrôles automatisés dans Chrome, dont réorganisation, copie avec refus de permission, état, clavier et affichage à 320 et 736 px.
- [ ] **Évaluer les balises à l’écoute.** Comparer la structure demandée au morceau généré, sans garantir l’exécution des mouvements ou drops.
- [ ] **Intégrer des paroles existantes.** Préserver les couplets et refrains lors d’une réorganisation ; l’éditeur actuel reste consacré à la structure instrumentale.

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
