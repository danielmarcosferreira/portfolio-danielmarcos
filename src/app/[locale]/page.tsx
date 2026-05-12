import { setRequestLocale } from "next-intl/server";

import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { PortfolioHero } from "@/components/sections/portfolio-hero";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteNavigation } from "@/components/sections/site-navigation";
import { StackSection } from "@/components/sections/stack-section";
import { WorkSection } from "@/components/sections/work-section";
import { getFeaturedProject, getProjects } from "@/lib/projects-source";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [projects, featured] = await Promise.all([
    getProjects(locale),
    getFeaturedProject(locale),
  ]);

  if (!featured) {
    return null;
  }

  return (
    <>
      <SiteNavigation />
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        <PortfolioHero featured={featured} locale={locale} />
        <WorkSection projects={projects} locale={locale} />
        <ExperienceTimeline locale={locale} />
        <StackSection locale={locale} />
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
