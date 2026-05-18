/**
 * Auto-generated robots.txt at /robots.txt.
 * Next.js convention: any `app/robots.ts` exporting a default object becomes
 * the live robots.txt; no need to ship a static file in /public.
 */

import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Internal API endpoints (e.g. Stripe checkout) shouldn't be indexed
        // — they redirect anyway, but excluding them keeps crawl budget on
        // the content pages.
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: "https://we-safe.io/sitemap.xml",
    host: "https://we-safe.io",
  };
}
