import { getTranslations } from "next-intl/server";

import {
  experienceEducationIds,
  experienceProfessionalIds,
} from "@/data/experience";

export interface LocalizedExperienceEntry {
  id: string;
  period: string;
  title: string;
  organization: string;
  description: string;
  bullets?: string[];
  techLine?: string;
}

function entryKey(id: string) {
  return id.replace(/-/g, "_") as string;
}

function mapEntry(
  t: Awaited<ReturnType<typeof getTranslations>>,
  id: string
): LocalizedExperienceEntry {
  const key = entryKey(id);
  const base = `entries.${key}`;
  const raw = t.raw(base) as {
    period: string;
    title: string;
    organization: string;
    description: string;
    bullets?: string[];
    techLine?: string;
  };
  const bullets = Array.isArray(raw.bullets)
    ? raw.bullets.filter((b): b is string => typeof b === "string" && b.length > 0)
    : undefined;

  return {
    id,
    period: raw.period,
    title: raw.title,
    organization: raw.organization,
    description: raw.description,
    bullets: bullets && bullets.length > 0 ? bullets : undefined,
    techLine:
      typeof raw.techLine === "string" && raw.techLine.length > 0
        ? raw.techLine
        : undefined,
  };
}

export async function getLocalizedPathSections(locale: string): Promise<{
  education: LocalizedExperienceEntry[];
  professional: LocalizedExperienceEntry[];
}> {
  const t = await getTranslations({ locale, namespace: "experience" });
  return {
    education: experienceEducationIds.map((id) => mapEntry(t, id)),
    professional: experienceProfessionalIds.map((id) => mapEntry(t, id)),
  };
}
