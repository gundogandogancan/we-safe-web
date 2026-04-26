"use client";

/**
 * Currency context — hydrates from server-detected initial value,
 * allows future manual override (UI not yet exposed per Phase-1 scope).
 *
 * Persistence: localStorage AND cookie. Cookie is read by the server
 * next visit (see src/lib/region.ts → CURRENCY_COOKIE), so SSR and
 * client stay in sync after a choice is made.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  CURRENCIES,
  DEFAULT_CURRENCY,
  formatPrice,
  PRICING,
  type Currency,
  type PriceTier,
} from "@/lib/pricing";
import type { Locale } from "@/i18n/routing";

const LS_KEY = "wesafe:currency";
const COOKIE_KEY = "wesafe_currency";

interface CurrencyContextValue {
  currency: Currency;
  tier: PriceTier;
  setCurrency: (c: Currency) => void;
  /** Locale-aware formatter bound to the active UI locale. */
  format: (amount: number, currency?: Currency) => string;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({
  children,
  initial,
  locale,
}: {
  children: ReactNode;
  initial: Currency;
  locale: Locale;
}) {
  const [currency, setCurrencyState] = useState<Currency>(initial);

  // Rehydrate from localStorage override on mount.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      if (saved && (CURRENCIES as readonly string[]).includes(saved)) {
        setCurrencyState(saved as Currency);
      }
    } catch {
      // private mode / disabled storage — ignore
    }
  }, []);

  const setCurrency = useCallback((c: Currency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem(LS_KEY, c);
    } catch {}
    // persist to cookie so SSR sees it on next request
    document.cookie = `${COOKIE_KEY}=${c}; path=/; max-age=31536000; samesite=lax`;
  }, []);

  const value = useMemo<CurrencyContextValue>(
    () => ({
      currency,
      tier: PRICING[currency],
      setCurrency,
      format: (amount, c = currency) => formatPrice(amount, c, locale),
    }),
    [currency, setCurrency, locale],
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency(): CurrencyContextValue {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error("useCurrency must be used inside <CurrencyProvider>");
  }
  return ctx;
}

/** Safe variant for components that might render outside the provider. */
export function useCurrencyOptional(): CurrencyContextValue | null {
  return useContext(CurrencyContext);
}
