"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import * as React from "react";

import { LocaleSwitcher } from "@/components/locale-switcher";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const NAV_KEYS = [
  { href: "#top", labelKey: "about" as const },
  { href: "#experience", labelKey: "experience" as const },
  { href: "#education", labelKey: "education" as const },
  { href: "#stack", labelKey: "stack" as const },
];

function useClientMounted() {
  return React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export function SiteNavigation() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useClientMounted();
  const t = useTranslations("nav");

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/55">
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-x-4 gap-y-3 px-4 py-4 sm:px-6 lg:grid-cols-[auto_1fr_auto] lg:gap-y-0 lg:px-8">
        <Link
          href="/"
          className="justify-self-start font-heading text-lg tracking-tight text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {t("brand")}
        </Link>
        <nav
          aria-label={t("primary")}
          className="col-span-2 flex flex-wrap items-center justify-center gap-1 border-t border-border/50 pt-3 sm:border-t-0 sm:pt-0 lg:col-span-1 lg:col-start-2 lg:justify-center"
        >
          {NAV_KEYS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              )}
            >
              {t(item.labelKey)}
            </a>
          ))}
        </nav>
        <div className="col-start-2 row-start-1 flex flex-wrap items-center justify-end gap-2 self-center sm:gap-3 lg:col-start-3 lg:row-start-1">
          <LocaleSwitcher />
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            className="border-border/80 cursor-pointer"
            aria-label={isDark ? t("themeLight") : t("themeDark")}
            disabled={!mounted}
            onClick={() => setTheme(isDark ? "light" : "dark")}
          >
            {mounted ? (
              isDark ? (
                <Sun className="size-4" aria-hidden />
              ) : (
                <Moon className="size-4" aria-hidden />
              )
            ) : (
              <span className="size-4" aria-hidden />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
