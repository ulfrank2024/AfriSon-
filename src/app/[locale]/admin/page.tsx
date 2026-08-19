import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";
import { requireAppUser } from "@/modules/auth/require-app-user";
import { getAdminOverview } from "@/modules/auth/get-admin-overview";

export default async function AdminDashboardPage() {
  const appUser = await requireAppUser("admin");
  const t = await getTranslations("dashboard.admin");
  const overview = await getAdminOverview();

  const stats = [
    { key: "students", value: overview.studentCount },
    { key: "teachers", value: overview.teacherCount },
    { key: "countries", value: overview.countryCount },
    { key: "pendingApplications", value: overview.pendingApplications },
  ] as const;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <Reveal onView={false}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Badge variant="secondary">Admin</Badge>
            <h1 className="mt-3 text-2xl font-bold tracking-tight">{t("title")}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {appUser ? `${t("welcome")} ${appUser.fullName}` : t("welcome")}
            </p>
          </div>
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            AfriSon Academy
          </Link>
        </div>
      </Reveal>

      <StaggerGroup className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4" staggerDelay={0.06}>
        {stats.map((stat) => (
          <StaggerItem key={stat.key}>
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {t(`stats.${stat.key}`)}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <StaggerGroup className="mt-6 grid gap-4 sm:grid-cols-2" staggerDelay={0.08}>
        <StaggerItem>
          <Link href="/admin/candidatures" className="group block h-full">
            <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {t("applications.title")}
                  <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </CardTitle>
                <CardDescription>{t("applications.description")}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </StaggerItem>

        <StaggerItem>
          <Card className="h-full opacity-70">
            <CardHeader>
              <CardTitle>{t("subscriptions.title")}</CardTitle>
              <CardDescription>{t("subscriptions.description")}</CardDescription>
            </CardHeader>
          </Card>
        </StaggerItem>

        <StaggerItem>
          <Card className="h-full opacity-70">
            <CardHeader>
              <CardTitle>{t("events.title")}</CardTitle>
              <CardDescription>{t("events.description")}</CardDescription>
            </CardHeader>
          </Card>
        </StaggerItem>
      </StaggerGroup>
    </div>
  );
}
