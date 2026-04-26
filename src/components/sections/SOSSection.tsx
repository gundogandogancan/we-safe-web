"use client";

import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import PhoneFrame from "@/components/ui/PhoneFrame";
import GlowOrb from "@/components/ui/GlowOrb";
import { sectionIndex } from "@/lib/brand";

interface Step { t: string; label: string; body: string }

export default function SOSSection() {
  const t = useTranslations("sos");
  const steps = t.raw("steps") as Step[];
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // PHONE — EXACT SPEC
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 0.97]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.4]);
  const blur = useTransform(scrollYProgress, [0, 0.2], reduce ? [0, 0] : [6, 0]);
  const phoneFilter = useMotionTemplate`blur(${blur}px)`;

  // AURA scroll-linked intensity
  const auraOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.25, 1, 0.45]);

  // RINGS scroll-linked opacity
  const ringOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  // COPY parallax
  const copyY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -60]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.6]);

  return (
    <section
      ref={ref}
      id="sos"
      className="relative min-h-[160vh] md:h-[240vh] md:min-h-0"
      style={{
        background:
          "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(74,26,107,0.35) 0%, transparent 60%), linear-gradient(180deg, #1a0d33 0%, #221145 50%, #1a0d33 100%)",
      }}
    >
      {/* top bleed-in */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[30vh]"
        style={{
          background:
            "linear-gradient(to top, transparent 0%, rgba(214,69,69,0.08) 60%, rgba(214,69,69,0.14) 100%)",
        }}
      />

      {/* aura — scroll scrubbed */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: auraOpacity,
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(214,69,69,0.22) 0%, transparent 62%), var(--deep)",
        }}
      />

      {/* aura breathing loop */}
      <div
        aria-hidden
        className="aura-breathe pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 35% at 50% 50%, rgba(214,69,69,0.14) 0%, transparent 70%)",
          mixBlendMode: "screen",
        }}
      />

      {/* pinned stage */}
      <div className="relative flex items-center py-24 md:sticky md:top-0 md:h-screen md:overflow-hidden md:py-0">
        <GlowOrb
          className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          color="sos"
          size={760}
          opacity={0.7}
        />

        <Container>
          <div className="grid items-center gap-16 md:grid-cols-[1fr_1.1fr] md:gap-20">
            {/* LEFT — copy + timeline */}
            <motion.div
              style={{ y: copyY, opacity: copyOpacity }}
              className="space-y-8"
            >
              <Eyebrow tone="sos" index={sectionIndex("sos")}>
                {t("eyebrow")}
              </Eyebrow>
              <h2 className="display-lg">
                {t("titleA")}
                <br />
                <span className="italic-accent">{t("titleB")}</span> {t("titleC")}
              </h2>
              <p className="max-w-md font-body text-[15px] leading-relaxed text-white/55">
                {t("body")}
              </p>

              <ol className="mt-8 space-y-4">
                {steps.map((s, i) => (
                  <TimelineItem
                    key={s.t}
                    progress={scrollYProgress}
                    index={i}
                    total={steps.length}
                    step={s}
                  />
                ))}
              </ol>
            </motion.div>

            {/* RIGHT — phone */}
            <div className="relative flex items-center justify-center">
              {/* pulse rings — scroll-linked opacity */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
                style={{ opacity: ringOpacity }}
              >
                <span
                  className="sos-ring absolute rounded-full border border-[var(--sos)]/55"
                  style={{ width: 380, height: 380 }}
                />
                <span
                  className="sos-ring absolute rounded-full border border-[var(--sos)]/45"
                  style={{ width: 380, height: 380, animationDelay: "0.7s" }}
                />
                <span
                  className="sos-ring absolute rounded-full border border-[var(--sos)]/35"
                  style={{ width: 380, height: 380, animationDelay: "1.4s" }}
                />
                <span
                  className="sos-ring absolute rounded-full border border-[var(--sos)]/25"
                  style={{ width: 380, height: 380, animationDelay: "2.1s" }}
                />
              </motion.div>

              {/* persistent halo */}
              <div
                aria-hidden
                className="aura-breathe pointer-events-none absolute h-[440px] w-[440px] rounded-full blur-[90px]"
                style={{
                  background:
                    "radial-gradient(circle, rgba(214,69,69,0.45) 0%, transparent 70%)",
                }}
              />

              {/* ★ PHONE — EXACT motion spec */}
              <PhoneFrame
                src="/screenshots/sos-active.png"
                alt={t("alt")}
                caption={t("caption")}
                halo="sos"
                width={340}
                style={{ scale, opacity, filter: phoneFilter }}
              />
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

function TimelineItem({
  progress,
  index,
  total,
  step,
}: {
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  index: number;
  total: number;
  step: { t: string; label: string; body: string };
}) {
  const lead = 0.2;
  const trail = 0.08;
  const span = (1 - lead - trail) / total;
  const start = lead + index * span;
  const end = start + span;

  const opacity = useTransform(
    progress,
    [Math.max(0, start - 0.04), start, end, Math.min(1, end + 0.06)],
    [0.2, 1, 1, 0.3],
  );
  const x = useTransform(
    progress,
    [Math.max(0, start - 0.06), start],
    [-24, 0],
  );
  const scale = useTransform(
    progress,
    [Math.max(0, start - 0.04), start, end, Math.min(1, end + 0.06)],
    [0.96, 1, 1, 0.99],
  );

  return (
    <motion.li
      style={{ opacity, x, scale }}
      className="flex items-start gap-5 border-t border-white/5 pt-4"
    >
      <span className="font-label text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--sos)]">
        {step.t}
      </span>
      <div>
        <p className="font-body text-[14px] font-medium text-white">{step.label}</p>
        <p className="font-body text-[13px] text-white/45">{step.body}</p>
      </div>
      <span className="ms-auto font-label text-[10px] tracking-[0.2em] uppercase text-white/25">
        {String(index + 1).padStart(2, "0")}
      </span>
    </motion.li>
  );
}

