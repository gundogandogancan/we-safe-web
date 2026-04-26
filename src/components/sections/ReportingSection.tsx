"use client";

import SafeImage from "@/components/ui/SafeImage";
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
import RevealText from "@/components/motion/RevealText";
import { useMousePosition } from "@/hooks/useMousePosition";
import { sectionIndex } from "@/lib/brand";

const MARKERS = [
  { top: "18%", left: "22%", delay: 0 },
  { top: "32%", left: "68%", delay: 0.6 },
  { top: "48%", left: "38%", delay: 1.2 },
  { top: "62%", left: "72%", delay: 1.8 },
  { top: "76%", left: "28%", delay: 2.4 },
  { top: "40%", left: "85%", delay: 3.0 },
];

interface Fact { label: string; value: string }

export default function ReportingSection() {
  const t = useTranslations("reporting");
  const facts = t.raw("facts") as Fact[];
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const envScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1, 1.04]);
  const envY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -60]);
  const envOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.55, 1, 0.75]);

  const phoneY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-40, 40]);
  const phoneScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.03, 0.95]);
  const phoneOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 1, 0.7]);

  const textY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -40]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [0.3, 1, 1, 0.5]);

  // MOUSE → environment + phone tilt
  const { x: mx, y: my } = useMousePosition();
  const envParallaxX = useTransform(mx, [-1, 1], reduce ? [0, 0] : [-30, 30]);
  const envParallaxY = useTransform(my, [-1, 1], reduce ? [0, 0] : [-18, 18]);
  const phoneTiltY = useTransform(mx, [-1, 1], reduce ? [0, 0] : [-8, 8]);
  const phoneTiltX = useTransform(my, [-1, 1], reduce ? [0, 0] : [5, -5]);

  return (
    <section
      ref={ref}
      id="reporting"
      className="relative overflow-hidden py-32 md:py-48"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 30% 70%, rgba(74,26,107,0.32) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 70% 30%, rgba(45,15,66,0.45) 0%, transparent 65%), linear-gradient(180deg, #1a0d33 0%, #221145 100%)",
      }}
    >
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          scale: envScale,
          y: envY,
          x: envParallaxX,
          opacity: envOpacity,
        }}
      >
        <motion.div style={{ x: envParallaxX, y: envParallaxY }} className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 25% 30%, rgba(74,26,107,0.35), transparent 60%), radial-gradient(ellipse 60% 50% at 75% 70%, rgba(45,15,66,0.6), transparent 65%), var(--violet)",
            }}
          />
          <SafeImage
            src="/cinematic/map.jpg"
            alt=""
            fill
            aria-hidden
            sizes="110vw"
            className="object-cover opacity-35 mix-blend-luminosity"
            priority={false}
          />
        </motion.div>
      </motion.div>

      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(11,5,20,0.65) 0%, rgba(11,5,20,0.35) 30%, rgba(11,5,20,0.7) 100%)",
        }}
      />

      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {MARKERS.map((m, i) => (
          <div
            key={i}
            className="absolute flex items-center justify-center"
            style={{ top: m.top, left: m.left }}
          >
            <span
              className="absolute h-10 w-10 rounded-full bg-[var(--sos)]/25 animate-ping"
              style={{ animationDelay: `${m.delay}s` }}
            />
            <span className="relative h-2.5 w-2.5 rounded-full bg-[var(--sos)] shadow-[0_0_14px_var(--sos)]" />
          </div>
        ))}
      </div>

      <Container>
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="mb-20 max-w-3xl"
        >
          <Eyebrow index={sectionIndex("reporting")}>{t("eyebrow")}</Eyebrow>
          <h2 className="mt-8 display-lg">
            <RevealText text={t("titleA")} trigger="view" />
            <br />
            <RevealText trigger="view" delay={0.2}>
              <span className="italic-accent">{t("titleB")}</span> {t("titleC")}
            </RevealText>
          </h2>
        </motion.div>

        <div className="grid items-center gap-16 md:grid-cols-[1fr_1fr] md:gap-20">
          <div className="space-y-10">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-md font-body text-[15px] leading-relaxed text-white/60"
            >
              {t("body")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-3 rounded-full border border-[var(--sos)]/30 bg-[var(--sos)]/5 px-4 py-2"
            >
              <span className="soft-breathe h-1.5 w-1.5 rounded-full bg-[var(--sos)] shadow-[0_0_10px_var(--sos)]" />
              <span className="font-label text-[10px] font-semibold tracking-[0.28em] uppercase text-[var(--sos)]">
                {t("alerts")}
              </span>
            </motion.div>

            <dl className="grid grid-cols-2 gap-6 pt-4">
              {facts.map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.25 + i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <dt className="eyebrow text-white/40">{f.label}</dt>
                  <dd className="mt-2 font-display text-[1.4rem] font-light text-white">
                    {f.value}
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>

          {/* ★ PHONE — scroll + mouse tilt */}
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
              src="/screenshots/reporting.png"
              alt={t("alt")}
              caption={t("caption")}
              halo="royal"
              width={300}
              style={{ y: phoneY, scale: phoneScale, opacity: phoneOpacity }}
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
