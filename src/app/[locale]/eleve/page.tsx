import { getTranslations } from "next-intl/server";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { requireAppUser } from "@/modules/auth/require-app-user";

export default async function EleveDashboardPage() {
  const appUser = await requireAppUser("eleve");
  const t = await getTranslations("dashboard.eleve");

  return (
    <DashboardShell
      badge="Élève"
      title={t("title")}
      welcome={appUser ? `${t("welcome")} ${appUser.fullName}` : t("welcome")}
      cards={[
        { title: t("subscription.title"), description: t("subscription.description") },
        { title: t("courses.title"), description: t("courses.description") },
        { title: t("community.title"), description: t("community.description") },
        { title: t("referral.title"), description: t("referral.description") },
      ]}
    />
  );
}
