/**
 * Region detection for currency resolution.
 *
 * Language and region are separate signals. This module only resolves
 * REGION. The UI locale comes from next-intl routing; the region below
 * only feeds currency selection.
 *
 * Priority order:
 *   1. Explicit cookie override (future manual override UI)
 *   2. Edge geo headers set by Vercel / Cloudflare
 *   3. Accept-Language region subtag (e.g. "en-GB" → "GB")
 *   4. null → caller falls back to DEFAULT_CURRENCY
 *
 * Server-side only. For client-side detection use navigator.language and
 * read the same cookie.
 */

import { headers, cookies } from "next/headers";
import {
  CURRENCIES,
  resolveCurrencyFromRegion,
  DEFAULT_CURRENCY,
  type Currency,
} from "./pricing";

/** Cookie name used by the (future) manual currency override UI. */
export const CURRENCY_COOKIE = "wesafe_currency";

/** Parse a region (ISO-3166 alpha-2) from request signals. */
export async function detectRegion(): Promise<string | null> {
  const h = await headers();

  // 1. Vercel edge geo
  const vercel = h.get("x-vercel-ip-country");
  if (vercel) return vercel;

  // 2. Cloudflare
  const cf = h.get("cf-ipcountry");
  if (cf && cf !== "XX") return cf;

  // 3. Accept-Language region subtag
  const accept = h.get("accept-language") ?? "";
  const match = accept.match(/[a-z]{2,3}-([A-Z]{2})/);
  if (match) return match[1];

  return null;
}

/**
 * Resolve the currency for the current request.
 * Honors an explicit override cookie first; otherwise detects region.
 */
export async function detectCurrency(): Promise<Currency> {
  const store = await cookies();
  const override = store.get(CURRENCY_COOKIE)?.value?.toUpperCase();
  if (override && (CURRENCIES as readonly string[]).includes(override)) {
    return override as Currency;
  }

  const region = await detectRegion();
  return resolveCurrencyFromRegion(region);
}

export { DEFAULT_CURRENCY };
