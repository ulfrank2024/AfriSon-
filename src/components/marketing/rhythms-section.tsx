import { useTranslations } from "next-intl";
import { Music2 } from "lucide-react";
import { Marquee } from "./marquee";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";
import { cn } from "@/lib/utils";

const GENRES = ["makossa", "afrobeat", "rumba", "mbalax", "amapiano", "rai"] as const;

const ACCENTS = ["text-primary", "text-chart-2", "text-chart-3", "text-accent-foreground"];

const PILL_STYLES = [
  "border-primary/20 bg-primary/10 text-primary",
  "border-chart-2/25 bg-chart-2/12 text-chart-2",
  "border-chart-3/25 bg-chart-3/12 text-chart-3",
  "border-accent bg-accent/60 text-accent-foreground",
];

export function RhythmsSection() {
  const t = useTranslations("rhythms");
  const more = t.raw("more") as string[];

  return (
    <section id="rythmes" className="mx-auto max-w-6xl px-4 py-20">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          {t("eyebrow")}
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight">{t("title")}</h2>
        <p className="mt-4 text-lg text-muted-foreground">{t("description")}</p>
      </Reveal>

      <StaggerGroup className="mt-14 border-y border-border">
        {GENRES.map((genre, index) => {
          const accent = ACCENTS[index % ACCENTS.length];
          return (
            <StaggerItem key={genre}>
              <div className="group grid grid-cols-[2.5rem_1fr] items-baseline gap-x-5 gap-y-2 border-b border-border px-2 py-7 transition-colors last:border-b-0 hover:bg-muted/40 sm:grid-cols-[3rem_16rem_1fr] sm:items-center">
                <span
                  className={cn(
                    "font-heading text-2xl font-bold tabular-nums opacity-60 transition-opacity group-hover:opacity-100 sm:text-3xl",
                    accent,
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  <h3 className="text-xl font-bold tracking-tight sm:text-2xl">
                    {t(`genres.${genre}.name`)}
                  </h3>
                  <p className={cn("mt-1 text-xs font-semibold tracking-wide uppercase", accent)}>
                    {t(`genres.${genre}.region`)}
                  </p>
                </div>

                <p className="col-span-2 text-sm text-muted-foreground sm:col-span-1 sm:border-l sm:border-border sm:pl-6">
                  {t(`genres.${genre}.description`)}
                </p>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerGroup>

      <Reveal className="mt-16">
        <p className="text-center text-sm font-semibold tracking-wider text-muted-foreground uppercase">
          {t("moreTitle")}
        </p>
        <div className="mt-6">
          <Marquee>
            {more.map((name, index) => (
              <span
                key={name}
                className={cn(
                  "inline-flex shrink-0 items-center gap-2 rounded-full border px-5 py-2.5 text-base font-semibold shadow-sm transition-transform duration-200 hover:scale-105 hover:shadow-md sm:text-lg",
                  PILL_STYLES[index % PILL_STYLES.length],
                )}
              >
                <Music2 className="size-4 opacity-70" />
                {name}
              </span>
            ))}
          </Marquee>
        </div>
      </Reveal>
    </section>
  );
}
