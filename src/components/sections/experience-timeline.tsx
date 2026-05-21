import { getTranslations, setRequestLocale } from "next-intl/server";

import type { LocalizedExperienceEntry } from "@/lib/experience-i18n";
import { getLocalizedPathSections } from "@/lib/experience-i18n";
import { cn } from "@/lib/utils";

function TimelineList({
  items,
  stepLabel,
  ariaLabel,
  variant = "default",
}: {
  items: LocalizedExperienceEntry[];
  stepLabel: (current: number, total: number) => string;
  ariaLabel: string;
  variant?: "professional" | "default";
}) {
  const isProfessional = variant === "professional";

  return (
    <ol
      aria-label={ariaLabel}
      className={cn(
        "relative mt-8 border-l border-border pl-8 sm:pl-10",
        isProfessional ? "max-w-4xl" : "max-w-3xl"
      )}
    >
      {items.map((item, index) => (
        <li key={item.id} className="relative pb-14 last:pb-0">
          <span
            aria-hidden
            className="absolute left-[-33px] top-1.5 flex size-3 -translate-x-1/2 items-center justify-center sm:left-[-41px]"
          >
            <span
              className={cn(
                "rounded-full bg-accent ring-4 ring-background",
                isProfessional ? "size-2.5" : "size-2"
              )}
            />
          </span>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
            {item.period}
          </p>
          <h3
            className={cn(
              "mt-2 font-heading tracking-tight text-foreground",
              isProfessional ? "text-2xl sm:text-3xl" : "text-2xl"
            )}
          >
            {item.title}
          </h3>
          <p className="font-mono text-xs text-accent">{item.organization}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {item.description}
          </p>
          {item.bullets && item.bullets.length > 0 ? (
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
              {item.bullets.map((b) => (
                <li key={b} className="marker:text-accent">
                  {b}
                </li>
              ))}
            </ul>
          ) : null}
          {item.techLine ? (
            <p className="mt-4 font-mono text-xs leading-relaxed text-muted-foreground">
              <span className="text-foreground/80">{item.techLine}</span>
            </p>
          ) : null}
          <span className="sr-only">
            {stepLabel(index + 1, items.length)}
          </span>
        </li>
      ))}
    </ol>
  );
}

export async function ExperienceTimeline({ locale }: { locale: string }) {
  setRequestLocale(locale);
  const [t, { education, professional }] = await Promise.all([
    getTranslations({ locale, namespace: "experience" }),
    getLocalizedPathSections(locale),
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

        <div className="mt-14">
          <h3 className="font-heading text-2xl tracking-tight text-foreground sm:text-3xl">
            {t("professionalHeading")}
          </h3>
          <TimelineList
            items={professional}
            variant="professional"
            ariaLabel={t("professionalHeading")}
            stepLabel={(current, total) =>
              t("stepLabel", { current, total })
            }
          />
        </div>

        <div id="education" className="mt-20 scroll-mt-24">
          <h3 className="font-heading text-xl tracking-tight text-foreground sm:text-2xl">
            {t("formationHeading")}
          </h3>
          <TimelineList
            items={education}
            ariaLabel={t("formationHeading")}
            stepLabel={(current, total) =>
              t("stepLabel", { current, total })
            }
          />
        </div>
      </div>
    </section>
  );
}
