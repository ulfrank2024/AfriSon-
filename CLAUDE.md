# AfriSon Academy — mémoire du projet

Nom de travail, à valider. Plateforme panafricaine d'apprentissage des instruments de musique (traditionnels africains et modernes) et de formation à l'ingénierie du son, avec trois espaces (élève, enseignant, promoteur), un volet événementiel (concerts, séminaires, partenariats églises) et un programme de parrainage.

Ce fichier est la mémoire de travail pour Claude Code sur ce dépôt. Les documents de cadrage complets (business plan et cahier des charges) doivent être placés dans `/docs` à la racine du projet — ce sont eux la source de vérité pour toute décision produit ou business ; ce fichier n'en est qu'un résumé opérationnel pour le développement.

## Statut du projet

Phase : développement du MVP (phase 1). Porteur de projet : Ulrich, seul développeur pour l'instant. Pays pilote : **Cameroun**.

## Workflow Git — à respecter systématiquement

- **Après chaque modification de code**, enregistrer les changements dans le fichier (Write/Edit) puis faire un `git add` + `git commit` avec un message clair décrivant ce qui a changé. Ne jamais laisser de modifications non commitées à la fin d'une tâche.
- **Après chaque commit, toujours pousser sur le dépôt distant** (`git push`). Ne pas accumuler plusieurs commits locaux sans les pousser.
- Un commit = un changement logique cohérent (éviter les commits fourre-tout qui mélangent plusieurs sujets sans rapport).

## Stack technique retenue

Ces choix sont arrêtés (voir cahier des charges section 9), pas à renégocier sans raison forte :

- **Frontend + backend unifiés : Next.js (TypeScript)**, App Router, API routes / server actions côté serveur. Un seul projet, un seul langage.
- **Mobile : React Native**, pour rester sur le même langage/écosystème que le web.
- **Base de données : Neon** (PostgreSQL serverless) — autoscaling, pay-per-use, branching de base pour les environnements de test. **Toute modification du schéma passe obligatoirement par une migration versionnée** (ex. Drizzle ORM ou Prisma, à choisir en début de projet) — jamais de modification manuelle du schéma directement en base. Chaque migration doit être commitée avec le code qui en dépend.
- **Authentification : Clerk** — gestion des trois rôles (élève, enseignant, promoteur). Vérifier le coût du SMS/OTP pour le Cameroun avant d'industrialiser l'inscription par téléphone.
- **Vidéo (cours) : Cloudflare Stream** — streaming adaptatif + support du hors-ligne (connectivité variable au Cameroun).
- **Live (cours en direct) : Agora**.
- **Paiements : Flutterwave** comme agrégateur principal, intégrant **MTN Mobile Money** et **Orange Money Cameroun** en priorité. Devise : franc CFA (XAF).
- **Infrastructure / CDN : Cloudflare.**

## Architecture

**Monolithe modulaire.** Pas de microservices en phase 1 — inutile pour un développeur seul et un trafic de lancement modéré. Un seul backend Next.js avec des modules internes bien séparés (dossiers ou packages distincts, frontières de code claires) :

- `auth` — comptes, rôles, sessions (Clerk)
- `cours` — programmes, modules, leçons, catalogue, progression
- `abonnements` — paliers, facturation, statuts
- `paiements` — intégration Flutterwave, webhooks, réconciliation
- `live` — sessions Agora, réservation de créneaux
- `evenements` — concerts, séminaires, partenariats institutionnels
- `parrainage` — codes/liens d'invitation, suivi, récompenses

