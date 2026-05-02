/**
 * HomePageBody — shared layout for both the root home page and individual
 * section deep-link pages. Assembles Navbar + all sections + Footer plus
 * the client-side utilities (SectionTracker, ScrollIntoView).
 *
 * @param scrollTo  Optional section id to scroll to on mount (used when a
 *                  user navigates directly to e.g. /tr/sos).
 */

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlobalActivationHero from "@/components/sections/GlobalActivationHero";
import ProblemSection from "@/components/sections/ProblemSection";
import MissionSection from "@/components/sections/MissionSection";
import NetworkSection from "@/components/sections/NetworkSection";
import SOSSection from "@/components/sections/SOSSection";
import ReportingSection from "@/components/sections/ReportingSection";
import VolunteerSection from "@/components/sections/VolunteerSection";
import SupportSection from "@/components/sections/SupportSection";
import DownloadSection from "@/components/sections/DownloadSection";
import SectionTracker from "@/components/SectionTracker";
import ScrollIntoView from "@/components/ScrollIntoView";

export default function HomePageBody({ scrollTo }: { scrollTo?: string }) {
  return (
    <>
      <Navbar />
      <SectionTracker />
      {scrollTo && <ScrollIntoView target={scrollTo} />}
      <main>
        <GlobalActivationHero />
        <ProblemSection />
        <MissionSection />
        <NetworkSection />
        <SOSSection />
        <ReportingSection />
        <VolunteerSection />
        <SupportSection />
        <DownloadSection />
      </main>
      <Footer />
    </>
  );
}
