"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Custom cursor: a gold dot + a trailing ring.
 *   • Ring scales up over interactive elements (a, button, [data-cursor])
 *   • Hidden on touch devices (no hover capability)
 *   • Uses mix-blend-mode: difference for the dot so it reads on any bg
 */
export default function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const xRing = useSpring(x, { stiffness: 220, damping: 28, mass: 0.4 });
  const yRing = useSpring(y, { stiffness: 220, damping: 28, mass: 0.4 });
  const xDot = useSpring(x, { stiffness: 520, damping: 36, mass: 0.25 });
  const yDot = useSpring(y, { stiffness: 520, damping: 36, mass: 0.25 });

  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(false);
  const [supported, setSupported] = useState(true);

  const ringScale = useTransform(() => (hover ? 1.6 : 1));
  const ringOpacity = useTransform(() => (hover ? 0.35 : 0.75));

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) {
      setSupported(false);
      return;
    }

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const leave = () => setVisible(false);
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      setHover(!!t.closest("a, button, [data-cursor-hover]"));
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseout", leave);
    document.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseout", leave);
      document.removeEventListener("mouseover", over);
    };
  }, [x, y, visible]);

  if (!supported) return null;

  return (
    <>
      <motion.span
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--gold)]"
        style={{
          x: xRing,
          y: yRing,
          scale: ringScale,
          opacity: visible ? ringOpacity : 0,
        }}
      />
      <motion.span
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[10000] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--gold)]"
        style={{
          x: xDot,
          y: yDot,
          opacity: visible ? 1 : 0,
          mixBlendMode: "difference",
        }}
      />
    </>
  );
}
