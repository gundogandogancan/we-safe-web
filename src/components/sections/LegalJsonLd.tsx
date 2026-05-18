/**
 * JSON-LD structured data for legal pages.
 *
 * Helps search engines (and Apple's reviewer crawler) classify the page
 * correctly. Uses schema.org's `PrivacyPolicy` / `TermsOfService` types
 * which Google's Rich Results documentation recommends for legal content.
 *
 * Renders as `<script type="application/ld+json">` inside <head>.
 */

interface LegalJsonLdProps {
  type: "PrivacyPolicy" | "TermsOfService" | "WebPage";
  title: string;
  url: string;
  locale: string;
  lastUpdated?: string;
  description?: string;
}

export default function LegalJsonLd({
  type,
  title,
  url,
  locale,
  lastUpdated,
  description,
}: LegalJsonLdProps) {
  const json = {
    "@context": "https://schema.org",
    "@type": type,
    name: title,
    headline: title,
    url,
    inLanguage: locale,
    isPartOf: {
      "@type": "WebSite",
      name: "WeSafe",
      url: "https://we-safe.io",
    },
    publisher: {
      "@type": "Organization",
      name: "WeSafe",
      url: "https://we-safe.io",
      logo: {
        "@type": "ImageObject",
        url: "https://we-safe.io/icon.png",
      },
    },
    ...(description && { description }),
    ...(lastUpdated && { dateModified: lastUpdated }),
  };

  return (
    <script
      type="application/ld+json"
      // Apple's reviewer doesn't execute JS but does inspect the rendered
      // <head>; an inline JSON-LD blob ships in the static HTML and is
      // visible to non-JS crawlers without React hydration.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
