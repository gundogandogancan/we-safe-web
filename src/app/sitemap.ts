/**
 * Auto-generated sitemap.xml at /sitemap.xml.
 *
 * Lists every static, localized URL so search engines (and Apple's App
 * Review crawler) can discover the legal pages without having to walk the
 * footer. `alternates.languages` declares the hreflang siblings so each
 * locale points back at the others — required for proper international SEO.
 */

import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const SITE = "https://we-safe.io";

// Routes that exist for every locale. Keep in sync with src/app/[locale]/.
const LOCALIZED_ROUTES = [
  { path: "",        priority: 1.0,  changeFrequency: "weekly"  as const },
  { path: "privacy", priority: 0.7,  changeFrequency: "monthly" as const },
  { path: "terms",   priority: 0.7,  changeFrequency: "monthly" as const },
  { path: "support", priority: 0.6,  changeFrequency: "monthly" as const },
  // In-page section anchors — useful for deep-linking from press / app stores
  { path: "mission",   priority: 0.5, changeFrequency: "yearly" as const },
  { path: "network",   priority: 0.5, changeFrequency: "yearly" as const },
  { path: "sos",       priority: 0.5, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return LOCALIZED_ROUTES.flatMap(({ path, priority, changeFrequency }) =>
    routing.locales.map((locale) => ({
      url: `${SITE}/${locale}${path ? `/${path}` : ""}`,
      lastModified: now,
      changeFrequency,
      priority,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((alt) => [
            alt,
            `${SITE}/${alt}${path ? `/${path}` : ""}`,
          ]),
        ),
      },
    })),
  );
}
