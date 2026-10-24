export type ProjectKind = "employer" | "freelance" | "personal";

/** Locale-agnostic fields; copy comes from messages (`projects.items.*`). */
export interface ProjectBase {
  id: string;
  kind: ProjectKind;
  /** Screenshot in `public/projects/`. */
  imageSrc: string;
  /** Portrait phone screenshot — shown whole instead of cropped to the card frame. */
  mobile?: boolean;
  /** Technology names are proper nouns, so they are not translated. */
  tech: string[];
  liveUrl: string;
}

export interface Project extends ProjectBase {
  title: string;
  description: string;
  imageAlt: string;
}
