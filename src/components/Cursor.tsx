import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [tint, setTint] = useState<string | null>(null);
  const [hidden, setHidden] = useState(true);

  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const rx = useSpring(mx, { stiffness: 380, damping: 34, mass: 0.5 });
  const ry = useSpring(my, { stiffness: 380, damping: 34, mass: 0.5 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-custom");

    const move = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      setHidden(false);
      const t = e.target as HTMLElement | null;
      const host = t?.closest<HTMLElement>("[data-cursor]");
      if (host) {
        setLabel(host.dataset.cursor || "");
        setTint(host.dataset.cursorTint || null);
      } else {
        setLabel(null);
        setTint(null);
      }
    };
    const leave = () => setHidden(true);

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.documentElement.classList.remove("cursor-custom");
    };
  }, [mx, my]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[200]" aria-hidden>
      {/* hairline crosshair rails */}
      <motion.div
        className="absolute top-0 h-full w-px bg-white/8 mix-blend-difference"
        style={{ x: rx, opacity: hidden ? 0 : 0.5 }}
      />
      <motion.div
        className="absolute left-0 h-px w-full bg-white/8 mix-blend-difference"
        style={{ y: ry, opacity: hidden ? 0 : 0.5 }}
      />

      {/* trailing ring */}
      <motion.div
        className="absolute -ml-[19px] -mt-[19px] flex h-[38px] w-[38px] items-center justify-center mix-blend-difference"
        style={{ x: rx, y: ry, opacity: hidden ? 0 : 1 }}
        animate={{
          scale: label ? 2.05 : 1,
          transition: { type: "spring", stiffness: 420, damping: 30 },
        }}
      >
        <span
          className="absolute inset-0 rounded-full border transition-colors duration-300"
          style={{ borderColor: tint ?? "rgba(255,255,255,0.65)" }}
        />
        <AnimatePresence>
          {label && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.18 }}
              className="font-mono text-[7.5px] font-medium tracking-[0.18em] whitespace-nowrap text-white uppercase"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* leading dot */}
      <motion.div
        className="absolute h-[5px] w-[5px] -ml-[2.5px] -mt-[2.5px] rounded-full bg-white mix-blend-difference"
        style={{ x: mx, y: my, opacity: hidden ? 0 : 1 }}
        animate={{ scale: label ? 0 : 1 }}
      />
    </div>
  );
}
