import { useTranslations } from "next-intl";

export function AuthUnavailable() {
  const t = useTranslations("auth");

  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-2 px-4 py-24 text-center">
      <h1 className="text-xl font-semibold">{t("unavailableTitle")}</h1>
      <p className="text-sm text-muted-foreground">{t("unavailableDescription")}</p>
    </div>
  );
}
