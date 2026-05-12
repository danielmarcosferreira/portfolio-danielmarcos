import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";

import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

/** Must match localeCookie.name in src/i18n/routing.ts */
const LOCALE_COOKIE = "PORTFOLIO_LOCALE";

/**
 * When no locale cookie exists, bias Accept-Language using Vercel geo (x-vercel-ip-country).
 * Local / non-Vercel: header is absent; falls through to real Accept-Language.
 */
export default function proxy(request: NextRequest) {
  const cookieVal = request.cookies.get(LOCALE_COOKIE)?.value;
  const locales = routing.locales as readonly string[];
  const hasValidCookie = Boolean(cookieVal && locales.includes(cookieVal));

  if (hasValidCookie) {
    return intlMiddleware(request);
  }

  const country = request.headers.get("x-vercel-ip-country");
  const headers = new Headers(request.headers);

  if (country === "IT") {
    headers.set("accept-language", "it-IT,it;q=0.95,en;q=0.5");
  } else if (country === "BR" || country === "PT") {
    headers.set("accept-language", "pt-BR,pt;q=0.95,en;q=0.5");
  }

  const forwarded = new NextRequest(request.url, {
    headers,
    method: request.method,
  });

  return intlMiddleware(forwarded);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
