# Versions

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
