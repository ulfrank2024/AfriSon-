import { setRequestLocale } from "next-intl/server";
import { SiteHeader } from "@/components/marketing/site-header";
import { HeroSection } from "@/components/marketing/hero-section";
import { InstrumentsSection } from "@/components/marketing/instruments-section";
import { HowItWorksSection } from "@/components/marketing/how-it-works-section";
import { CommunitySection } from "@/components/marketing/community-section";
import { EventsPromoSection } from "@/components/marketing/events-promo-section";
import { BlogSection } from "@/components/marketing/blog-section";
import { SiteFooter } from "@/components/marketing/site-footer";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <InstrumentsSection />
        <HowItWorksSection />
        <CommunitySection />
        <EventsPromoSection />
        <BlogSection />
      </main>
      <SiteFooter />
    </>
  );
}
