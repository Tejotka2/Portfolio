import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {
  Gauge,
  Maximize2,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import { REEL } from "../data/site";
import { cn } from "../utils/cn";
import { EASE, tc } from "./ui";

const FPS = 24;

export default function ReelPlayer() {
  const host = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const pendingSeek = useRef<number | null>(null);
  const lastFrame = useRef(-1);

  const [i, setI] = useState(0);
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [rate, setRate] = useState(1);
  const [buffering, setBuffering] = useState(true);
  const [flash, setFlash] = useState(false);
  const [hover, setHover] = useState(false);

  const clip = REEL[i];
  const total = REEL.reduce((a, c) => a + c.dur, 0);
  const elapsed = REEL.slice(0, i).reduce((a, c) => a + c.dur, 0) + Math.min(t, clip.dur);
  const progress = Math.min(1, Math.max(0, elapsed / total));

  const inView = useInView(host, { amount: 0.4 });
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const spot = useTransform(
    [mx, my],
    ([x, y]) => `radial-gradient(360px circle at ${x}% ${y}%, rgba(255,255,255,0.11), transparent 70%)`,
  );

  const cutTo = useCallback(
    (idx: number, localSeek?: number) => {
      const n = (idx + REEL.length) % REEL.length;
      const local = Math.max(0, Math.min(localSeek ?? 0, REEL[n].dur - 0.05));

      setFlash(true);
      window.setTimeout(() => setFlash(false), 240);
      lastFrame.current = -1;

      // same segment → seek in place (no src swap, no metadata event)
      if (n === i) {
        const v = video.current;
        if (v) {
          v.currentTime = REEL[n].start + local;
          if (playing) v.play().catch(() => {});
        }
        setT(local);
        setBuffering(false);
        return;
      }

      pendingSeek.current = local;
      setBuffering(true);
      setT(0);
      setI(n);
    },
    [i, playing],
  );

  /* kick off playback once, the first time the card is on screen */
  const started = useRef(false);
  useEffect(() => {
    if (!inView || started.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    started.current = true;
    const id = window.setTimeout(() => setPlaying(true), 700);
    return () => window.clearTimeout(id);
  }, [inView]);

  /* play / pause */
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (playing) v.play().catch(() => setPlaying(false));
    else v.pause();
  }, [playing, clip.src]);

  /* rate */
  useEffect(() => {
    if (video.current) video.current.playbackRate = rate;
  }, [rate, clip.src]);

  /* smooth playhead + auto cut */
  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    const tick = () => {
      const v = video.current;
      if (v && Number.isFinite(v.currentTime)) {
        const local = v.currentTime - clip.start;
        const frame = Math.floor(local * FPS);
        if (frame !== lastFrame.current) {
          lastFrame.current = frame;
          setT(Math.max(0, local));
        }
        if (local >= clip.dur) cutTo(i + 1);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, clip.start, clip.dur, i, cutTo]);

  /* keyboard */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = host.current;
      if (!el || !el.matches(":hover, :focus-within")) return;
      if (e.key === " " || e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPlaying((p) => !p);
      } else if (e.key === "ArrowRight") {
        cutTo(i + 1);
      } else if (e.key === "ArrowLeft") {
        cutTo(i - 1);
      } else if (e.key.toLowerCase() === "m") {
        setMuted((m) => !m);
      } else if (e.key.toLowerCase() === "f") {
        toggleFull();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i, cutTo]);

  const toggleFull = () => {
    const el = host.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else el.requestFullscreen?.().catch(() => {});
  };

  const seekTimeline = (clientX: number, node: HTMLElement) => {
    const r = node.getBoundingClientRect();
    const frac = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
    let acc = 0;
    for (let idx = 0; idx < REEL.length; idx++) {
      const c = REEL[idx];
      if (frac * total <= acc + c.dur) {
        cutTo(idx, frac * total - acc);
        return;
      }
      acc += c.dur;
    }
    cutTo(REEL.length - 1, REEL[REEL.length - 1].dur - 0.05);
  };

  return (
    <div
      ref={host}
      data-cursor=""
      className="group relative isolate overflow-hidden rounded-xl border border-white/10 bg-ink-2 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 100);
        my.set(((e.clientY - r.top) / r.height) * 100);
      }}
    >
      {/* screen */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-black lg:aspect-[21/9]">
        <video
          key={clip.src}
          ref={video}
          src={clip.src}
          poster={clip.poster}
          muted={muted}
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
          onLoadedMetadata={(e) => {
            const v = e.currentTarget;
            v.currentTime = clip.start + (pendingSeek.current ?? 0);
            pendingSeek.current = null;
            setBuffering(false);
            if (playing) v.play().catch(() => {});
          }}
          onWaiting={() => setBuffering(true)}
          onPlaying={() => setBuffering(false)}
          onEnded={() => cutTo(i + 1)}
        />

        {/* cut flash */}
        <AnimatePresence>
          {flash && (
            <motion.div
              key="flash"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.16 }}
              className="pointer-events-none absolute inset-0 bg-white/8"
            />
          )}
        </AnimatePresence>

        {/* spotlight */}
        <motion.div className="pointer-events-none absolute inset-0" style={{ background: spot }} animate={{ opacity: hover ? 1 : 0 }} />

        {/* letterbox + grade */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,.85),transparent_38%,rgba(0,0,0,.45))]" />

        {/* top HUD */}
        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4 sm:p-5">
          <div className="flex items-center gap-2.5 rounded-full border border-white/12 bg-black/45 px-3 py-1.5 backdrop-blur-md">
            <span className={cn("h-2 w-2 rounded-full bg-rec", playing && !buffering && "animate-blink")} />
            <span className="font-mono text-[10px] tracking-[0.24em] text-white/85 uppercase">
              {buffering ? "buffering" : playing ? "rec · reel 2026" : "paused"}
            </span>
          </div>
          <div className="hidden items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-white/60 uppercase sm:flex">
            <span className="rounded border border-white/12 bg-black/45 px-2 py-1 backdrop-blur-md">
              1080p · rec.709 · {FPS}fps
            </span>
            <span className="rounded border border-white/12 bg-black/45 px-2 py-1 backdrop-blur-md">
              {clip.tag}
            </span>
          </div>
        </div>

        {/* center play */}
        <AnimatePresence>
          {!playing && (
            <motion.button
              key="play"
              type="button"
              data-cursor="PLAY"
              initial={{ opacity: 0, scale: 0.86 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.45, ease: EASE }}
              onClick={() => setPlaying(true)}
              className="absolute inset-0 m-auto flex h-24 w-24 items-center justify-center rounded-full border border-white/25 bg-white/8 backdrop-blur-xl transition-colors duration-300 hover:bg-white/16 sm:h-28 sm:w-28"
              aria-label="Odtwórz showreel"
            >
              <Play className="ml-1 h-8 w-8 fill-white text-white" />
              <span className="absolute -bottom-8 font-mono text-[10px] tracking-[0.28em] text-white/70 uppercase">
                play reel
              </span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* buffering bar */}
        <AnimatePresence>
          {buffering && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-x-0 bottom-0 h-[2px] overflow-hidden bg-white/10"
            >
              <motion.div
                className="h-full w-1/3 bg-amber"
                animate={{ x: ["-100%", "320%"] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* deck / console */}
      <div className="border-t border-white/8 bg-ink-2/95 px-3 py-3 sm:px-5 sm:py-4">
        {/* timeline */}
        <div
          className="relative mb-3 flex h-9 w-full cursor-pointer gap-[3px] overflow-hidden rounded-md border border-white/8 bg-black/40 p-[3px] select-none"
          onClick={(e) => seekTimeline(e.clientX, e.currentTarget)}
          data-cursor="SCRUB"
        >
          {REEL.map((c, idx) => {
            const w = (c.dur / total) * 100;
            const done = idx < i;
            const active = idx === i;
            const localFrac = active ? Math.min(1, t / c.dur) : done ? 1 : 0;
            return (
              <div
                key={c.id}
                className="relative h-full overflow-hidden rounded-[3px]"
                style={{ width: `${w}%`, background: `${c.tint}1f` }}
              >
                <div
                  className="absolute inset-y-0 left-0 transition-[width] duration-75 ease-linear"
                  style={{ width: `${localFrac * 100}%`, background: `${c.tint}59` }}
                />
                <span
                  className={cn(
                    "absolute inset-y-0 left-2 flex items-center font-mono text-[9px] tracking-[0.16em] uppercase transition-colors",
                    active ? "text-white" : "text-white/45",
                  )}
                >
                  <span className="max-w-[92%] truncate">{c.label}</span>
                </span>
                <span className="absolute inset-y-0 right-0 w-px" style={{ background: `${c.tint}66` }} />
              </div>
            );
          })}
          {/* playhead */}
          <div
            className="pointer-events-none absolute inset-y-0 w-px bg-white shadow-[0_0_12px_2px_rgba(255,255,255,0.5)]"
            style={{ left: `calc(${progress * 100}% + 3px)` }}
          >
            <span className="absolute -top-[3px] left-1/2 h-[6px] w-[6px] -translate-x-1/2 rotate-45 bg-white" />
          </div>
        </div>

        {/* controls */}
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
          <div className="flex items-center gap-1.5">
            <Ctl label="Poprzedni klip" onClick={() => cutTo(i - 1)}>
              <SkipBack className="h-4 w-4" />
            </Ctl>
            <button
              type="button"
              data-cursor={playing ? "PAUSE" : "PLAY"}
              onClick={() => setPlaying((p) => !p)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-transform duration-200 ease-[cubic-bezier(.22,1,.36,1)] hover:scale-[1.08] active:scale-[0.92]"
              aria-label={playing ? "Pauza" : "Odtwórz"}
            >
              {playing ? <Pause className="h-4 w-4 fill-black" /> : <Play className="ml-0.5 h-4 w-4 fill-black" />}
            </button>
            <Ctl label="Następny klip" onClick={() => cutTo(i + 1)}>
              <SkipForward className="h-4 w-4" />
            </Ctl>
            <span className="mx-1 h-5 w-px bg-white/10" />
            <Ctl label={muted ? "Włącz dźwięk" : "Wycisz"} onClick={() => setMuted((m) => !m)}>
              {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Ctl>
            <Ctl
              label="Prędkość odtwarzania"
              onClick={() => setRate((r) => (r === 1 ? 1.5 : r === 1.5 ? 2 : r === 2 ? 0.5 : 1))}
            >
              <span className="flex items-center gap-1 font-mono text-[10px] tracking-wider">
                <Gauge className="h-3.5 w-3.5" />
                {rate}×
              </span>
            </Ctl>
            <Ctl label="Pełny ekran" onClick={toggleFull} className="hidden sm:flex">
              <Maximize2 className="h-4 w-4" />
            </Ctl>
          </div>

          <div className="flex items-center gap-3 font-mono text-[10.5px] tracking-[0.16em] text-mute uppercase sm:gap-5">
            <span className="text-chalk tabular-nums">{tc(elapsed, FPS)}</span>
            <span className="tabular-nums opacity-50">{tc(total, FPS)}</span>
            <span className="hidden tabular-nums sm:inline">
              clip {String(i + 1).padStart(2, "0")}/{String(REEL.length).padStart(2, "0")}
            </span>
            <span className="hidden text-amber md:inline">{FPS} fps</span>
          </div>
        </div>
      </div>

      <p className="border-t border-white/6 px-4 py-2.5 text-center font-mono text-[9.5px] tracking-[0.2em] text-dim uppercase sm:px-5">
        space · play/pause &nbsp;·&nbsp; ←/→ · cut &nbsp;·&nbsp; m · mute &nbsp;·&nbsp; f · fullscreen
      </p>
    </div>
  );
}

function Ctl({
  children,
  onClick,
  label,
  className,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-mute transition-all duration-200 hover:border-white/25 hover:bg-white/10 hover:text-white active:scale-[0.92]",
        className,
      )}
    >
      {children}
    </button>
  );
}
