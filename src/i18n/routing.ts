import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "it", "pt"],
  defaultLocale: "en",
  localePrefix: "always",
  localeCookie: {
    name: "PORTFOLIO_LOCALE",
    maxAge: 60 * 60 * 24 * 365,
  },
});
