/**
 * WeSafe homepage.
 *
 *   01 Hero       — clean full-bleed Earth video + title + CTAs
 *   02 Problem
 *   03 Mission    ← anchored by "about" in navbar (Biz Kimiz)
 *   04 Network
 *   05 SOS
 *   06 Reporting
 *   07 Volunteer
 *   08 Support    ← anchored by "support" in navbar (Destek)
 *   09 Download   ← anchored by "download" in navbar (İndir)
 */

import { setRequestLocale } from "next-intl/server";
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

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
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
