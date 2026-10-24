import { getTranslations, setRequestLocale } from "next-intl/server";

import { ProjectsCarousel } from "@/components/projects-carousel";
import { getLocalizedProjects } from "@/lib/projects-i18n";

export async function ProjectsSection({ locale }: { locale: string }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "projects" });
  const projects = await getLocalizedProjects(locale);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="border-b border-border/70 bg-background py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-muted-foreground">
            {t("kicker")}
          </p>
          <h2
            id="projects-heading"
            className="mt-4 font-heading text-4xl tracking-tight text-foreground sm:text-5xl"
          >
            {t("title")}
          </h2>
          <p className="mt-4 font-mono text-sm leading-relaxed text-muted-foreground">
            {t("lede")}
          </p>
        </div>

        <ProjectsCarousel projects={projects} />
      </div>
    </section>
  );
}
