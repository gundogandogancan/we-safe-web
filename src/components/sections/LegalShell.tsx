/**
 * LegalShell — shared layout for /privacy, /terms, /support.
 *
 * Apex-mode features:
 *   - Anchor IDs on every section so press, marketing, and the iOS app
 *     can deep-link to /privacy#section-2-personal-data-collected.
 *   - Right-rail Table of Contents on desktop (sticky, current-section
 *     indicator on scroll).
 *   - Framer Motion entrance: blocks fade up at the same cadence as the
 *     homepage hero (y: 24→0, opacity 0→1, stagger 60ms).
 *   - Inline Markdown-lite (bold + bullet + h3 + email linkify).
 *   - Server component shell + Client child for animations — keeps the
 *     legal text in the static HTML for SEO crawlers.
 */

"use client";

import Container from "@/components/ui/Container";
import LogoMark from "@/components/brand/LogoMark";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

interface Section {
  title: string;
  body: string;
}

interface LegalShellProps {
  locale: string;
  eyebrow: string;
  title: string;
  lastUpdated?: string;
  sections: Section[];
  children?: React.ReactNode;
}

/** Slugify an h2 so it becomes a stable anchor id. */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // strip diacritics (ü → u, ç → c)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function LegalShell({
  locale,
  eyebrow,
  title,
  lastUpdated,
  sections,
  children,
}: LegalShellProps) {
  const reduceMotion = useReducedMotion();
  const tocItems = useMemo(
    () => sections.map((s) => ({ id: slugify(s.title), title: s.title })),
    [sections],
  );

  const [activeId, setActiveId] = useState<string | null>(tocItems[0]?.id ?? null);

  useEffect(() => {
    if (typeof window === "undefined" || tocItems.length === 0) return;
    const observers = tocItems
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (observers.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px" },
    );
    observers.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [tocItems]);

  const baseTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <article
      className="relative min-h-screen pb-32 pt-12 md:pt-16"
      style={{
        background:
          "radial-gradient(ellipse 90% 60% at 50% 0%, rgba(74,26,107,0.32) 0%, transparent 60%), linear-gradient(180deg, #1a0d33 0%, #221145 50%, #1a0d33 100%)",
      }}
    >
      <Container size="lg">
        {/* Top bar: logo + back link */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={baseTransition}
          className="mb-12 flex items-center justify-between"
        >
          <Link href={`/${locale}`} aria-label="Home" className="block">
            <LogoMark size={32} />
          </Link>
          <Link
            href={`/${locale}`}
            className="font-body inline-flex items-center gap-1 text-[13px] text-white/55 transition-colors hover:text-[var(--gold)]"
          >
            <ChevronLeft size={14} aria-hidden />
            {locale === "tr" ? "Ana Sayfa" : locale === "es" ? "Inicio" : "Home"}
          </Link>
        </motion.div>

        {/* Two-column on lg+, single column below */}
        <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
          {/* Main column */}
          <div className="max-w-[680px]">
            <motion.header
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...baseTransition, delay: reduceMotion ? 0 : 0.08 }}
              className="mb-14 border-b border-white/8 pb-12"
            >
              <p className="eyebrow mb-3 text-white/40">{eyebrow}</p>
              <h1 className="font-display text-[clamp(2.25rem,4.5vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.01em] text-[var(--cream)]">
                {title}
              </h1>
              {lastUpdated && (
                <p className="mt-3 font-body text-[13px] text-white/50">
                  {lastUpdated}
                </p>
              )}
            </motion.header>

            <div className="space-y-12">
              {sections.map((section, idx) => {
                const id = tocItems[idx].id;
                return (
                  <motion.section
                    key={id}
                    id={id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                      ...baseTransition,
                      delay: reduceMotion ? 0 : Math.min(idx * 0.05, 0.3),
                    }}
                    className="scroll-mt-32"
                  >
                    <h2 className="font-display mb-4 text-[1.5rem] font-medium tracking-[-0.005em] text-[var(--lavender)]">
                      <a
                        href={`#${id}`}
                        className="group relative inline-block"
                        aria-label={`Link to ${section.title}`}
                      >
                        {section.title}
                        <span
                          aria-hidden
                          className="ml-2 inline-block text-[var(--gold)]/0 transition-opacity group-hover:text-[var(--gold)]/70 group-hover:opacity-100"
                        >
                          #
                        </span>
                      </a>
                    </h2>
                    <Markdown text={section.body} />
                  </motion.section>
                );
              })}
            </div>

            {children && <div className="mt-16">{children}</div>}
          </div>

          {/* Sticky Table of Contents (desktop only) */}
          {tocItems.length > 3 && (
            <aside className="hidden lg:block">
              <div className="sticky top-32 max-h-[calc(100vh-10rem)] overflow-y-auto pr-2">
                <p className="eyebrow mb-4 text-white/35">
                  {locale === "tr" ? "İçindekiler" : locale === "es" ? "Contenido" : "Contents"}
                </p>
                <nav>
                  <ul className="space-y-2">
                    {tocItems.map(({ id, title: t }) => (
                      <li key={id}>
                        <a
                          href={`#${id}`}
                          className={`block font-body text-[12.5px] leading-snug transition-colors ${
                            activeId === id
                              ? "text-[var(--gold)]"
                              : "text-white/45 hover:text-white/80"
                          }`}
                        >
                          {t}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>
          )}
        </div>
      </Container>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Markdown-lite renderer
// ─────────────────────────────────────────────────────────────────────────

function Markdown({ text }: { text: string }) {
  const blocks = text.split(/\n\n+/).map((b) => b.trim()).filter(Boolean);
  return (
    <div className="font-body space-y-4 text-[15px] leading-relaxed text-white/75">
      {blocks.map((block, i) => {
        if (block.startsWith("### ")) {
          return (
            <h3
              key={i}
              className="font-display pt-2 text-[1.1rem] font-medium text-[var(--cream)]/90"
            >
              {block.slice(4)}
            </h3>
          );
        }
        if (block.split("\n").every((l) => l.startsWith("- "))) {
          return (
            <ul key={i} className="list-disc space-y-2 pl-5 marker:text-[var(--gold)]/60">
              {block.split("\n").map((line, j) => (
                <li key={j}>{renderInline(line.slice(2))}</li>
              ))}
            </ul>
          );
        }
        return <p key={i}>{renderInline(block)}</p>;
      })}
    </div>
  );
}

function renderInline(text: string): React.ReactNode {
  const boldParts = text.split(/(\*\*[^*]+\*\*)/g);
  return boldParts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-medium text-[var(--cream)]">
          {linkifyEmails(part.slice(2, -2))}
        </strong>
      );
    }
    return <span key={i}>{linkifyEmails(part)}</span>;
  });
}

function linkifyEmails(text: string): React.ReactNode {
  const re = /([A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,})/g;
  const parts = text.split(re);
  return parts.map((part, i) => {
    if (re.test(part)) {
      re.lastIndex = 0;
      return (
        <a
          key={i}
          href={`mailto:${part}`}
          className="text-[var(--gold)] underline underline-offset-2 transition-opacity hover:opacity-80"
        >
          {part}
        </a>
      );
    }
    return <span key={i}>{part}</span>;
  });
}
