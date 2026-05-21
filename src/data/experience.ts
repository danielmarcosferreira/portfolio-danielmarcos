/** Education (CV Formação), top to bottom. */
export const experienceEducationIds = [
  "degree-information-systems",
  "bootcamp-driven",
  "degree-civil-engineering",
] as const;

/** Professional roles (CV Experiência profissional), CV order. */
export const experienceProfessionalIds = [
  "job-figtree",
  "job-novware",
  "job-orbware",
] as const;

export type ExperienceEducationId =
  (typeof experienceEducationIds)[number];
export type ExperienceProfessionalId =
  (typeof experienceProfessionalIds)[number];
