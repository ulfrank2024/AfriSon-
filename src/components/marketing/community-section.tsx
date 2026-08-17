import { useTranslations } from "next-intl";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";

const ITEMS: Array<"concerts" | "seminars" | "churches"> = [
  "concerts",
  "seminars",
  "churches",
];

export function CommunitySection() {
  const t = useTranslations("community");

  return (
    <section className="bg-muted/40 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{t("description")}</p>
        </Reveal>

        <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-3">
          {ITEMS.map((item) => (
            <StaggerItem key={item}>
              <Card>
                <CardHeader>
                  <CardTitle>{t(`${item}.title`)}</CardTitle>
                  <CardDescription>{t(`${item}.description`)}</CardDescription>
                </CardHeader>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
