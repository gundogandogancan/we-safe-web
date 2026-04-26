/**
 * WeSafe Brand Tokens
 * Single source of truth for color, spacing, motion.
 * CSS variables mirror these in globals.css.
 */

export const brand = {
  color: {
    void: "#050208",       // absolute base
    deep: "#0b0514",       // primary bg
    violet: "#170826",     // secondary bg
    royal: "#4A1A6B",      // primary purple
    plum: "#2D0F42",       // deeper purple
    gold: "#C9A96E",       // rose gold accent
    lavender: "#C4B5D9",   // soft purple
    cream: "#F5F0E8",      // warm white
    sos: "#D64545",        // ONLY for SOS elements
    active: "#35C28A",     // online / active status
    ink: "#E8DFF2",        // body text on dark
    muted: "rgba(232,223,242,0.55)",
    line: "rgba(201,169,110,0.18)",
  },
  font: {
    display: "var(--font-display)",
    body: "var(--font-body)",
    label: "var(--font-label)",
  },
  motion: {
    ease: [0.22, 1, 0.36, 1] as const,
    easeSmooth: [0.65, 0, 0.35, 1] as const,
    durFast: 0.4,
    durBase: 0.8,
    durSlow: 1.2,
  },
} as const;

/**
 * Section IDs — drive the page anchors + Navbar + Eyebrow indices.
 * Order matches the cinematic hierarchy:
 *   hero → problem → mission → network → sos → reporting →
 *   volunteer → support → download
 */
export const SECTION_ORDER = [
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

export type SectionId = (typeof SECTION_ORDER)[number];

/** "02 / 09" style index for eyebrows. Hero is 01. */
export function sectionIndex(id: SectionId): string {
  const i = SECTION_ORDER.indexOf(id) + 1;
  const total = SECTION_ORDER.length;
  return `${String(i).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
}
