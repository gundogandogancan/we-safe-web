/**
 * WeSafe — named asset slots.
 *
 * Only these filenames are read by the site. Drop the final exports
 * under /public/screenshots and /public/cinematic using the names below.
 *
 *   Screenshots
 *     3 anchors drive the cinematic hierarchy:
 *       globe-home      → NetworkSection hero visual
 *       sos-countdown   → SOSSection hero visual
 *       map-user-card   → ReportingSection hero visual
 *     Supporting cast appears in smaller / decorative contexts.
 *
 *   Cinematic
 *     hero video + poster for HeroSection
 *     map.jpg — satellite / night render behind ReportingSection
 *     globe-network.jpg — optional ambient layer for NetworkSection
 */

const SHOTS = "/screenshots";
const CINE = "/cinematic";

export const SCREENSHOT = {
  // ── 3 ANCHORS ──────────────────────────────
  globeHome:    `${SHOTS}/globe-home.png`,
  sosCountdown: `${SHOTS}/sos-countdown.png`,
  mapUserCard:  `${SHOTS}/map-user-card.png`,

  // ── SUPPORTING CAST ────────────────────────
  volunteers: `${SHOTS}/volunteers.png`,
  reporting:  `${SHOTS}/reporting.png`,
  about:      `${SHOTS}/about.png`,
  sosActive:  `${SHOTS}/sos-active.png`,
  profile:    `${SHOTS}/profile.png`,
} as const;

export type ScreenshotSlot = keyof typeof SCREENSHOT;

export const CINEMATIC = {
  /** Hero backdrop video (10s loop, muted, cinematic). */
  heroVideo: `${CINE}/hero.mp4`,
  /** Hero backdrop still — shown as poster until video plays, and as
   *  the permanent backdrop on reduced-motion / save-data. */
  heroPoster: `${CINE}/hero.jpg`,
  /** Satellite / night render behind ReportingSection. */
  map: `${CINE}/map.jpg`,
  /** Optional purple globe with network lines — NetworkSection ambient. */
  globeNetwork: `${CINE}/globe-network.jpg`,
} as const;
