import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Pause,
  Play,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import type { Project } from "../data/site";
import { cn } from "../utils/cn";
import { EASE, Tag, tc } from "./ui";

export default function ProjectModal({
  project,
  onClose,
  onStep,
}: {
  project: Project | null;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
}) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[150] flex items-start justify-center overflow-y-auto overscroll-contain p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div
            className="fixed inset-0 bg-black/78 backdrop-blur-xl"
            onClick={onClose}
            data-cursor="CLOSE"
            aria-hidden
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="relative z-10 my-auto w-full max-w-6xl overflow-hidden rounded-2xl border border-white/12 bg-ink-2 shadow-[0_60px_160px_-40px_rgba(0,0,0,1)]"
          >
            <Player key={project.id} p={project} />

            <button
              type="button"
              onClick={onClose}
              data-cursor="CLOSE"
              className="absolute top-4 right-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-md transition-all duration-300 hover:rotate-90 hover:border-white/40 hover:bg-black/70"
              aria-label="Zamknij"
            >
              <X className="h-4 w-4" />
            </button>

            {/* info */}
            <div className="grid gap-8 border-t border-white/8 p-5 sm:p-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="font-mono text-[10px] tracking-[0.26em] text-amber uppercase">
                  {project.index} / {project.client}
                </p>
                <h3 className="mt-3 text-[clamp(1.9rem,4vw,2.9rem)] leading-[1] font-medium tracking-tight text-chalk">
                  {project.title}
                </h3>
                <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-mute">{project.description}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/8 bg-white/8">
                  {project.credits.map((c) => (
                    <div key={c.k} className="bg-ink-3 px-4 py-3">
                      <p className="font-mono text-[9px] tracking-[0.18em] text-dim uppercase">{c.k}</p>
                      <p className="mt-1 text-[13.5px] font-medium text-chalk">{c.v}</p>
                    </div>
                  ))}
                  <div className="bg-ink-3 px-4 py-3">
                    <p className="font-mono text-[9px] tracking-[0.18em] text-dim uppercase">wyświetlenia</p>
                    <p className="mt-1 text-[13.5px] font-medium text-amber tabular-nums">{project.views}</p>
                  </div>
                  <div className="bg-ink-3 px-4 py-3">
                    <p className="font-mono text-[9px] tracking-[0.18em] text-dim uppercase">retencja</p>
                    <p className="mt-1 text-[13.5px] font-medium text-lime tabular-nums">{project.retention}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <StepBtn onClick={() => onStep(-1)}>
                    <ChevronLeft className="h-4 w-4" />
                    Poprzedni
                  </StepBtn>
                  <StepBtn onClick={() => onStep(1)} className="ml-auto">
                    Następny
                    <ChevronRight className="h-4 w-4" />
                  </StepBtn>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function StepBtn({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-4 py-2.5 text-[12.5px] font-medium text-mute transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:text-chalk active:scale-[0.96]",
        className,
      )}
    >
      {children}
    </button>
  );
}

function Player({ p }: { p: Project }) {
  const v = useRef<HTMLVideoElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [cur, setCur] = useState(0);
  const [dur, setDur] = useState(0);
  const [drag, setDrag] = useState(false);

  useEffect(() => {
    const el = v.current;
    if (!el) return;
    el.play().catch(() => setPlaying(false));
  }, [p.id]);

  useEffect(() => {
    if (!drag) return;
    const move = (e: PointerEvent) => seek(e.clientX);
    const up = () => setDrag(false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drag]);

  const seek = (clientX: number) => {
    const el = v.current;
    const b = bar.current;
    if (!el || !b || !el.duration) return;
    const r = b.getBoundingClientRect();
    const frac = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
    el.currentTime = frac * el.duration;
    setCur(el.currentTime);
  };

  const toggle = () => {
    const el = v.current;
    if (!el) return;
    if (el.paused) el.play().then(() => setPlaying(true)).catch(() => {});
    else {
      el.pause();
      setPlaying(false);
    }
  };

  const full = () => {
    const el = v.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else el.requestFullscreen?.().catch(() => {});
  };

  const pct = dur ? (cur / dur) * 100 : 0;

  return (
    <div className="relative bg-black">
      <div className={cn("relative w-full", p.portrait ? "aspect-[16/11]" : "aspect-video")}>
        <video
          ref={v}
          src={p.src}
          poster={p.poster}
          muted={muted}
          loop
          playsInline
          preload="auto"
          onClick={toggle}
          data-cursor={playing ? "PAUSE" : "PLAY"}
          className="h-full w-full object-cover"
          onTimeUpdate={(e) => !drag && setCur(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => setDur(e.currentTarget.duration)}
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,.6),transparent_30%)]" />

        <AnimatePresence>
          {!playing && (
            <motion.button
              type="button"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: EASE }}
              onClick={toggle}
              className="absolute inset-0 m-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur-xl transition-colors hover:bg-white/20"
              aria-label="Odtwórz"
            >
              <Play className="ml-1 h-7 w-7 fill-white text-white" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* transport */}
      <div className="flex items-center gap-3 border-t border-white/8 bg-ink-2 px-4 py-3 sm:gap-4">
        <button
          type="button"
          onClick={toggle}
          data-cursor={playing ? "PAUSE" : "PLAY"}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-[1.06] active:scale-[0.94]"
          aria-label={playing ? "Pauza" : "Odtwórz"}
        >
          {playing ? <Pause className="h-3.5 w-3.5 fill-black" /> : <Play className="ml-0.5 h-3.5 w-3.5 fill-black" />}
        </button>

        <div
          ref={bar}
          className="group relative h-6 flex-1 cursor-pointer touch-none"
          onPointerDown={(e) => {
            setDrag(true);
            seek(e.clientX);
          }}
        >
          <div className="absolute top-1/2 h-[3px] w-full -translate-y-1/2 overflow-hidden rounded-full bg-white/12">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,#ffb454,#ff4d3d)]"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div
            className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-0 shadow-[0_0_14px_rgba(255,255,255,0.7)] transition-opacity group-hover:opacity-100"
            style={{ left: `${pct}%`, opacity: drag ? 1 : undefined }}
          />
        </div>

        <span className="shrink-0 font-mono text-[10.5px] tracking-[0.14em] text-mute tabular-nums">
          {tc(cur)} <span className="text-dim">/ {tc(dur)}</span>
        </span>

        <button
          type="button"
          onClick={() => setMuted((m) => !m)}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-mute transition-colors hover:border-white/25 hover:text-white"
          aria-label={muted ? "Włącz dźwięk" : "Wycisz"}
        >
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>
        <button
          type="button"
          onClick={full}
          className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-mute transition-colors hover:border-white/25 hover:text-white sm:flex"
          aria-label="Pełny ekran"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
