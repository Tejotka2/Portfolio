import type { CSSProperties, ReactNode } from "react";
import { cn } from "../utils/cn";

export default function Marquee({
  items,
  reverse = false,
  dur = "38s",
  className,
  itemClassName,
  gap = "gap-10",
  fade = true,
}: {
  items: ReactNode[];
  reverse?: boolean;
  dur?: string;
  className?: string;
  itemClassName?: string;
  gap?: string;
  fade?: boolean;
}) {
  const row = (key: string) => (
    <div key={key} className={cn("flex shrink-0 items-center", gap, "pr-10")}>
      {items.map((it, n) => (
        <span key={n} className={cn("flex shrink-0 items-center", itemClassName)}>
          {it}
        </span>
      ))}
    </div>
  );

  return (
    <div className={cn("marquee-host relative flex overflow-hidden", fade && "fade-x", className)}>
      <div
        className={cn("flex w-max", reverse ? "animate-marquee-rev" : "animate-marquee")}
        style={{ "--dur": dur } as CSSProperties}
      >
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}
