"use client";

import { useLocale, useTranslations } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("nav");

  return (
    <div
      role="group"
      aria-label={t("language")}
      className="flex items-center rounded-md border border-border/80 p-0.5"
    >
      {routing.locales.map((loc) => {
        const active = locale === loc;
        return (
          <button
            key={loc}
            type="button"
            lang={loc}
            aria-current={active ? "true" : undefined}
            aria-pressed={active}
            onClick={() => router.replace(pathname, { locale: loc })}
            className={cn(
              "min-w-[2.25rem] px-2 py-1 font-mono text-[0.65rem] uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              active
                ? "text-foreground ring-1 ring-foreground/20"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {loc === "pt" ? "PT" : loc.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
