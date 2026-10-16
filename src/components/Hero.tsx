import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import { CONTACT } from "../data/site";
import { cn } from "../utils/cn";
import { EASE, Magnetic, MaskLines } from "./ui";
import ReelPlayer from "./ReelPlayer";

const CLIENTS = ["Aurora Motors", "Długa Droga", "Napa Soda", "KVIT", "Studio Północ", "LayG Travel"];

export default function Hero() {
  return (
    <section id="reel" className="relative pt-28 pb-16 sm:pt-32 lg:pt-40 lg:pb-24">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* ---------------------------------------------------------- copy */}
          <div className="lg:col-span-7 xl:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] tracking-[0.26em] text-dim uppercase"
            >
              <span className="text-amber">turning raw footage into dopamine</span>
              <span className="hidden h-px w-10 bg-white/15 sm:block" />
              <span>video editor · {CONTACT.city}</span>
            </motion.div>

            <h1 className="mt-6 text-[clamp(2.6rem,8.4vw,6.1rem)] leading-[0.94] font-medium text-chalk">
              <MaskLines
                lines={[
                  <>Montaż, który</>,
                  <>zatrzymuje uwagę</>,
                  <span className="relative inline-block">
                    na dłużej.
                    <motion.span
                      className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full bg-amber"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 1.1, delay: 0.95, ease: EASE }}
                    />
                  </span>,
                ]}
                delay={0.15}
              />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
              className="mt-9 max-w-xl text-[16.5px] leading-[1.65] text-mute sm:text-[17.5px]"
            >
              Short-form, który łapie scroll w 1.2 sekundy. Long-form, który trzyma retencję przez
              18 minut. Reklamy i teledyski montowane na klatkę — od rough cutu, przez motion i
              kolor, po dźwięk i delivery.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.72, ease: EASE }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Magnetic>
                <a
                  href="#reel"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("player")?.scrollIntoView({ behavior: "smooth", block: "center" });
                  }}
                  data-cursor="PLAY"
                  className="sheen group relative flex items-center gap-3 overflow-hidden rounded-full bg-white py-4 pr-6 pl-5 text-[14.5px] font-medium text-black transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] hover:scale-[1.03] active:scale-[0.97]"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-white">
                    <Play className="ml-px h-3 w-3 fill-white" />
                  </span>
                  Zobacz showreel
                </a>
              </Magnetic>

              <Magnetic strength={0.22}>
                <a
                  href="#kontakt"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  data-cursor="HELLO"
                  className="group flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.03] px-6 py-4 text-[14.5px] font-medium text-chalk backdrop-blur-sm transition-all duration-300 hover:border-white/35 hover:bg-white/[0.08]"
                >
                  Zapytaj o termin
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Magnetic>
            </motion.div>

            {/* clients */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-12 border-t border-white/8 pt-5"
            >
              <p className="font-mono text-[9.5px] tracking-[0.28em] text-dim uppercase">zaufali mi</p>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
                {CLIENTS.map((c) => (
                  <span
                    key={c}
                    className="text-[13.5px] font-medium text-mute/70 transition-colors duration-300 hover:text-chalk"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ------------------------------------------------------- monitor */}
          <div className="lg:col-span-5 xl:col-span-4">
            <Monitor />
          </div>
        </div>

        {/* ---------------------------------------------------------- player */}
        <motion.div
          id="player"
          initial={{ opacity: 0, y: 46 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: EASE }}
          className="relative mt-14 lg:mt-20"
        >
          <div className="pointer-events-none absolute -inset-x-6 -top-6 bottom-8 rounded-[28px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(255,180,84,0.12),transparent_70%)] blur-2xl" />
          <ReelPlayer />
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] tracking-[0.22em] text-dim uppercase">
            <span>showreel 2026 · 5 cuts · 00:27</span>
            <span className="flex items-center gap-2">
              <span className="h-px w-8 bg-white/20" />
              scroll po więcej
              <motion.span
                className="block h-3 w-px bg-amber"
                animate={{ y: [0, 6, 0], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
            <span>shot on 4k · graded in resolve</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Monitor() {
  const [now, setNow] = useState("--:--:--");
  const [views, setViews] = useState(50_284_913);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("pl-PL", {
      timeZone: CONTACT.tz,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setViews((v) => v + Math.floor(Math.random() * 9) + 2);
      setPulse(true);
      window.setTimeout(() => setPulse(false), 420);
    }, 1800);
    return () => window.clearInterval(id);
  }, []);

  return (
    <motion.aside
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.45, ease: EASE }}
      className="relative overflow-hidden rounded-xl border border-white/10 bg-ink-2/70 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between border-b border-white/8 px-5 py-3">
        <span className="font-mono text-[9.5px] tracking-[0.26em] text-dim uppercase">live monitor</span>
        <span className="flex items-center gap-2 font-mono text-[9.5px] tracking-[0.2em] text-lime uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-lime animate-blink" /> online
        </span>
      </div>

      <Row k="lokalny czas" v={now} mono sub={CONTACT.city} />
      <Row
        k="wyświetlenia łącznie"
        v={views.toLocaleString("pl-PL")}
        mono
        accent
        sub={
          <span className="flex items-center gap-1.5 text-lime">
            <span className={cn("transition-transform", pulse && "-translate-y-px")}>▲</span>
            +{Math.floor(Math.random() * 40 + 18)} / min
          </span>
        }
      />
      <Row k="status" v={CONTACT.availability} sub="ostatnia dostawa 3 dni temu" />

      <div className="px-5 py-4">
        <div className="mb-2 flex items-center justify-between font-mono text-[9.5px] tracking-[0.2em] text-dim uppercase">
          <span>kalendarz · marzec</span>
          <span className="text-chalk">78%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
          <motion.div
            className="h-full rounded-full bg-[linear-gradient(90deg,#ffb454,#ff4d3d)]"
            initial={{ width: 0 }}
            animate={{ width: "78%" }}
            transition={{ duration: 1.6, delay: 0.9, ease: EASE }}
          />
        </div>
        <div className="mt-4 grid grid-cols-4 gap-2">
          {[
            { k: "avg. retention", v: "71%" },
            { k: "cut / min", v: "12.4" },
            { k: "rounds", v: "2" },
            { k: "delivery", v: "48h" },
          ].map((s) => (
            <div key={s.k} className="rounded-lg border border-white/8 bg-white/[0.02] px-2.5 py-2">
              <p className="font-mono text-[8.5px] tracking-[0.14em] text-dim uppercase">{s.k}</p>
              <p className="mt-1 text-[15px] font-medium text-chalk tabular-nums">{s.v}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.aside>
  );
}

function Row({
  k,
  v,
  sub,
  mono,
  accent,
}: {
  k: string;
  v: string;
  sub?: React.ReactNode;
  mono?: boolean;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/8 px-5 py-3.5">
      <div>
        <p className="font-mono text-[9.5px] tracking-[0.22em] text-dim uppercase">{k}</p>
        {sub && <p className="mt-1 font-mono text-[9.5px] tracking-[0.14em] text-dim/80 uppercase">{sub}</p>}
      </div>
      <p
        className={cn(
          "text-right text-[15px] font-medium text-chalk",
          mono && "font-mono text-[13.5px] tracking-tight tabular-nums",
          accent && "text-amber",
        )}
      >
        {v}
      </p>
    </div>
  );
}
