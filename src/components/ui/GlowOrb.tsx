import { cn } from "@/lib/cn";

interface GlowOrbProps {
  className?: string;
  color?: "royal" | "lavender" | "gold" | "sos";
  size?: number;
  opacity?: number;
}

const colors = {
  royal:    "rgba(74, 26, 107, 0.55)",
  lavender: "rgba(196, 181, 217, 0.35)",
  gold:     "rgba(201, 169, 110, 0.30)",
  sos:      "rgba(214, 69, 69, 0.40)",
} as const;

/**
 * Soft light source. Decorative. Place absolutely inside a relative parent.
 */
export default function GlowOrb({
  className,
  color = "royal",
  size = 600,
  opacity = 1,
}: GlowOrbProps) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute rounded-full blur-[120px]", className)}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${colors[color]} 0%, transparent 70%)`,
        opacity,
      }}
    />
  );
}
