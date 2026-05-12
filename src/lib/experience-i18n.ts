import { getTranslations } from "next-intl/server";

import { experienceEntryIds, type ExperienceEntryId } from "@/data/experience";

export interface LocalizedExperienceEntry {
  id: ExperienceEntryId;
  period: string;
  title: string;
  organization: string;
  description: string;
}

function entryKey(id: string) {
  return id.replace(/-/g, "_") as string;
}

export async function getLocalizedExperience(
  locale: string
): Promise<LocalizedExperienceEntry[]> {
  const t = await getTranslations({ locale, namespace: "experience" });
  return experienceEntryIds.map((id) => ({
    id,
    period: t(`entries.${entryKey(id)}.period`),
    title: t(`entries.${entryKey(id)}.title`),
    organization: t(`entries.${entryKey(id)}.organization`),
    description: t(`entries.${entryKey(id)}.description`),
  }));
}
