"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionStyle,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Max rotation in degrees on each axis. 8 reads natural; 12 is dramatic. */
  intensity?: number;
  /** Perspective in px. Lower = more extreme. */
  perspective?: number;
  /** Extra motion style (scroll-linked values, etc.) merged in. */
  style?: MotionStyle;
}

/**
 * 3D perspective tilt card that reacts to mouse movement within its bounds.
 * Touch devices: no-op (motion values stay at 0).
 */
export default function TiltCard({
  children,
  className,
  intensity = 8,
  perspective = 1200,
  style,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const mxs = useSpring(mx, { stiffness: 220, damping: 22 });
  const mys = useSpring(my, { stiffness: 220, damping: 22 });
  const rotateX = useTransform(mys, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(mxs, [-0.5, 0.5], [-intensity, intensity]);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function handleLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: perspective,
        transformStyle: "preserve-3d",
        ...style,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
