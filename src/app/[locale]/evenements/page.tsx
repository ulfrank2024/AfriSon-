import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Mic2, Users } from "lucide-react";
import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { IconBadge } from "@/components/marketing/icon-badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const TYPES = [
  { key: "typeConcerts", icon: Mic2 },
  { key: "typeSeminars", icon: Users },
] as const;

export default async function EvenementsPage() {
  const t = await getTranslations("eventsPromo");

  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden">
          <Image
            src="/images/concert-crowd.jpg"
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
          <p className="text-lg text-muted-foreground">{t("pageDescription")}</p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {TYPES.map((type) => (
              <Card key={type.key}>
                <CardHeader>
                  <IconBadge icon={type.icon} className="mb-2" />
                  <CardTitle>{t(`${type.key}.title`)}</CardTitle>
                  <CardDescription>{t(`${type.key}.description`)}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
