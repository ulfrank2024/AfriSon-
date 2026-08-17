import { useTranslations } from "next-intl";

const STEPS: Array<"signup" | "plan" | "learn" | "stage"> = [
  "signup",
  "plan",
  "learn",
  "stage",
];

export function HowItWorksSection() {
  const t = useTranslations("howItWorks");

  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-4 py-20">
      <h2 className="text-center text-3xl font-bold tracking-tight">
        {t("title")}
      </h2>

      <ol className="mt-12 grid gap-8 sm:grid-cols-4">
        {STEPS.map((step, index) => (
          <li key={step} className="text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
              {index + 1}
            </div>
            <h3 className="mt-4 font-semibold">{t(`steps.${step}.title`)}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(`steps.${step}.description`)}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
