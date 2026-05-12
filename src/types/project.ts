/** Keys aligned with `TECH_REGISTRY` — swap this module for DB rows later. */
export type ProjectTechKey =
  | "react"
  | "nextjs"
  | "nestjs"
  | "typescript"
  | "nodejs"
  | "mongodb"
  | "postgres"
  | "firebase"
  | "api"
  | "websocket";

export type ProjectGridSpan = "hero" | "wide" | "standard";

/** Locale-agnostic fields; copy comes from messages (projects). */
export interface ProjectBase {
  id: string;
  year: number;
  imageSrc: string;
  tech: ProjectTechKey[];
  /** Shown in the asymmetrical hero spotlight */
  featured?: boolean;
  href?: string | null;
  gridSpan: ProjectGridSpan;
}

export interface Project extends ProjectBase {
  title: string;
  role: string;
  summary: string;
  imageAlt: string;
}
