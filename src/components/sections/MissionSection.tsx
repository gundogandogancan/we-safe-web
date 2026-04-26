"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import TiltCard from "@/components/motion/TiltCard";
import RevealText from "@/components/motion/RevealText";
import { sectionIndex } from "@/lib/brand";

interface Pillar { num: string; title: string; body: string }

export default function MissionSection() {
  const t = useTranslations("mission");
  const pillars = t.raw("pillars") as Pillar[];
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [50, -50]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.4]);

  return (
    <section
      ref={ref}
      id="mission"
      className="relative overflow-hidden py-32 md:py-48"
      style={{
        background:
          "radial-gradient(ellipse 70% 60% at 30% 30%, rgba(74,26,107,0.32) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(45,15,66,0.45) 0%, transparent 65%), linear-gradient(180deg, #1a0d33 0%, #221145 100%)",
      }}
    >
      <div
        aria-hidden
        className="nebula-a pointer-events-none absolute -left-[10%] top-[20%] h-[55vh] w-[55vh] rounded-full blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(74,26,107,0.55) 0%, transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="nebula-b pointer-events-none absolute -right-[10%] bottom-[10%] h-[55vh] w-[55vh] rounded-full blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(196,181,217,0.30) 0%, transparent 65%)",
        }}
      />
      <Container>
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="mx-auto max-w-4xl"
        >
          <Eyebrow index={sectionIndex("mission")}>{t("eyebrow")}</Eyebrow>
          <h2 className="mt-8 display-lg">
            <RevealText text={t("titleA")} trigger="view" />
            <br />
            <RevealText trigger="view" delay={0.15}>
              <span className="italic-accent">{t("titleB")}</span>
            </RevealText>
            <br />
            <RevealText text={t("titleC")} trigger="view" delay={0.3} />
          </h2>
          <p className="mt-10 max-w-2xl font-body text-[15px] leading-relaxed text-white/60">
            {t("body")}
          </p>
        </motion.div>

        <div className="mt-24 grid gap-10 md:grid-cols-3 md:gap-12">
          {pillars.map((p, i) => (
            <PillarCard
              key={p.num}
              index={i}
              pillar={p}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

function PillarCard({
  index,
  pillar,
  progress,
}: {
  index: number;
  pillar: { num: string; title: string; body: string };
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const start = 0.25 + index * 0.06;
  const opacity = useTransform(
    progress,
    [start - 0.1, start],
    [0, 1],
  );
  const y = useTransform(progress, [start - 0.1, start], [40, 0]);
  const scale = useTransform(progress, [start - 0.1, start], [0.97, 1]);

  return (
    <TiltCard
      intensity={6}
      style={{
        opacity,
        y,
        scale,
        boxShadow: "0 30px 80px -40px rgba(74,26,107,0.7)",
        background:
          "linear-gradient(180deg, rgba(74,26,107,0.55) 0%, rgba(45,15,66,0.7) 100%)",
      }}
      className="liquid-glass group relative flex h-full flex-col gap-6 rounded-[1.75rem] p-8 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between">
        <span className="font-display text-[3.5rem] font-light leading-none text-[var(--gold)]/70">
          {pillar.num}
        </span>
        <span className="h-px w-10 bg-[var(--gold)]/40 transition-all group-hover:w-16" />
      </div>
      <h3 className="display-md">{pillar.title}</h3>
      <p className="font-body text-[14px] leading-relaxed text-white/55">{pillar.body}</p>
    </TiltCard>
  );
}
