import { getTranslations } from "next-intl/server";
import { Plus, ArrowLeft, BookOpen } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { requireAppUser } from "@/modules/auth/require-app-user";
import { getTeacherCourses } from "@/modules/cours/get-teacher-courses";

export default async function TeacherCoursesPage() {
  const appUser = await requireAppUser("enseignant");
  const t = await getTranslations("teacherCourses");

  const teacherCourses = appUser ? await getTeacherCourses(appUser.id) : [];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-8 sm:py-10">
      <Link
        href="/enseignant"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        {t("back")}
      </Link>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
        <Link href="/enseignant/cours/nouveau" className={buttonVariants()}>
          <Plus className="size-4" />
          {t("newCourse")}
        </Link>
      </div>

      {teacherCourses.length === 0 ? (
        <div className="mt-8 flex flex-col items-center gap-3 rounded-xl border border-dashed border-border py-16 text-center">
          <BookOpen className="size-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">{t("empty")}</p>
          <Link href="/enseignant/cours/nouveau" className={buttonVariants({ size: "sm" })}>
            {t("newCourse")}
          </Link>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {teacherCourses.map((course) => (
            <Link
              key={course.id}
              href={`/enseignant/cours/${course.id}`}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40"
            >
              <div>
                <p className="font-semibold">{course.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {course.specialty} · {t(`levels.${course.level}`)} ·{" "}
                  {t(`teachingLanguages.${course.teachingLanguage}`)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{t("lessonCount", { count: course.lessonCount })}</Badge>
                <Badge variant={course.status === "publie" ? "default" : "outline"}>
                  {t(`statuses.${course.status}`)}
                </Badge>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
