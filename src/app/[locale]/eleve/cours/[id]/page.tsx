import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowLeft, Video, Dumbbell, HelpCircle, ExternalLink } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { requireAppUser } from "@/modules/auth/require-app-user";
import { getPublishedCourse } from "@/modules/cours/get-published-course";
import { CourseRating } from "@/modules/cours/course-rating";
import { CourseLikeButton } from "@/modules/cours/course-like-button";
import { CourseProgressBar } from "@/modules/cours/course-progress-bar";
import { LessonProgressCheckbox } from "@/modules/cours/lesson-progress-checkbox";

const LESSON_ICONS = { video: Video, exercice: Dumbbell, quiz: HelpCircle } as const;

function isUrl(value: string) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

export default async function StudentCourseDetailPage({
  params,
}: PageProps<"/[locale]/eleve/cours/[id]">) {
  const appUser = await requireAppUser("eleve");
  const t = await getTranslations("studentCourses");
  const { id } = await params;

  const data = await getPublishedCourse(id, appUser?.id);
  if (!data) {
    notFound();
  }
  const { course, lessons, completedCount, averageRating, ratingCount, likeCount, myRating, isLiked } = data;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-8 sm:py-10">
      <Link
        href="/eleve/cours"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        {t("back")}
      </Link>

      <div className="mt-6">
        <h1 className="text-2xl font-bold tracking-tight">{course.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {course.specialty} · {t("byTeacher", { name: course.teacherName })}
        </p>
        <div className="mt-3 flex gap-2">
          <Badge variant="secondary">{t(`levels.${course.level}`)}</Badge>
          <Badge variant="outline">{t(`teachingLanguages.${course.teachingLanguage}`)}</Badge>
        </div>

        <div className="mt-5 flex flex-wrap items-end gap-6">
          <div>
            <p className="mb-1.5 text-xs font-medium text-muted-foreground">{t("rateThisCourse")}</p>
            <CourseRating
              courseId={course.id}
              averageRating={averageRating}
              ratingCount={ratingCount}
              myRating={myRating}
            />
          </div>
          <CourseLikeButton courseId={course.id} likeCount={likeCount} isLiked={isLiked} />
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-semibold">{t("lessons")}</h2>
        {lessons.length > 0 && (
          <p className="text-xs text-muted-foreground">
            {t("progressCount", { completed: completedCount, total: lessons.length })}
          </p>
        )}
      </div>

      {lessons.length > 0 && (
        <div className="mt-3">
          <CourseProgressBar completed={completedCount} total={lessons.length} />
        </div>
      )}

      {lessons.length === 0 ? (
        <p className="mt-2 text-sm text-muted-foreground">{t("noLessons")}</p>
      ) : (
        <ol className="mt-4 space-y-2">
          {lessons.map((lesson, index) => {
            const Icon = LESSON_ICONS[lesson.type];
            const linkable = lesson.type === "video" && isUrl(lesson.content);
            return (
              <li
                key={lesson.id}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-3"
              >
                <LessonProgressCheckbox lessonId={lesson.id} courseId={course.id} completed={lesson.completed} />
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="size-3.5" />
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {index + 1}. {lesson.title}
                  </p>
                  {linkable ? (
                    <a
                      href={lesson.content}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                    >
                      {t("watchLesson")}
                      <ExternalLink className="size-3" />
                    </a>
                  ) : (
                    <p className="mt-0.5 text-xs text-muted-foreground">{lesson.content}</p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
