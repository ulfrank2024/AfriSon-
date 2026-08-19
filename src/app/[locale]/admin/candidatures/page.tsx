import { getTranslations } from "next-intl/server";
import { inArray } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { requireAppUser } from "@/modules/auth/require-app-user";
import { getTeacherApplications } from "@/modules/auth/get-teacher-applications";
import { ApplicationStatusForm } from "@/modules/auth/application-status-form";
import { APPLICATION_STATUSES, type ApplicationStatus } from "@/modules/auth/types";
import { getDb } from "@/db/client";
import { users } from "@/db/schema";

function isApplicationStatus(value: string | undefined): value is ApplicationStatus {
  return !!value && (APPLICATION_STATUSES as readonly string[]).includes(value);
}

export default async function AdminCandidaturesPage({
  searchParams,
}: PageProps<"/[locale]/admin/candidatures">) {
  await requireAppUser("admin");
  const t = await getTranslations("adminApplications");

  const params = await searchParams;
  const statusParam = Array.isArray(params.status) ? params.status[0] : params.status;
  const status = isApplicationStatus(statusParam) ? statusParam : undefined;

  const applications = await getTeacherApplications(status);

  const emails = [...new Set(applications.map((a) => a.email))];
  const linkedUsers = emails.length
    ? await getDb()
        .select({ email: users.email })
        .from(users)
        .where(inArray(users.email, emails))
    : [];
  const linkedEmails = new Set(linkedUsers.map((u) => u.email));

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Link
        href="/admin"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        {t("back")}
      </Link>

      <h1 className="mt-6 text-2xl font-bold tracking-tight">{t("title")}</h1>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href="/admin/candidatures"
          className={
            !status
              ? "rounded-full bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground"
              : "rounded-full bg-muted px-3 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted/70"
          }
        >
          {t("filterAll")}
        </Link>
        {APPLICATION_STATUSES.map((s) => (
          <Link
            key={s}
            href={`/admin/candidatures?status=${s}`}
            className={
              status === s
                ? "rounded-full bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground"
                : "rounded-full bg-muted px-3 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted/70"
            }
          >
            {t(`statuses.${s}`)}
          </Link>
        ))}
      </div>

      <div className="mt-8 space-y-6">
        {applications.length === 0 && (
          <p className="text-sm text-muted-foreground">{t("empty")}</p>
        )}

        {applications.map((application) => (
          <Card key={application.id}>
            <CardHeader>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <CardTitle>{application.fullName}</CardTitle>
                  <CardDescription>
                    {application.email} · {application.phone} · {application.country}
                  </CardDescription>
                </div>
                <Badge variant="secondary">{t(`statuses.${application.status}`)}</Badge>
              </div>

              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="font-medium text-foreground">{t("fields.field")}</dt>
                  <dd className="text-muted-foreground">
                    {application.field === "musique"
                      ? t("fields.fieldMusic")
                      : t("fields.fieldSound")}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground">
                    {t("fields.teachingLanguages")}
                  </dt>
                  <dd className="text-muted-foreground">
                    {application.teachingLanguages.join(", ")}
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="font-medium text-foreground">{t("fields.motivation")}</dt>
                  <dd className="text-muted-foreground">{application.motivation}</dd>
                </div>
                <div className="sm:col-span-2 text-xs text-muted-foreground">
                  {t("submittedOn")}{" "}
                  {new Date(application.createdAt).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </dl>

              {linkedEmails.has(application.email) && application.status !== "valide" && (
                <p className="mt-3 rounded-lg bg-primary/10 px-3 py-2 text-xs text-primary">
                  {t("linkedNote")}
                </p>
              )}

              <ApplicationStatusForm
                id={application.id}
                status={application.status}
                notes={application.internalNotes}
              />
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
