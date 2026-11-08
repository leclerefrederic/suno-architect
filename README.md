# Suno Prompt Architect 🎛️

Transformez une idée, une scène ou une envie en prompt pour Suno. Un accompagnement joyeux et espiègle, des choix accessibles et une seule question à la fois, dans votre langue.

## Installation

1. Téléchargez [suno-prompt-architect.skill](suno-prompt-architect.skill) (bouton **Download raw file** sur GitHub).
2. Dans votre assistant compatible avec l’import de skills, ouvrez la gestion des skills et importez ce fichier.
3. Activez le skill, puis demandez par exemple : « Crée une musique funk instrumentale pour une vidéo de vacances. »

Le fichier `.skill` est une archive ZIP contenant le skill prêt à importer. Il nécessite un assistant prenant en charge ce format ; il ne s’installe pas dans Suno et ne génère pas lui-même d’audio. Les menus cliquables dépendent des possibilités de votre assistant.

Si votre assistant accepte uniquement les dossiers de skills, décompressez le fichier avec un outil ZIP (ou renommez une copie en `.zip`) et utilisez le dossier `suno-prompt-architect` extrait.

## Ce que fait le skill

- **Express** : une idée, une musique, peu d’étapes.
- **Studio** : davantage de nuances, d’instruments et de structure.
- Mélange de styles, description libre et surprises avec une idée de départ.
- Questions sous forme de menus, une à la fois, avec des mots accessibles.

Express et Studio définissent l’accompagnement, indépendamment du mode de saisie Suno.

| Mode Suno | Limite de saisie |
| --- | --- |
| Earn Credits | 200 caractères |
| Creative Simple — compte gratuit | 3 000 caractères |
| Creative Advanced — compte gratuit | Style : 1 000 caractères ; Lyrics : 5 000 caractères, séparément |

Ces limites correspondent aux spécifications fournies pour cette version. Le skill n’ajoute pas de paroles à un morceau instrumental sans demande.

## Contenu du dépôt

- [`skills/suno-prompt-architect/SKILL.md`](skills/suno-prompt-architect/SKILL.md) : source du skill **v1.5.1**.
- [`suno-prompt-architect.skill`](suno-prompt-architect.skill) : version à importer, contenant exactement la même source.
- `LICENSE` : licence du dépôt.

Le skill est autonome : aucun script, image, accès à un compte ou dépendance supplémentaire. Les fichiers de configuration du plugin privé ne sont pas nécessaires à cette distribution.

Après une modification du skill, reconstruisez l’archive ZIP avec le dossier `suno-prompt-architect` à sa racine et conservez l’extension `.skill`.
