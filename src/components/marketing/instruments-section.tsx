import { useTranslations } from "next-intl";
import { Drum, Guitar, SlidersHorizontal } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconBadge } from "./icon-badge";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";

const CATEGORIES = [
  { key: "traditional", icon: Drum },
  { key: "modern", icon: Guitar },
  { key: "sound", icon: SlidersHorizontal },
] as const;

export function InstrumentsSection() {
  const t = useTranslations("instruments");

  return (
    <section id="instruments" className="bg-muted/40 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <h2 className="text-center text-3xl font-bold tracking-tight">
            {t("title")}
          </h2>
        </Reveal>

        <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-3">
          {CATEGORIES.map((category) => (
            <StaggerItem key={category.key}>
              <Card className="h-full">
                <CardHeader>
                  <IconBadge icon={category.icon} className="mb-2" />
                  <CardTitle>{t(`${category.key}.title`)}</CardTitle>
                  <CardDescription>{t(`${category.key}.description`)}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {t.raw(`${category.key}.examples`).map((example: string) => (
                    <Badge key={example} variant="secondary">
                      {example}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
