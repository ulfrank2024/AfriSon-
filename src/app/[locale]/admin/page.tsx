import { getTranslations } from "next-intl/server";
import {
  ArrowRight,
  Users,
  GraduationCap,
  Globe,
  FileClock,
  UserCheck,
  Video,
  Megaphone,
  CreditCard,
  CalendarRange,
  Lock,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";
import { requireAppUser } from "@/modules/auth/require-app-user";
import { getAdminOverview } from "@/modules/auth/get-admin-overview";
import { cn } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const appUser = await requireAppUser("admin");
  const t = await getTranslations("dashboard.admin");
  const overview = await getAdminOverview();

  const stats = [
    { key: "students", value: overview.studentCount, icon: Users, accent: "bg-chart-1/15 text-chart-1" },
    { key: "teachers", value: overview.teacherCount, icon: GraduationCap, accent: "bg-chart-2/15 text-chart-2" },
    { key: "countries", value: overview.countryCount, icon: Globe, accent: "bg-chart-4/15 text-chart-4" },
    {
      key: "pendingApplications",
      value: overview.pendingApplications,
      icon: FileClock,
      accent: "bg-primary/15 text-primary",
    },
    {
      key: "coursesToReview",
      value: overview.coursesToReview,
      icon: Video,
      accent: "bg-chart-3/15 text-chart-3",
    },
  ] as const;

  const today = new Date().toLocaleDateString(appUser?.interfaceLanguage === "en" ? "en-US" : "fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8 sm:py-10">
      <Reveal onView={false}>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {appUser ? `${t("welcome")} ${appUser.fullName}` : t("welcome")}
            </p>
          </div>
          <p className="text-sm text-muted-foreground capitalize">{today}</p>
        </div>
      </Reveal>

      <StaggerGroup className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-5" staggerDelay={0.06}>
        {stats.map((stat) => (
          <StaggerItem key={stat.key}>
            <div className="rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-md">
              <span className={cn("flex size-9 items-center justify-center rounded-lg", stat.accent)}>
                <stat.icon className="size-4.5" strokeWidth={2.25} />
              </span>
              <p className="mt-3 text-3xl font-bold tabular-nums">{stat.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{t(`stats.${stat.key}`)}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <StaggerGroup className="mt-6 grid gap-4 sm:grid-cols-3" staggerDelay={0.08}>
        <StaggerItem>
          <Link href="/admin/candidatures" className="group block h-full">
            <div className="flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
              <div className="flex items-start justify-between">
                <span className="flex size-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <UserCheck className="size-5" strokeWidth={2.25} />
                </span>
                {overview.pendingApplications > 0 && (
                  <Badge variant="secondary">{overview.pendingApplications}</Badge>
                )}
              </div>
              <p className="mt-4 font-semibold">{t("applications.title")}</p>
              <p className="mt-1 flex-1 text-sm text-muted-foreground">{t("applications.description")}</p>
              <span className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
                {t("applications.viewAll")}
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </StaggerItem>

        <StaggerItem>
          <Link href="/admin/cours" className="group block h-full">
            <div className="flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
              <div className="flex items-start justify-between">
                <span className="flex size-10 items-center justify-center rounded-lg bg-chart-3/15 text-chart-3">
                  <Video className="size-5" strokeWidth={2.25} />
                </span>
                {overview.coursesToReview > 0 && (
                  <Badge variant="secondary">{overview.coursesToReview}</Badge>
                )}
              </div>
              <p className="mt-4 font-semibold">{t("courseReview.title")}</p>
              <p className="mt-1 flex-1 text-sm text-muted-foreground">{t("courseReview.description")}</p>
              <span className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
                {t("courseReview.viewAll")}
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </StaggerItem>

        <StaggerItem>
          <Link href="/admin/annonces" className="group block h-full">
            <div className="flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
              <span className="flex size-10 items-center justify-center rounded-lg bg-chart-5/15 text-chart-5">
                <Megaphone className="size-5" strokeWidth={2.25} />
              </span>
              <p className="mt-4 font-semibold">{t("announcements.title")}</p>
              <p className="mt-1 flex-1 text-sm text-muted-foreground">{t("announcements.description")}</p>
              <span className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
                {t("announcements.viewAll")}
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </StaggerItem>

        <StaggerItem>
          <Link href="/admin/abonnements" className="group block h-full">
            <div className="flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
              <span className="flex size-10 items-center justify-center rounded-lg bg-chart-2/15 text-chart-2">
                <CreditCard className="size-5" strokeWidth={2.25} />
              </span>
              <p className="mt-4 font-semibold">{t("subscriptions.title")}</p>
              <p className="mt-1 flex-1 text-sm text-muted-foreground">{t("subscriptions.description")}</p>
              <span className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
                {t("subscriptions.viewAll")}
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </StaggerItem>

        <StaggerItem>
          <div className="flex h-full flex-col rounded-xl border border-dashed border-border bg-card/50 p-5">
            <span className="flex size-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
              <CalendarRange className="size-5" strokeWidth={2.25} />
            </span>
            <p className="mt-4 font-semibold text-muted-foreground">{t("events.title")}</p>
            <p className="mt-1 flex-1 text-sm text-muted-foreground">{t("events.description")}</p>
            <span className="mt-4 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Lock className="size-3.5" />
              {t("comingSoon")}
            </span>
          </div>
        </StaggerItem>
      </StaggerGroup>
    </div>
  );
}
