
AFRISON ACADEMY
CAHIER DES CHARGES FONCTIONNEL ET TECHNIQUE
Préparé pour : Ulrich
Août 2026 — Version 1.0
 
 
Sommaire


 
1. Objet du document
Ce document décrit les rôles utilisateurs, les parcours et les fonctionnalités attendues de la plateforme AfriSon Academy, afin de servir de base à un développeur ou une équipe technique pour construire le produit. Il complète le business plan (vision, marché, modèle économique) par une vue fonctionnelle détaillée.
2. Rôles utilisateurs
Rôle	Description	Accès principal
Élève	Apprenant inscrit à un ou plusieurs parcours (instrument ou ingénierie du son)	Espace élève
Professeur de musique	Enseignant recruté pour un ou plusieurs instruments (traditionnels africains ou modernes : piano, guitare, saxophone, batterie)	Espace enseignant
Formateur ingénierie du son	Enseignant recruté pour la formation technique son	Espace enseignant
Administrateur / Promoteur	Pilote de la plateforme (le porteur de projet et son équipe)	Espace admin
Partenaire institutionnel	Église ou organisation ayant souscrit une offre groupée	Espace partenaire (simplifié)
3. Page d'accueil publique (landing page)
Vitrine publique de la plateforme, accessible sans compte, dont l'objectif est de présenter le projet et d'orienter chaque visiteur vers l'inscription ou la connexion adaptée à son profil (élève, enseignant, promoteur).
3.1 Structure du contenu
•	En-tête : logo, menu (Le concept, Instruments, Comment ça marche, Devenir enseignant), et deux actions visibles en permanence — « Se connecter » et « Créer un compte ».
•	Section d'accroche (hero) : accroche principale, message de positionnement panafricain, boutons d'appel à l'action, quelques chiffres clés de la plateforme (élèves actifs, enseignants, pays couverts, instruments enseignés).
•	Présentation du concept : les trois espaces (élève, enseignant, promoteur) résumés en quelques lignes chacun.
•	Catalogue d'instruments : instruments traditionnels africains, instruments modernes (piano, guitare, saxophone, batterie) et ingénierie du son.
•	Parcours « Comment ça marche » : inscription, choix de la formule, apprentissage, opportunités scène.
•	Ancrage terrain : mise en avant des concerts, séminaires panafricains et partenariats avec les églises.
•	Bloc de recrutement enseignant : argumentaire dédié et bouton d'appel à l'action vers la candidature enseignant (voir section 4).
•	Pied de page : liens de navigation, contact, mentions légales, lien de connexion rappelé.
3.2 Lien et logique de connexion
•	Le bouton « Se connecter » ouvre un point d'entrée unique de connexion, avec sélection du rôle (élève, enseignant, promoteur) si l'utilisateur n'est pas automatiquement reconnu.
•	Après authentification, l'utilisateur est redirigé directement vers son dashboard (espace élève, enseignant ou promoteur selon son rôle).
•	Le bouton « Créer un compte » distingue dès le départ un parcours élève (inscription + choix d'abonnement) d'un parcours enseignant (redirigé vers le formulaire de candidature, section 4).
•	Mot de passe oublié, vérification d'email/téléphone et gestion de session sécurisée font partie du socle technique de cette page de connexion.
4. Processus de recrutement des enseignants
4.1 Étapes communes
•	Formulaire de candidature en ligne (identité, pays, spécialité, expérience).
•	Dépôt de pièces : CV, vidéo de démonstration ou portfolio.
•	Présélection administrative (statut : reçu → en revue → présélectionné → rejeté).
•	Évaluation (audition vidéo/live pour la musique, étude de cas/test pratique pour le son).
•	Entretien et validation des conditions (grille de rémunération, charte qualité).
•	Activation du compte enseignant et onboarding (guide de prise en main du dashboard).
4.2 Statuts de candidature à modéliser
reçu, en_revue, présélectionné, évaluation_planifiée, entretien, validé, rejeté, en_attente_documents. Chaque changement de statut doit déclencher une notification email/app au candidat.
5. Espace Élève — spécifications
5.1 Inscription et abonnement
•	Création de compte (email/téléphone, réseaux sociaux en option).
•	Choix du parcours : instrument traditionnel africain, instrument moderne (piano, guitare, saxophone, batterie) ou ingénierie du son, avec sélection de l'instrument précis.
•	Choix de la formule d'abonnement (paliers : Découverte, Standard, Premium avec live inclus).
•	Paiement : mobile money, carte bancaire, agrégateur multi-pays ; gestion du renouvellement et des impayés.
5.2 Apprentissage
•	Catalogue de cours filtrable par instrument/spécialité, niveau, professeur.
•	Lecteur vidéo avec suivi de progression (leçon vue/complétée).
•	Exercices et évaluations associés à chaque module.
•	Réservation de créneaux de cours en direct (live) avec un professeur, incluant visioconférence intégrée ou via un outil tiers.
•	Certificats/badges de complétion de parcours.
5.3 Communauté et opportunités
•	Fil d'opportunités : concerts, séminaires, stages ouverts aux élèves.
•	Candidature à une place sur scène lors d'un concert (sélection par le professeur/admin).
•	Espace communauté (forum ou messagerie entre élèves d'un même cours).
5.4 Parrainage (côté élève)
•	Code de parrainage personnel, partage par lien.
•	Suivi des filleuls et de leur statut d'abonnement.
•	Historique des récompenses obtenues (réduction, mois offerts).
6. Espace Enseignant — spécifications
6.1 Création de contenu
•	Création de programmes de cours : structuration en modules et leçons.
•	Upload de vidéos, documents, supports d'exercices, quiz.
•	Publication / dépublication d'un cours.
6.2 Live et suivi élèves
•	Création de créneaux de cours en direct, gestion des réservations.
•	Liste des élèves inscrits par cours, avec statut de progression.
•	Messagerie avec les élèves.
6.3 Suivi financier
•	Tableau de bord des abonnements générés par ses cours.
•	Détail des revenus/commissions perçus, historique des versements.
•	Statistiques : nombre d'élèves actifs, taux de complétion, notes/avis reçus.
6.4 Événements
•	Visibilité sur les concerts/séminaires à venir et possibilité de proposer des élèves à y associer.
6.5 Invitation et parrainage (côté enseignant)
•	Lien d'invitation personnel, à partager à ses propres élèves (hors plateforme) ou sur ses réseaux, pour les faire rejoindre l'application.
•	Suivi des inscriptions réalisées via ce lien : élèves inscrits, statut d'abonnement, revenu additionnel généré.
•	Bonus déclenché uniquement lorsque l'élève invité souscrit un abonnement réel (jamais sur la simple inscription).
•	Tableau récapitulatif : nombre de filleuls actifs, bonus cumulés, historique des versements.
7. Espace Administrateur / Promoteur — spécifications
7.1 Pilotage global
•	Tableau de bord : nombre d'élèves, d'enseignants, répartition par pays, chiffre d'affaires global et par période.
•	Vue financière consolidée : paiements reçus, reversements aux enseignants, marge plateforme.
7.2 Gestion des enseignants
•	File de candidatures à traiter, changement de statut, prise de notes internes.
•	Gestion des contrats et grilles de rémunération par enseignant ou par catégorie.
7.3 Gestion des abonnements et paiements
•	Paramétrage des offres (paliers, prix, devises par pays).
•	Intégration des moyens de paiement (mobile money par pays, cartes, agrégateur).
•	Règles de répartition des revenus (pourcentages enseignant/plateforme, éventuellement par catégorie de cours).
7.4 Programme de parrainage
•	Paramétrage des règles : montant/pourcentage de récompense, plafond, nombre de niveaux (1 à 2 maximum), conditions de déclenchement (abonnement payé uniquement).
•	Suivi des parrainages, détection d'abus (comptes fictifs, auto-parrainage).
•	Gestion du statut Ambassadeur et de ses avantages.
7.5 Événements et partenariats
•	Création et gestion des concerts, séminaires (lieu, dates, pays, places disponibles, billetterie).
•	Gestion des offres partenaires (églises, institutions) : contrats groupés, tarifs, suivi des membres formés.
7.6 Modération et reporting
•	Modération des contenus publiés par les enseignants et des échanges communautaires.
•	Exports et rapports (financiers, pédagogiques) filtrables par période, pays, enseignant.
8. Exigences transverses
8.1 Multi-pays / panafricain
•	Interface multilingue (français, anglais, portugais, arabe a minima).
•	Gestion multi-devises et multi-moyens de paiement locaux.
•	Catalogue d'instruments organisable par région d'Afrique (instruments traditionnels) et par catégorie transversale (instruments modernes : piano, guitare, saxophone, batterie).
8.2 Connectivité et accessibilité
•	Optimisation pour connexions faibles : vidéos compressées, téléchargement pour visionnage hors ligne (application mobile).
•	Application mobile (Android en priorité, forte pénétration en Afrique) + version web responsive.
8.3 Sécurité et conformité
•	Protection des données personnelles conforme aux réglementations locales (ex. lois nationales de protection des données).
•	Sécurisation des paiements (conformité PCI-DSS via prestataire de paiement).
•	Vérification d'identité des enseignants avant activation.
8.4 Notifications
•	Email et notifications push : rappels de cours live, nouveaux contenus, statut de candidature, événements, parrainage.
9. Architecture technique suggérée (haut niveau)
À affiner avec l'équipe de développement retenue ; suggestion de structure pour cadrer les échanges avec un prestataire :
•	Frontend web : application responsive (ex. React/Next.js) + application mobile (ex. Flutter ou React Native).
•	Backend : API REST ou GraphQL, base de données relationnelle (ex. PostgreSQL) pour les données transactionnelles.
•	Hébergement vidéo : service spécialisé (ex. Mux, Cloudflare Stream, Vimeo) pour le streaming adaptatif et le hors-ligne.
•	Visioconférence live : intégration d'un SDK existant (ex. Agora, Daily, Zoom SDK) plutôt qu'un développement propriétaire en phase 1.
•	Paiements : intégration d'un agrégateur multi-pays (ex. Flutterwave, CinetPay, Paystack) pour mutualiser mobile money et cartes.
•	Infrastructure : hébergement cloud avec CDN pour la diffusion vidéo continentale.
10. Modèle de données (entités principales)
Entité	Attributs clés
Utilisateur	id, rôle, nom, pays, langue, email/téléphone, date de création
CandidatureEnseignant	id, utilisateur_id, filière (musique/son), statut, documents, dates
Cours	id, enseignant_id, titre, spécialité, niveau, modules[]
Module / Leçon	id, cours_id, titre, type (vidéo/exercice/quiz), contenu, ordre
Abonnement	id, élève_id, palier, prix, devise, statut, date_début, date_fin
SessionLive	id, enseignant_id, cours_id, date, lien, participants[]
Paiement	id, abonnement_id, montant, devise, moyen, statut, date
Parrainage	id, parrain_id, filleul_id, code, statut, récompense, date_déclenchement
Événement	id, type (concert/séminaire), pays, date, lieu, places, participants[]
PartenaireInstitution	id, nom (église/organisation), pays, offre, membres[]
11. Priorisation MVP (phase 1)
•	Page d'accueil publique (landing page) avec présentation du concept et lien de connexion/inscription.
•	Compte élève, compte enseignant, compte admin avec les 3 dashboards en version simplifiée.
•	Création de cours (vidéo + exercice), catalogue, abonnement payant en mobile money/carte.
•	Répartition automatique des revenus enseignant/plateforme.
•	Recrutement enseignant via formulaire + validation manuelle par l'admin (sans automatisation avancée au départ).
Les fonctionnalités live, parrainage, événements et partenariats institutionnels sont recommandées pour les phases 2 et 3, conformément à la feuille de route du business plan.
