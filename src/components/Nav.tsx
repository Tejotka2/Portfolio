import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "../utils/cn";
import { CONTACT } from "../data/site";
import { Magnetic } from "./ui";

const LINKS = [
  { id: "reel", label: "Reel" },
  { id: "prace", label: "Prace" },
  { id: "liczby", label: "Liczby" },
  { id: "workflow", label: "Workflow" },
  { id: "opinie", label: "Opinie" },
];

export default function Nav() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("reel");

  useMotionValueEvent(scrollY, "change", (y) => setSolid(y > 24));

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    LINKS.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className={cn(
          "fixed inset-x-0 top-0 z-[110] transition-all duration-500",
          solid ? "border-b border-white/8 bg-ink/72 backdrop-blur-xl" : "border-b border-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-6 px-5 sm:px-8">
          {/* wordmark */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-3"
            data-cursor="TOP"
          >
            <span className="relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-[7px] border border-white/15 bg-white/[0.04]">
              <span className="flex h-3 items-end gap-[2px]">
                {[0, 1, 2, 3].map((n) => (
                  <span
                    key={n}
                    className="eq-bar w-[2px] rounded-sm bg-amber"
                    style={{ height: "100%", animationDelay: `${n * 0.16}s` }}
                  />
                ))}
              </span>
            </span>
            <span className="text-[15px] leading-none font-semibold tracking-tight text-chalk">
              {CONTACT.name}
              <span className="ml-1.5 align-middle font-mono text-[9.5px] tracking-[0.2em] text-dim uppercase">
                / cuts
              </span>
            </span>
          </button>

          {/* links */}
          <nav className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => go(l.id)}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors duration-300",
                  active === l.id ? "text-chalk" : "text-dim hover:text-mute",
                )}
              >
                {active === l.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.06]"
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  />
                )}
                <span className="relative">{l.label}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <span className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[10px] tracking-[0.16em] text-mute uppercase lg:flex">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime" />
              </span>
              wolne terminy
            </span>
            <Magnetic className="hidden sm:block">
              <button
                type="button"
                onClick={() => go("kontakt")}
                className="sheen relative overflow-hidden rounded-full bg-white px-4 py-2.5 text-[13px] font-medium text-black transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] hover:scale-[1.03] active:scale-[0.96]"
                data-cursor="NAPISZ"
              >
                Zapytaj o termin
              </button>
            </Magnetic>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-chalk md:hidden"
              aria-label="Menu"
            >
              <Menu className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[130] bg-ink/92 backdrop-blur-2xl md:hidden"
          >
            <div className="flex h-16 items-center justify-between px-5">
              <span className="font-mono text-[10px] tracking-[0.28em] text-dim uppercase">menu</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-chalk"
                aria-label="Zamknij menu"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>
            <div className="flex flex-col px-5 pt-6">
              {LINKS.concat({ id: "kontakt", label: "Kontakt" }).map((l, n) => (
                <motion.button
                  key={l.id}
                  type="button"
                  onClick={() => go(l.id)}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + n * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-baseline gap-4 border-b border-white/8 py-4 text-left"
                >
                  <span className="font-mono text-[10px] text-dim">0{n + 1}</span>
                  <span className="text-3xl font-medium tracking-tight text-chalk">{l.label}</span>
                </motion.button>
              ))}
              <a
                href={`mailto:${CONTACT.email}`}
                className="mt-8 rounded-full bg-white px-5 py-4 text-center text-[15px] font-medium text-black"
              >
                {CONTACT.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
