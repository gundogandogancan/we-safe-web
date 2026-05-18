/**
 * /privacy — WeSafe Privacy Policy page.
 *
 * Static per-locale at build time. Content mirrors the iOS app
 * Localizable.strings (legal.privacy.section*); see ./content.ts.
 */

import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import LegalShell from "@/components/sections/LegalShell";
import LegalJsonLd from "@/components/sections/LegalJsonLd";
import { getPrivacyContent } from "./content";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const c = getPrivacyContent(locale as Locale);
  return {
    title: `${c.title} — WeSafe`,
    description:
      "How WeSafe handles your personal data, your rights, and contact information.",
    alternates: { canonical: `https://we-safe.io/${locale}/privacy` },
    openGraph: { title: c.title, type: "article" },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const content = getPrivacyContent(locale as Locale);

  return (
    <>
      <LegalJsonLd
        type="PrivacyPolicy"
        title={content.title}
        url={`https://we-safe.io/${locale}/privacy`}
        locale={locale}
        lastUpdated="2026-05-18"
        description="How WeSafe handles your personal data, your rights, and contact information."
      />
      <LegalShell
        locale={locale}
        eyebrow={content.brand}
        title={content.title}
        lastUpdated={content.lastUpdated}
        sections={content.sections}
      />
    </>
  );
}
