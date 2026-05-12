"use client";

import { useTranslations } from "next-intl";

export function SkipLink() {
  const t = useTranslations("skipLink");

  return (
    <a
      href="#main-content"
      onClick={() => {
        queueMicrotask(() => {
          const el = document.getElementById("main-content");
          if (el instanceof HTMLElement) {
            el.focus({ preventScroll: false });
          }
        });
      }}
      className="pointer-events-none fixed left-4 top-4 z-[100] -translate-y-24 rounded-md border border-border bg-background px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-foreground opacity-0 shadow-sm transition focus:pointer-events-auto focus:translate-y-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
    >
      {t("label")}
    </a>
  );
}
