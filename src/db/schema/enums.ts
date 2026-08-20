import { pgEnum } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", [
  "eleve",
  "enseignant",
  "admin",
  "partenaire",
]);

export const interfaceLanguageEnum = pgEnum("interface_language", ["fr", "en"]);

export const teachingLanguageEnum = pgEnum("teaching_language", ["fr", "en"]);

export const teacherFieldEnum = pgEnum("teacher_field", ["musique", "son"]);

export const applicationStatusEnum = pgEnum("application_status", [
  "recu",
  "en_revue",
  "preselectionne",
  "evaluation_planifiee",
  "entretien",
  "valide",
  "rejete",
  "en_attente_documents",
]);

export const courseLevelEnum = pgEnum("course_level", [
  "debutant",
  "intermediaire",
  "avance",
]);

export const courseStatusEnum = pgEnum("course_status", [
  "brouillon",
  "en_revue",
  "publie",
  "rejete",
]);

export const lessonTypeEnum = pgEnum("lesson_type", [
  "video",
  "exercice",
  "quiz",
]);

export const subscriptionTierEnum = pgEnum("subscription_tier", [
  "decouverte",
  "standard",
  "premium",
]);

export const subscriptionStatusEnum = pgEnum("subscription_status", [
  "active",
  "en_attente",
  "expiree",
  "annulee",
]);

export const paymentMethodEnum = pgEnum("payment_method", [
  "mtn_momo",
  "orange_money",
  "carte",
]);

export const paymentStatusEnum = pgEnum("payment_status", [
  "en_attente",
  "reussi",
  "echoue",
  "rembourse",
]);

export const referralStatusEnum = pgEnum("referral_status", [
  "en_attente",
  "recompense",
  "invalide",
]);

export const eventTypeEnum = pgEnum("event_type", ["concert", "seminaire"]);

export const announcementAudienceEnum = pgEnum("announcement_audience", [
  "tous",
  "eleve",
  "enseignant",
]);
