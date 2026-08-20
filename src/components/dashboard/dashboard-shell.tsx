import type { ReactNode } from "react";
import Image from "next/image";
import { ArrowRight, Lock } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { Link } from "@/i18n/navigation";
import { LogoMark } from "@/components/marketing/logo-mark";
import { LocaleSwitcher } from "@/components/marketing/locale-switcher";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";
import { cn } from "@/lib/utils";

type DashboardCard = {
  title: string;
  description: string;
  icon: ReactNode;
  accent: string;
  href?: string;
  comingSoonLabel?: string;
};

export function DashboardShell({
  badge,
  title,
  welcome,
  bannerImage,
  bannerStats,
  beforeCards,
  cards,
}: {
  badge: string;
  title: string;
  welcome: string;
  bannerImage: { src: string; alt: string };
  bannerStats?: Array<{ value: number; label: string }>;
  beforeCards?: ReactNode;
  cards: DashboardCard[];
}) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/95 px-4 py-3 backdrop-blur sm:px-8">
        <Link href="/" className="flex items-center gap-2 text-base font-bold tracking-tight">
          <LogoMark />
          AfriSon Academy
        </Link>
        <div className="flex items-center gap-3">
          <LocaleSwitcher />
          <span className="relative size-9">
            <UserButton />
          </span>
        </div>
      </header>

      <div className="relative h-40 w-full overflow-hidden sm:h-56">
        <Image
          src={bannerImage.src}
          alt={bannerImage.alt}
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        <div className="absolute inset-0 flex items-end px-4 pb-5 sm:px-8 sm:pb-7">
          <div className="mx-auto flex w-full max-w-5xl flex-wrap items-end justify-between gap-4">
            <Reveal onView={false}>
              <Badge variant="secondary">{badge}</Badge>
              <h1 className="mt-2 text-2xl font-bold tracking-tight text-white">{title}</h1>
              <p className="mt-1 text-sm text-white/85">{welcome}</p>
            </Reveal>

            {bannerStats && bannerStats.length > 0 && (
              <Reveal onView={false}>
                <div className="flex items-stretch divide-x divide-white/20 rounded-xl border border-white/25 bg-black/25 backdrop-blur-sm">
                  {bannerStats.map((stat) => (
                    <div key={stat.label} className="px-4 py-2.5 text-center sm:px-5 sm:py-3">
                      <p className="text-xl font-bold tabular-nums text-white sm:text-2xl">{stat.value}</p>
                      <p className="mt-0.5 text-[11px] whitespace-nowrap text-white/80">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-8 sm:py-10">
        {beforeCards}
        <StaggerGroup className="grid gap-4 sm:grid-cols-2" staggerDelay={0.08}>
          {cards.map((card) =>
            card.href ? (
              <StaggerItem key={card.title}>
                <Link href={card.href} className="group block h-full">
                  <div className="flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
                    <div className="flex items-start justify-between">
                      <span className={cn("flex size-10 items-center justify-center rounded-lg", card.accent)}>
                        {card.icon}
                      </span>
                      <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                    </div>
                    <p className="mt-4 font-semibold">{card.title}</p>
                    <p className="mt-1 flex-1 text-sm text-muted-foreground">{card.description}</p>
                  </div>
                </Link>
              </StaggerItem>
            ) : (
              <StaggerItem key={card.title}>
                <div className="flex h-full flex-col rounded-xl border border-dashed border-border bg-card/50 p-5">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    {card.icon}
                  </span>
                  <p className="mt-4 font-semibold text-muted-foreground">{card.title}</p>
                  <p className="mt-1 flex-1 text-sm text-muted-foreground">{card.description}</p>
                  {card.comingSoonLabel && (
                    <span className="mt-4 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                      <Lock className="size-3.5" />
                      {card.comingSoonLabel}
                    </span>
                  )}
                </div>
              </StaggerItem>
            ),
          )}
        </StaggerGroup>
      </div>
    </div>
  );
}
