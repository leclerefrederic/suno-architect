# Versions

## 1.11.3

- Présenter la direction musicale et attendre le choix explicite du mode Suno avant le premier prompt.

## 1.11.2

- Après chaque prompt livré, proposer une suite adaptée et l’option de s’arrêter.

## 1.11.1

- Langue de conversation maintenue dans les réponses, descriptions et menus. Textes Suno en anglais par défaut, sauf demande explicite.

## 1.11.0

- Retrait de la mini-app statique, de son code et des outils de publication associés.
- Suppression des redirections vers l’app et retour à une expérience Advanced menée par l’IA : propositions musicales et génération directe des deux champs.
- Conservation du parcours court, des trois modes Suno, du ton espiègle et des questions utiles en menus.

## 1.10.0

- Mini-app privée hébergée sur Sites, construite depuis la même source que le skill et l’éditeur autonome.
- Advanced ouvre directement l’atelier : deux champs visibles, structure et autres réglages repliés, aucun questionnaire préalable obligatoire.
- Identité du Site conservée dans Git et préparation statique reproductible.
- 57 contrôles navigateur et 11 tests Python, dont la concordance de la source hébergée et de l’identité du Site.

## 1.9.0

- Description composable par sélecteurs et instruments, application explicite et annulation conservant le texte précédent.
- Projets nommés enregistrés localement, duplication et comparaison des deux champs avec une version sauvegardée.
- Export/import JSON portable, validation du format et signalement d’un stockage indisponible.
- Indications de cohérence sur les voix, boucles et fins, sans modification automatique des choix.
- 56 contrôles navigateur et 10 tests Python ; export réellement téléchargé et bibliothèque retrouvée après rechargement.

## 1.8.0

- Les deux blocs Suno sont présents : Lyrics et Description · Styles, avec limites et boutons de copie indépendants.
- Description modifiable et conservée lors des modifications du déroulé ou des changements de point de départ.
- Reprise des anciens états sans perdre la description ; nouvel état incluant les deux champs.
- 37 contrôles navigateur et 10 tests Python réussis.

## 1.7.0

- Mini-interface Advanced de structure instrumentale : blocs réordonnables, montées, drops, respirations, solos, mouvements et fins.
- Réglages directs d’intensité, de longueur relative, d’instrument de solo et de type de fin, sans questionnaire conversationnel.
- Aperçu Lyrics, budget indépendant de 5 000 caractères, copie et solution manuelle si le navigateur refuse le presse-papiers.
- Trois points de départ ; libellés français, anglais et espagnol ; partage d’état lorsque l’interface hôte le permet.
- Éditeur autonome hors ligne joint à la version téléchargeable et source incluse dans le `.skill`.
- 25 contrôles navigateur et contrôles de distribution ; pas de promesse d’exécution exacte des balises par Suno.

## 1.6.0

- Retouches ciblées et conversion des prompts entre les trois modes Suno en conservant l’identité du morceau.
- Deux directions sur demande, surprises réglables et scènes de départ lorsque l’utilisateur délègue les choix.
- Signature commune pour une série et accompagnement des briefs vidéo, narration, boucle et chanson avec paroles.
- Menus sans questions répétées ; les décisions déléguées n’imposent pas de nouveaux choix.
- Compteur de champs facultatif, sans dépendance, avec limites indépendantes pour Style et Lyrics.
- Construction reproductible du `.skill`, contrôles automatisés et 16 scénarios d’auto-évaluation documentés.

Les essais conversationnels sont des simulations relues par le même auteur. L’affichage natif des menus, l’import du `.skill` dans chaque assistant et le résultat audio restent à vérifier en situation.

## 1.5.1

- Séparation explicite entre Express/Studio et les trois modes de saisie Suno.
- Spécifications : Earn Credits 200 ; Creative Simple gratuit 3 000 ; Creative Advanced gratuit Style 1 000 et Lyrics 5 000, séparément.
- Première distribution autonome du skill et archive `.skill` dans le dépôt.
