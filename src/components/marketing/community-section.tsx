import { useTranslations } from "next-intl";
import { Mic2, Users, Church } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { IconBadge } from "./icon-badge";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";

const ITEMS = [
  { key: "concerts", icon: Mic2 },
  { key: "seminars", icon: Users },
  { key: "churches", icon: Church },
] as const;

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
            <StaggerItem key={item.key}>
              <Card>
                <CardHeader>
                  <IconBadge icon={item.icon} className="mb-2" />
                  <CardTitle>{t(`${item.key}.title`)}</CardTitle>
                  <CardDescription>{t(`${item.key}.description`)}</CardDescription>
                </CardHeader>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
