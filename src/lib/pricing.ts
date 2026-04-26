/**
 * WeSafe — curated pricing + Intl-based formatting.
 *
 * Principle: language ≠ currency. A user in the Netherlands reading
 * Turkish UI still sees EUR pricing. Currency is resolved from REGION
 * (IP/edge geo), not from language.
 *
 * Amounts are CURATED, not live FX. Changing a price is a product
 * decision — do it here, not at runtime.
 */

import type { Locale } from "@/i18n/routing";
import { LOCALE_INTL } from "@/i18n/routing";

export const CURRENCIES = ["TRY", "EUR", "USD", "GBP"] as const;
export type Currency = (typeof CURRENCIES)[number];

export const DEFAULT_CURRENCY: Currency = "TRY";
export const FALLBACK_CURRENCY: Currency = "USD";

/** ISO-3166 alpha-2 → Currency. Unmapped regions fall back to USD. */
export const REGION_TO_CURRENCY: Record<string, Currency> = {
  TR: "TRY",
  // Eurozone
  DE: "EUR", NL: "EUR", FR: "EUR", IT: "EUR", ES: "EUR", BE: "EUR", AT: "EUR",
  IE: "EUR", PT: "EUR", FI: "EUR", GR: "EUR", LU: "EUR", SK: "EUR", SI: "EUR",
  EE: "EUR", LV: "EUR", LT: "EUR", CY: "EUR", MT: "EUR", HR: "EUR",
  // United Kingdom
  GB: "GBP",
  // North America (default to USD)
  US: "USD", CA: "USD",
};

export interface PriceTier {
  code: Currency;
  monthly: number;
  oneTime: number;
}

export const PRICING: Record<Currency, PriceTier> = {
  TRY: { code: "TRY", monthly: 555, oneTime: 888 },
  EUR: { code: "EUR", monthly: 15,  oneTime: 25  },
  USD: { code: "USD", monthly: 15,  oneTime: 25  },
  GBP: { code: "GBP", monthly: 13,  oneTime: 22  },
};

/**
 * Resolve currency from a region code.
 * `null` → default currency. Unmapped → fallback.
 *
 * @param region  ISO-3166 alpha-2 (e.g. "TR", "NL")
 */
export function resolveCurrencyFromRegion(region?: string | null): Currency {
  if (!region) return DEFAULT_CURRENCY;
  return REGION_TO_CURRENCY[region.toUpperCase()] ?? FALLBACK_CURRENCY;
}

/**
 * Locale-aware currency formatting via Intl.NumberFormat.
 * Symbol placement and separators follow the UI locale.
 *
 * Examples:
 *   formatPrice(555, "TRY", "tr") → "₺555"   (tr-TR rules)
 *   formatPrice(15,  "EUR", "es") → "15 €"   (es-ES rules)
 *   formatPrice(15,  "USD", "en") → "$15"    (en-US rules)
 */
export function formatPrice(amount: number, currency: Currency, locale: Locale): string {
  return new Intl.NumberFormat(LOCALE_INTL[locale], {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
