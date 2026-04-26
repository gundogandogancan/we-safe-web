"use client";

/**
 * Minimal language switcher.
 *
 * UX: closed state shows current locale (TR/EN/…); click opens a small
 * panel with all languages. Selection navigates to the same path under
 * the new locale. next-intl writes the NEXT_LOCALE cookie automatically.
 *
 * Two surfaces: `compact` (navbar) and `inline` (footer).
 */

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import {
  LOCALE_LABEL,
  LOCALE_SHORT,
  routing,
  type Locale,
} from "@/i18n/routing";
import { cn } from "@/lib/cn";

export default function LangSwitcher({
  variant = "compact",
  className,
}: {
  variant?: "compact" | "inline";
  className?: string;
}) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const t = useTranslations("nav.aria");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // close on outside click / escape
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (variant === "inline") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        {routing.locales.map((l, i) => (
          <span key={l} className="flex items-center">
            {i > 0 && <span className="mx-2 text-white/20">·</span>}
            <Link
              href={pathname}
              locale={l}
              className={cn(
                "font-label text-[10px] font-semibold tracking-[0.28em] uppercase transition-colors",
                l === locale
                  ? "text-[var(--gold)]"
                  : "text-white/45 hover:text-[var(--gold)]",
              )}
            >
              {LOCALE_SHORT[l]}
            </Link>
          </span>
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        type="button"
        aria-label={t("switchLanguage")}
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 font-label text-[10px] font-semibold tracking-[0.28em] uppercase text-white/60 transition-colors hover:text-[var(--gold)]"
      >
        {LOCALE_SHORT[locale]}
        <svg
          width="8"
          height="8"
          viewBox="0 0 8 8"
          fill="none"
          className={cn("transition-transform", open && "rotate-180")}
          aria-hidden
        >
          <path d="M1 2.5L4 5.5L7 2.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute end-0 mt-3 min-w-[160px] overflow-hidden rounded-xl border border-white/10 bg-[var(--deep)]/95 p-1.5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl"
        >
          {routing.locales.map((l) => (
            <li key={l} role="option" aria-selected={l === locale}>
              <Link
                href={pathname}
                locale={l}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center justify-between gap-4 rounded-lg px-3 py-2 font-body text-[13px] transition-colors",
                  l === locale
                    ? "bg-[var(--gold)]/10 text-[var(--gold)]"
                    : "text-white/70 hover:bg-white/5 hover:text-white",
                )}
              >
                <span>{LOCALE_LABEL[l]}</span>
                <span className="font-label text-[9px] tracking-[0.24em] uppercase text-white/35">
                  {LOCALE_SHORT[l]}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
