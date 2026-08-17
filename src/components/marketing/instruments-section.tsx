import { useTranslations } from "next-intl";
import Image from "next/image";
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
  { key: "traditional", icon: Drum, image: "/images/djembe.jpg" },
  { key: "modern", icon: Guitar, image: "/images/guitar-lesson.jpg" },
  { key: "sound", icon: SlidersHorizontal, image: "/images/mixing-console.jpg" },
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
              <Card className="h-full gap-0 overflow-hidden py-0">
                <div className="relative h-40 w-full">
                  <Image
                    src={category.image}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover"
                  />
                  <IconBadge
                    icon={category.icon}
                    className="absolute -bottom-5 left-4 border-4 border-card bg-primary text-primary-foreground"
                  />
                </div>
                <CardHeader className="pt-8">
                  <CardTitle>{t(`${category.key}.title`)}</CardTitle>
                  <CardDescription>{t(`${category.key}.description`)}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2 pb-6">
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
