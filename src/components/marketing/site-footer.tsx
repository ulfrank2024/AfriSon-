import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Separator } from "@/components/ui/separator";
import { LogoMark } from "./logo-mark";
import { PatternStrip } from "./pattern-strip";
import { Reveal } from "@/components/motion/reveal";

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1 transition-colors hover:text-foreground"
    >
      {children}
      <span className="translate-x-0 text-primary opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100">
        →
      </span>
    </Link>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
      {children}
    </p>
  );
}

export function SiteFooter() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  return (
    // Scoped `dark` class: the footer always renders with the dark
    // palette tokens (see globals.css `.dark { ... }`), independent of
    // the page's own light/dark mode, for a consistently darker band.
    <footer className="dark mt-auto bg-background text-foreground">
      <PatternStrip />
      <Reveal className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="flex items-center gap-2 text-lg font-bold">
              <LogoMark />
              AfriSon Academy
            </p>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">{t("tagline")}</p>
          </div>

          <div>
            <FooterHeading>{t("navigation")}</FooterHeading>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>
                <FooterLink href="/#instruments">{nav("instruments")}</FooterLink>
              </li>
              <li>
                <FooterLink href="/#how-it-works">{nav("howItWorks")}</FooterLink>
              </li>
              <li>
                <FooterLink href="/evenements">{nav("events")}</FooterLink>
              </li>
              <li>
                <FooterLink href="/blog">{nav("blog")}</FooterLink>
              </li>
              <li>
                <FooterLink href="/carriere">{nav("careers")}</FooterLink>
              </li>
            </ul>
          </div>

          <div>
            <FooterHeading>{t("account")}</FooterHeading>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>
                <FooterLink href="/login">{nav("login")}</FooterLink>
              </li>
              <li>
                <FooterLink href="/signup">{nav("signup")}</FooterLink>
              </li>
            </ul>
          </div>

          <div>
            <FooterHeading>{t("contact")}</FooterHeading>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>
                <a
                  href="mailto:contact@afrison.academy"
                  className="transition-colors hover:text-foreground"
                >
                  contact@afrison.academy
                </a>
              </li>
              <li>
                <FooterLink href="/mentions-legales">{t("legal")}</FooterLink>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-2 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} AfriSon Academy. {t("rights")}
          </p>
          <p>{t("madeIn")}</p>
        </div>
      </Reveal>
    </footer>
  );
}
