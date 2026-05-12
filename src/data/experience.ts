/** Order of timeline entries; copy lives in messages (experience.entries). */
export const experienceEntryIds = [
  "is-masters",
  "fs-contract",
  "civil-site",
  "civil-academic",
] as const;

export type ExperienceEntryId = (typeof experienceEntryIds)[number];
