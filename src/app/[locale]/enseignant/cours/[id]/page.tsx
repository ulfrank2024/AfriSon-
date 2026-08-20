import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowLeft, Video, Dumbbell, HelpCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { requireAppUser } from "@/modules/auth/require-app-user";
import { getCourseForTeacher } from "@/modules/cours/get-course-for-teacher";
import { PublishToggleForm } from "@/modules/cours/publish-toggle-form";
import { LessonForm } from "@/modules/cours/lesson-form";
import { DeleteLessonForm } from "@/modules/cours/delete-lesson-form";

const LESSON_ICONS = { video: Video, exercice: Dumbbell, quiz: HelpCircle } as const;

export default async function TeacherCourseDetailPage({
  params,
}: PageProps<"/[locale]/enseignant/cours/[id]">) {
  const appUser = await requireAppUser("enseignant");
  const t = await getTranslations("teacherCourses");
  const { id } = await params;

  const data = appUser ? await getCourseForTeacher(id, appUser.id) : null;
  if (!data) {
    notFound();
  }
  const { course, lessons } = data;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-8 sm:py-10">
      <Link
        href="/enseignant/cours"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        {t("back")}
      </Link>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{course.title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {course.specialty} · {t(`levels.${course.level}`)} ·{" "}
            {t(`teachingLanguages.${course.teachingLanguage}`)}
          </p>
        </div>
        <PublishToggleForm courseId={course.id} isPublished={course.isPublished} />
      </div>

      {!course.isPublished && (
        <p className="mt-4 rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
          {t("draftNote")}
        </p>
      )}

      <h2 className="mt-10 text-lg font-semibold">{t("lessons")}</h2>

      {lessons.length === 0 ? (
        <p className="mt-2 text-sm text-muted-foreground">{t("noLessons")}</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {lessons.map((lesson) => {
            const Icon = LESSON_ICONS[lesson.type];
            return (
              <li
                key={lesson.id}
                className="flex items-start justify-between gap-3 rounded-lg border border-border bg-card p-3"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Icon className="size-3.5" />
                  </span>
                  <div>
                    <p className="text-sm font-medium">{lesson.title}</p>
                    <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                      {lesson.content}
                    </p>
                  </div>
                </div>
                <DeleteLessonForm lessonId={lesson.id} courseId={course.id} />
              </li>
            );
          })}
        </ul>
      )}

      <h3 className="mt-8 text-sm font-semibold">{t("addLesson")}</h3>
      <div className="mt-3">
        <LessonForm courseId={course.id} />
      </div>
    </div>
  );
}
