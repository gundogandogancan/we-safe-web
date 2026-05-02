"use client";

/**
 * SectionTracker — watches scroll position and updates the browser URL
 * with the active section slug using history.replaceState (no navigation).
 *
 * URL scheme:
 *   /{locale}           → hero (top of page)
 *   /{locale}/problem   → Problem section
 *   /{locale}/mission   → Mission section
 *   … etc.
 */

import { useEffect } from "react";
import { useParams } from "next/navigation";

const SECTIONS = [
  "hero",
  "problem",
  "mission",
  "network",
  "sos",
  "reporting",
  "volunteer",
  "support",
  "download",
] as const;

function getActiveSection(): string {
  // A section is "active" when its top edge has scrolled above the upper-35%
  // line of the viewport. We keep the last (furthest-down) qualifying section,
  // which is the one the user is currently reading.
  const threshold = window.innerHeight * 0.35;
  let active = "hero";

  for (const id of SECTIONS) {
    const el = document.getElementById(id);
    if (!el) continue;
    if (el.getBoundingClientRect().top <= threshold) {
      active = id;
    }
  }
  return active;
}

export default function SectionTracker() {
  const params = useParams();
  const locale = String(params?.locale ?? "tr");

  useEffect(() => {
    let ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const active = getActiveSection();
        const newPath =
          active === "hero" ? `/${locale}` : `/${locale}/${active}`;
        if (window.location.pathname !== newPath) {
          history.replaceState(null, "", newPath);
        }
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    // Run once after mount so the URL is correct if the page was loaded
    // at a scrolled position (e.g. browser scroll-restoration).
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [locale]);

  return null;
}
