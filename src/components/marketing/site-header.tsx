"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Menu } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { LocaleSwitcher } from "./locale-switcher";
import { LogoMark } from "./logo-mark";
import { PatternStrip } from "./pattern-strip";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/#instruments", labelKey: "instruments" },
  { href: "/#how-it-works", labelKey: "howItWorks" },
  { href: "/evenements", labelKey: "events" },
  { href: "/blog", labelKey: "blog" },
  { href: "/carriere", labelKey: "careers" },
] as const;

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group relative py-1 transition-colors hover:text-foreground">
      {children}
      <span className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100" />
    </Link>
  );
}

export function SiteHeader() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "sticky top-0 z-50 backdrop-blur transition-[background-color,box-shadow] duration-300",
        scrolled ? "bg-background/95 shadow-sm" : "bg-background/60",
      )}
    >
      <header
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between px-4 transition-[height] duration-300",
          scrolled ? "h-14" : "h-16",
        )}
      >
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <LogoMark />
          AfriSon Academy
        </Link>

        <nav className="hidden items-center gap-5 text-sm text-muted-foreground lg:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {t(item.labelKey)}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LocaleSwitcher />
          <Link href="/login" className={buttonVariants({ variant: "ghost", size: "sm" })}>
            {t("login")}
          </Link>
          <Link href="/signup" className={buttonVariants({ size: "sm" })}>
            {t("signup")}
          </Link>
        </div>

        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger
            render={<Button variant="ghost" size="icon" className="lg:hidden" />}
          >
            <Menu className="size-5" />
            <span className="sr-only">Menu</span>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-xs">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2 text-base">
                <LogoMark className="size-7" />
                AfriSon Academy
              </SheetTitle>
            </SheetHeader>

            <nav className="flex flex-col gap-1 px-2">
              {NAV_ITEMS.map((item) => (
                <SheetClose
                  key={item.href}
                  nativeButton={false}
                  render={<Link href={item.href} />}
                >
                  <span className="block rounded-lg px-3 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-muted">
                    {t(item.labelKey)}
                  </span>
                </SheetClose>
              ))}
            </nav>

            <SheetFooter className="mt-auto gap-3 border-t">
              <div className="flex items-center justify-between px-1">
                <span className="text-sm text-muted-foreground">{t("language")}</span>
                <LocaleSwitcher />
              </div>
              <SheetClose
                nativeButton={false}
                render={<Link href="/login" className={buttonVariants({ variant: "outline" })} />}
              >
                {t("login")}
              </SheetClose>
              <SheetClose
                nativeButton={false}
                render={<Link href="/signup" className={buttonVariants()} />}
              >
                {t("signup")}
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </header>
      <PatternStrip />
    </motion.div>
  );
}
