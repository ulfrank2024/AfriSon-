import { getTranslations } from "next-intl/server";
import { BookOpen, CreditCard, Users, Gift } from "lucide-react";
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
      bannerImage={{ src: "/images/traditional-dance.jpg", alt: "" }}
      cards={[
        {
          title: t("courses.title"),
          description: t("courses.description"),
          icon: <BookOpen className="size-5" strokeWidth={2.25} />,
          accent: "bg-primary/15 text-primary",
          href: "/eleve/cours",
        },
        {
          title: t("subscription.title"),
          description: t("subscription.description"),
          icon: <CreditCard className="size-5" strokeWidth={2.25} />,
          accent: "bg-chart-2/15 text-chart-2",
          comingSoonLabel: t("comingSoon"),
        },
        {
          title: t("community.title"),
          description: t("community.description"),
          icon: <Users className="size-5" strokeWidth={2.25} />,
          accent: "bg-chart-4/15 text-chart-4",
          comingSoonLabel: t("comingSoon"),
        },
        {
          title: t("referral.title"),
          description: t("referral.description"),
          icon: <Gift className="size-5" strokeWidth={2.25} />,
          accent: "bg-chart-5/15 text-chart-5",
          comingSoonLabel: t("comingSoon"),
        },
      ]}
    />
  );
}
