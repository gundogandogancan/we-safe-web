"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import LogoMark from "@/components/brand/LogoMark";
import LangSwitcher from "./LangSwitcher";
import { cn } from "@/lib/cn";

const NAV = [
  { href: "#mission",  key: "about"    },  // Biz Kimiz
  { href: "#download", key: "download" },  // İndir
  { href: "#support",  key: "support"  },  // Destek
] as const;

export default function Navbar() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        <a href="#hero" className="inline-flex" aria-label={t("aria.home")}>
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
              href={item.href}
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
