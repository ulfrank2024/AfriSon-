import type { ReactNode } from "react";
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
  cards: Array<{ title: string; description: string; icon?: ReactNode }>;
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
        {cards.map((card) => (
          <StaggerItem key={card.title}>
            <Card>
              <CardHeader>
                <CardTitle>{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
            </Card>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  );
}
