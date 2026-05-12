import { getTranslations, setRequestLocale } from "next-intl/server";

import { getLocalizedExperience } from "@/lib/experience-i18n";

export async function ExperienceTimeline({ locale }: { locale: string }) {
  setRequestLocale(locale);
  const [t, entries] = await Promise.all([
    getTranslations({ locale, namespace: "experience" }),
    getLocalizedExperience(locale),
  ]);

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="border-b border-border/70 bg-muted/20 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-muted-foreground">
            {t("kicker")}
          </p>
          <h2
            id="experience-heading"
            className="mt-4 font-heading text-4xl tracking-tight text-foreground sm:text-5xl"
          >
            {t("title")}
          </h2>
          <p className="mt-4 font-mono text-sm leading-relaxed text-muted-foreground">
            {t("lede")}
          </p>
        </div>

        <ol className="relative mt-16 max-w-3xl border-l border-border pl-8 sm:pl-10">
          {entries.map((item, index) => (
            <li key={item.id} className="relative pb-14 last:pb-0">
              <span
                aria-hidden
                className="absolute left-[-33px] top-1.5 flex size-3 -translate-x-1/2 items-center justify-center sm:left-[-41px]"
              >
                <span className="size-2 rounded-full bg-accent ring-4 ring-background" />
              </span>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
                {item.period}
              </p>
              <h3 className="mt-2 font-heading text-2xl tracking-tight text-foreground">
                {item.title}
              </h3>
              <p className="font-mono text-xs text-accent">{item.organization}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
              <span className="sr-only">
                {t("stepLabel", {
                  current: index + 1,
                  total: entries.length,
                })}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
