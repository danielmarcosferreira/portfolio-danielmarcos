import type { ProjectBase } from "@/types/project";

const FIGTREE_STACK = [
  "React.js",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Firebase",
  "MongoDB",
  "Styled Components",
  "REST API",
];
const NEXT_NEST_STACK = ["Next.js", "NestJS", "TypeScript", "Tailwind CSS", "REST API"];
const NEXT_FIREBASE_STACK = ["Next.js", "JavaScript", "Firebase", "Styled Components", "REST API"];

/** Order = display order in the carousel. */
export const projects: ProjectBase[] = [
  {
    id: "figtree-student-platform",
    kind: "employer",
    imageSrc: "/projects/figtree-student-platform.webp",
    tech: FIGTREE_STACK,
    liveUrl: "https://figtree-platform.vercel.app/dashboard",
  },
  {
    id: "incorpora-mf",
    kind: "employer",
    imageSrc: "/projects/incorpora-mf.webp",
    tech: NEXT_NEST_STACK,
    liveUrl: "https://www.incorporamf.com.br/",
  },
  {
    id: "ciway",
    kind: "employer",
    imageSrc: "/projects/ciway.webp",
    tech: NEXT_NEST_STACK,
    liveUrl: "https://ciway470-2989f.web.app/",
  },
  {
    id: "organiza-ai",
    kind: "freelance",
    imageSrc: "/projects/organiza-ai.webp",
    tech: NEXT_FIREBASE_STACK,
    liveUrl: "https://my-finance-hub-pi.vercel.app/",
  },
  {
    id: "debt-tracker",
    kind: "personal",
    imageSrc: "/projects/debt-tracker.webp",
    mobile: true,
    tech: NEXT_FIREBASE_STACK,
    liveUrl: "https://debt-tracker-de15a.web.app/",
  },
];
