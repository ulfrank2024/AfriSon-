import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";

const STATS: Array<{ key: "students" | "teachers" | "countries" | "instruments"; value: string }> = [
  { key: "students", value: "500+" },
  { key: "teachers", value: "40+" },
  { key: "countries", value: "5" },
  { key: "instruments", value: "20+" },
];

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary">
        {t("eyebrow")}
      </p>
      <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
        {t("title")}
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
        {t("subtitle")}
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link href="/signup?role=student" className={buttonVariants({ size: "lg" })}>
          {t("ctaStudent")}
        </Link>
        <Link
          href="/devenir-enseignant"
          className={buttonVariants({ size: "lg", variant: "outline" })}
        >
          {t("ctaTeacher")}
        </Link>
      </div>

      <dl className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-8 sm:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.key}>
            <dt className="text-3xl font-bold">{stat.value}</dt>
            <dd className="mt-1 text-sm text-muted-foreground">
              {t(`stats.${stat.key}`)}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
