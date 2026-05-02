/**
 * WeSafe homepage — root entry point.
 * Content and section ordering live in HomePageBody to avoid duplication
 * with the section deep-link pages ([locale]/[section]/page.tsx).
 *
 *   01 Hero       — full-bleed Earth hero
 *   02 Problem
 *   03 Mission    ← "Biz Kimiz" navbar anchor
 *   04 Network
 *   05 SOS
 *   06 Reporting
 *   07 Volunteer
 *   08 Support    ← "Destek" navbar anchor
 *   09 Download   ← "İndir" navbar anchor
 */

import { setRequestLocale } from "next-intl/server";
import HomePageBody from "@/components/HomePageBody";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HomePageBody />;
}
