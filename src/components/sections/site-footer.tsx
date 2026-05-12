import { getTranslations, setRequestLocale } from "next-intl/server";

export async function SiteFooter({ locale }: { locale: string }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "footer" });

  return (
    <footer className="border-t border-border/70 bg-muted/15">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="font-heading text-lg text-foreground">{t("name")}</p>
        <p className="max-w-md font-mono text-xs leading-relaxed text-muted-foreground">
          {t("tagline")}
        </p>
      </div>
    </footer>
  );
}
