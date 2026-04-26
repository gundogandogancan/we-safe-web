import { cn } from "@/lib/cn";

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
  tone?: "gold" | "lavender" | "sos" | "active";
  index?: string; // e.g. "02 / 10"
}

const tones = {
  gold: "text-[var(--gold)]",
  lavender: "text-[var(--lavender)]",
  sos: "text-[var(--sos)]",
  active: "text-[var(--active)]",
} as const;

export default function Eyebrow({ children, className, tone = "gold", index }: EyebrowProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <span className="block h-px w-8 bg-current opacity-40" aria-hidden />
      <span className={cn("eyebrow", tones[tone])}>{children}</span>
      {index && (
        <span className="eyebrow ml-auto text-white/30">{index}</span>
      )}
    </div>
  );
}
