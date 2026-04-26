"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import GlowOrb from "@/components/ui/GlowOrb";
import Counter from "@/components/motion/Counter";
import { sectionIndex } from "@/lib/brand";

interface Figure { value: string; label: string }

/** Per-row scroll-counter recipes. null = static (no scrub). */
type CounterRecipe = { to: number; format: (v: number) => string } | null;
const COUNTERS: CounterRecipe[] = [
  null, // "1 / 3" — fraction, no animation
  { to: 736, format: (v) => `${v}M` },
  { to: 190, format: (v) => `${v}+` },
];

export default function ProblemSection() {
  const t = useTranslations("problem");
  const figures = t.raw("figures") as Figure[];
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [80, -60]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.12, 0.28, 0.72, 1], [0, 0.5, 1, 1, 0.3]);
  const figuresY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-40, 40]);
  const orbOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 0.25]);

  return (
    <section
      ref={ref}
      id="problem"
      className="relative overflow-hidden py-32 md:py-48"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 30% 30%, rgba(74,26,107,0.35) 0%, transparent 60%), radial-gradient(ellipse 70% 60% at 80% 80%, rgba(45,15,66,0.5) 0%, transparent 65%), linear-gradient(180deg, #221145 0%, #1a0d33 100%)",
      }}
    >
      {/* Living ambient — never static */}
      <div
        aria-hidden
        className="nebula-a pointer-events-none absolute -left-[10%] top-[10%] h-[60vh] w-[60vh] rounded-full blur-[140px]"
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

      <motion.div
        aria-hidden
        className="absolute left-[-10%] top-1/2 -translate-y-1/2"
        style={{ opacity: orbOpacity }}
      >
        <GlowOrb color="sos" size={500} opacity={0.5} />
      </motion.div>

      <Container>
        <div className="relative grid gap-16 md:grid-cols-[1fr_1.2fr] md:gap-24">
          <motion.div
            style={{ y: textY, opacity: textOpacity }}
            className="space-y-10"
          >
            <Eyebrow tone="sos" index={sectionIndex("problem")}>
              {t("eyebrow")}
            </Eyebrow>
            <h2 className="display-lg">
              {t("titleA")}
              <br />
              <span className="italic-accent">{t("titleB")}</span>
            </h2>
            <p className="max-w-md font-body text-[15px] leading-relaxed text-white/55">
              {t("body")}
            </p>
          </motion.div>

          <motion.div
            style={{ y: figuresY }}
            className="grid gap-4 self-center"
          >
            {figures.map((f, i) => (
              <FigureRow key={i} index={i} figure={f} progress={scrollYProgress} />
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function FigureRow({
  index,
  figure,
  progress,
}: {
  index: number;
  figure: { value: string; label: string };
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  // Each row has a personal scroll window. Hidden until then.
  const start = 0.18 + index * 0.10;
  const opacity = useTransform(
    progress,
    [start - 0.04, start + 0.06],
    [0, 1],
  );
  const x = useTransform(progress, [start - 0.04, start + 0.06], [40, 0]);

  const recipe = COUNTERS[index];

  return (
    <motion.div
      style={{
        opacity,
        x,
        boxShadow: "0 25px 60px -35px rgba(74,26,107,0.65)",
        background:
          "linear-gradient(180deg, rgba(74,26,107,0.55) 0%, rgba(45,15,66,0.7) 100%)",
      }}
      className="liquid-glass relative flex items-baseline justify-between rounded-[1.75rem] p-8 md:p-10"
    >
      <span className="font-display text-[clamp(3rem,7vw,5rem)] font-light leading-none">
        {recipe ? (
          <Counter
            progress={progress}
            to={recipe.to}
            start={start}
            end={start + 0.22}
            format={recipe.format}
          />
        ) : (
          figure.value
        )}
      </span>
      <span className="ms-6 max-w-[18ch] text-end font-body text-[12px] leading-snug text-white/45">
        {figure.label}
      </span>
    </motion.div>
  );
}
