import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Separator } from "@/components/ui/separator";
import { LogoMark } from "./logo-mark";

export function SiteFooter() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  return (
    <footer className="mt-auto border-t">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="flex items-center gap-2 text-lg font-bold">
              <LogoMark />
              AfriSon Academy
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{t("tagline")}</p>
          </div>

          <div>
            <p className="font-semibold">{t("navigation")}</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/#concept" className="hover:text-foreground">
                  {nav("concept")}
                </Link>
              </li>
              <li>
                <Link href="/#instruments" className="hover:text-foreground">
                  {nav("instruments")}
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-foreground">
                  {t("login")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-semibold">{t("contact")}</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>contact@afrison.academy</li>
              <li>
                <Link href="/mentions-legales" className="hover:text-foreground">
                  {t("legal")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} AfriSon Academy. {t("rights")}
        </p>
      </div>
    </footer>
  );
}
