"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, type CSSProperties, type ReactNode } from "react";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /**
   * Vertical drift in px across the element's scroll window.
   * positive → lag (feels further away), negative → float forward
   */
  distance?: number;
  as?: "div" | "section" | "figure" | "aside";
}

export default function Parallax({
  children,
  className,
  style,
  distance = 60,
  as = "div",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [distance, -distance],
  );

  const Tag = motion[as] as typeof motion.div;

  return (
    <Tag
      ref={ref}
      className={className}
      style={{ ...style, y, willChange: "transform" }}
    >
      {children}
    </Tag>
  );
}
