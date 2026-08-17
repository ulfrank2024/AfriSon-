import { useTranslations } from "next-intl";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const SPACES: Array<"student" | "teacher" | "promoter"> = [
  "student",
  "teacher",
  "promoter",
];

export function ConceptSection() {
  const t = useTranslations("concept");

  return (
    <section id="concept" className="mx-auto max-w-6xl px-4 py-20">
      <h2 className="text-center text-3xl font-bold tracking-tight">
        {t("title")}
      </h2>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {SPACES.map((space) => (
          <Card key={space}>
            <CardHeader>
              <CardTitle>{t(`${space}.title`)}</CardTitle>
              <CardDescription>{t(`${space}.description`)}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
