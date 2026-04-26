"use client";

/**
 * Network — global stats panel.
 *
 *   No phone, no country ladder with "coming soon" badges.
 *   The hero already showed the world activating; this section
 *   distills that into 3 numbers + a single sentence.
 *
 *   Layout:
 *     • Eyebrow + title (mask-reveal on scroll)
 *     • Body line (scroll-linked fade-in)
 *     • 3 living counters (volunteers · countries · pulse)
 *     • Two ambient nebula layers (always breathing)
 *
 *   Scroll: each piece arrives in sequence, never all at once.
 */

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import RevealText from "@/components/motion/RevealText";
import Counter from "@/components/motion/Counter";
import { sectionIndex } from "@/lib/brand";

type StatRecipe = { to: number; format: (v: number) => string } | null;

const STATS: Array<{ key: "volunteers" | "countries" | "pulse"; value: string; labelKey: string; counter: StatRecipe }> = [
  { key: "volunteers", value: "∞",    labelKey: "stats.volunteers", counter: null }, // ∞ static
  { key: "countries",  value: "190+", labelKey: "stats.countries",  counter: { to: 190, format: (v) => `${v}+` } },
  { key: "pulse",      value: "24/7", labelKey: "stats.pulse",      counter: null }, // 24/7 static
];

export default function NetworkSection() {
  const t = useTranslations("network");
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -60]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.25, 0.7, 1], [0.2, 1, 1, 0.4]);

  return (
    <section
      ref={ref}
      id="network"
      className="relative overflow-hidden py-32 md:py-48"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(74,26,107,0.32) 0%, transparent 65%), linear-gradient(180deg, #1a0d33 0%, #221145 50%, #1a0d33 100%)",
      }}
    >
      {/* Living ambient — never static */}
      <div
        aria-hidden
        className="nebula-a pointer-events-none absolute -left-[10%] top-[10%] h-[55vh] w-[55vh] rounded-full blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(74,26,107,0.55) 0%, transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="nebula-b pointer-events-none absolute -right-[10%] bottom-[5%] h-[55vh] w-[55vh] rounded-full blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(196,181,217,0.35) 0%, transparent 65%)",
        }}
      />

      <Container>
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="mx-auto mb-24 max-w-4xl text-center"
        >
          <Eyebrow index={sectionIndex("network")} className="justify-center">
            {t("eyebrow")}
          </Eyebrow>
          <h2 className="mt-8 display-lg">
            <RevealText text={t("titleA")} trigger="view" />
            <br />
            <RevealText trigger="view" delay={0.15}>
              <span className="italic-accent">{t("titleB")}</span>
            </RevealText>
          </h2>
          <p className="mx-auto mt-8 max-w-xl font-body text-[15px] leading-relaxed text-white/55">
            {t("body")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {STATS.map((s, i) => (
            <StatCard
              key={s.key}
              index={i}
              value={s.value}
              counter={s.counter}
              label={t(s.labelKey)}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

function StatCard({
  index,
  value,
  counter,
  label,
  progress,
}: {
  index: number;
  value: string;
  counter: StatRecipe;
  label: string;
  progress: MotionValue<number>;
}) {
  const start = 0.20 + index * 0.10;
  const opacity = useTransform(
    progress,
    [start - 0.04, start + 0.06],
    [0, 1],
  );
  const y = useTransform(progress, [start - 0.04, start + 0.06], [40, 0]);

  return (
    <motion.div
      style={{
        opacity,
        y,
        boxShadow: "0 30px 80px -40px rgba(74,26,107,0.7)",
        background:
          "linear-gradient(180deg, rgba(74,26,107,0.55) 0%, rgba(45,15,66,0.7) 100%)",
      }}
      className="liquid-glass group relative flex flex-col items-start gap-5 rounded-[1.75rem] px-8 py-10 backdrop-blur-xl md:px-10 md:py-12"
    >
      <span className="block font-display text-[clamp(2.4rem,4vw,3.6rem)] font-light leading-[1.15] text-white">
        {counter ? (
          <Counter
            progress={progress}
            to={counter.to}
            start={start + 0.02}
            end={start + 0.28}
            format={counter.format}
          />
        ) : (
          value
        )}
      </span>
      <span className="font-label text-[10px] font-medium tracking-[0.32em] uppercase text-[var(--gold)]">
        {label}
      </span>
      <span className="absolute inset-x-8 bottom-0 h-px w-0 bg-[var(--gold)]/60 transition-all duration-700 group-hover:w-[calc(100%-4rem)]" />
    </motion.div>
  );
}
