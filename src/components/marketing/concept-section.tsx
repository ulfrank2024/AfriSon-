import { useTranslations } from "next-intl";
import { GraduationCap, Presentation } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { IconBadge } from "./icon-badge";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";

const SPACES = [
  { key: "student", icon: GraduationCap },
  { key: "teacher", icon: Presentation },
] as const;

export function ConceptSection() {
  const t = useTranslations("concept");

  return (
    <section id="concept" className="mx-auto max-w-6xl px-4 py-20">
      <Reveal>
        <h2 className="text-center text-3xl font-bold tracking-tight">
          {t("title")}
        </h2>
      </Reveal>

      <StaggerGroup className="mx-auto mt-12 grid max-w-2xl gap-6 sm:grid-cols-2">
        {SPACES.map((space) => (
          <StaggerItem key={space.key}>
            <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader>
                <IconBadge icon={space.icon} className="mb-2" />
                <CardTitle>{t(`${space.key}.title`)}</CardTitle>
                <CardDescription>{t(`${space.key}.description`)}</CardDescription>
              </CardHeader>
            </Card>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
