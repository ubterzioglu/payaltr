import Hero from "@/components/Hero";
import {
  IntroSection,
  AdvantagesSection,
  LegalStatsSection,
  PropertiesSection,
  EventsSection,
  PartnersSection,
  CtaSection,
} from "@/components/home/HomeSections";

export default function Home() {
  return (
    <>
      <Hero />
      <IntroSection />
      <AdvantagesSection />
      <LegalStatsSection />
      <PropertiesSection />
      <EventsSection />
      <PartnersSection />
      <CtaSection />
    </>
  );
}
