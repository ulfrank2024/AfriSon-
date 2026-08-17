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
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 h-96 w-[36rem] -translate-x-1/2 rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute top-24 -right-24 h-72 w-72 rounded-full bg-chart-2/20 blur-3xl" />
        <div className="absolute top-40 -left-24 h-64 w-64 rounded-full bg-accent/40 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-20 text-center">
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
      </div>
    </section>
  );
}
