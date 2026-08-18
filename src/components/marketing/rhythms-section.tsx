import { useTranslations } from "next-intl";
import { Music2 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { IconBadge } from "./icon-badge";
import { Marquee } from "./marquee";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";
import { cn } from "@/lib/utils";

const GENRES = ["makossa", "afrobeat", "rumba", "mbalax", "amapiano", "rai"] as const;

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

      <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {GENRES.map((genre) => (
          <StaggerItem key={genre}>
            <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader>
                <IconBadge icon={Music2} className="mb-2" />
                <CardTitle>{t(`genres.${genre}.name`)}</CardTitle>
                <p className="text-xs font-medium text-primary">
                  {t(`genres.${genre}.region`)}
                </p>
                <CardDescription>{t(`genres.${genre}.description`)}</CardDescription>
              </CardHeader>
            </Card>
          </StaggerItem>
        ))}
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
