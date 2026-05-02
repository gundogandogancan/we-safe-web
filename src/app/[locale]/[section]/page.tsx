/**
 * Section deep-link page.
 *
 * Handles direct navigation to a section URL, e.g.:
 *   we-safe.io/tr/sos
 *   we-safe.io/en/mission
 *
 * Renders the full homepage and instantly scrolls to the target section
 * on the client via ScrollIntoView.  Unknown slugs fall through to 404.
 */

import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import HomePageBody from "@/components/HomePageBody";

const VALID_SECTIONS = [
  "problem",
  "mission",
  "network",
  "sos",
  "reporting",
  "volunteer",
  "support",
  "download",
] as const;

type ValidSection = (typeof VALID_SECTIONS)[number];

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    VALID_SECTIONS.map((section) => ({ locale, section })),
  );
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ locale: string; section: string }>;
}) {
  const { locale, section } = await params;

  if (
    !hasLocale(routing.locales, locale) ||
    !(VALID_SECTIONS as readonly string[]).includes(section)
  ) {
    notFound();
  }

  setRequestLocale(locale);

  return <HomePageBody scrollTo={section as ValidSection} />;
}
