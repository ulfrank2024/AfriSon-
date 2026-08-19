import { useTranslations } from "next-intl";
import { SlidersHorizontal, Mic2, Disc3, MapPin, Handshake } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { IconBadge } from "./icon-badge";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";

const FEATURES = [
  { key: "gear", icon: SlidersHorizontal },
  { key: "live", icon: Mic2 },
  { key: "recording", icon: Disc3 },
] as const;

const CITIES = ["douala", "yaounde"] as const;

export function StudioPartnersSection() {
  const t = useTranslations("studioPartners");

  return (
    <section className="bg-muted/40 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            {t("eyebrow")}
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">{t("title")}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{t("description")}</p>
        </Reveal>

        <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-3">
          {FEATURES.map((feature) => (
            <StaggerItem key={feature.key}>
              <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <CardHeader>
                  <IconBadge icon={feature.icon} className="mb-2" />
                  <CardTitle>{t(`features.${feature.key}.title`)}</CardTitle>
                  <CardDescription>
                    {t(`features.${feature.key}.description`)}
                  </CardDescription>
                </CardHeader>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal className="mt-14 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <p className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
            {t("citiesTitle")}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {CITIES.map((city) => (
              <Badge
                key={city}
                variant="secondary"
                className="h-auto gap-1.5 rounded-full px-4 py-2 text-sm"
              >
                <MapPin className="size-3.5" />
                {t(`cities.${city}`)}
                <span className="ml-1 text-xs text-primary">{t("citiesStatus")}</span>
              </Badge>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-14 rounded-2xl border border-border bg-card p-8 text-center shadow-sm sm:p-10">
          <IconBadge icon={Handshake} className="mx-auto" />
          <h3 className="mt-4 text-xl font-bold tracking-tight">{t("ctaTitle")}</h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            {t("ctaDescription")}
          </p>
          <a
            href="mailto:contact@afrison.academy?subject=Partenariat%20studio"
            className={buttonVariants({ size: "lg", className: "mt-6" })}
          >
            {t("cta")}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
