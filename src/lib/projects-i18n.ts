import { getTranslations } from "next-intl/server";

import { projects } from "@/data/projects";
import type { Project } from "@/types/project";

/** Message keys use underscores (`figtree_student_platform`). */
export function projectMessageId(id: string) {
  return id.replace(/-/g, "_");
}

export async function getLocalizedProjects(locale: string): Promise<Project[]> {
  const t = await getTranslations({ locale, namespace: "projects" });
  return projects.map((p) => {
    const mid = projectMessageId(p.id);
    return {
      ...p,
      title: t(`items.${mid}.title`),
      description: t(`items.${mid}.description`),
      imageAlt: t(`items.${mid}.imageAlt`),
    };
  });
}
