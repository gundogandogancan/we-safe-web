"use client";

/**
 * SafeImage
 * ─────────
 * Wraps next/image. If the asset 404s, falls back to a dashed placeholder
 * with the alt text — so a missing screenshot never crashes the render.
 */

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";

type SafeImageProps = ImageProps & {
  placeholderLabel?: string;
};

export default function SafeImage({
  placeholderLabel,
  className,
  alt,
  ...rest
}: SafeImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn(
          "flex h-full w-full flex-col items-center justify-center gap-2 border border-dashed border-white/10 bg-[var(--void)] p-4 text-center",
          className,
        )}
      >
        <span className="font-label text-[9px] tracking-[0.28em] uppercase text-white/25">
          Screenshot
        </span>
        {placeholderLabel && (
          <span className="font-body text-[11px] leading-tight text-white/50">
            {placeholderLabel}
          </span>
        )}
      </div>
    );
  }

  return (
    <Image
      {...rest}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
