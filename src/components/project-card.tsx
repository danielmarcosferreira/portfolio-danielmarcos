"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { getTechIcons } from "@/lib/tech-icons";
import { cn } from "@/lib/utils";
import type { Project, ProjectGridSpan } from "@/types/project";

/** 12-column work grid: featured row full width; pair below 6+6. */
const spanClass: Record<ProjectGridSpan, string> = {
  hero: "lg:col-span-12",
  wide: "lg:col-span-6",
  standard: "lg:col-span-6",
};

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const reduceMotion = useReducedMotion();
  const tTech = useTranslations("tech");
  const tWork = useTranslations("work");
  const tech = getTechIcons(project.tech);

  const content = (
    <Card
      size="sm"
      className={cn(
        "h-full rounded-none border border-border/80 bg-transparent py-0 shadow-none ring-0 transition-colors hover:border-foreground/25",
        className
      )}
    >
      <div className="relative aspect-[16/10] border-b border-border/70">
        <Image
          src={project.imageSrc}
          alt={project.imageAlt}
          fill
          sizes="(min-width: 1024px) 520px, 100vw"
          className="object-cover"
        />
      </div>
      <CardHeader className="gap-3 px-5 pb-2 pt-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <CardTitle className="font-heading text-xl tracking-tight sm:text-2xl">
            {project.title}
          </CardTitle>
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground">
            {project.year}
          </span>
        </div>
        <p className="font-mono text-xs text-accent">{project.role}</p>
      </CardHeader>
      <CardContent className="space-y-4 px-5 pb-5">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {project.summary}
        </p>
        <ul className="flex flex-wrap gap-3" aria-label={tWork("techList")}>
          {tech.map((item) => {
            const Icon = item.icon;
            return (
              <li
                key={item.key}
                className="flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-wide text-muted-foreground"
              >
                <Icon className="size-3.5 text-foreground" aria-hidden />
                <span>{tTech(item.key)}</span>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );

  const motionProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.25 },
        transition: {
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        },
      };

  const inner =
    project.href && project.href.startsWith("#") ? (
      <a
        href={project.href}
        className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {content}
      </a>
    ) : project.href ? (
      <Link
        href={project.href}
        className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {content}
      </Link>
    ) : (
      content
    );

  return (
    <motion.article
      className={cn("col-span-12", spanClass[project.gridSpan])}
      {...motionProps}
    >
      {inner}
    </motion.article>
  );
}
