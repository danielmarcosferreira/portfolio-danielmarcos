import { getTranslations, setRequestLocale } from "next-intl/server";

export async function SiteFooter({ locale }: { locale: string }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "footer" });
  const email = t("emailAddress").trim();
  const linkedin = t("linkedinUrl").trim();
  const phone = t("phoneNumber").trim();

  return (
    <footer className="border-t border-border/70 bg-muted/15">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-start sm:justify-between sm:px-6 lg:px-8">
        <div className="space-y-2">
          <p className="font-heading text-lg text-foreground">{t("name")}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs">
            {email ? (
              <a
                href={`mailto:${email}`}
                className="text-accent underline-offset-4 transition-colors hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {t("emailLabel")}
              </a>
            ) : null}
            {phone ? (
              <a
                href={`https://wa.me/${phone.replace(/\s/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {t("phoneDisplay")}
              </a>
            ) : null}
            {linkedin ? (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline-offset-4 transition-colors hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {t("linkedinLabel")}
              </a>
            ) : null}
          </div>
        </div>
        <p className="max-w-xl font-mono text-xs leading-relaxed text-muted-foreground sm:text-right">
          {t("tagline")}
        </p>
      </div>
    </footer>
  );
}
