"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  className?: string;
  /** Strength 0-1. 0.25 is subtle, 0.4 is strong. */
  strength?: number;
  onClick?: () => void;
}

/**
 * Button / link that gently follows the cursor within a magnetic radius.
 * Falls back to a plain anchor on touch devices (no-op springs).
 */
export default function MagneticButton({
  children,
  href,
  className,
  strength = 0.25,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xs = useSpring(x, { stiffness: 160, damping: 18 });
  const ys = useSpring(y, { stiffness: 160, damping: 18 });

  function move(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  }
  function leave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={move}
      onMouseLeave={leave}
      style={{ x: xs, y: ys }}
      className={className}
    >
      {children}
    </motion.a>
  );
}
