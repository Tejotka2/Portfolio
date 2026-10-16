import { type ReactNode, useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { cn } from "../utils/cn";

export const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ utils */

export function tc(total: number, fps = 24) {
  const t = Math.max(0, total || 0);
  const p = (n: number) => String(Math.floor(n)).padStart(2, "0");
  return `${p(t / 3600)}:${p((t % 3600) / 60)}:${p(t % 60)}:${p((t % 1) * fps)}`;
}

export function useCanHover() {
  const [can, setCan] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setCan(mq.matches);
    const on = () => setCan(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return can;
}

/* ----------------------------------------------------------------- reveal */

export function Reveal({
  children,
  className,
  delay = 0,
  y = 22,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.25, margin: "-60px" }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Line-mask reveal: each line slides up from behind a clipped edge. */
export function MaskLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
}) {
  return (
    <span className={className}>
      {lines.map((l, i) => (
        <span key={i} className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
          <motion.span
            className={cn("block will-change-transform", lineClassName)}
            initial={{ y: "108%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 1.05, delay: delay + i * stagger, ease: EASE }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ chrome */

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-mono text-[10.5px] font-medium tracking-[0.3em] text-dim uppercase",
        className,
      )}
    >
      <span className="h-[5px] w-[5px] bg-amber" />
      {children}
    </span>
  );
}

export function SectionHead({
  index,
  title,
  lead,
  aside,
}: {
  index: string;
  title: ReactNode;
  lead?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <div className="border-t border-white/10 pt-6">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <div className="mb-5 flex items-center gap-4">
            <Eyebrow>{index}</Eyebrow>
            <span className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
          </div>
          <Reveal>
            <h2 className="text-[clamp(2rem,5.4vw,3.75rem)] leading-[0.98] font-medium text-chalk">{title}</h2>
          </Reveal>
        </div>
        <div className="lg:max-w-sm lg:pb-3">
          {lead && (
            <Reveal delay={0.08}>
              <p className="text-[15px] leading-relaxed text-mute">{lead}</p>
            </Reveal>
          )}
          {aside}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- magnetic */

export function Magnetic({
  children,
  className,
  strength = 0.32,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 20, mass: 0.4 });

  return (
    <motion.span
      ref={ref}
      className={cn("relative inline-block", className)}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength * 1.3);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

/* ----------------------------------------------------------- video preview */

export function VideoPreview({
  src,
  poster,
  className,
  imgClassName,
  onActiveChange,
  loop = true,
  controls = false,
  objectFit = "cover",
}: {
  src: string;
  poster: string;
  className?: string;
  imgClassName?: string;
  onActiveChange?: (playing: boolean) => void;
  loop?: boolean;
  controls?: boolean;
  objectFit?: "cover" | "contain";
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const inView = useInView(wrap, { amount: 0.3 });
  const canHover = useCanHover();
  const [playing, setPlaying] = useState(false);

  useEffect(() => onActiveChange?.(playing), [playing, onActiveChange]);

  const play = () => {
    const v = video.current;
    if (!v) return;
    v.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  };
  const pause = () => {
    const v = video.current;
    if (!v) return;
    v.pause();
    setPlaying(false);
  };

  // touch / no-hover devices: play while on screen
  useEffect(() => {
    if (canHover) return;
    if (inView) play();
    else pause();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, canHover]);

  return (
    <div
      ref={wrap}
      className={cn("relative overflow-hidden bg-ink-3", className)}
      onPointerEnter={() => canHover && play()}
      onPointerLeave={() => canHover && pause()}
    >
      <img
        src={poster}
        alt=""
        loading="lazy"
        decoding="async"
        className={cn(
          "absolute inset-0 h-full w-full scale-105 object-cover transition-[opacity,transform] duration-700 ease-[cubic-bezier(.22,1,.36,1)]",
          playing && "scale-100 opacity-0",
          imgClassName,
        )}
      />
      <video
        ref={video}
        src={src}
        muted
        loop={loop}
        playsInline
        controls={controls}
        preload="none"
        className={cn(
          "absolute inset-0 h-full w-full transition-opacity duration-500",
          playing ? "opacity-100" : "opacity-0",
        )}
        style={{ objectFit }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ details */

export function Eq({ active, className }: { active: boolean; className?: string }) {
  return (
    <span className={cn("flex h-3 items-end gap-[2px]", className)} aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className={cn("w-[2px] rounded-sm bg-current", active ? "eq-bar" : "h-[3px] opacity-40")}
          style={active ? { height: "100%", animationDelay: `${i * 0.14}s` } : undefined}
        />
      ))}
    </span>
  );
}

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "rounded-full border border-white/12 bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] text-mute uppercase backdrop-blur-sm",
        className,
      )}
    >
      {children}
    </span>
  );
}
