import type { ProjectBase } from "@/types/project";

/**
 * Employers from CV (structure + media). Copy lives in messages (projects).
 */
export const projects: ProjectBase[] = [
  {
    id: "figtree",
    year: 2024,
    imageSrc:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80",
    tech: ["typescript", "react", "nextjs", "nodejs", "nestjs", "postgres", "firebase", "api"],
    featured: true,
    href: "#work",
    gridSpan: "hero",
  },
  {
    id: "novware",
    year: 2025,
    imageSrc:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80",
    tech: ["react", "typescript", "nextjs", "nodejs", "nestjs", "mongodb", "api"],
    gridSpan: "wide",
  },
  {
    id: "orbware",
    year: 2024,
    imageSrc:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    tech: ["react", "typescript", "nextjs", "api"],
    gridSpan: "standard",
  },
];
