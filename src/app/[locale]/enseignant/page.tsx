import { getTranslations } from "next-intl/server";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { requireUser } from "@/modules/auth/require-user";

export default async function EnseignantDashboardPage() {
  await requireUser();
  const t = await getTranslations("dashboard.enseignant");

  return (
    <DashboardShell
      badge="Enseignant"
      title={t("title")}
      welcome={t("welcome")}
      cards={[
        { title: t("courses.title"), description: t("courses.description") },
        { title: t("students.title"), description: t("students.description") },
        { title: t("earnings.title"), description: t("earnings.description") },
        { title: t("live.title"), description: t("live.description") },
        { title: t("referral.title"), description: t("referral.description") },
      ]}
    />
  );
}
