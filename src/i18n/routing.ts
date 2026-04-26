/**
 * WeSafe — localization routing.
 * Source of truth for locales, defaults, labels, direction.
 *
 * Adding a locale:
 *   1. Add the tag below (`locales` + `LOCALE_LABEL` + `LOCALE_SHORT`)
 *   2. Add the matching message file at /src/lib/i18n/messages/<tag>.ts
 *   3. If RTL, add to `RTL_LOCALES`
 *   4. Translation import is loaded dynamically in request.ts — no wiring needed.
 */

import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["tr", "en", "es", "ar"] as const,
  defaultLocale: "tr",

  // every URL carries its locale prefix: /tr, /en, /es, /ar
  localePrefix: "always",

  // Next-intl writes a cookie (NEXT_LOCALE) on language switch and reads
  // it + Accept-Language on first visit. Explicit opt-in for clarity:
  localeDetection: true,
});

export type Locale = (typeof routing.locales)[number];

export const DEFAULT_LOCALE: Locale = routing.defaultLocale;
export const FALLBACK_LOCALE: Locale = "en";

export const RTL_LOCALES: readonly Locale[] = ["ar"];

export const LOCALE_LABEL: Record<Locale, string> = {
  tr: "Türkçe",
  en: "English",
  es: "Español",
  ar: "العربية",
};

export const LOCALE_SHORT: Record<Locale, string> = {
  tr: "TR",
  en: "EN",
  es: "ES",
  ar: "AR",
};

/** BCP-47 tags used by Intl.NumberFormat / Intl.DateTimeFormat. */
export const LOCALE_INTL: Record<Locale, string> = {
  tr: "tr-TR",
  en: "en-US",
  es: "es-ES",
  ar: "ar-SA",
};

export function isRTL(locale: string): boolean {
  return RTL_LOCALES.includes(locale as Locale);
}

export function getDirection(locale: string): "ltr" | "rtl" {
  return isRTL(locale) ? "rtl" : "ltr";
}
