import { getTranslations } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { requireAppUser } from "@/modules/auth/require-app-user";
import { CourseForm } from "@/modules/cours/course-form";

export default async function NewCoursePage() {
  await requireAppUser("enseignant");
  const t = await getTranslations("teacherCourses");

  return (
    <div className="mx-auto max-w-xl px-4 py-8 sm:px-8 sm:py-10">
      <Link
        href="/enseignant/cours"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        {t("back")}
      </Link>

      <h1 className="mt-6 text-2xl font-bold tracking-tight">{t("create.title")}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{t("create.description")}</p>

      <CourseForm />
    </div>
  );
}
