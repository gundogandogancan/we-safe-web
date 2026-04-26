/**
 * Root layout. Locale-aware html/body.
 * Reads the request's locale via next-intl and sets `lang` + `dir` here
 * so RTL + language announcements work before any client JS runs.
 */

import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Space_Grotesk } from "next/font/google";
import { getLocale } from "next-intl/server";
import { getDirection } from "@/i18n/routing";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const label = Space_Grotesk({
  variable: "--font-label",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://we-safe.io"),
  title: {
    default: "WeSafe — Together We Are Safer",
    template: "%s — WeSafe",
  },
  description:
    "A global, community-powered safety movement. Free. Ad-free. Built so every woman feels safer, anywhere in the world.",
  openGraph: {
    title: "WeSafe — Together We Are Safer",
    description:
      "A global, community-powered safety movement. Free. Ad-free. Built so every woman feels safer, anywhere in the world.",
    url: "https://we-safe.io",
    siteName: "WeSafe",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WeSafe — Together We Are Safer",
    description:
      "A global, community-powered safety movement. Built so every woman feels safer, anywhere in the world.",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const dir = getDirection(locale);

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${display.variable} ${body.variable} ${label.variable}`}
    >
      <body className="grain">{children}</body>
    </html>
  );
}
