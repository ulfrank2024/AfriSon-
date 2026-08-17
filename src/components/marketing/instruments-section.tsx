import { useTranslations } from "next-intl";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";

const CATEGORIES: Array<"traditional" | "modern" | "sound"> = [
  "traditional",
  "modern",
  "sound",
];

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
            <StaggerItem key={category}>
              <Card>
                <CardHeader>
                  <CardTitle>{t(`${category}.title`)}</CardTitle>
                  <CardDescription>{t(`${category}.description`)}</CardDescription>
                </CardHeader>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
