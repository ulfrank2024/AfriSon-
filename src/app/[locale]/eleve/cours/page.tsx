import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { ArrowLeft, ArrowRight, BookOpen, GraduationCap, Layers, Music, Sparkles, Star, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { requireAppUser } from "@/modules/auth/require-app-user";
import { getCourseCatalogue } from "@/modules/cours/get-course-catalogue";
import { getCourseCatalogueStats } from "@/modules/cours/get-course-catalogue-stats";
import { COURSE_LEVELS, type CourseLevel } from "@/modules/cours/types";
import { cn } from "@/lib/utils";

function isCourseLevel(value: string | undefined): value is CourseLevel {
  return !!value && (COURSE_LEVELS as readonly string[]).includes(value);
}

function isTeachingLanguage(value: string | undefined): value is "fr" | "en" {
  return value === "fr" || value === "en";
}

function FilterPill({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "bg-muted text-muted-foreground hover:bg-muted/70",
      )}
    >
      {children}
    </Link>
  );
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
  const hasActiveFilters = Boolean(level || teachingLanguage);

  const [catalogue, stats] = await Promise.all([
    getCourseCatalogue({ level, teachingLanguage }),
    getCourseCatalogueStats(),
  ]);

  function filterHref(next: { level?: CourseLevel; lang?: "fr" | "en" }) {
    const query = new URLSearchParams();
    if (next.level) query.set("level", next.level);
    if (next.lang) query.set("lang", next.lang);
    const qs = query.toString();
    return `/eleve/cours${qs ? `?${qs}` : ""}`;
  }

  const statItems = [
    { icon: BookOpen, value: stats.totalCourses, label: t("stats.courses") },
    { icon: GraduationCap, value: stats.totalTeachers, label: t("stats.teachers") },
    { icon: Layers, value: stats.totalLessons, label: t("stats.lessons") },
  ];

  return (
    <div>
      <div className="mx-auto max-w-[1600px] px-4 pt-8 sm:px-8 lg:px-12">
        <Link
          href="/eleve"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          {t("back")}
        </Link>
      </div>

      <div className="relative mt-6 h-48 w-full overflow-hidden sm:h-60">
        <Image
          src="/images/stage-instruments.jpg"
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />
        <div className="absolute inset-0 flex items-end px-4 pb-5 sm:px-8 sm:pb-7 lg:px-12">
          <div className="mx-auto flex w-full max-w-[1600px] flex-wrap items-end justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur-sm">
                <BookOpen className="size-5" strokeWidth={2.25} />
              </span>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">{t("title")}</h1>
                <p className="mt-0.5 text-sm text-white/85">{t("description")}</p>
              </div>
            </div>

            <div className="flex items-stretch divide-x divide-white/20 rounded-xl border border-white/25 bg-black/25 backdrop-blur-sm">
              {statItems.map((stat) => (
                <div key={stat.label} className="flex items-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3">
                  <stat.icon className="size-4 shrink-0 text-white/80" strokeWidth={2} />
                  <div>
                    <p className="text-lg font-bold tabular-nums text-white sm:text-xl">{stat.value}</p>
                    <p className="text-[11px] whitespace-nowrap text-white/80">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-4 py-8 sm:px-8 sm:py-10 lg:px-12">
        <div className="lg:grid lg:grid-cols-[260px_1fr] lg:items-start lg:gap-8">
        <aside className="space-y-5 rounded-xl border border-border bg-card/50 p-4 sm:p-5 lg:sticky lg:top-8">
          <div>
            <p className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              {t("languageFilterLabel")}
            </p>
            <div className="flex flex-wrap gap-2">
              <FilterPill
                href={filterHref({ lang: teachingLanguage === "fr" ? undefined : "fr", level })}
                active={teachingLanguage === "fr"}
              >
                {t("filters.fr")}
              </FilterPill>
              <FilterPill
                href={filterHref({ lang: teachingLanguage === "en" ? undefined : "en", level })}
                active={teachingLanguage === "en"}
              >
                {t("filters.en")}
              </FilterPill>
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              {t("levelFilterLabel")}
            </p>
            <div className="flex flex-wrap gap-2">
              {COURSE_LEVELS.map((l) => (
                <FilterPill
                  key={l}
                  href={filterHref({ level: level === l ? undefined : l, lang: teachingLanguage })}
                  active={level === l}
                >
                  {t(`levels.${l}`)}
                </FilterPill>
              ))}
            </div>
          </div>

          {hasActiveFilters && (
            <Link
              href="/eleve/cours"
              className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
            >
              <X className="size-3" />
              {t("resetFilters")}
            </Link>
          )}
        </aside>

        {catalogue.length === 0 ? (
          <div className="mt-6 flex flex-col items-center gap-3 rounded-xl border border-dashed border-border py-16 text-center lg:mt-0">
            <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              {hasActiveFilters ? (
                <BookOpen className="size-5" strokeWidth={2} />
              ) : (
                <Sparkles className="size-5" strokeWidth={2} />
              )}
            </span>
            <div>
              <p className="font-medium">{hasActiveFilters ? t("emptyFiltered") : t("emptyCatalogue")}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {hasActiveFilters ? t("emptyFilteredHint") : t("emptyCatalogueHint")}
              </p>
            </div>
            {hasActiveFilters && (
              <Link
                href="/eleve/cours"
                className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                {t("resetFilters")}
              </Link>
            )}
          </div>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:mt-0 xl:grid-cols-3">
            {catalogue.map((course) => (
              <Link
                key={course.id}
                href={`/eleve/cours/${course.id}`}
                className="group flex flex-col rounded-xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Music className="size-4" strokeWidth={2.25} />
                  </span>
                  <Badge variant="outline">{t(`teachingLanguagesShort.${course.teachingLanguage}`)}</Badge>
                </div>
                <p className="mt-3 font-semibold">{course.title}</p>
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
      </div>
    </div>
  );
}
