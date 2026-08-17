import { getTranslations } from "next-intl/server";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { requireUser } from "@/modules/auth/require-user";

export default async function AdminDashboardPage() {
  await requireUser();
  const t = await getTranslations("dashboard.admin");

  return (
    <DashboardShell
      badge="Admin"
      title={t("title")}
      welcome={t("welcome")}
      cards={[
        { title: t("overview.title"), description: t("overview.description") },
        { title: t("applications.title"), description: t("applications.description") },
        { title: t("subscriptions.title"), description: t("subscriptions.description") },
        { title: t("events.title"), description: t("events.description") },
      ]}
    />
  );
}
