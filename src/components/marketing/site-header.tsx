import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { LocaleSwitcher } from "./locale-switcher";

export function SiteHeader() {
  const t = useTranslations("nav");

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-bold tracking-tight">
          AfriSon Academy
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <Link href="/#concept" className="hover:text-foreground">
            {t("concept")}
          </Link>
          <Link href="/#instruments" className="hover:text-foreground">
            {t("instruments")}
          </Link>
          <Link href="/#how-it-works" className="hover:text-foreground">
            {t("howItWorks")}
          </Link>
          <Link href="/#become-teacher" className="hover:text-foreground">
            {t("becomeTeacher")}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher />
          <Link href="/login" className={buttonVariants({ variant: "ghost", size: "sm" })}>
            {t("login")}
          </Link>
          <Link href="/signup" className={buttonVariants({ size: "sm" })}>
            {t("signup")}
          </Link>
        </div>
      </div>
    </header>
  );
}
