/** Education (CV), top to bottom. */
export const experienceEducationIds = [
  "degree-information-systems",
  "bootcamp-driven",
  "degree-civil-engineering",
] as const;

/** Professional roles (newest first). */
export const experienceProfessionalIds = [
  "job-novaware",
  "job-figtree",
  "job-orbware",
] as const;

export type ExperienceEducationId =
  (typeof experienceEducationIds)[number];
export type ExperienceProfessionalId =
  (typeof experienceProfessionalIds)[number];
