"use client";

/**
 * GlobalActivationHero
 * ─────────────────────
 * Scroll-driven activation of a global safety network.
 *
 * 300vh section, sticky h-screen stage. As scroll progresses, ~480
 * WeSafe user pins ignite across the continents in an exponential
 * cascade, mirroring the in-app marker (purple disc + gold emblem
 * on a violet halo).
 *
 * Why this is built without per-pin motion components:
 *   480 × <motion.div> + <motion.span> stresses framer-motion +
 *   Turbopack and triggers a "Type error" in the animate path.
 *   Instead, every pin is a plain DOM node whose ignition is driven
 *   by a single CSS custom property (--p, the global scroll progress).
 *   A scoped <style> block uses --p to interpolate opacity and scale
 *   on each pin via animation-delay → no per-element JS, no thrash.
 *
 * Pulse ring + halo are CSS keyframe loops that run forever — once a
 * pin is opacity-1 it pulses on its own. The ignition snap comes from
 * a "ignite" keyframe whose delay equals (pin.delay × -8s), which makes
 * each pin start its 0.4s reveal at a different point along an 8s
 * timeline that is itself controlled by --p.
 */

import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useMemo, useRef } from "react";
import { useTranslations } from "next-intl";
import { WORLD_CITIES } from "@/lib/world-cities";

/* ─────── continent zones (% of earth container, weighted)
   Tightened to land only — small rectangles inside continents,
   avoiding Mediterranean, Caspian, Red Sea, Atlantic, Indian Ocean, etc.
   Earth on hero.jpg is centered: cx=50, cy=50, radius≈36% so we also
   filter pins that fall outside this disc.
─────────────────────────────────────────────────────────────── */
// Pins now come from WORLD_CITIES (hand-placed land coordinates).

/** Return true when (x,y) sits comfortably inside the Earth silhouette.
 *  Measured directly against the rendered hero.jpg:
 *    cx ≈ 50, cy ≈ 50  (the globe is centered)
 *    visible radius ≈ 24% of the container short side
 *  We use 23 to leave a safety margin so even pins with a halo stay
 *  fully inside the globe outline. */
const EARTH_CX = 50;
const EARTH_CY = 50;
const EARTH_R = 23;

function isOnEarth(x: number, y: number) {
  const dx = x - EARTH_CX;
  const dy = y - EARTH_CY;
  return Math.sqrt(dx * dx + dy * dy) < EARTH_R;
}

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Pin {
  x: number;
  y: number;
  size: "sm" | "md" | "lg";
  delay: number; // 0–1
}

// pin count = filtered WORLD_CITIES length (≈240)

/**
 * Build pins from the curated WORLD_CITIES list.
 * Order is randomised once (deterministic seed), then each city gets a
 * delay along an exponential curve so the cascade still feels natural.
 *
 * Tunceli + İstanbul ride at the very front no matter what.
 */
function buildPins(): Pin[] {
  const rng = mulberry32(7);

  // Filter to only cities that survive the disc test (defence in depth).
  const valid = WORLD_CITIES.filter((c) => isOnEarth(c.x, c.y));

  // Shuffle deterministically so the activation order is varied.
  const shuffled = [...valid];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  const pins: Pin[] = [];

  // ★ The first signals — Tunceli, then İstanbul.
  pins.push({ x: 57.8, y: 41.2, size: "lg", delay: 0.015 });
  pins.push({ x: 55.0, y: 40.6, size: "md", delay: 0.030 });

  shuffled.forEach((c, idx) => {
    // skip duplicates of the seed pins
    if (Math.abs(c.x - 57.8) < 0.4 && Math.abs(c.y - 41.2) < 0.4) return;
    if (Math.abs(c.x - 55.0) < 0.4 && Math.abs(c.y - 40.6) < 0.4) return;

    const t = idx / shuffled.length;
    const curved = Math.pow(t, 1.6);
    const delay = Math.min(0.92, 0.05 + curved * 0.85);

    const r = rng();
    const size: Pin["size"] = r > 0.96 ? "lg" : r > 0.82 ? "md" : "sm";

    pins.push({ x: c.x, y: c.y, size, delay });
  });

  return pins;
}

const SIZE_PX: Record<Pin["size"], { disc: number; emblem: number; halo: number }> = {
  lg: { disc: 22, emblem: 14, halo: 60 },
  md: { disc: 14, emblem: 9,  halo: 38 },
  sm: { disc: 9,  emblem: 6,  halo: 26 },
};

