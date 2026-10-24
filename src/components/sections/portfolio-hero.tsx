import { getTranslations, setRequestLocale } from "next-intl/server";

import { hoverChipClasses } from "@/lib/interactive-hover";
import { cn } from "@/lib/utils";

interface PortfolioHeroProps {
  locale: string;
}

export async function PortfolioHero({ locale }: PortfolioHeroProps) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "hero" });
  const techChips = t.raw("techChips") as string[];
  const email = t("emailAddress").trim();
  const linkedin = t("linkedinUrl").trim();
  const phone = t("phoneNumber").trim();

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="border-b border-border/70 bg-background"
    >
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-20 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-muted-foreground">
          {t("byline")}
        </p>
        <p className="mt-2 font-mono text-xs text-muted-foreground">
          {t("languagesLine")}
        </p>

        <div className="mt-10 max-w-3xl">
          <h1
            id="hero-heading"
            className="font-heading text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] tracking-tight text-foreground"
          >
            {t("name")}
          </h1>
          <p className="mt-3 font-mono text-sm uppercase tracking-[0.2em] text-accent">
            {t("role")}
          </p>
          <p className="mt-8 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("profile")}
          </p>
        </div>

        <ul
          className="mt-10 flex max-w-3xl flex-wrap gap-2.5"
          aria-label={t("techChipsLabel")}
        >
          {techChips.map((chip) => (
            <li
              key={chip}
              className={cn(
                hoverChipClasses,
                "px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-foreground/85"
              )}
            >
              <span className="relative z-[1]">{chip}</span>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-8">
          <a
            href="#experience"
            className="inline-flex w-fit items-center gap-2 border border-foreground/20 bg-foreground px-5 py-2.5 font-mono text-xs uppercase tracking-[0.24em] text-background transition-colors hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {t("viewExperience")}
          </a>
          <div className="flex flex-col sm:flex-wrap gap-x-5 gap-y-2 font-mono text-xs">
            {email ? (
              <a
                href={`mailto:${email}`}
                className="text-accent underline-offset-4 transition-colors hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {email}
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
      </div>
    </section>
  );
}
