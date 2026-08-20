import { getTranslations } from "next-intl/server";
import { ArrowLeft, ArrowRight, BookOpen, Star } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { requireAppUser } from "@/modules/auth/require-app-user";
import { getCourseCatalogue } from "@/modules/cours/get-course-catalogue";
import { COURSE_LEVELS, type CourseLevel } from "@/modules/cours/types";
import { cn } from "@/lib/utils";

function isCourseLevel(value: string | undefined): value is CourseLevel {
  return !!value && (COURSE_LEVELS as readonly string[]).includes(value);
}

function isTeachingLanguage(value: string | undefined): value is "fr" | "en" {
  return value === "fr" || value === "en";
}

export default async function StudentCataloguePage({
  searchParams,
}: PageProps<"/[locale]/eleve/cours">) {
  await requireAppUser("eleve");
  const t = await getTranslations("studentCourses");

  const params = await searchParams;
  const levelParam = Array.isArray(params.level) ? params.level[0] : params.level;
  const langParam = Array.isArray(params.lang) ? params.lang[0] : params.lang;
  const level = isCourseLevel(levelParam) ? levelParam : undefined;
  const teachingLanguage = isTeachingLanguage(langParam) ? langParam : undefined;

  const catalogue = await getCourseCatalogue({ level, teachingLanguage });

  function filterHref(next: { level?: CourseLevel; lang?: "fr" | "en" }) {
    const query = new URLSearchParams();
    if (next.level) query.set("level", next.level);
    if (next.lang) query.set("lang", next.lang);
    const qs = query.toString();
    return `/eleve/cours${qs ? `?${qs}` : ""}`;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-8 sm:py-10">
      <Link
        href="/eleve"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        {t("back")}
      </Link>

      <h1 className="mt-6 text-2xl font-bold tracking-tight">{t("title")}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{t("description")}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href={filterHref({ lang: teachingLanguage === "fr" ? undefined : "fr", level })}
          className={cn(
            "rounded-full px-3 py-1.5 text-sm font-medium",
            teachingLanguage === "fr"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/70",
          )}
        >
          {t("filters.fr")}
        </Link>
        <Link
          href={filterHref({ lang: teachingLanguage === "en" ? undefined : "en", level })}
          className={cn(
            "rounded-full px-3 py-1.5 text-sm font-medium",
            teachingLanguage === "en"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/70",
          )}
        >
          {t("filters.en")}
        </Link>
        {COURSE_LEVELS.map((l) => (
          <Link
            key={l}
            href={filterHref({ level: level === l ? undefined : l, lang: teachingLanguage })}
            className={cn(
              "rounded-full px-3 py-1.5 text-sm font-medium",
              level === l
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/70",
            )}
          >
            {t(`levels.${l}`)}
          </Link>
        ))}
      </div>

      {catalogue.length === 0 ? (
        <div className="mt-8 flex flex-col items-center gap-3 rounded-xl border border-dashed border-border py-16 text-center">
          <BookOpen className="size-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">{t("empty")}</p>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {catalogue.map((course) => (
            <Link
              key={course.id}
              href={`/eleve/cours/${course.id}`}
              className="group flex flex-col rounded-xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="font-semibold">{course.title}</p>
                <Badge variant="outline">{t(`teachingLanguagesShort.${course.teachingLanguage}`)}</Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{course.specialty}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <Badge variant="secondary">{t(`levels.${course.level}`)}</Badge>
                <span>{t("byTeacher", { name: course.teacherName })}</span>
                {course.averageRating !== null && (
                  <span className="flex items-center gap-0.5">
                    <Star className="size-3 fill-primary text-primary" />
                    {course.averageRating.toFixed(1)} ({course.ratingCount})
                  </span>
                )}
              </div>
              <span className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
                {t("view")}
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
