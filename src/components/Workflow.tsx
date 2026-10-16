import { motion } from "framer-motion";
import { PROCESS, TICKER, TOOLS } from "../data/site";
import { cn } from "../utils/cn";
import Marquee from "./Marquee";
import { EASE, Reveal, SectionHead } from "./ui";

const PLUGINS = ["FilmConvert", "Boris FX", "Red Giant", "Motion Bro", "Descript", "Epidemic Sound", "Frame.io"];

export default function Workflow() {
  return (
    <section id="workflow" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionHead
          index="§ 04 — workflow & toolstack"
          title={
            <>
              Proces bez
              <br />
              niespodzianek.
            </>
          }
          lead={
            <>
              Cztery etapy, stały kontakt i poprawki przez Frame.io z komentarzami na klatce. Wiesz, co
              się dzieje z Twoim materiałem na każdym kroku.
            </>
          }
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-12 lg:gap-5">
          {/* process */}
          <div className="lg:col-span-6">
            <Reveal>
              <div className="overflow-hidden rounded-xl border border-white/10 bg-ink-2/50 backdrop-blur-sm">
                <div className="flex items-center justify-between border-b border-white/8 px-5 py-3">
                  <span className="font-mono text-[9.5px] tracking-[0.26em] text-dim uppercase">
                    pipeline · 4 stages
                  </span>
                  <span className="font-mono text-[9.5px] tracking-[0.2em] text-amber uppercase">
                    avg. 6 dni
                  </span>
                </div>

                {PROCESS.map((s, n) => (
                  <motion.div
                    key={s.n}
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.7, delay: n * 0.08, ease: EASE }}
                    className="group relative border-b border-white/8 px-5 py-5 transition-colors duration-500 last:border-b-0 hover:bg-white/[0.035] sm:px-6"
                  >
                    <span className="absolute top-0 left-0 h-full w-[2px] origin-top scale-y-0 bg-amber transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-y-100" />
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-[11px] tracking-[0.14em] text-dim transition-colors duration-500 group-hover:text-amber">
                        {s.n}
                      </span>
                      <h3 className="text-[17px] font-medium tracking-tight text-chalk transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-1">
                        {s.t}
                      </h3>
                      <span className="ml-auto shrink-0 rounded-full border border-white/10 px-2.5 py-1 font-mono text-[9px] tracking-[0.16em] text-mute uppercase">
                        {s.meta}
                      </span>
                    </div>
                    <p className="mt-2.5 max-w-lg pl-8 text-[13.5px] leading-relaxed text-mute sm:pl-9">
                      {s.d}
                    </p>
                  </motion.div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* toolstack */}
          <div className="lg:col-span-6">
            <Reveal delay={0.08}>
              <div className="h-full overflow-hidden rounded-xl border border-white/10 bg-ink-2/50 p-5 backdrop-blur-sm sm:p-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9.5px] tracking-[0.26em] text-dim uppercase">
                    toolstack · 2026
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-[9.5px] tracking-[0.2em] text-mute uppercase">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal" />
                    certyfikowany workflow
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  {TOOLS.map((tool, n) => (
                    <motion.div
                      key={tool.name}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.5, delay: n * 0.045, ease: EASE }}
                      className="group"
                    >
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-[14px] font-medium text-chalk">{tool.name}</span>
                        <span className="font-mono text-[9.5px] tracking-[0.14em] text-dim uppercase">
                          {tool.note}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center gap-3">
                        <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/8">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: tool.tint, boxShadow: `0 0 12px ${tool.tint}66` }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${tool.level}%` }}
                            viewport={{ once: true, amount: 0.6 }}
                            transition={{ duration: 1.2, delay: 0.15 + n * 0.05, ease: EASE }}
                          />
                        </div>
                        <span className="w-8 shrink-0 text-right font-mono text-[10px] text-mute tabular-nums">
                          {tool.level}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-7 border-t border-white/8 pt-5">
                  <p className="font-mono text-[9.5px] tracking-[0.26em] text-dim uppercase">
                    plugins & assets
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {PLUGINS.map((p) => (
                      <span
                        key={p}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[12px] text-mute transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:text-chalk"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ticker */}
      <div className="mt-16 border-y border-white/8 py-6 sm:mt-20">
        <Marquee
          dur="44s"
          className="[&_*]:text-[clamp(1.6rem,4.4vw,3rem)]"
          itemClassName="font-medium tracking-tight text-white/12 uppercase transition-colors duration-500 hover:text-white/45"
          gap="gap-8"
          items={TICKER.map((t, n) => (
            <span key={t} className="flex items-center gap-8">
              {t}
              <span className={cn("h-1.5 w-1.5 rounded-full", n % 2 ? "bg-amber/40" : "bg-teal/40")} />
            </span>
          ))}
        />
        <Marquee
          reverse
          dur="52s"
          className="mt-3"
          itemClassName="font-mono text-[11px] tracking-[0.3em] text-dim uppercase hover:text-amber transition-colors duration-500"
          gap="gap-6"
          items={TOOLS.concat(TOOLS.slice(0, 4)).map((t, n) => (
            <span key={`${t.name}-${n}`} className="flex items-center gap-6">
              <span className="h-px w-6 bg-white/12" />
              {t.name}
            </span>
          ))}
        />
      </div>
    </section>
  );
}
