"use client";

import { useScroll, type MotionValue } from "framer-motion";
import { useRef, type RefObject } from "react";

interface SectionProgress<T extends HTMLElement> {
  ref: RefObject<T | null>;
  progress: MotionValue<number>;
}

/**
 * Tracks scroll progress WITHIN a section from 0→1.
 *
 * Use on pinned / sticky sections whose height exceeds the viewport.
 * offset `["start start", "end end"]` means:
 *   progress = 0 when the section's top touches the viewport top
 *   progress = 1 when the section's bottom touches the viewport bottom
 *
 * The caller attaches `ref` to the outer section; `progress` can drive
 * any MotionValue transforms inside.
 */
export function useSectionProgress<T extends HTMLElement = HTMLElement>(): SectionProgress<T> {
  const ref = useRef<T>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  return { ref, progress: scrollYProgress };
}
