import { setRequestLocale } from "next-intl/server";
import { SiteHeader } from "@/components/marketing/site-header";
import { HeroSection } from "@/components/marketing/hero-section";
import { ConceptSection } from "@/components/marketing/concept-section";
import { InstrumentsSection } from "@/components/marketing/instruments-section";
import { HowItWorksSection } from "@/components/marketing/how-it-works-section";
import { CommunitySection } from "@/components/marketing/community-section";
import { TeacherRecruitmentSection } from "@/components/marketing/teacher-recruitment-section";
import { SiteFooter } from "@/components/marketing/site-footer";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <ConceptSection />
        <InstrumentsSection />
        <HowItWorksSection />
        <CommunitySection />
        <TeacherRecruitmentSection />
      </main>
      <SiteFooter />
    </>
  );
}
