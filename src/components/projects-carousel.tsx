"use client";

import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import * as React from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { hoverChipClasses, hoverStackColumnClasses } from "@/lib/interactive-hover";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/project";

export function ProjectsCarousel({ projects }: { projects: Project[] }) {
  const t = useTranslations("projects");
  const scrollerRef = React.useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(true);

  const updateEdges = React.useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  React.useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateEdges();
    const observer = new ResizeObserver(updateEdges);
    observer.observe(el);
    return () => observer.disconnect();
  }, [updateEdges]);

  const scrollByCard = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    const card = el?.querySelector("article");
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    el.scrollBy({
      left: direction * (card.getBoundingClientRect().width + gap),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollByCard(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollByCard(-1);
    }
  };

  return (
    <div className="mt-14">
      <div className="mb-4 flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          className="cursor-pointer"
          aria-label={t("previous")}
          disabled={!canPrev}
          onClick={() => scrollByCard(-1)}
        >
          <ChevronLeft aria-hidden />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          className="cursor-pointer"
          aria-label={t("next")}
          disabled={!canNext}
          onClick={() => scrollByCard(1)}
        >
          <ChevronRight aria-hidden />
        </Button>
      </div>

      <div
        ref={scrollerRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={t("carouselLabel")}
        tabIndex={0}
        onScroll={updateEdges}
        onKeyDown={onKeyDown}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((project, index) => (
          <article
            key={project.id}
            aria-roledescription="slide"
            aria-label={t("slideLabel", {
              current: index + 1,
              total: projects.length,
            })}
            className={cn(
              hoverStackColumnClasses,
              "flex w-[85%] shrink-0 snap-start flex-col sm:w-[26rem] lg:w-[28rem]"
            )}
          >
            <div className="relative aspect-[12/7] border-b border-border/70 bg-muted/60">
              <Image
                src={project.imageSrc}
                alt={project.imageAlt}
                fill
                sizes={
                  project.mobile
                    ? "(min-width: 1024px) 160px, (min-width: 640px) 150px, 30vw"
                    : "(min-width: 1024px) 448px, (min-width: 640px) 416px, 85vw"
                }
                className={cn(
                  "object-contain",
                  project.mobile && "py-3 drop-shadow-xl"
                )}
              />
            </div>
            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-accent">
                {t(`kinds.${project.kind}`)}
              </p>
              <h3 className="mt-2 font-heading text-2xl tracking-tight text-foreground">
                {project.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>
              <ul
                aria-label={t("techList")}
                className="mt-4 flex flex-wrap gap-2"
              >
                {project.tech.map((item) => (
                  <li
                    key={item}
                    className={cn(
                      hoverChipClasses,
                      "px-2 py-1 font-mono text-[0.65rem] uppercase tracking-wide text-muted-foreground"
                    )}
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("viewLiveLabel", { title: project.title })}
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "mt-6 w-fit"
                )}
              >
                {t("viewLive")}
                <ArrowUpRight aria-hidden />
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
