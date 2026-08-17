import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

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
      <Reveal onView={false} delay={0}>
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          {t("eyebrow")}
        </p>
      </Reveal>

      <Reveal onView={false} delay={0.1}>
        <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          {t("title")}
        </h1>
      </Reveal>

      <Reveal onView={false} delay={0.2}>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          {t("subtitle")}
        </p>
      </Reveal>

      <Reveal onView={false} delay={0.3}>
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
      </Reveal>

      <Reveal onView={false} delay={0.4}>
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
      </Reveal>
    </section>
  );
}
