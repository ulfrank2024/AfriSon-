import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { CalendarClock, BadgeCheck, Smartphone, ArrowLeft, AudioWaveform } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { LogoMark } from "@/components/marketing/logo-mark";
import { LocaleSwitcher } from "@/components/marketing/locale-switcher";
import { Reveal } from "@/components/motion/reveal";

const BULLETS = [
  { key: "flexible", icon: CalendarClock },
  { key: "verified", icon: BadgeCheck },
  { key: "payment", icon: Smartphone },
] as const;

export function AuthLayout({ children }: { children: ReactNode }) {
  const t = useTranslations("authLayout");

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative flex flex-col overflow-hidden bg-background">
        <header className="flex items-center justify-between px-6 py-5">
          <Link href="/" className="flex items-center gap-2 text-base font-bold tracking-tight">
            <LogoMark />
            AfriSon Academy
          </Link>
          <LocaleSwitcher />
        </header>

        <div className="flex flex-1 items-center justify-center px-6 py-10">
          <Reveal onView={false} className="w-full max-w-sm">
            {children}
            <Link
              href="/"
              className="mt-6 flex items-center justify-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              {t("backHome")}
            </Link>
          </Reveal>
        </div>
      </div>

      <div className="relative hidden overflow-hidden bg-primary lg:flex lg:flex-col lg:justify-center lg:px-16">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-chart-5/50 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-accent/30 blur-3xl" />
        </div>

        <Reveal onView={false} className="relative">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-foreground/90 to-primary-foreground/70 shadow-lg">
            <AudioWaveform className="size-7 text-primary" strokeWidth={2.5} />
          </span>
          <h2 className="mt-8 max-w-md text-3xl font-bold tracking-tight text-primary-foreground">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-sm text-primary-foreground/85">{t("tagline")}</p>

          <ul className="mt-10 space-y-4">
            {BULLETS.map((bullet) => (
              <li key={bullet.key} className="flex items-start gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-foreground/15">
                  <bullet.icon className="size-4 text-primary-foreground" />
                </span>
                <p className="mt-1 text-sm text-primary-foreground/90">
                  {t(`bullets.${bullet.key}`)}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  );
}
