"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import LogoMark from "@/components/brand/LogoMark";
import Container from "@/components/ui/Container";
import LangSwitcher from "./LangSwitcher";

/** Section slugs scroll in-page; all others are external, full pages, or coming-soon. */
const SECTION_SLUGS = new Set(["mission", "network", "sos"]);
/** Top-level routes — link straight to /{locale}/{slug}, no scroll behaviour. */
const PAGE_SLUGS = new Set(["privacy", "terms", "support"]);

const COLUMNS = [
  {
    key: "platform",
    items: [
      { key: "mission", href: "mission" },
      { key: "network", href: "network" },
      { key: "sos",     href: "sos"     },
      { key: "support", href: "support" },
    ],
  },
  {
    key: "company",
    items: [
      { key: "about",   href: null },
      { key: "press",   href: null },
      { key: "contact", href: "mailto:info@we-safe.io" },
    ],
  },
  {
    key: "legal",
    items: [
      { key: "privacy", href: "privacy" },
      { key: "terms",   href: "terms"   },
      { key: "consent", href: null      },
    ],
  },
  {
    key: "social",
    items: [
      { key: "instagram", href: null },
      { key: "x",        href: null },
      { key: "tiktok",   href: null },
      {
        key: "facebook",
        href: "https://www.facebook.com/people/Wesafe-App/pfbid02vEuXMBKWyBsc4LvnubH6yQwF5kp1X6HQQRMnXwCg8vR3y5mq9uXXxReNBidJuRLZl/",
      },
    ],
  },
] as const;

export default function Footer() {
  const t = useTranslations("footer");
  const params = useParams();
  const locale = String(params?.locale ?? "tr");

  function resolveHref(href: string | null): string {
    if (!href) return "/";
    if (href.startsWith("mailto:") || href.startsWith("http")) return href;
    // Section slug or top-level page → path-based URL
    if (SECTION_SLUGS.has(href) || PAGE_SLUGS.has(href)) return `/${locale}/${href}`;
    return href;
  }

  function handleClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string | null,
  ) {
    if (!href) {
      // Coming-soon placeholder — block navigation
      e.preventDefault();
      return;
    }
    if (PAGE_SLUGS.has(href)) {
      // Full page — let the browser navigate normally
      return;
    }
    if (SECTION_SLUGS.has(href)) {
      // Smooth-scroll to section, update URL
      e.preventDefault();
      document.getElementById(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, "", `/${locale}/${href}`);
    }
    // External / mailto links navigate normally
  }

  return (
    <footer
      className="relative border-t border-white/5"
      style={{
        background:
          "radial-gradient(ellipse 70% 80% at 50% 0%, rgba(74,26,107,0.30) 0%, transparent 60%), linear-gradient(180deg, #1a0d33 0%, #110725 100%)",
      }}
    >
      <Container className="py-20">
        <div className="grid gap-12 md:grid-cols-[1.2fr_3fr]">
          <div className="space-y-5">
            <LogoMark size={32} />
            <p className="max-w-xs font-body text-[13.5px] leading-relaxed text-white/45">
              {t("tagline")}
            </p>
            <p className="eyebrow text-white/30">{t("slogan")}</p>
          </div>

          <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
            {COLUMNS.map((col) => (
              <nav key={col.key} aria-label={t(`columns.${col.key}.title`)}>
                <h4 className="eyebrow mb-5 text-white/45">
                  {t(`columns.${col.key}.title`)}
                </h4>
                <ul className="space-y-3">
                  {col.items.map((link) => (
                    <li key={link.key}>
                      <a
                        href={resolveHref(link.href)}
                        onClick={(e) => handleClick(e, link.href)}
                        {...(typeof link.href === "string" && link.href.startsWith("http")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="font-body text-[13px] text-white/65 transition-colors hover:text-[var(--gold)]"
                      >
                        {t(`columns.${col.key}.items.${link.key}`)}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-8 md:flex-row md:items-center">
          <p className="font-label text-[10px] tracking-[0.24em] uppercase text-white/30">
            © {new Date().getFullYear()} WeSafe. {t("rights")}
          </p>
          <div className="flex items-center gap-5">
            <LangSwitcher variant="inline" />
            <span className="h-3 w-px bg-white/10" />
            <a
              href="mailto:info@we-safe.io"
              className="font-label text-[10px] tracking-[0.24em] uppercase text-white/45 transition-colors hover:text-[var(--gold)]"
            >
              info@we-safe.io
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
