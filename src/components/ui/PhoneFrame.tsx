"use client";

import { motion, type MotionStyle } from "framer-motion";
import SafeImage from "./SafeImage";
import { cn } from "@/lib/cn";

interface PhoneFrameProps {
  src: string;
  alt?: string;
  className?: string;
  caption?: string;
  priority?: boolean;
  width?: number;
  halo?: "royal" | "sos" | "gold" | "lavender" | "none";
  /** scroll-linked motion values (scale, opacity, filter, y, …) */
  style?: MotionStyle;
}

const HALOS = {
  royal:    "radial-gradient(circle at 50% 50%, rgba(74, 26, 107, 0.55), transparent 65%)",
  sos:      "radial-gradient(circle at 50% 50%, rgba(214, 69, 69, 0.40), transparent 65%)",
  gold:     "radial-gradient(circle at 50% 50%, rgba(201, 169, 110, 0.35), transparent 65%)",
  lavender: "radial-gradient(circle at 50% 50%, rgba(196, 181, 217, 0.35), transparent 65%)",
  none:     "transparent",
} as const;

export default function PhoneFrame({
  src,
  alt = "WeSafe app screen",
  className,
  caption,
  priority = false,
  width = 300,
  halo = "royal",
  style,
}: PhoneFrameProps) {
  return (
    <motion.div
      className={cn("relative flex flex-col items-center gap-5", className)}
      style={{ willChange: "transform, opacity, filter", ...style }}
    >
      {halo !== "none" && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 blur-[80px]"
          style={{ background: HALOS[halo] }}
        />
      )}

      <div
        className="relative rounded-[3rem] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-[10px] shadow-[0_50px_130px_-30px_rgba(74,26,107,0.55)]"
        style={{
          aspectRatio: "9 / 19.5",
          width: `min(${width}px, 72vw)`,
        }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[2.4rem] bg-[var(--void)]">
          <SafeImage
            src={src}
            alt={alt}
            placeholderLabel={alt}
            fill
            sizes={`(max-width: 768px) 72vw, ${width}px`}
            className="object-cover"
            priority={priority}
          />
        </div>
      </div>

      {caption && (
        <p className="font-label text-[10px] tracking-[0.28em] uppercase text-white/45">
          {caption}
        </p>
      )}
    </motion.div>
  );
}
