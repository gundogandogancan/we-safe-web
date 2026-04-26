import Image from "next/image";
import { cn } from "@/lib/cn";

interface LogoMarkProps {
  className?: string;
  wordmark?: boolean;
  size?: number;
}

/**
 * WeSafe logo. `logo-emblem.png` + wordmark.
 * Replace src paths when final vector logo is available.
 */
export default function LogoMark({ className, wordmark = true, size = 28 }: LogoMarkProps) {
  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      <Image
        src="/logo-emblem.png"
        alt="WeSafe"
        width={size}
        height={size}
        className="rounded-full"
        priority
      />
      {wordmark && (
        <span className="font-label text-[13px] font-medium tracking-[0.28em] uppercase text-[var(--cream)]">
          WeSafe
        </span>
      )}
    </div>
  );
}
