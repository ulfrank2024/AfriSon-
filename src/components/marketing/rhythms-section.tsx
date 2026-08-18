import { useTranslations } from "next-intl";
import { Music2 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconBadge } from "./icon-badge";
import { Marquee } from "./marquee";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";

const GENRES = ["makossa", "afrobeat", "rumba", "mbalax", "amapiano", "rai"] as const;

export function RhythmsSection() {
  const t = useTranslations("rhythms");

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

      <Reveal className="mt-14">
        <p className="text-center text-sm font-semibold tracking-wider text-muted-foreground uppercase">
          {t("moreTitle")}
        </p>
        <div className="mt-4">
          <Marquee>
            {t.raw("more").map((name: string) => (
              <Badge key={name} variant="secondary" className="shrink-0">
                {name}
              </Badge>
            ))}
          </Marquee>
        </div>
      </Reveal>
    </section>
  );
}
