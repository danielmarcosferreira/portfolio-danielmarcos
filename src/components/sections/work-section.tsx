import { getTranslations, setRequestLocale } from "next-intl/server";

import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/types/project";

interface WorkSectionProps {
  projects: Project[];
  locale: string;
}

export async function WorkSection({ projects, locale }: WorkSectionProps) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "work" });

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="border-b border-border/70 bg-background py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-muted-foreground">
            {t("kicker")}
          </p>
          <h2
            id="work-heading"
            className="mt-4 font-heading text-4xl tracking-tight text-foreground sm:text-5xl"
          >
            {t("title")}
          </h2>
          <p className="mt-4 font-mono text-sm leading-relaxed text-muted-foreground">
            {t("lede")}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-x-5 lg:gap-y-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