export default function GlobalActivationHero() {
  const t = useTranslations("hero");
  const tc = useTranslations("common");
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Earth parallax
  const earthScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.0, 1.1]);
  const earthY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -40]);

  // Text stages — PINS FIRST, words later.
  //   0.00 – 0.55  pins ignite alone (no copy)
  //   0.55 – 0.70  "A safety network is growing"
  //   0.70 – 0.85  "Across every city"
  //   0.85 – 1.00  "Birlikte Daha Güvendeyiz" (the headline) settles in
  const s1Opacity = useTransform(scrollYProgress, [0.85, 0.92, 0.98, 1], [0, 1, 1, 1]);
  const s1Y = useTransform(scrollYProgress, [0.85, 1], reduce ? [0, 0] : [24, 0]);
  const s2Opacity = useTransform(scrollYProgress, [0.55, 0.62, 0.68, 0.75], [0, 1, 1, 0]);
  const s2Y = useTransform(scrollYProgress, [0.55, 0.75], reduce ? [0, 0] : [20, -20]);
  const s3Opacity = useTransform(scrollYProgress, [0.7, 0.76, 0.82, 0.88], [0, 1, 1, 0]);
  const s3Y = useTransform(scrollYProgress, [0.7, 0.88], reduce ? [0, 0] : [20, -20]);
  const s4Opacity = useTransform(scrollYProgress, [0, 0], [0, 0]); // unused now
  const s4Y = useTransform(scrollYProgress, [0, 1], [0, 0]);
  void s4Opacity;
  void s4Y;

  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const dissolve = useTransform(scrollYProgress, [0.95, 1], [0, 1]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.4, 0.25]);

  // Drive a CSS variable with scrollYProgress so all 480 pins read it.
  const progressVar = useMotionTemplate`${scrollYProgress}`;

  const pins = useMemo(buildPins, []);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative"
      style={{
        height: "300vh",
        // Brand-aligned base: deepest violet, never pure black.
        background:
          "radial-gradient(ellipse 80% 60% at 50% 50%, #1a0833 0%, #0c041a 55%, #050108 100%)",
      }}
    >
      <motion.div
        className="sticky top-0 flex h-screen items-center justify-center overflow-hidden"
        style={{
          ["--p" as string]: progressVar,
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(74,26,107,0.30) 0%, rgba(45,15,66,0.45) 45%, rgba(11,5,20,0.95) 100%)",
        }}
      >
        {/* ── L0 STARFIELD (always alive) ── */}
        <Starfield />

        {/* ── L1 NEBULA AMBIENT (always drifting & breathing) ── */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="nebula-a absolute -left-[15%] top-[-5%] h-[70vh] w-[70vh] rounded-full blur-[140px]"
            style={{
              background:
                "radial-gradient(circle, rgba(74,26,107,0.65) 0%, transparent 65%)",
            }}
          />
          <div
            className="nebula-b absolute -right-[10%] bottom-[-10%] h-[65vh] w-[65vh] rounded-full blur-[140px]"
            style={{
              background:
                "radial-gradient(circle, rgba(196,181,217,0.45) 0%, transparent 65%)",
            }}
          />
          <div
            className="nebula-a absolute left-[20%] bottom-[5%] h-[40vh] w-[40vh] rounded-full blur-[120px]"
            style={{
              animationDelay: "-7s",
              background:
                "radial-gradient(circle, rgba(201,169,110,0.30) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* ── L2 EARTH (perpetual subtle breath + scroll parallax) ── */}
        <motion.div
          className="absolute inset-0"
          style={{ scale: earthScale, y: earthY }}
        >
          <div className="earth-breathe absolute inset-0">
            <Image
              src="/cinematic/earth.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
          {/* Soft violet wash on top of Earth — kills pure black, lifts brand. */}
          <motion.div
            aria-hidden
            className="absolute inset-0"
            style={{
              opacity: overlayOpacity,
              background:
                "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(45,15,66,0.55) 0%, rgba(11,5,20,0.85) 100%)",
              mixBlendMode: "multiply",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 55%, rgba(11,5,20,0.85) 100%)",
            }}
          />

          {/* PINS — pure DOM, ignition driven by CSS var --p */}
          <div className="absolute inset-0">
            {pins.map((pin, i) => (
              <PinNode key={i} pin={pin} />
            ))}
          </div>
        </motion.div>

        {/* ── TEXT STAGES ── */}
        <div className="pointer-events-none absolute inset-x-0 top-[15vh] z-10 flex flex-col items-center px-6 text-center">
          <motion.h1
            style={{ opacity: s1Opacity, y: s1Y }}
            className="display-xl"
          >
            {t("titleA")}
            <br />
            <span className="italic-accent">{t("titleB")}</span> {t("titleC")}
          </motion.h1>

          <motion.h2
            style={{ opacity: s2Opacity, y: s2Y }}
            className="absolute left-1/2 top-0 -translate-x-1/2 display-lg whitespace-nowrap"
          >
            <span className="italic-accent">{t("growingA")}</span> {t("growingB")}
          </motion.h2>

          <motion.h2
            style={{ opacity: s3Opacity, y: s3Y }}
            className="absolute left-1/2 top-0 -translate-x-1/2 display-lg whitespace-nowrap"
          >
            {t("everyCityA")} <span className="italic-accent">{t("everyCityB")}</span>
          </motion.h2>
        </div>

        {/* scroll hint */}
        <motion.div
          style={{ opacity: scrollHintOpacity }}
          className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
        >
          <span className="font-label text-[9px] tracking-[0.36em] uppercase text-white/55">
            {tc("scroll")}
          </span>
          <span className="block h-10 w-px bg-gradient-to-b from-[var(--gold)]/70 to-transparent" />
        </motion.div>

        {/* dissolve */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[40vh]"
          style={{
            opacity: dissolve,
            background:
              "linear-gradient(to top, var(--deep) 0%, rgba(11,5,20,0.9) 45%, transparent 100%)",
          }}
        />
      </motion.div>
    </section>
  );
}

/* ─────────────── Starfield ───────────────
   ~140 tiny stars distributed across the viewport, each twinkling on
   its own delay. Pure CSS, runs forever — keeps the void alive. */

const STARS = (() => {
  const rng = mulberry32(91);
  return Array.from({ length: 140 }, () => ({
    x: rng() * 100,
    y: rng() * 100,
    size: 0.8 + rng() * 1.6,
    delay: rng() * 4,
    duration: 3 + rng() * 4,
  }));
})();

function Starfield() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-20">
      {STARS.map((s, i) => (
        <span
          key={i}
          className="star-twinkle absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            animationDelay: `-${s.delay}s`,
            animationDuration: `${s.duration}s`,
            boxShadow: "0 0 4px rgba(255,255,255,0.6)",
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────── PinNode (plain DOM) ───────────────
   Visual = exact in-app user marker:
     • outer halo (violet glow)
     • inner disc (radial purple gradient)
     • gold WeSafe emblem (logo-emblem.png)
     • pulse ring (CSS keyframe)
   Ignition is driven by CSS:
     opacity & scale interpolate against --p (scroll progress)
     using a tiny inline style trick:
        opacity = clamp((--p − delay) × 12, 0, 1)
        scale   = 0.2 + opacity × 0.8
   No JS per frame. No motion components per pin.
─────────────────────────────────────────────────────── */

function PinNode({ pin }: { pin: Pin }) {
  const dims = SIZE_PX[pin.size];

  // Fluent CSS expressions read --p (the scroll progress) live.
  // (--p − delay) × 12 → 0..1 over a ~0.083 progress window
  const opacityExpr = `clamp(0, calc((var(--p) - ${pin.delay}) * 12), 1)`;
  const scaleExpr = `calc(0.2 + ${opacityExpr} * 0.8)`;

  return (
    <div
      className="absolute"
      style={{
        left: `${pin.x}%`,
        top: `${pin.y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        className="relative flex items-center justify-center"
        style={{
          opacity: opacityExpr,
          transform: `scale(${scaleExpr})`,
          willChange: "opacity, transform",
        }}
      >
        {/* CSS pulse ring (always running; only visible because parent opacity gates it) */}
        <span
          aria-hidden
          className="pin-pulse absolute rounded-full"
          style={{
            width: dims.disc + 8,
            height: dims.disc + 8,
            border: "1px solid rgba(196,181,217,0.85)",
          }}
        />

        {/* breathing halo */}
        <span
          aria-hidden
          className="pin-breathe absolute rounded-full"
          style={{
            width: dims.halo,
            height: dims.halo,
            background:
              "radial-gradient(circle, rgba(74,26,107,0.7) 0%, rgba(74,26,107,0.25) 40%, transparent 75%)",
          }}
        />

        {/* purple disc */}
        <span
          className="relative flex items-center justify-center overflow-hidden rounded-full"
          style={{
            width: dims.disc,
            height: dims.disc,
            background:
              "radial-gradient(circle at 35% 30%, #6a2fa0 0%, #3d1664 55%, #1c0734 100%)",
            boxShadow:
              "0 0 8px rgba(74,26,107,0.95), inset 0 1px 1px rgba(255,255,255,0.18)",
          }}
        >
          <Image
            src="/logo-emblem.png"
            alt=""
            width={dims.emblem}
            height={dims.emblem}
            unoptimized
            style={{
              filter:
                "drop-shadow(0 0 2px rgba(201,169,110,0.95)) drop-shadow(0 0 6px rgba(201,169,110,0.4))",
            }}
          />
        </span>
      </div>
    </div>
  );
}
