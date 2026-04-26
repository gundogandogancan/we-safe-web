/**
 * Server-side message loading. Called once per request by next-intl.
 * Messages are TypeScript modules (not JSON) so we get tree-shaking,
 * type safety, and per-locale bundle splitting.
 */

import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing, type Locale } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale: Locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const messages = (await import(`@/lib/i18n/messages/${locale}`)).default;

  return { locale, messages };
});
