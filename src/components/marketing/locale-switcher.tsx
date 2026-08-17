"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const LABELS: Record<string, string> = {
  fr: "FR",
  en: "EN",
};

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-1 text-sm">
      {routing.locales.map((l, i) => (
        <div key={l} className="flex items-center gap-1">
          {i > 0 && <span className="text-muted-foreground">/</span>}
          <button
            type="button"
            onClick={() => router.replace(pathname, { locale: l })}
            className={
              l === locale
                ? "font-semibold text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }
          >
            {LABELS[l]}
          </button>
        </div>
      ))}
    </div>
  );
}
