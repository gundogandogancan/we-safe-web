"use client";

import { useEffect, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import LogoMark from "@/components/brand/LogoMark";
import LangSwitcher from "./LangSwitcher";
import { cn } from "@/lib/cn";

const NAV = [
  { section: "mission",  key: "about"    },  // Biz Kimiz
  { section: "download", key: "download" },  // İndir
  { section: "support",  key: "support"  },  // Destek
] as const;

function scrollTo(sectionId: string, locale: string) {
  const el = document.getElementById(sectionId);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  const newPath = sectionId === "hero" ? `/${locale}` : `/${locale}/${sectionId}`;
  history.pushState(null, "", newPath);
}

export default function Navbar() {
  const t = useTranslations("nav");
  const params = useParams();
  const locale = String(params?.locale ?? "tr");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
      e.preventDefault();
      scrollTo(sectionId, locale);
    },
    [locale],
  );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-white/5 bg-[var(--deep)]/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-[1680px] items-center justify-between px-6 py-5 md:px-10 lg:px-16">
        {/* LEFT */}
        <a
          href={`/${locale}`}
          onClick={(e) => handleNav(e, "hero")}
          className="inline-flex"
          aria-label={t("aria.home")}
        >
          <LogoMark />
        </a>

        {/* CENTER */}
        <nav
          className="hidden items-center gap-10 md:flex"
          aria-label={t("aria.primary")}
        >
          {NAV.map((item) => (
            <a
              key={item.key}
              href={`/${locale}/${item.section}`}
              onClick={(e) => handleNav(e, item.section)}
              className="font-label text-[11px] font-medium tracking-[0.24em] uppercase text-white/60 transition-colors hover:text-[var(--gold)]"
            >
              {t(item.key)}
            </a>
          ))}
        </nav>

        {/* RIGHT */}
        <div className="flex items-center gap-5">
          <LangSwitcher variant="compact" className="hidden md:inline-flex" />
        </div>
      </div>
    </header>
  );
}
