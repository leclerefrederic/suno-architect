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

[Ouvrir la mini-app privée sur Sites](https://suno-prompt-architect.fredolapower.chatgpt.site).

Advanced arrive directement sur les deux champs à copier. Structure, projets et composition détaillée sont repliés ; aucun questionnaire obligatoire ne précède l’atelier. La mini-app prépare les textes et ne se connecte pas au compte Suno. Son accès reste privé au propriétaire tant qu’aucun partage n’est demandé.

Un petit éditeur pour construire le déroulé instrumental directement, sans série de questions : ajoutez Intro, Thème, Montée, Drop, Respiration, Solo, Mouvement ou Fin ; réordonnez les blocs ; réglez leur intensité et leur place relative dans le morceau. Le texte Lyrics se construit en direct, séparément du Style.

Les deux blocs correspondent aux champs Suno : **Lyrics** (structure, 5 000 caractères) et **Description · Styles** (identité musicale modifiable, 1 000 caractères). Chacun possède son compteur et son bouton de copie. Modifier les sections ou appliquer un point de départ ne remplace jamais la description. Un dépassement bloque uniquement la copie du champ concerné, sans tronquer le texte.

Téléchargez **advanced-arranger.html** dans la [dernière version publiée](https://github.com/leclerefrederic/suno-architect/releases/latest), puis ouvrez-le dans un navigateur. Il fonctionne hors ligne, sans installation. Le bouton **Copier Lyrics** permet de transférer la structure dans Suno ; si le navigateur refuse la copie, le texte est sélectionné pour une copie manuelle.

L’interface est également incluse dans le `.skill`. Son affichage dans la conversation dépend du moteur interactif de l’assistant : elle ne crée pas un onglet natif permanent dans ChatGPT ou Suno. Les libellés intégrés sont disponibles en français, anglais et espagnol.

**Composer la description** propose style, ambiance, couleur du son, rythme et instruments. Appliquer ces choix remplace uniquement la description ; Annuler restitue le texte précédent. Les sections ne changent pas.

**Mes projets** permet d’enregistrer jusqu’à 20 projets dans ce navigateur, d’en dupliquer une version et de comparer la description et le déroulé avec une sauvegarde. Export/import JSON permet de les transporter. Les projets enregistrés restent accessibles après rechargement dans le même navigateur et la même origine, lorsque le stockage est autorisé ; les modifications non enregistrées ne sont pas restaurées automatiquement. Si le stockage est refusé, l’éditeur signale que la copie reste dans la session et invite à exporter. Ce n’est pas une synchronisation dans un compte.

Des indications de cohérence signalent notamment une voix demandée contre un Lyrics instrumental, un grand final contre une boucle, ou des sections après une fin. Elles ne modifient pas le texte et ne remplacent pas une vérification musicale.

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
- [`skills/suno-prompt-architect/`](skills/suno-prompt-architect/) : source du skill **v1.10.0**, sa boîte à outils créative, son éditeur Advanced et son compteur facultatif.
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

### Hébergement Sites

`.openai/hosting.json` conserve l’identité du Site existant. Pour préparer son contenu statique à partir de la même source :

```sh
python3 scripts/build_site.py --output work/hosted-suno
```

La publication utilise ensuite le dépôt technique de Sites et son processus de sauvegarde/déploiement. Le dépôt GitHub présent reste la source de référence ; le dossier `work/` est une préparation non suivie. Réutiliser le même `project_id` pour les mises à jour.

Pour vérifier un texte exact (espaces et retours à la ligne inclus) :

```sh
python3 skills/suno-prompt-architect/scripts/check_fields.py --mode earn --prompt prompt.txt
python3 skills/suno-prompt-architect/scripts/check_fields.py --mode advanced --style style.txt --lyrics lyrics.txt
```

En Advanced instrumental, omettez `--lyrics`. Le compteur refuse les champs inadaptés au mode et les dépassements ; il indique les points de code Unicode et les unités UTF-16 et prend le plus grand des deux par prudence, sans prétendre connaître le comptage interne de Suno.

Le dépôt est la source de référence pour les évolutions. Chaque nouvelle version du skill doit être répercutée dans l’archive `.skill` et dans le plugin privé existant, puis vérifiée après publication. Le processus est décrit dans la [roadmap](ROADMAP.md#comment-on-fait-évoluer-le-projet).
