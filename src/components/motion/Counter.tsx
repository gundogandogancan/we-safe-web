"use client";

/**
 * Counter — scroll-linked number animation.
 *
 * Reads a single MotionValue (the section's scrollYProgress) and maps it
 * to a numeric value between 0 and `to`, then formats. Used by Problem
 * figures, Network stats — anywhere a number should "fill up" as the
 * viewer scrolls into the card.
 */

import { motion, useMotionValueEvent, useTransform, type MotionValue } from "framer-motion";
import { useState } from "react";

interface CounterProps {
  /** The section's scrollYProgress (0–1). */
  progress: MotionValue<number>;
  /** Target numeric value. */
  to: number;
  /** Scroll progress at which the count starts (0–1). */
  start: number;
  /** Scroll progress at which the count completes. */
  end: number;
  /** Format the displayed number. Default → toLocaleString. */
  format?: (v: number) => string;
  className?: string;
}

export default function Counter({
  progress,
  to,
  start,
  end,
  format,
  className,
}: CounterProps) {
  const numeric = useTransform(progress, [start, end], [0, to], { clamp: true });
  const [display, setDisplay] = useState(format ? format(0) : "0");

  useMotionValueEvent(numeric, "change", (v) => {
    const rounded = Math.round(v);
    setDisplay(format ? format(rounded) : rounded.toString());
  });

  return <motion.span className={className}>{display}</motion.span>;
}
