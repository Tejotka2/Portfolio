import { motion, useScroll, useSpring } from "framer-motion";

/** Layered, always-on background: hairline grid, warm/cool light pools, film grain, vignette. */
export default function Ambient() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-ink" />

      {/* light pools */}
      <div
        className="absolute -top-[28vh] -left-[18vw] h-[70vh] w-[70vw] rounded-full opacity-[0.5] blur-[110px]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,180,84,0.16), rgba(255,77,61,0.05) 45%, transparent 70%)",
        }}
      />
      <div
        className="absolute -right-[22vw] top-[22vh] h-[62vh] w-[58vw] rounded-full opacity-[0.42] blur-[120px]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(88,211,198,0.13), rgba(157,140,255,0.06) 48%, transparent 72%)",
        }}
      />

      {/* hairline grid, masked toward the top */}
      <div className="hairline-grid absolute inset-0 opacity-70 [mask-image:radial-gradient(120%_85%_at_50%_0%,#000_15%,transparent_78%)]" />

      {/* scanline sweep */}
      <motion.div
        className="absolute inset-x-0 h-[38vh] opacity-[0.055]"
        style={{
          background: "linear-gradient(to bottom, transparent, #fff 55%, transparent)",
        }}
        animate={{ y: ["-40vh", "110vh"] }}
        transition={{ duration: 13, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
      />

      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(120% 100% at 50% 40%, transparent 40%, rgba(0,0,0,0.72) 100%)" }}
      />

      {/* grain */}
      <div className="grain animate-grain absolute -inset-[12%] opacity-[0.05] mix-blend-overlay" />
    </div>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 180, damping: 30, mass: 0.3 });

  return (
    <motion.div
      className="fixed top-0 left-0 z-[120] h-[2px] w-full origin-x"
      style={{
        scaleX: x,
        background: "linear-gradient(90deg, rgba(255,180,84,0.9), #fff 55%, rgba(88,211,198,0.85))",
        boxShadow: "0 0 18px rgba(255,180,84,0.55)",
      }}
      aria-hidden
    />
  );
}
