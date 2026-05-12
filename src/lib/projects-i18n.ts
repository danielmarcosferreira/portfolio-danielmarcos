import { getTranslations } from "next-intl/server";

import type { Project, ProjectBase } from "@/types/project";

export function projectMessageId(id: string) {
  return id.replace(/-/g, "_");
}

export async function mergeProjectMessages(
  locale: string,
  bases: ProjectBase[]
): Promise<Project[]> {
  const t = await getTranslations({ locale, namespace: "projects" });
  return bases.map((p) => {
    const mid = projectMessageId(p.id);
    return {
      ...p,
      title: t(`${mid}.title`),
      role: t(`${mid}.role`),
      summary: t(`${mid}.summary`),
      imageAlt: t(`${mid}.imageAlt`),
    };
  });
}
