import type { ProjectBase } from "@/types/project";

/**
 * Static seed data (structure + media). Copy lives in messages (projects).
 */
export const projects: ProjectBase[] = [
  {
    id: "atlas-ops",
    year: 2025,
    imageSrc:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    tech: ["nextjs", "nestjs", "postgres", "typescript", "api"],
    featured: true,
    href: "#work",
    gridSpan: "hero",
  },
  {
    id: "pulse-field",
    year: 2024,
    imageSrc:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=80",
    tech: ["react", "nodejs", "mongodb", "websocket", "typescript"],
    gridSpan: "wide",
  },
  {
    id: "ledger-portal",
    year: 2024,
    imageSrc:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    tech: ["react", "typescript", "nextjs", "api"],
    gridSpan: "standard",
  },
  {
    id: "signal-desk",
    year: 2023,
    imageSrc:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80",
    tech: ["nextjs", "firebase", "postgres", "typescript"],
    gridSpan: "standard",
  },
  {
    id: "northline-api",
    year: 2023,
    imageSrc:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    tech: ["nestjs", "nodejs", "api", "postgres"],
    gridSpan: "wide",
  },
];
