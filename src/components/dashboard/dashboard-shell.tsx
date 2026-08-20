import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";

export function DashboardShell({
  badge,
  title,
  welcome,
  cards,
}: {
  badge: string;
  title: string;
  welcome: string;
  cards: Array<{ title: string; description: string; icon?: ReactNode; href?: string }>;
}) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <Reveal onView={false}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Badge variant="secondary">{badge}</Badge>
            <h1 className="mt-3 text-2xl font-bold tracking-tight">{title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{welcome}</p>
          </div>
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            AfriSon Academy
          </Link>
        </div>
      </Reveal>

      <StaggerGroup className="mt-8 grid gap-4 sm:grid-cols-2">
        {cards.map((card) =>
          card.href ? (
            <StaggerItem key={card.title}>
              <Link href={card.href} className="group block h-full">
                <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {card.title}
                      <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                    </CardTitle>
                    <CardDescription>{card.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </StaggerItem>
          ) : (
            <StaggerItem key={card.title}>
              <Card className="h-full opacity-70">
                <CardHeader>
                  <CardTitle>{card.title}</CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
              </Card>
            </StaggerItem>
          ),
        )}
      </StaggerGroup>
    </div>
  );
}
