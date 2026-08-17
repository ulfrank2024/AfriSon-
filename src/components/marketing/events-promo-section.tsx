import { useTranslations } from "next-intl";
import Image from "next/image";
import { CalendarDays } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export function EventsPromoSection() {
  const t = useTranslations("eventsPromo");

  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl">
          <Image
            src="/images/concert-crowd.jpg"
            alt=""
            width={1200}
            height={800}
            className="h-[26rem] w-full object-cover sm:h-96"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

          <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12">
            <div className="flex items-center gap-2 text-sm font-semibold text-primary-foreground/90">
              <CalendarDays className="size-4" />
              <span className="uppercase tracking-wide">{t("eyebrow")}</span>
            </div>
            <h2 className="mt-3 max-w-xl text-3xl font-bold tracking-tight text-white">
              {t("title")}
            </h2>
            <p className="mt-3 max-w-xl text-white/80">{t("description")}</p>
            <Link
              href="/evenements"
              className={buttonVariants({ size: "lg", className: "mt-6 w-fit" })}
            >
              {t("cta")}
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
