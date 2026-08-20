import { getTranslations } from "next-intl/server";
import { BookOpen, CreditCard, Users, Gift, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { requireAppUser } from "@/modules/auth/require-app-user";
import { getStudentProgressOverview } from "@/modules/cours/get-student-progress-overview";
import { CourseProgressBar } from "@/modules/cours/course-progress-bar";
import { getAnnouncementsForAudience } from "@/modules/annonces/get-announcements-for-audience";
import { AnnouncementFeed } from "@/modules/annonces/announcement-feed";

export default async function EleveDashboardPage() {
  const appUser = await requireAppUser("eleve");
  const t = await getTranslations("dashboard.eleve");
  const locale = appUser?.interfaceLanguage === "en" ? "en-US" : "fr-FR";

  const [progress, announcements] = await Promise.all([
    appUser
      ? getStudentProgressOverview(appUser.id)
      : Promise.resolve({ totalLessonsCompleted: 0, coursesStartedCount: 0, recentCourses: [] }),
    getAnnouncementsForAudience("eleve"),
  ]);

  return (
    <DashboardShell
      badge="Élève"
      title={t("title")}
      welcome={appUser ? `${t("welcome")} ${appUser.fullName}` : t("welcome")}
      bannerImage={{ src: "/images/traditional-dance.jpg", alt: "" }}
      beforeCards={
        <div className="mb-8 space-y-8">
          {announcements.length > 0 && (
            <div>
              <h2 className="mb-3 text-sm font-semibold">{t("announcements.title")}</h2>
              <AnnouncementFeed announcements={announcements} locale={locale} emptyLabel="" />
            </div>
          )}

          <div>
            <h2 className="mb-3 text-sm font-semibold">{t("progress.title")}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="text-3xl font-bold tabular-nums">{progress.coursesStartedCount}</p>
                <p className="mt-1 text-xs text-muted-foreground">{t("progress.coursesStarted")}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="text-3xl font-bold tabular-nums">{progress.totalLessonsCompleted}</p>
                <p className="mt-1 text-xs text-muted-foreground">{t("progress.lessonsCompleted")}</p>
              </div>
            </div>

            {progress.recentCourses.length > 0 && (
              <div className="mt-4 space-y-2">
                {progress.recentCourses.map((course) => (
                  <Link
                    key={course.id}
                    href={`/eleve/cours/${course.id}`}
                    className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{course.title}</p>
                      <div className="mt-2 flex items-center gap-3">
                        <CourseProgressBar completed={course.completedCount} total={course.totalLessons} />
                        <span className="shrink-0 text-xs text-muted-foreground">
                          {course.completedCount}/{course.totalLessons}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      }
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
