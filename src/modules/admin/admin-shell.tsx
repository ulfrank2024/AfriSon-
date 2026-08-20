"use client";

import { useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import {
  LayoutDashboard,
  UserCheck,
  Video,
  Megaphone,
  CreditCard,
  CalendarRange,
  Lock,
  Menu,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { Link, usePathname } from "@/i18n/navigation";
import { LogoMark } from "@/components/marketing/logo-mark";
import { LocaleSwitcher } from "@/components/marketing/locale-switcher";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin", key: "overview", icon: LayoutDashboard, enabled: true },
  { href: "/admin/candidatures", key: "applications", icon: UserCheck, enabled: true },
  { href: "/admin/cours", key: "courseReview", icon: Video, enabled: true },
  { href: "/admin/annonces", key: "announcements", icon: Megaphone, enabled: true },
  { href: "/admin", key: "subscriptions", icon: CreditCard, enabled: false },
  { href: "/admin", key: "events", icon: CalendarRange, enabled: false },
] as const;

function NavItems({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  const t = useTranslations("dashboard.admin.nav");

  return (
    <nav className="flex flex-col gap-1">
      {NAV_ITEMS.map((item) => {
        const active = pathname === item.href;
        if (!item.enabled) {
          return (
            <div
              key={item.key}
              className="flex cursor-not-allowed items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground/50"
            >
              <item.icon className="size-4.5" strokeWidth={2} />
              <span className="flex-1">{t(item.key)}</span>
              <Lock className="size-3.5" />
            </div>
          );
        }
        return (
          <Link
            key={item.key}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <item.icon className="size-4.5" strokeWidth={2} />
            {t(item.key)}
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminShell({
  user,
  children,
}: {
  user: { fullName: string; email: string | null };
  children: ReactNode;
}) {
  const t = useTranslations("dashboard.admin.nav");
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="lg:grid lg:min-h-screen lg:grid-cols-[16rem_1fr]">
      <aside className="sticky top-0 hidden h-screen flex-col border-r border-border bg-card/40 lg:flex">
        <Link href="/" className="flex items-center gap-2 px-5 py-5 text-base font-bold tracking-tight">
          <LogoMark />
          AfriSon Academy
        </Link>

        <div className="flex-1 overflow-y-auto px-3 py-2">
          <NavItems pathname={pathname} />
        </div>

        <div className="border-t border-border p-4">
          <div className="flex items-start gap-3">
            <span className="relative size-9 shrink-0">
              <UserButton />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{user.fullName}</p>
              <Badge variant="secondary" className="mt-1.5 text-[10px]">
                {t("role")}
              </Badge>
            </div>
          </div>
          <Link
            href="/"
            className="mt-3 block text-center text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("viewSite")}
          </Link>
        </div>
      </aside>

      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/95 px-4 py-3 backdrop-blur lg:justify-end lg:px-8">
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="lg:hidden" />}>
              <Menu className="size-5" />
              <span className="sr-only">Menu</span>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:max-w-xs">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 text-base">
                  <LogoMark className="size-7" />
                  AfriSon Academy
                </SheetTitle>
              </SheetHeader>
              <div className="px-2">
                <NavItems pathname={pathname} onNavigate={() => setMenuOpen(false)} />
              </div>
              <SheetClose
                nativeButton={false}
                render={<Link href="/" className="mt-auto block px-5 py-4 text-sm text-muted-foreground" />}
              >
                {t("viewSite")}
              </SheetClose>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-2 text-base font-bold tracking-tight lg:hidden">
            <LogoMark />
            AfriSon
          </Link>

          <div className="flex items-center gap-3">
            <LocaleSwitcher />
            <div className="relative size-9 lg:hidden">
              <UserButton />
            </div>
          </div>
        </header>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
