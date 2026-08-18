import { getTranslations } from "next-intl/server";
import { GraduationCap, SlidersHorizontal } from "lucide-react";
import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { IconBadge } from "@/components/marketing/icon-badge";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

const POSITIONS = [
  { key: "music", icon: GraduationCap },
  { key: "sound", icon: SlidersHorizontal },
] as const;

export default async function CarrierePage() {
  const t = await getTranslations("careers");

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-16">
        <Reveal className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            {t("eyebrow")}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {t("description")}
          </p>
        </Reveal>

        <h2 className="mt-16 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
          {t("openPositions")}
        </h2>

        <StaggerGroup className="mt-6 grid gap-6 sm:grid-cols-2">
          {POSITIONS.map((position) => (
            <StaggerItem key={position.key}>
              <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <CardHeader>
                  <IconBadge icon={position.icon} className="mb-2" />
                  <CardTitle>{t(`positions.${position.key}.title`)}</CardTitle>
                  <CardDescription>
                    {t(`positions.${position.key}.description`)}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link
                    href="/devenir-enseignant"
                    className={buttonVariants({ className: "w-full" })}
                  >
                    {t("apply")}
                  </Link>
                </CardFooter>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </main>
      <SiteFooter />
    </>
  );
}
