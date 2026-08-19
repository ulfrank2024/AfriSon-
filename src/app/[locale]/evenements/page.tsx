import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Mic2, Users, Bell } from "lucide-react";
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
} from "@/components/ui/card";

const TYPES = [
  { key: "typeConcerts", icon: Mic2, image: "/images/band-concert.jpg" },
  { key: "typeSeminars", icon: Users, image: "/images/stage-instruments.jpg" },
] as const;

export default async function EvenementsPage() {
  const t = await getTranslations("eventsPromo");

  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden">
          <Image
            src="/images/stage-crowd.jpg"
            alt=""
            width={1600}
            height={800}
            className="h-72 w-full object-cover sm:h-96"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
          <div className="absolute inset-0 flex flex-col justify-end px-4 pb-10 sm:pb-14">
            <div className="mx-auto w-full max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary-foreground/90">
                {t("eyebrow")}
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {t("title")}
              </h1>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 py-16">
          <Reveal>
            <p className="text-lg text-muted-foreground">{t("pageDescription")}</p>
          </Reveal>

          <StaggerGroup className="mt-10 grid gap-6 sm:grid-cols-2">
            {TYPES.map((type) => (
              <StaggerItem key={type.key}>
                <Card className="group h-full gap-0 overflow-hidden py-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative h-40 w-full overflow-hidden">
                    <Image
                      src={type.image}
                      alt=""
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <IconBadge
                      icon={type.icon}
                      className="absolute -bottom-5 left-4 border-4 border-card bg-primary text-primary-foreground"
                    />
                  </div>
                  <CardHeader className="pt-8 pb-6">
                    <CardTitle>{t(`${type.key}.title`)}</CardTitle>
                    <CardDescription>{t(`${type.key}.description`)}</CardDescription>
                  </CardHeader>
                </Card>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal className="mt-14 rounded-2xl border border-border bg-muted/40 p-8 text-center sm:p-10">
            <IconBadge icon={Bell} className="mx-auto" />
            <h2 className="mt-4 text-xl font-bold tracking-tight">
              {t("notifyTitle")}
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              {t("notifyDescription")}
            </p>
            <Link href="/signup" className={buttonVariants({ size: "lg", className: "mt-6" })}>
              {t("notifyCta")}
            </Link>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
