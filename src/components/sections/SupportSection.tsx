"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import GlowOrb from "@/components/ui/GlowOrb";
import TiltCard from "@/components/motion/TiltCard";
import RevealText from "@/components/motion/RevealText";
import { useCurrency } from "@/components/providers/CurrencyProvider";
import { sectionIndex } from "@/lib/brand";

type PlanKey = "monthly" | "onetime" | "crypto";

// Visual order on screen: Monthly (left) → One-Time (center, featured) → Crypto (right).
// Featured lands last so it earns focus.
const ORDER: Array<{ key: PlanKey; featured: boolean; start: number }> = [
  { key: "monthly", featured: false, start: 0.20 },
  { key: "onetime", featured: true,  start: 0.36 },
  { key: "crypto",  featured: false, start: 0.28 },
];

/** Public WeSafe USDT (TRC20) wallet — used by the Crypto card. */
export const USDT_TRC20_WALLET = "TJHH1UVpnLAwmEaEXNuRGjnaDiuZQJ2fxo";

export default function SupportSection() {
  const t = useTranslations("support");
  const { tier, format } = useCurrency();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [50, -50]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.25, 0.7, 1], [0.3, 1, 1, 0.5]);
  const orbOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.7, 0.35]);

  return (
    <section
      ref={ref}
      id="support"
      className="relative overflow-hidden py-32 md:py-48"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(201,169,110,0.18) 0%, transparent 60%), linear-gradient(180deg, #221145 0%, #1a0d33 100%)",
      }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2"
        style={{ opacity: orbOpacity }}
      >
        <GlowOrb color="gold" size={900} opacity={0.7} />
      </motion.div>

      <Container>
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="mx-auto max-w-3xl text-center"
        >
          <Eyebrow index={sectionIndex("support")} className="justify-center">
            {t("eyebrow")}
          </Eyebrow>
          <h2 className="mt-8 display-lg">
            <RevealText text={t("titleA")} trigger="view" />
            <br />
            <RevealText trigger="view" delay={0.2}>
              <span className="italic-accent">{t("titleB")}</span>
            </RevealText>
          </h2>
          <p className="mx-auto mt-8 max-w-xl font-body text-[15px] leading-relaxed text-white/55">
            {t("body")}
          </p>
        </motion.div>

        <div className="mx-auto mt-20 grid max-w-[1280px] gap-8 md:grid-cols-3 md:gap-10">
          {ORDER.map((p) => {
            const amount =
              p.key === "monthly"
                ? format(tier.monthly)
                : p.key === "onetime"
                ? format(tier.oneTime)
                : ""; // crypto card hides the big amount line

            return (
              <PlanCard
                key={p.key}
                planKey={p.key}
                featured={p.featured}
                start={p.start}
                amount={amount}
                progress={scrollYProgress}
              />
            );
          })}
        </div>

        <SubFoot progress={scrollYProgress} />
      </Container>
    </section>
  );
}

