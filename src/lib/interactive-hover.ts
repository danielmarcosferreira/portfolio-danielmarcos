import { cn } from "@/lib/utils";

/** Shared easing — smooth deceleration (matches project motion curves). */
export const hoverEase =
  "duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]";

const hoverTransition = cn(
  "cursor-default transition-all",
  hoverEase,
  "motion-reduce:transition-none motion-reduce:hover:translate-y-0"
);

const hoverLift = "hover:-translate-y-px";

/** Hero tech chips, stack list rows */
export const hoverChipClasses = cn(
  hoverTransition,
  "border border-border/80 border-l-2 border-l-transparent bg-card/40 shadow-none",
  hoverLift,
  "hover:border-accent/50 hover:border-l-accent hover:bg-accent/10 hover:text-foreground hover:shadow-[0_6px_24px_-8px] hover:shadow-accent/20"
);

/** Experience & education timeline entries */
export const hoverTimelineCardClasses = cn(
  hoverTransition,
  "-ml-1 rounded-sm border border-transparent border-l-2 border-l-transparent bg-transparent py-4 pl-4 pr-3 sm:pl-5",
  hoverLift,
  "hover:border-accent/40 hover:border-l-accent hover:bg-card/50 hover:shadow-[0_8px_28px_-10px] hover:shadow-accent/15"
);

/** Stack column cards (whole block) */
export const hoverStackColumnClasses = cn(
  hoverTransition,
  "border border-border/80 bg-card/30",
  hoverLift,
  "hover:border-accent/40 hover:bg-card/50 hover:shadow-[0_8px_28px_-10px] hover:shadow-accent/15"
);
