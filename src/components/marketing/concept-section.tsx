import { useTranslations } from "next-intl";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";

const SPACES: Array<"student" | "teacher" | "promoter"> = [
  "student",
  "teacher",
  "promoter",
];

export function ConceptSection() {
  const t = useTranslations("concept");

  return (
    <section id="concept" className="mx-auto max-w-6xl px-4 py-20">
      <Reveal>
        <h2 className="text-center text-3xl font-bold tracking-tight">
          {t("title")}
        </h2>
      </Reveal>

      <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-3">
        {SPACES.map((space) => (
          <StaggerItem key={space}>
            <Card>
              <CardHeader>
                <CardTitle>{t(`${space}.title`)}</CardTitle>
                <CardDescription>{t(`${space}.description`)}</CardDescription>
              </CardHeader>
            </Card>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