Ne pas extraire un module en service séparé sauf besoin réel de scaling indépendant (typiquement : traitement vidéo, si ça devient un goulot d'étranglement).

## Rôles utilisateurs

| Rôle | Accès |
|---|---|
| Élève | Espace élève |
| Professeur de musique (instrument traditionnel africain ou moderne : piano, guitare, saxophone, batterie) | Espace enseignant |
| Formateur ingénierie du son | Espace enseignant |
| Administrateur / Promoteur | Espace admin |
| Partenaire institutionnel (église, organisation) | Espace partenaire simplifié |

## Règles métier clés

### Parrainage — ne jamais implémenter comme un système pyramidal / MLM

- Récompense déclenchée **uniquement** par un abonnement réellement payé par le filleul — jamais par le simple recrutement ou la création de compte.
- **1 à 2 niveaux maximum**, jamais de commissions en cascade sur plusieurs niveaux (filleuls de filleuls, etc.) — c'est ce qui rend un système illégal dans plusieurs pays.
- Deux cas d'usage à couvrir : (1) un enseignant invite ses propres élèves via un lien personnel → bonus cash plafonné ou avantage de visibilité ; (2) un élève invite un proche via un code → mois offert ou réduction pour les deux.
- Statut « Ambassadeur » au-delà d'un seuil de filleuls actifs, avantages non financiers en priorité (accès VIP événements).

### Répartition des revenus (point de départ, à ajuster)

- Abonnement standard : ~60-70 % enseignant / 30-40 % plateforme.
- Cours en live : ~65-75 % enseignant / 25-35 % plateforme.
- Séminaires/événements : cachet fixe ou pourcentage négocié, solde à la plateforme.

### Recrutement enseignant — statuts de candidature à modéliser

`reçu` → `en_revue` → `présélectionné` → `évaluation_planifiée` → `entretien` → `validé` / `rejeté` (+ `en_attente_documents`). Chaque changement de statut déclenche une notification.

## Modèle de données (entités principales)

- **Utilisateur** : id, rôle, nom, pays, langue_interface (fr/en), email/téléphone, date de création
- **CandidatureEnseignant** : id, utilisateur_id, filière (musique/son), langues_enseignement (fr/en, une ou plusieurs), statut, documents, dates
- **Cours** : id, enseignant_id, titre, spécialité, niveau, langue_enseignement (fr/en), modules[]
- **Module/Leçon** : id, cours_id, titre, type (vidéo/exercice/quiz), contenu, ordre
- **Abonnement** : id, élève_id, palier, prix, devise, statut, date_début, date_fin
- **SessionLive** : id, enseignant_id, cours_id, date, lien, participants[]
- **Paiement** : id, abonnement_id, montant, devise, moyen, statut, date
- **Parrainage** : id, parrain_id, filleul_id, code, statut, récompense, date_déclenchement
- **Événement** : id, type (concert/séminaire), pays, date, lieu, places, participants[]
- **PartenaireInstitution** : id, nom, pays, offre, membres[]

## Priorités MVP (phase 1)

1. Page d'accueil publique (landing page) avec présentation du concept et lien de connexion/inscription.
2. Comptes élève, enseignant, admin avec les 3 dashboards en version simplifiée.
3. Création de cours (vidéo + exercice), catalogue, abonnement payant via MTN MoMo / Orange Money (Flutterwave).
4. Répartition automatique des revenus enseignant/plateforme.
5. Recrutement enseignant via formulaire + validation manuelle par l'admin (sans automatisation avancée au départ).

Live, parrainage, événements et partenariats institutionnels : phases 2-3, pas de priorité MVP.

## Marché pilote : Cameroun

Bilingue français/anglais (prévoir l'UI multilingue dès le départ, structure i18n même si une seule langue est active au lancement). Devise XAF. Moyens de paiement dominants : MTN Mobile Money et Orange Money. Villes prioritaires pour le recrutement et les événements : Douala, Yaoundé.

## Internationalisation — deux niveaux distincts, à ne pas confondre

1. **Langue de l'interface** : français et anglais dès le départ (le Cameroun est bilingue), structure i18n prête pour ajouter portugais/arabe plus tard. Toute chaîne de texte de l'interface passe par une couche de traduction, jamais de texte en dur.
2. **Langue d'enseignement des cours** : indépendante de la langue de l'interface. Un enseignant peut dispenser ses cours en français ou en anglais (ou les deux), et un élève doit pouvoir filtrer le catalogue par langue d'enseignement pour trouver un cours dans la langue qu'il maîtrise. Cela implique un attribut de langue sur l'entité `Cours` (et sur le profil enseignant) — voir modèle de données ci-dessous.

## Conventions de développement

- TypeScript strict partout (web, API, mobile).
- Interface multilingue dès le départ (français et anglais), toute chaîne de texte utilisateur passe par une couche i18n — pas de texte en dur.
- Toute fonctionnalité liée aux cours (catalogue, création, filtres) doit prendre en compte la langue d'enseignement comme un attribut de premier plan, distinct de la langue de l'interface.
- Un module métier = un dossier, avec ses propres types, logique et (si besoin) ses propres routes API. Éviter les dépendances circulaires entre modules.
- Toute règle de parrainage ou de répartition des revenus doit être testée unitairement — ce sont les zones les plus sensibles du produit (argent + risque légal).
- Toute modification de schéma de base de données passe par une migration versionnée et commitée, jamais par une modification manuelle en base.
- Chaque modification de code doit être enregistrée, commitée avec un message clair, puis poussée sur le dépôt distant avant de considérer une tâche terminée (voir Workflow Git ci-dessus).

## Commandes

À compléter au fur et à mesure de la mise en place du projet (`npm run dev`, `npm run build`, `npm run test`, migrations Neon, etc.).
