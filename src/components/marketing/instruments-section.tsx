import { useTranslations } from "next-intl";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

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
        <h2 className="text-center text-3xl font-bold tracking-tight">
          {t("title")}
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {CATEGORIES.map((category) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle>{t(`${category}.title`)}</CardTitle>
                <CardDescription>{t(`${category}.description`)}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
