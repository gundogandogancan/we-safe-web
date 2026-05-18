import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import LegalShell from "@/components/sections/LegalShell";
import LegalJsonLd from "@/components/sections/LegalJsonLd";
import { getTermsContent } from "./content";

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
  const c = getTermsContent(locale as Locale);
  return {
    title: `${c.title} — WeSafe`,
    description:
      "WeSafe Terms of Service: how the Service is provided, your obligations, and the limits of our liability.",
    alternates: { canonical: `https://we-safe.io/${locale}/terms` },
    openGraph: { title: c.title, type: "article" },
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const content = getTermsContent(locale as Locale);

  return (
    <>
      <LegalJsonLd
        type="TermsOfService"
        title={content.title}
        url={`https://we-safe.io/${locale}/terms`}
        locale={locale}
        lastUpdated="2026-05-18"
        description="WeSafe Terms of Service: how the Service is provided, your obligations, and the limits of our liability."
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
