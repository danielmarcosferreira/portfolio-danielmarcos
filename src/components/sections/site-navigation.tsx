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
  { href: "#work", labelKey: "work" as const },
  { href: "#experience", labelKey: "path" as const },
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

  const isDark = resolvedTheme === "dark";

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/55">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-heading text-lg tracking-tight text-foreground transition-colors hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {t("brand")}
        </Link>
        <nav
          aria-label={t("primary")}
          className="flex flex-wrap items-center gap-1"
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
        <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
          <LocaleSwitcher />
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            className="border-border/80"
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
