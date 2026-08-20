import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowLeft, Video, Dumbbell, HelpCircle, ExternalLink } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { requireAppUser } from "@/modules/auth/require-app-user";
import { getPublishedCourse } from "@/modules/cours/get-published-course";

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
  await requireAppUser("eleve");
  const t = await getTranslations("studentCourses");
  const { id } = await params;

  const data = await getPublishedCourse(id);
  if (!data) {
    notFound();
  }
  const { course, lessons } = data;

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
      </div>

      <h2 className="mt-10 text-lg font-semibold">{t("lessons")}</h2>

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
