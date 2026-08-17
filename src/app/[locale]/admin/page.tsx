import { getTranslations } from "next-intl/server";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { requireAppUser } from "@/modules/auth/require-app-user";

export default async function AdminDashboardPage() {
  const appUser = await requireAppUser("admin");
  const t = await getTranslations("dashboard.admin");

  return (
    <DashboardShell
      badge="Admin"
      title={t("title")}
      welcome={appUser ? `${t("welcome")} ${appUser.fullName}` : t("welcome")}
      cards={[
        { title: t("overview.title"), description: t("overview.description") },
        { title: t("applications.title"), description: t("applications.description") },
        { title: t("subscriptions.title"), description: t("subscriptions.description") },
        { title: t("events.title"), description: t("events.description") },
      ]}
    />
  );
}
