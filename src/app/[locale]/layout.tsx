/**
 * Locale layout.
 *   • Validates the URL locale
 *   • Enables static rendering per locale via setRequestLocale
 *   • Provides messages to client components
 *   • Boots the CurrencyProvider with a server-detected initial value
 */

import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { detectCurrency } from "@/lib/region";
import { CurrencyProvider } from "@/components/providers/CurrencyProvider";
import CustomCursor from "@/components/ui/CustomCursor";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const initialCurrency = await detectCurrency();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <CurrencyProvider initial={initialCurrency} locale={locale as Locale}>
        <CustomCursor />
        {children}
      </CurrencyProvider>
    </NextIntlClientProvider>
  );
}
