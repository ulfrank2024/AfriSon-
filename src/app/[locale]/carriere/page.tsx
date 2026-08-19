import { getTranslations } from "next-intl/server";
import Image from "next/image";
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
  {
    key: "music",
    icon: GraduationCap,
    image: "/images/guitar-lesson.jpg",
    filiere: "musique",
  },
  {
    key: "sound",
    icon: SlidersHorizontal,
    image: "/images/mixing-console.jpg",
    filiere: "son",
  },
] as const;

export default async function CarrierePage() {
  const t = await getTranslations("careers");

  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden">
          <Image
            src="/images/teacher-tablet-guitar.jpg"
            alt=""
            width={1600}
            height={800}
            className="h-72 w-full object-cover sm:h-96"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
          <div className="absolute inset-0 flex flex-col justify-end px-4 pb-10 sm:pb-14">
            <div className="mx-auto w-full max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary-foreground/90">
                {t("eyebrow")}
              </p>
              <h1 className="mt-2 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {t("title")}
              </h1>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4 py-16">
          <Reveal className="grid items-center gap-8 sm:grid-cols-[1.3fr_1fr]">
            <p className="text-lg text-muted-foreground">{t("description")}</p>
            <div className="relative h-40 overflow-hidden rounded-2xl shadow-md sm:h-48">
              <Image
                src="/images/piano-note.jpg"
                alt=""
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <h2 className="mt-16 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
            {t("openPositions")}
          </h2>

          <StaggerGroup className="mt-6 grid gap-6 sm:grid-cols-2">
            {POSITIONS.map((position) => (
              <StaggerItem key={position.key}>
                <Card className="group h-full gap-0 overflow-hidden py-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative h-40 w-full overflow-hidden">
                    <Image
                      src={position.image}
                      alt=""
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <IconBadge
                      icon={position.icon}
                      className="absolute -bottom-5 left-4 border-4 border-card bg-primary text-primary-foreground"
                    />
                  </div>
                  <CardHeader className="pt-8">
                    <CardTitle>{t(`positions.${position.key}.title`)}</CardTitle>
                    <CardDescription className="min-h-[3.75rem] leading-relaxed line-clamp-3">
                      {t(`positions.${position.key}.description`)}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="mt-auto pb-6">
                    <Link
                      href={`/devenir-enseignant?filiere=${position.filiere}`}
                      className={buttonVariants({ className: "w-full" })}
                    >
                      {t("apply")}
                    </Link>
                  </CardFooter>
                </Card>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
