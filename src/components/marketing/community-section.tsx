import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/reveal";

export function CommunitySection() {
  const t = useTranslations("community");

  return (
    <section className="bg-muted/40 py-20">
      <Reveal className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
        <p className="mt-4 text-lg text-muted-foreground">{t("description")}</p>
      </Reveal>
    </section>
  );
}