function PlanCard({
  planKey,
  featured,
  start,
  amount,
  progress,
}: {
  planKey: "monthly" | "onetime" | "crypto";
  featured: boolean;
  start: number;
  amount: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const t = useTranslations("support");

  const opacity = useTransform(
    progress,
    [start - 0.1, start, start + 0.35, 1],
    [0.2, 1, 1, 0.5],
  );
  const y = useTransform(progress, [start - 0.12, start], [60, 0]);
  const scale = useTransform(progress, [start - 0.1, start], [0.95, 1]);

  return (
    <TiltCard
      intensity={featured ? 8 : 5}
      perspective={1400}
      style={{ opacity, y, scale }}
      className={`liquid-glass relative flex h-full flex-col gap-8 rounded-[1.75rem] border p-8 backdrop-blur-xl transition-colors duration-500 md:p-10 ${
        featured
          ? "border-[var(--gold)]/55 bg-gradient-to-b from-[var(--gold)]/[0.10] via-[var(--gold)]/[0.04] to-transparent shadow-[0_50px_140px_-40px_rgba(201,169,110,0.55)] md:-translate-y-2"
          : "border-white/10 bg-white/[0.02] hover:border-[var(--gold)]/30"
      }`}
    >
      {featured && (
        <>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 rounded-[1.75rem]"
            style={{
              background:
                "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(201,169,110,0.18), transparent 70%)",
            }}
          />
          <span className="absolute -top-3 end-6 inline-flex items-center gap-2 rounded-full border border-[var(--gold)] bg-[var(--deep)] px-3 py-1 font-label text-[9px] font-semibold tracking-[0.28em] uppercase text-[var(--gold)]">
            {t("badgeFeatured")}
          </span>
        </>
      )}

      <header className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="eyebrow text-[var(--gold)]">{t(`plans.${planKey}.kind`)}</p>
          <h3 className="mt-4 font-display text-[1.5rem] font-light text-white">
            {t(`plans.${planKey}.tag`)}
          </h3>
        </div>
        {planKey === "crypto" && <UsdtLogo />}
      </header>

      {planKey !== "crypto" && (
        <div>
          <p className="font-display text-[clamp(2.6rem,5.5vw,4.5rem)] font-light leading-none text-white">
            {amount}
          </p>
          <p className="mt-2 font-label text-[11px] tracking-[0.24em] uppercase text-white/45">
            {t(`plans.${planKey}.cadence`)}
          </p>
        </div>
      )}

      <p className="font-body text-[14px] leading-relaxed text-white/60">
        {t(`plans.${planKey}.body`)}
      </p>

      {planKey === "crypto" ? (
        <CryptoFooter cta={t("plans.crypto.cta")} copiedLabel={t("plans.crypto.copied")} />
      ) : (
        <button
          type="button"
          className={`mt-auto inline-flex items-center justify-center gap-3 rounded-full border px-6 py-3 font-label text-[11px] font-semibold tracking-[0.24em] uppercase transition-all ${
            featured
              ? "border-[var(--gold)] bg-[var(--gold)] text-[var(--deep)] hover:bg-transparent hover:text-[var(--gold)]"
              : "border-white/15 text-white/70 hover:border-[var(--gold)] hover:text-[var(--gold)]"
          }`}
        >
          {t(`plans.${planKey}.cta`)} <span>→</span>
        </button>
      )}
    </TiltCard>
  );
}

/** Tether (USDT) brand mark — green coin with the T glyph. */
function UsdtLogo() {
  return (
    <span
      aria-label="USDT TRC20"
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
      style={{
        background:
          "radial-gradient(circle at 35% 30%, #34c39f 0%, #1aae7e 60%, #0e7a5a 100%)",
        boxShadow:
          "inset 0 1px 1px rgba(255,255,255,0.4), 0 6px 18px -6px rgba(26,174,126,0.6)",
      }}
    >
      <svg width="24" height="24" viewBox="0 0 32 32" aria-hidden>
        <path
          d="M17.95 17.65v-.01c-.11.01-.69.04-1.97.04-1.02 0-1.74-.03-1.99-.04v.01c-3.93-.17-6.86-.86-6.86-1.69 0-.82 2.93-1.51 6.86-1.69v2.7c.26.02.99.06 2.01.06 1.22 0 1.83-.05 1.95-.06v-2.7c3.92.18 6.85.87 6.85 1.69 0 .83-2.93 1.51-6.85 1.69m0-3.65v-2.42h5.54V7.89H8.48v3.69h5.54V14c-4.5.21-7.89 1.1-7.89 2.17 0 1.07 3.39 1.96 7.89 2.18v7.74h3.93v-7.74c4.49-.22 7.87-1.11 7.87-2.18 0-1.07-3.38-1.96-7.87-2.17"
          fill="#fff"
        />
      </svg>
    </span>
  );
}

/** Footer of the Crypto card — wallet address + copy-to-clipboard. */
function CryptoFooter({ cta, copiedLabel }: { cta: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    if (typeof navigator === "undefined") return;
    navigator.clipboard.writeText(USDT_TRC20_WALLET).catch(() => {});
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  }

  // Truncate middle for premium feel: "TJHH1U…J2fxo"
  const shortAddr = `${USDT_TRC20_WALLET.slice(0, 6)}…${USDT_TRC20_WALLET.slice(-4)}`;

  return (
    <div className="mt-auto flex flex-col gap-3">
      <div
        className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-[var(--royal)]/20 px-4 py-3 backdrop-blur-md"
        style={{
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        <span className="font-label text-[10px] tracking-[0.18em] uppercase text-white/40">
          USDT · TRC20
        </span>
        <span
          className="truncate font-mono text-[12px] tracking-tight text-white/85"
          title={USDT_TRC20_WALLET}
        >
          {shortAddr}
        </span>
      </div>

      <button
        type="button"
        onClick={copy}
        className={`inline-flex items-center justify-center gap-3 rounded-full border px-6 py-3 font-label text-[11px] font-semibold tracking-[0.24em] uppercase transition-all ${
          copied
            ? "border-[var(--active)] bg-[var(--active)]/15 text-[var(--active)]"
            : "border-white/15 text-white/70 hover:border-[var(--gold)] hover:text-[var(--gold)]"
        }`}
      >
        {copied ? (
          <>
            <CheckIcon /> {copiedLabel}
          </>
        ) : (
          <>
            <CopyIcon /> {cta}
          </>
        )}
      </button>
    </div>
  );
}

function CopyIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function SubFoot({
  progress,
}: {
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const t = useTranslations("support");
  const opacity = useTransform(progress, [0.5, 0.7, 1], [0, 1, 0.8]);
  const y = useTransform(progress, [0.5, 0.7], [30, 0]);

  return (
    <motion.div style={{ opacity, y }}>
      <p className="mx-auto mt-16 max-w-xl text-center font-body text-[13px] leading-relaxed text-white/40">
        {t("coffeeSubtext")}
      </p>
      <p className="mx-auto mt-8 max-w-xl text-center font-label text-[10px] tracking-[0.28em] uppercase text-white/30">
        {t("footnote")}
      </p>
    </motion.div>
  );
}
