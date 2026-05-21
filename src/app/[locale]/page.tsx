import { setRequestLocale } from "next-intl/server";

import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { PortfolioHero } from "@/components/sections/portfolio-hero";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteNavigation } from "@/components/sections/site-navigation";
import { StackSection } from "@/components/sections/stack-section";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <SiteNavigation />
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        <PortfolioHero locale={locale} />
        <ExperienceTimeline locale={locale} />
        <StackSection locale={locale} />
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
