import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { STATS } from "../data/site";
import { cn } from "../utils/cn";
import { EASE, Reveal, SectionHead } from "./ui";

function Counter({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 2.1,
  className,
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(v),
    });
    return () => c.stop();
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {val.toFixed(decimals).replace(".", ",")}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const chart = useRef<HTMLDivElement>(null);
  const inView = useInView(chart, { once: true, amount: 0.4 });

  return (
    <section id="liczby" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionHead
          index="§ 03 — impact"
          title={
            <>
              Liczby, które
              <br />
              robią robotę.
            </>
          }
          lead={
            <>
              Montaż to nie estetyka — to wynik. Każde cięcie ma jeden cel: utrzymać widza do ostatniej
              sekundy i dowieźć konwersję.
            </>
          }
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-12 lg:gap-5">
          {/* retention chart */}
          <Reveal className="lg:col-span-7">
            <div
              ref={chart}
              className="relative h-full overflow-hidden rounded-xl border border-white/10 bg-ink-2/60 p-5 backdrop-blur-sm sm:p-7"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[9.5px] tracking-[0.26em] text-dim uppercase">
                    audience retention · long-form
                  </p>
                  <p className="mt-2 text-[26px] leading-none font-medium text-chalk sm:text-[32px]">
                    <Counter to={71} suffix="%" /> <span className="text-dim">średniej retencji</span>
                  </p>
                </div>
                <span className="flex items-center gap-2 rounded-full border border-lime/25 bg-lime/8 px-3 py-1.5 font-mono text-[9.5px] tracking-[0.18em] text-lime uppercase">
                  <TrendingUp className="h-3 w-3" />
                  +18 p.p. vs. benchmark
                </span>
              </div>

              <svg viewBox="0 0 420 150" className="mt-7 w-full" preserveAspectRatio="none" aria-hidden>
                <defs>
                  <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffb454" stopOpacity="0.34" />
                    <stop offset="100%" stopColor="#ffb454" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="lineFill" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#ff4d3d" />
                    <stop offset="55%" stopColor="#ffb454" />
                    <stop offset="100%" stopColor="#c3e86b" />
                  </linearGradient>
                </defs>

                {[0, 1, 2, 3].map((n) => (
                  <line
                    key={n}
                    x1="0"
                    x2="420"
                    y1={12 + n * 42}
                    y2={12 + n * 42}
                    stroke="rgba(255,255,255,0.07)"
                    strokeWidth="1"
                  />
                ))}

                <motion.path
                  d="M0,16 C34,18 46,44 74,50 C104,56 118,44 150,58 C186,74 200,66 236,80 C272,94 288,86 322,98 C352,108 380,104 420,112"
                  fill="none"
                  stroke="url(#lineFill)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : {}}
                  transition={{ duration: 2.1, ease: EASE, delay: 0.15 }}
                />
                <motion.path
                  d="M0,16 C34,18 46,44 74,50 C104,56 118,44 150,58 C186,74 200,66 236,80 C272,94 288,86 322,98 C352,108 380,104 420,112 L420,150 L0,150 Z"
                  fill="url(#areaFill)"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 1.4, delay: 0.7 }}
                />
                <motion.circle
                  cx="420"
                  cy="112"
                  r="4"
                  fill="#c3e86b"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 2, type: "spring", stiffness: 300, damping: 16 }}
                />
                <motion.circle
                  cx="420"
                  cy="112"
                  r="4"
                  fill="none"
                  stroke="#c3e86b"
                  strokeWidth="1.5"
                  initial={{ opacity: 0.8, scale: 1 }}
                  animate={inView ? { opacity: [0.7, 0], scale: [1, 4] } : {}}
                  transition={{ delay: 2.1, duration: 2, repeat: Infinity, repeatDelay: 0.6 }}
                />
              </svg>

              <div className="mt-3 flex justify-between font-mono text-[9px] tracking-[0.16em] text-dim uppercase">
                <span>00:00 hook</span>
                <span className="hidden sm:inline">04:30 re-cut</span>
                <span className="hidden sm:inline">11:00 payoff</span>
                <span>18:24 end</span>
              </div>
            </div>
          </Reveal>

          {/* counters */}
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1 lg:gap-5">
            {STATS.map((s, n) => (
              <Reveal key={s.label} delay={n * 0.07} className="h-full">
                <div
                  className={cn(
                    "group relative flex h-full items-baseline justify-between gap-4 overflow-hidden rounded-xl border border-white/10 bg-ink-2/50 px-5 py-5 backdrop-blur-sm transition-colors duration-500 hover:border-white/25",
                    n === 0 && "sm:col-span-2 lg:col-span-1",
                  )}
                >
                  <div className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-amber to-transparent transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100" />
                  <div>
                    <p className="text-[13.5px] font-medium text-mute">{s.label}</p>
                    <p className="mt-1 font-mono text-[9.5px] tracking-[0.16em] text-dim uppercase">{s.sub}</p>
                  </div>
                  <p
                    className={cn(
                      "shrink-0 font-medium tracking-tight text-chalk",
                      n === 0 ? "text-[clamp(2.4rem,6vw,3.4rem)] leading-none" : "text-[clamp(1.9rem,4.4vw,2.6rem)] leading-none",
                    )}
                  >
                    <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.value % 1 !== 0 ? 1 : 0} />
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
