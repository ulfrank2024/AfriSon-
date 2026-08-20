import { getTranslations } from "next-intl/server";
import { BookOpen, Users, Wallet, Video, Gift } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { requireAppUser } from "@/modules/auth/require-app-user";
import { getAnnouncementsForAudience } from "@/modules/annonces/get-announcements-for-audience";
import { AnnouncementFeed } from "@/modules/annonces/announcement-feed";

export default async function EnseignantDashboardPage() {
  const appUser = await requireAppUser("enseignant");
  const t = await getTranslations("dashboard.enseignant");
  const locale = appUser?.interfaceLanguage === "en" ? "en-US" : "fr-FR";
  const announcements = await getAnnouncementsForAudience("enseignant");

  return (
    <DashboardShell
      badge="Enseignant"
      title={t("title")}
      welcome={appUser ? `${t("welcome")} ${appUser.fullName}` : t("welcome")}
      bannerImage={{ src: "/images/teacher-tablet-guitar.jpg", alt: "" }}
      beforeCards={
        announcements.length > 0 ? (
          <div className="mb-8">
            <h2 className="mb-3 text-sm font-semibold">{t("announcements.title")}</h2>
            <AnnouncementFeed announcements={announcements} locale={locale} emptyLabel="" />
          </div>
        ) : undefined
      }
      cards={[
        {
          title: t("courses.title"),
          description: t("courses.description"),
          icon: <BookOpen className="size-5" strokeWidth={2.25} />,
          accent: "bg-primary/15 text-primary",
          href: "/enseignant/cours",
        },
        {
          title: t("students.title"),
          description: t("students.description"),
          icon: <Users className="size-5" strokeWidth={2.25} />,
          accent: "bg-chart-2/15 text-chart-2",
          comingSoonLabel: t("comingSoon"),
        },
        {
          title: t("earnings.title"),
          description: t("earnings.description"),
          icon: <Wallet className="size-5" strokeWidth={2.25} />,
          accent: "bg-chart-4/15 text-chart-4",
          comingSoonLabel: t("comingSoon"),
        },
        {
          title: t("live.title"),
          description: t("live.description"),
          icon: <Video className="size-5" strokeWidth={2.25} />,
          accent: "bg-chart-3/15 text-chart-3",
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
