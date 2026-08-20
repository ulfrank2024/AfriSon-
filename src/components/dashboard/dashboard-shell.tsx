import type { ReactNode } from "react";
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
  cards,
}: {
  badge: string;
  title: string;
  welcome: string;
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

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-8 sm:py-10">
        <Reveal onView={false}>
          <Badge variant="secondary">{badge}</Badge>
          <h1 className="mt-3 text-2xl font-bold tracking-tight">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{welcome}</p>
        </Reveal>

        <StaggerGroup className="mt-8 grid gap-4 sm:grid-cols-2" staggerDelay={0.08}>
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
