import {
  Database,
  Flame,
  Layers,
  Radio,
  Server,
  Waypoints,
  type LucideIcon,
} from "lucide-react";

import type { ProjectTechKey } from "@/types/project";

const TECH_REGISTRY: Record<ProjectTechKey, LucideIcon> = {
  react: Layers,
  nextjs: Layers,
  nestjs: Server,
  typescript: Layers,
  nodejs: Server,
  mongodb: Database,
  postgres: Database,
  firebase: Flame,
  api: Waypoints,
  websocket: Radio,
};

export function getTechIcons(keys: ProjectTechKey[]) {
  return keys.map((key) => ({ key, icon: TECH_REGISTRY[key] }));
}
