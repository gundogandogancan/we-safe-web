import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  size?: "sm" | "md" | "lg" | "full";
}

const sizes = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-7xl",
  full: "max-w-[1680px]",
} as const;

export default function Container({
  children,
  className,
  as: Tag = "div",
  size = "lg",
}: ContainerProps) {
  const Component = Tag as React.ElementType;
  return (
    <Component className={cn("mx-auto w-full px-6 md:px-10 lg:px-16", sizes[size], className)}>
      {children}
    </Component>
  );
}
