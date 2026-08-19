export const USER_ROLES = ["eleve", "enseignant", "admin", "partenaire"] as const;
export type UserRole = (typeof USER_ROLES)[number];

export const INTERFACE_LANGUAGES = ["fr", "en"] as const;
export type InterfaceLanguage = (typeof INTERFACE_LANGUAGES)[number];

export const APPLICATION_STATUSES = [
  "recu",
  "en_revue",
  "preselectionne",
  "evaluation_planifiee",
  "entretien",
  "valide",
  "rejete",
  "en_attente_documents",
] as const;
export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export type AppUser = {
  id: string;
  clerkId: string;
  role: UserRole;
  fullName: string;
  country: string;
  interfaceLanguage: InterfaceLanguage;
  email: string | null;
  phone: string | null;
};

export function dashboardPathForRole(role: UserRole): string {
  switch (role) {
    case "eleve":
      return "/eleve";
    case "enseignant":
      return "/enseignant";
    case "admin":
      return "/admin";
    case "partenaire":
      return "/partenaire";
  }
}
