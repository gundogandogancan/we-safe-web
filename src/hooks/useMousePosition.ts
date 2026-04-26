"use client";

import { useEffect } from "react";
import { useMotionValue, useSpring, type MotionValue } from "framer-motion";

interface MousePosition {
  /** Normalized -1 → 1 around viewport center (spring-smoothed) */
  x: MotionValue<number>;
  y: MotionValue<number>;
  /** Raw normalized (instant, no spring) */
  xRaw: MotionValue<number>;
  yRaw: MotionValue<number>;
}

/**
 * Global mouse tracker. Emits two pairs of motion values:
 *   x, y       → spring-smoothed, normalized [-1, 1] around viewport center
 *   xRaw, yRaw → instant normalized (use for fast-reacting UI like cursor)
 *
 * Values update only while the pointer is in the viewport. Touch devices
 * are ignored (stays at 0 → no unintended motion).
 */
export function useMousePosition(): MousePosition {
  const xRaw = useMotionValue(0);
  const yRaw = useMotionValue(0);
  const x = useSpring(xRaw, { stiffness: 80, damping: 20, mass: 0.6 });
  const y = useSpring(yRaw, { stiffness: 80, damping: 20, mass: 0.6 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;

    const handler = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      xRaw.set(nx);
      yRaw.set(ny);
    };

    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, [xRaw, yRaw]);

  return { x, y, xRaw, yRaw };
}
