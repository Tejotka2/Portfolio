import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowUpRight, Clock3, Eye, Layers } from "lucide-react";
import type { Project } from "../data/site";
import { cn } from "../utils/cn";
import { Tag, VideoPreview } from "./ui";

const CAT_LABEL: Record<Project["category"], string> = {
  short: "short-form",
  long: "long-form",
  commercial: "commercial",
  music: "music video",
};

export default function ProjectCard({
  p,
  onOpen,
}: {
  p: Project;
  onOpen: (p: Project) => void;
}) {
  const card = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);
  const px = useMotionValue(50);
  const py = useMotionValue(50);
  const glow = useTransform(
    [px, py],
    ([x, y]) => `radial-gradient(240px circle at ${x}% ${y}%, rgba(255,255,255,0.14), transparent 68%)`,
  );

  return (
    <motion.div layout className="group/card relative h-full">
      <div
        ref={card}
        role="button"
        tabIndex={0}
        data-cursor="OPEN"
        onClick={() => onOpen(p)}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onOpen(p))}
        onMouseMove={(e) => {
          const r = card.current!.getBoundingClientRect();
          px.set(((e.clientX - r.left) / r.width) * 100);
          py.set(((e.clientY - r.top) / r.height) * 100);
        }}
        className="relative flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border border-white/10 bg-ink-2/60 backdrop-blur-sm transition-[transform,border-color,background-color,box-shadow] duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1.5 hover:border-white/25 hover:bg-ink-3/70 hover:shadow-[0_30px_80px_-30px_rgba(0,0,0,0.95)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber"
      >
        {/* edge glow */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
          style={{ background: glow }}
        />

        {/* media */}
        <div className="relative w-full overflow-hidden" data-cursor="PLAY">
          <VideoPreview
            src={p.src}
            poster={p.poster}
            className={cn("w-full", p.media)}
            onActiveChange={setLive}
          />

          {/* grade + frame */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,.78),transparent_45%,rgba(0,0,0,.35))]" />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />

          {/* top meta */}
          <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-3.5 sm:p-4">
            <span className="flex items-center gap-2 rounded-full border border-white/12 bg-black/45 px-2.5 py-1 font-mono text-[9px] tracking-[0.2em] text-white/80 uppercase backdrop-blur-md">
              <span className={cn("h-1.5 w-1.5 rounded-full bg-white/40", live && "bg-rec animate-blink")} />
              {p.index} · {CAT_LABEL[p.category]}
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-white/12 bg-black/45 px-2.5 py-1 font-mono text-[9px] tracking-[0.16em] text-white/75 uppercase backdrop-blur-md">
              <Clock3 className="h-3 w-3" />
              {p.length}
            </span>
          </div>

          {/* bottom meta */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3.5 sm:p-4">
            <div>
              <h3 className="text-[19px] leading-none font-semibold tracking-tight text-chalk sm:text-[22px]">
                {p.title}
              </h3>
              <p className="mt-1.5 font-mono text-[9.5px] tracking-[0.18em] text-white/55 uppercase">
                {p.client} · {p.year}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <span className="flex items-center gap-1.5 rounded-full border border-white/12 bg-black/45 px-2.5 py-1 font-mono text-[9px] tracking-[0.14em] text-white/80 uppercase backdrop-blur-md">
                <Eye className="h-3 w-3" />
                {p.views}
              </span>
              <motion.span
                animate={{ opacity: live ? 1 : 0.45 }}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md"
              >
                <ArrowUpRight className="h-3.5 w-3.5" />
              </motion.span>
            </div>
          </div>

          {/* hover scanline sweep */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.09),transparent)] opacity-0 group-hover/card:[animation:sweep_1.3s_ease-in-out]" />
        </div>

        {/* body */}
        <div className="relative flex flex-1 flex-col gap-4 border-t border-white/8 p-4 sm:p-5">
          <div className="flex items-start justify-between gap-4">
            <p className="line-clamp-2 text-[13.5px] leading-relaxed text-mute">{p.description}</p>
            <span className="mt-0.5 shrink-0 font-mono text-[9px] tracking-[0.18em] text-amber uppercase">
              {p.retention}
              <span className="ml-1 text-dim">ret.</span>
            </span>
          </div>
          <div className="mt-auto flex flex-wrap items-center gap-1.5">
            <span className="mr-1 flex items-center gap-1 font-mono text-[9px] tracking-[0.18em] text-dim uppercase">
              <Layers className="h-3 w-3" />
              stack
            </span>
            {p.tags.slice(0, 3).map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
