import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export function TeacherRecruitmentSection() {
  const t = useTranslations("teacherRecruitment");

  return (
    <section id="become-teacher" className="mx-auto max-w-4xl px-4 py-20 text-center">
      <Reveal>
        <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          {t("description")}
        </p>
        <Link
          href="/devenir-enseignant"
          className={buttonVariants({ size: "lg", className: "mt-8" })}
        >
          {t("cta")}
        </Link>
      </Reveal>
    </section>
  );
}
