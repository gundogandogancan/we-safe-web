"use client";

import { motion, type Variants } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

interface RevealTextProps {
  /** String to split. Pass either `text` or `children`. */
  text?: string;
  /** Pre-rendered ReactNodes (e.g. with italics) — splits by top-level words. */
  children?: ReactNode;
  /** Delay before the first word reveals (s). */
  delay?: number;
  /** Stagger between words (s). */
  stagger?: number;
  /** Reveal on mount vs whileInView. */
  trigger?: "mount" | "view";
  className?: string;
  style?: CSSProperties;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}

const word: Variants = {
  hidden: { y: "115%" },
  show: (i: number) => ({
    y: "0%",
    transition: {
      duration: 1.0,
      ease: [0.22, 1, 0.36, 1],
      delay: i * 0.08,
    },
  }),
};

/**
 * Line-reveal typography. Each word rises from below a hidden mask.
 * Used for hero titles and key section headlines.
 */
export default function RevealText({
  text,
  children,
  delay = 0,
  stagger = 0.08,
  trigger = "mount",
  className,
  style,
  as = "span",
}: RevealTextProps) {
  const words = text ? text.split(" ") : null;
  const Tag = as;

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        delayChildren: delay,
        staggerChildren: stagger,
      },
    },
  };

  const revealProps =
    trigger === "view"
      ? {
          initial: "hidden",
          whileInView: "show",
          viewport: { once: true, amount: 0.5 },
        }
      : { initial: "hidden", animate: "show" };

  if (words) {
    return (
      <Tag className={className} style={style}>
        <motion.span style={{ display: "inline" }} variants={container} {...revealProps}>
          {words.map((w, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "bottom",
                lineHeight: "inherit",
              }}
            >
              <motion.span
                custom={i}
                variants={word}
                style={{ display: "inline-block", willChange: "transform" }}
              >
                {w}
              </motion.span>
              {i < words.length - 1 && "\u00A0"}
            </span>
          ))}
        </motion.span>
      </Tag>
    );
  }

  // ReactNode children — single line reveal
  return (
    <Tag className={className} style={style}>
      <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
        <motion.span
          initial={{ y: "115%" }}
          animate={trigger === "mount" ? { y: "0%" } : undefined}
          whileInView={trigger === "view" ? { y: "0%" } : undefined}
          viewport={trigger === "view" ? { once: true, amount: 0.5 } : undefined}
          transition={{ duration: 1.0, delay, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "inline-block", willChange: "transform" }}
        >
          {children}
        </motion.span>
      </span>
    </Tag>
  );
}
