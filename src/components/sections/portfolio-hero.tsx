import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Separator } from "@/components/ui/separator";
import type { Project } from "@/types/project";

interface PortfolioHeroProps {
  featured: Project;
  locale: string;
}

export async function PortfolioHero({
  featured,
  locale,
}: PortfolioHeroProps) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "hero" });
  const stackLines = t.raw("stackLines") as { label: string; mono: string }[];
  const spotlightBulletsRaw = t.raw("spotlightBullets");
  const spotlightBullets = Array.isArray(spotlightBulletsRaw)
    ? (spotlightBulletsRaw as string[]).filter(
        (line) => typeof line === "string" && line.length > 0
      )
    : [];
  const spotlightTech = t("spotlightTech").trim();

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="border-b border-border/70 bg-background"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-muted-foreground">
          {t("byline")}
        </p>
        <div className="mt-10 grid gap-14 lg:grid-cols-12 lg:items-start lg:gap-10">
          <div className="lg:col-span-5">
            <div className="flex flex-col gap-2">
              {stackLines.map((line) => (
                <div
                  key={line.label}
                  className="flex flex-col border-l-2 border-accent pl-5"
                >
                  <span className="font-heading text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.92] tracking-tight text-foreground">
                    {line.label}
                  </span>
                  <span className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.28em] text-muted-foreground">
                    {line.mono}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-8 lg:col-span-7">
            <div>
              <h1
                id="hero-heading"
                className="font-heading text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl"
              >
                {t("titleLead")}
                <span className="block text-muted-foreground">
                  {t("titleAccent")}
                </span>
              </h1>
              <p className="mt-6 max-w-xl font-mono text-sm leading-relaxed text-muted-foreground">
                {t("intro")}
              </p>
            </div>

            <article className="grid gap-6 border border-border/80 bg-card/40 p-5 sm:grid-cols-5 sm:p-6 lg:gap-8">
              <div className="sm:col-span-2">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
                  {t("spotlight")}
                </p>
                <h2 className="mt-3 font-heading text-2xl tracking-tight text-foreground sm:text-3xl">
                  {featured.title}
                </h2>
                <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground">
                  <span>{featured.year}</span>
                  <Separator
                    orientation="vertical"
                    className="hidden h-3 shrink-0 self-center sm:block"
                  />
                  <span>{featured.role}</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {featured.summary}
                </p>
                {spotlightBullets.length > 0 ? (
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
                    {spotlightBullets.map((line) => (
                      <li key={line} className="marker:text-accent">
                        {line}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {spotlightTech ? (
                  <p className="mt-4 font-mono text-xs leading-relaxed text-muted-foreground">
                    {spotlightTech}
                  </p>
                ) : null}
                <a
                  href="#work"
                  className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.24em] text-accent underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {t("viewWork")}
                </a>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden border border-border/60 sm:col-span-3">
                <Image
                  src={featured.imageSrc}
                  alt={featured.imageAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 480px, 100vw"
                  className="object-cover transition duration-700 ease-out hover:scale-[1.02]"
                />
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
