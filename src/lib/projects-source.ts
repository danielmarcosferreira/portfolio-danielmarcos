import { projects as staticProjects } from "@/data/projects";
import { mergeProjectMessages } from "@/lib/projects-i18n";
import type { Project } from "@/types/project";

/**
 * Single entry point for project listings. Today this returns static data;
 * swap the implementation for Supabase / Prisma without touching UI layers.
 */
export async function getProjects(locale: string): Promise<Project[]> {
  return mergeProjectMessages(locale, staticProjects);
}

export async function getFeaturedProject(
  locale: string
): Promise<Project | undefined> {
  const all = await getProjects(locale);
  return all.find((p) => p.featured) ?? all[0];
}
