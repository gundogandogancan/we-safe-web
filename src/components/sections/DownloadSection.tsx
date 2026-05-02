"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionTemplate,
} from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import GlowOrb from "@/components/ui/GlowOrb";
import { sectionIndex } from "@/lib/brand";

export default function DownloadSection() {
  const t = useTranslations("download");
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [80, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const storesY = useTransform(scrollYProgress, [0.3, 1], reduce ? [0, 0] : [40, 0]);
  const storesOpacity = useTransform(scrollYProgress, [0.3, 0.7], [0, 1]);
  const orbScale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);
  const orbOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.9, 0.7]);
  const sloganTrack = useTransform(scrollYProgress, [0.6, 1], ["0.6em", "0.34em"]);
  const sloganLetterSpacing = useMotionTemplate`${sloganTrack}`;
  const sloganOpacity = useTransform(scrollYProgress, [0.6, 0.9], [0, 1]);

  return (
    <section
      ref={ref}
      id="download"
      className="relative overflow-hidden py-40 md:py-64"
      style={{
        background:
          "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(74,26,107,0.40) 0%, transparent 60%), linear-gradient(180deg, #1a0d33 0%, #221145 50%, #1a0d33 100%)",
      }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ scale: orbScale, opacity: orbOpacity }}
      >
        <GlowOrb color="royal" size={900} opacity={0.9} />
      </motion.div>
      <GlowOrb className="right-[-20%] bottom-0" color="lavender" size={600} opacity={0.5} />

      <Container size="md">
        <div className="flex flex-col items-center text-center">
          <motion.div
            style={{ y: titleY, opacity: titleOpacity }}
            className="flex flex-col items-center"
          >
            <Eyebrow index={sectionIndex("download")} className="justify-center">
              {t("eyebrow")}
            </Eyebrow>
            <h2 className="mt-12 display-xl">
              {t("titleA")}
              <br />
              <span className="italic-accent">{t("titleB")}</span>
            </h2>
            <p className="mx-auto mt-12 max-w-lg font-body text-[15px] leading-relaxed text-white/55">
              {t("body")}
            </p>
          </motion.div>

          <motion.div
            style={{ y: storesY, opacity: storesOpacity }}
            className="mt-16 flex flex-col items-center gap-4 sm:flex-row"
          >
            <StoreButton
              platform="ios"
              pre={t("store.iosPre")}
              label={t("store.iosLabel")}
            />
            <StoreButton
              platform="android"
              pre={t("store.androidPre")}
              label={t("store.androidLabel")}
            />
          </motion.div>

          <div className="mx-auto mt-28 h-px w-24 bg-gradient-to-r from-transparent via-[var(--gold)]/50 to-transparent" />

          <motion.p
            style={{
              letterSpacing: sloganLetterSpacing,
              opacity: sloganOpacity,
            }}
            className="mt-10 font-label text-[11px] font-medium uppercase text-white/45"
          >
            {t("closingSlogan")}
          </motion.p>
        </div>
      </Container>
    </section>
  );
}

function StoreButton({
  platform,
  pre,
  label,
}: {
  platform: "ios" | "android";
  pre: string;
  label: string;
  soon?: string;
}) {
  const isIos = platform === "ios";

  // Solid brand wash (padding-box). The liquid-glass class adds the
  // animated conic halo + glossy sheen on top.
  const cardBg = isIos
    ? "linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(201,169,110,0.30) 50%, rgba(74,26,107,0.55) 100%)"
    : "linear-gradient(135deg, rgba(0,196,255,0.32) 0%, rgba(255,58,68,0.26) 50%, rgba(0,176,111,0.36) 100%)";

  return (
    <a
      href="/"
      onClick={(e) => e.preventDefault()}
      className="liquid-glass group relative flex min-w-[260px] items-center gap-4 rounded-3xl px-6 py-4 transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02]"
      style={{
        background: cardBg,
        boxShadow: isIos
          ? "0 20px 60px -25px rgba(255,255,255,0.40), 0 10px 40px -20px rgba(201,169,110,0.55)"
          : "0 20px 60px -25px rgba(0,196,255,0.55), 0 10px 40px -20px rgba(255,58,68,0.45)",
      }}
    >
      <span
        className="relative z-[2] flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.22] backdrop-blur-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-6deg]"
        style={{
          boxShadow:
            "inset 0 1px 1px rgba(255,255,255,0.35), 0 4px 12px rgba(0,0,0,0.3)",
        }}
      >
        {isIos ? <AppleMark /> : <PlayMark />}
      </span>

      <span className="relative z-[2] text-start">
        <span className="block font-label text-[10px] tracking-[0.18em] uppercase text-white/85">
          {pre}
        </span>
        <span className="block font-body text-[18px] font-semibold leading-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
          {label}
        </span>
      </span>

      <span
        aria-hidden
        className="relative z-[2] ms-auto text-lg text-white/80 transition-all duration-500 group-hover:translate-x-1.5 group-hover:text-[var(--gold)]"
      >
        →
      </span>
    </a>
  );
}

/** Apple logo — official path, white, with subtle inner glow. */
function AppleMark() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-white"
      style={{
        filter:
          "drop-shadow(0 0 4px rgba(255,255,255,0.4)) drop-shadow(0 0 10px rgba(201,169,110,0.25))",
      }}
      aria-hidden
    >
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

/** Google Play logo — colored triangular play, official palette + glow. */
function PlayMark() {
  return (
    <svg
      width="26"
      height="28"
      viewBox="0 0 24 26"
      aria-hidden
      style={{
        filter:
          "drop-shadow(0 0 6px rgba(0,196,255,0.35)) drop-shadow(0 0 12px rgba(255,58,68,0.2))",
      }}
    >
      <defs>
        <linearGradient id="play-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00C4FF" />
          <stop offset="100%" stopColor="#1976D2" />
        </linearGradient>
        <linearGradient id="play-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FF3A44" />
          <stop offset="100%" stopColor="#C31162" />
        </linearGradient>
        <linearGradient id="play-yellow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFEA00" />
          <stop offset="100%" stopColor="#FF9500" />
        </linearGradient>
        <linearGradient id="play-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00F076" />
          <stop offset="100%" stopColor="#00B36F" />
        </linearGradient>
      </defs>
      <path d="M1.6 1.4 13.7 13 1.6 24.6c-.4-.3-.6-.8-.6-1.4V2.8c0-.6.2-1.1.6-1.4z" fill="url(#play-blue)" />
      <path d="M17.4 9.2 13.7 13l3.7 3.8 4.4-2.6c.9-.5.9-1.9 0-2.4l-4.4-2.6z" fill="url(#play-yellow)" />
      <path d="M1.6 1.4c.5-.4 1.2-.4 1.8-.1L17.4 9.2 13.7 13 1.6 1.4z" fill="url(#play-green)" />
      <path d="M1.6 24.6 13.7 13l3.7 3.8L3.4 24.7c-.6.3-1.3.3-1.8-.1z" fill="url(#play-red)" />
    </svg>
  );
}
