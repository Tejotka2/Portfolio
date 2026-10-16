import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CATEGORIES, PROJECTS, type Project } from "../data/site";
import { cn } from "../utils/cn";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { EASE, Reveal, SectionHead } from "./ui";

export default function Projects() {
  const [cat, setCat] = useState<string>("all");
  const [open, setOpen] = useState<Project | null>(null);

  const list = useMemo(
    () => (cat === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === cat)),
    [cat],
  );

  const step = (dir: 1 | -1) => {
    if (!open) return;
    const idx = list.findIndex((p) => p.id === open.id);
    const next = list[(idx + dir + list.length) % list.length];
    setOpen(next ?? null);
  };

  return (
    <section id="prace" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionHead
          index="§ 02 — selected work"
          title={
            <>
              Projekty, które
              <br />
              robią liczby.
            </>
          }
          lead={
            <>
          
            </>
          }
          aside={
            <Reveal delay={0.16}>
              <div className="mt-5 flex items-center gap-3 rounded-lg border border-white/8 bg-white/[0.02] px-3.5 py-2.5 font-mono text-[9.5px] tracking-[0.2em] text-dim uppercase lg:mt-0">
                <span className="h-1.5 w-1.5 rounded-full bg-rec animate-blink" />
                hover = preview · click = full player
              </div>
            </Reveal>
          }
        />

        {/* filters */}
        <Reveal className="mt-10" delay={0.05}>
          <div className="no-bar -mx-1 flex items-center gap-2 overflow-x-auto px-1 pb-1">
            {CATEGORIES.map((c) => {
              const on = cat === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCat(c.id)}
                  data-cursor="FILTER"
                  className={cn(
                    "relative shrink-0 rounded-full px-4 py-2.5 text-[13px] font-medium transition-colors duration-300",
                    on ? "text-black" : "border border-white/10 text-mute hover:border-white/25 hover:text-chalk",
                  )}
                >
                  {on && (
                    <motion.span
                      layoutId="cat-pill"
                      className="absolute inset-0 rounded-full bg-white"
                      transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    {c.label}
                    <span
                      className={cn(
                        "font-mono text-[9.5px] tabular-nums",
                        on ? "text-black/45" : "text-dim",
                      )}
                    >
                      {String(c.count).padStart(2, "0")}
                    </span>
                  </span>
                </button>
              );
            })}
            <span className="ml-auto hidden shrink-0 font-mono text-[9.5px] tracking-[0.2em] text-dim uppercase md:block">
              {String(list.length).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")} shown
            </span>
          </div>
        </Reveal>

        {/* bento grid */}
        <motion.div layout className="mt-6 grid grid-cols-12 gap-4 sm:gap-5">
          <AnimatePresence mode="popLayout" initial={false}>
            {list.map((p, n) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 28, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.6, delay: n * 0.04, ease: EASE }}
                className={cn("col-span-12", p.span)}
              >
                <ProjectCard p={p} onOpen={setOpen} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProjectModal project={open} onClose={() => setOpen(null)} onStep={step} />
    </section>
  );
}
