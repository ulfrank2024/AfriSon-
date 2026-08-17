import { useTranslations } from "next-intl";

export function CommunitySection() {
  const t = useTranslations("community");

  return (
    <section className="bg-muted/40 py-20">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
        <p className="mt-4 text-lg text-muted-foreground">{t("description")}</p>
      </div>
    </section>
  );
}
