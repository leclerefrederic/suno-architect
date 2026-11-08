# Suno Prompt Architect 🎛️

Transformez une idée, une scène ou une envie en prompt pour Suno. Un accompagnement joyeux et espiègle, des choix accessibles et une seule question à la fois, dans votre langue.

## Installation

1. Téléchargez **suno-prompt-architect.skill** depuis la [dernière version publiée](https://github.com/leclerefrederic/suno-architect/releases/latest). Le fichier est aussi disponible [dans le dépôt](suno-prompt-architect.skill) (bouton **Download raw file** sur GitHub).
2. Dans votre assistant compatible avec l’import de skills, ouvrez la gestion des skills et importez ce fichier.
3. Activez le skill, puis demandez par exemple : « Crée une musique funk instrumentale pour une vidéo de vacances. »

Le fichier `.skill` est une archive ZIP contenant le skill prêt à importer. Il nécessite un assistant prenant en charge ce format ; il ne s’installe pas dans Suno et ne génère pas lui-même d’audio. Les menus cliquables dépendent des possibilités de votre assistant.

Si votre assistant accepte uniquement les dossiers de skills, décompressez le fichier avec un outil ZIP (ou renommez une copie en `.zip`) et utilisez le dossier `suno-prompt-architect` extrait.

## Ce que fait le skill

- **Express** : une idée, une musique, peu d’étapes.
- **Studio** : davantage de nuances, d’instruments et de structure.
- Mélange de styles, description libre et surprises avec une idée de départ.
- Questions sous forme de menus, une à la fois, avec des mots accessibles.
- Retouches ciblées, conversion entre modes Suno et deux directions créatives sur demande.
- Surprises réglables, séries de morceaux et briefs pour vidéo, narration ou boucle.

Découvrez des [exemples avant/après](EXAMPLES.md) et le [compte rendu des essais](tests/EXPERIENCE.md).

## Mini-interface Advanced

Un petit éditeur pour construire le déroulé instrumental directement, sans série de questions : ajoutez Intro, Thème, Montée, Drop, Respiration, Solo, Mouvement ou Fin ; réordonnez les blocs ; réglez leur intensité et leur place relative dans le morceau. Le texte Lyrics se construit en direct, séparément du Style.

Téléchargez **advanced-arranger.html** dans la [dernière version publiée](https://github.com/leclerefrederic/suno-architect/releases/latest), puis ouvrez-le dans un navigateur. Il fonctionne hors ligne, sans installation. Le bouton **Copier Lyrics** permet de transférer la structure dans Suno ; si le navigateur refuse la copie, le texte est sélectionné pour une copie manuelle.

L’interface est également incluse dans le `.skill`. Son affichage dans la conversation dépend du moteur interactif de l’assistant : elle ne crée pas un onglet natif permanent dans ChatGPT ou Suno. Les libellés intégrés sont disponibles en français, anglais et espagnol. Dans un navigateur seul, les modifications ne sont pas conservées après rechargement.

Cette première version prépare uniquement des structures instrumentales : elle ne fusionne pas des paroles existantes. Les balises sont des intentions de composition, pas un langage de commandes garanti ; le résultat doit être vérifié à l’écoute.

Express et Studio définissent l’accompagnement, indépendamment du mode de saisie Suno.

| Mode Suno | Limite de saisie |
| --- | --- |
| Earn Credits | 200 caractères |
| Creative Simple — compte gratuit | 3 000 caractères |
| Creative Advanced — compte gratuit | Style : 1 000 caractères ; Lyrics : 5 000 caractères, séparément |

Ces limites correspondent aux spécifications fournies pour cette version. Le skill n’ajoute pas de paroles à un morceau instrumental sans demande.

## Contenu du dépôt

- [`ROADMAP.md`](ROADMAP.md) : idées d’évolution et suivi des prochaines améliorations.
- [`skills/suno-prompt-architect/`](skills/suno-prompt-architect/) : source du skill **v1.7.0**, sa boîte à outils créative, son éditeur Advanced et son compteur facultatif.
- [`suno-prompt-architect.skill`](suno-prompt-architect.skill) : version à importer, contenant exactement ces fichiers.
- `LICENSE` : licence du dépôt.

Le skill fonctionne sans accès à un compte ni installation de bibliothèque. Un compteur Python 3 facultatif permet de vérifier précisément les champs lorsque l’assistant peut exécuter des fichiers. Sans exécution, le skill reste utilisable et conserve une marge sous les limites. Les fichiers de configuration du plugin privé ne sont pas nécessaires à cette distribution.

## Pour maintenir le projet

Python 3.9 ou plus récent, sans bibliothèque supplémentaire :

```sh
python3 -m unittest discover -s tests -v
python3 scripts/build_skill.py
python3 scripts/build_skill.py --check
```

Pour produire aussi l’éditeur autonome :

```sh
python3 scripts/build_skill.py --interface-output work/advanced-arranger.html
```

Les contrôles de l’interface nécessitent Node.js et Chrome, sans bibliothèque à installer :

```sh
node tests/test_arranger.mjs
```

Sur un autre emplacement de Chrome, définissez `CHROME_PATH`. Les captures et résultats de test vont dans `work/`, hors du dépôt suivi.

La construction est reproductible : des sources identiques donnent une archive identique. Seuls les fichiers du dossier du skill sont inclus ; les tests et documents du dépôt restent hors de l’archive.

Pour vérifier un texte exact (espaces et retours à la ligne inclus) :

```sh
python3 skills/suno-prompt-architect/scripts/check_fields.py --mode earn --prompt prompt.txt
python3 skills/suno-prompt-architect/scripts/check_fields.py --mode advanced --style style.txt --lyrics lyrics.txt
```

En Advanced instrumental, omettez `--lyrics`. Le compteur refuse les champs inadaptés au mode et les dépassements ; il indique les points de code Unicode et les unités UTF-16 et prend le plus grand des deux par prudence, sans prétendre connaître le comptage interne de Suno.

Le dépôt est la source de référence pour les évolutions. Chaque nouvelle version du skill doit être répercutée dans l’archive `.skill` et dans le plugin privé existant, puis vérifiée après publication. Le processus est décrit dans la [roadmap](ROADMAP.md#comment-on-fait-évoluer-le-projet).
