"use client";

import {
  motion,
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
import RevealText from "@/components/motion/RevealText";
import MagneticButton from "@/components/motion/MagneticButton";
import { useMousePosition } from "@/hooks/useMousePosition";
import { sectionIndex } from "@/lib/brand";

export default function VolunteerSection() {
  const t = useTranslations("volunteer");
  const badges = t.raw("badges") as string[];
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const phoneY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-60, 60]);
  const phoneScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.05, 0.96]);
  const phoneOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 1, 0.65]);

  const textY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -40]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [0.3, 1, 1, 0.5]);

  const { x: mx, y: my } = useMousePosition();
  const phoneTiltY = useTransform(mx, [-1, 1], reduce ? [0, 0] : [-8, 8]);
  const phoneTiltX = useTransform(my, [-1, 1], reduce ? [0, 0] : [5, -5]);

  return (
    <section
      ref={ref}
      id="volunteer"
      className="relative overflow-hidden py-32 md:py-48"
      style={{
        background:
          "radial-gradient(ellipse 70% 60% at 70% 30%, rgba(201,169,110,0.20) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 30% 70%, rgba(74,26,107,0.40) 0%, transparent 65%), linear-gradient(180deg, #221145 0%, #1a0d33 100%)",
      }}
    >
      <div className="soft-breathe absolute right-[-15%] top-[20%] -z-10">
        <GlowOrb color="gold" size={580} opacity={0.6} />
      </div>
      <div className="orb-drift absolute left-[-15%] bottom-[-10%] -z-10">
        <GlowOrb color="royal" size={520} opacity={0.5} />
      </div>

      <Container>
        <div className="grid items-center gap-16 md:grid-cols-[1fr_1.1fr] md:gap-24">
          <motion.div
            style={{ y: textY, opacity: textOpacity }}
            className="space-y-8"
          >
            <Eyebrow index={sectionIndex("volunteer")}>{t("eyebrow")}</Eyebrow>
            <h2 className="display-lg">
              <RevealText text={t("titleA")} trigger="view" />
              <br />
              <RevealText trigger="view" delay={0.2}>
                {t("titleB")} <span className="italic-accent">{t("titleC")}</span>
              </RevealText>
            </h2>
            <p className="max-w-md font-body text-[15px] leading-relaxed text-white/55">
              {t("body")}
            </p>

            <div className="flex flex-wrap gap-3 pt-4">
              {badges.map((b, i) => (
                <BadgeItem
                  key={b}
                  index={i}
                  label={b}
                  progress={scrollYProgress}
                />
              ))}
            </div>

            <MagneticButton
              onClick={() => {}}
              strength={0.2}
              className="mt-6 inline-flex items-center gap-3 font-label text-[11px] font-semibold tracking-[0.28em] uppercase text-[var(--gold)] transition-all hover:gap-5"
            >
              {t("cta")} <span>→</span>
            </MagneticButton>
          </motion.div>

          <motion.div
            className="flex items-center justify-center"
            style={{
              rotateX: phoneTiltX,
              rotateY: phoneTiltY,
              transformPerspective: 1300,
              transformStyle: "preserve-3d",
            }}
          >
            <PhoneFrame
              src="/screenshots/volunteers.png"
              alt={t("alt")}
              caption={t("caption")}
              halo="gold"
              width={300}
              style={{ y: phoneY, scale: phoneScale, opacity: phoneOpacity }}
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function BadgeItem({
  index,
  label,
  progress,
}: {
  index: number;
  label: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const start = 0.3 + index * 0.05;
  const opacity = useTransform(
    progress,
    [start - 0.1, start, start + 0.3, 1],
    [0.2, 1, 1, 0.6],
  );
  const y = useTransform(progress, [start - 0.1, start], [12, 0]);

  return (
    <motion.span
      style={{ opacity, y }}
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-label text-[10px] font-medium tracking-[0.24em] uppercase text-white/65"
    >
      <span className="h-1 w-1 rounded-full bg-[var(--gold)] soft-breathe" />
      {label}
    </motion.span>
  );
}
