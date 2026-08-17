import { getTranslations } from "next-intl/server";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { requireUser } from "@/modules/auth/require-user";

export default async function EleveDashboardPage() {
  await requireUser();
  const t = await getTranslations("dashboard.eleve");

  return (
    <DashboardShell
      badge="Élève"
      title={t("title")}
      welcome={t("welcome")}
      cards={[
        { title: t("subscription.title"), description: t("subscription.description") },
        { title: t("courses.title"), description: t("courses.description") },
        { title: t("community.title"), description: t("community.description") },
        { title: t("referral.title"), description: t("referral.description") },
      ]}
    />
  );
}
