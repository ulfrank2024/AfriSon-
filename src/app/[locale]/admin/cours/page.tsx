import { getTranslations } from "next-intl/server";
import { Video, Dumbbell, HelpCircle, ExternalLink } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { requireAppUser } from "@/modules/auth/require-app-user";
import { getCoursesForReview } from "@/modules/cours/get-courses-for-review";
import { CourseReviewForm } from "@/modules/cours/course-review-form";
import { COURSE_STATUSES, type CourseStatus } from "@/modules/cours/types";

const LESSON_ICONS = { video: Video, exercice: Dumbbell, quiz: HelpCircle } as const;

function isCourseStatus(value: string | undefined): value is CourseStatus {
  return !!value && (COURSE_STATUSES as readonly string[]).includes(value);
}

function isUrl(value: string) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

export default async function AdminCoursesPage({
  searchParams,
}: PageProps<"/[locale]/admin/cours">) {
  await requireAppUser("admin");
  const t = await getTranslations("adminCourses");

  const params = await searchParams;
  const statusParam = Array.isArray(params.status) ? params.status[0] : params.status;
  const status = isCourseStatus(statusParam) ? statusParam : undefined;

  const reviewCourses = await getCoursesForReview(status);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-8 sm:py-10">
      <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{t("description")}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href="/admin/cours"
          className={
            !status
              ? "rounded-full bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground"
              : "rounded-full bg-muted px-3 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted/70"
          }
        >
          {t("filterAll")}
        </Link>
        {COURSE_STATUSES.map((s) => (
          <Link
            key={s}
            href={`/admin/cours?status=${s}`}
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
        {reviewCourses.length === 0 && <p className="text-sm text-muted-foreground">{t("empty")}</p>}

        {reviewCourses.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>
                    {course.specialty} · {t("byTeacher", { name: course.teacherName })}
                  </CardDescription>
                </div>
                <Badge variant="secondary">{t(`statuses.${course.status}`)}</Badge>
              </div>

              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="font-medium text-foreground">{t("fields.level")}</dt>
                  <dd className="text-muted-foreground">{t(`levels.${course.level}`)}</dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground">{t("fields.teachingLanguage")}</dt>
                  <dd className="text-muted-foreground">
                    {t(`teachingLanguages.${course.teachingLanguage}`)}
                  </dd>
                </div>
              </dl>

              <div className="mt-4">
                <p className="text-sm font-medium text-foreground">{t("fields.lessons")}</p>
                {course.lessons.length === 0 ? (
                  <p className="mt-1 text-sm text-muted-foreground">{t("noLessons")}</p>
                ) : (
                  <ul className="mt-2 space-y-1.5">
                    {course.lessons.map((lesson) => {
                      const Icon = LESSON_ICONS[lesson.type];
                      const linkable = lesson.type === "video" && isUrl(lesson.content);
                      return (
                        <li key={lesson.id} className="flex items-start gap-2 text-sm">
                          <Icon className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
                          <span className="font-medium">{lesson.title}</span>
                          {linkable ? (
                            <a
                              href={lesson.content}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-primary hover:underline"
                            >
                              {t("watchVideo")}
                              <ExternalLink className="size-3" />
                            </a>
                          ) : (
                            <span className="text-muted-foreground">— {lesson.content}</span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              {course.adminNotes && (
                <p className="mt-4 rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
                  {t("previousNotes")} {course.adminNotes}
                </p>
              )}

              {course.status === "en_revue" && <CourseReviewForm courseId={course.id} />}
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
