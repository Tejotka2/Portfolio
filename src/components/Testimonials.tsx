import { Quote, Star } from "lucide-react";
import { TESTIMONIALS } from "../data/site";
import Marquee from "./Marquee";
import { Reveal, SectionHead } from "./ui";

function Card({ t }: { t: (typeof TESTIMONIALS)[number] }) {
  return (
    <figure
      className="group relative flex w-[320px] shrink-0 flex-col justify-between gap-6 overflow-hidden rounded-xl border border-white/10 bg-ink-2/60 p-5 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1.5 hover:border-white/25 hover:bg-ink-3/70 sm:w-[380px]"
    >
      <span
        className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-25"
        style={{ background: t.tint }}
      />
      <Quote className="h-4 w-4 -scale-x-100 text-dim transition-colors duration-500 group-hover:text-amber" />

      <blockquote className="text-[14.5px] leading-[1.65] text-mute transition-colors duration-500 group-hover:text-chalk">
        {t.q}
      </blockquote>

      <figcaption className="flex items-center gap-3 border-t border-white/8 pt-4">
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-medium"
          style={{ background: `${t.tint}1f`, color: t.tint, boxShadow: `inset 0 0 0 1px ${t.tint}40` }}
        >
          {t.i}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[13.5px] font-medium text-chalk">{t.n}</span>
          <span className="block truncate font-mono text-[9.5px] tracking-[0.14em] text-dim uppercase">
            {t.r}
          </span>
        </span>
        <span className="ml-auto flex shrink-0 gap-0.5">
          {Array.from({ length: 5 }).map((_, n) => (
            <Star key={n} className="h-3 w-3 fill-amber text-amber" />
          ))}
        </span>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  const rowA = TESTIMONIALS.map((t) => <Card key={`a-${t.i}`} t={t} />);
  const rowB = [...TESTIMONIALS].reverse().map((t) => <Card key={`b-${t.i}`} t={t} />);

  return (
    <section id="opinie" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionHead
          index="§ 05 — testimonials"
          title={
            <>
              Mówią, że montaż
              <br />
              dowozi liczby.
            </>
          }
          lead={
            <>
              Producenci, twórcy i marki, z którymi pracuję na stałe. Bez agencji-pośredników, bez
              przesuwanych terminów, bez nieskończonych rund poprawek.
            </>
          }
          aside={
            <Reveal delay={0.14}>
              <div className="mt-5 flex items-center gap-4 lg:mt-0 lg:justify-end">
                <div className="text-right">
                  <p className="text-[26px] leading-none font-medium text-chalk">4,97<span className="text-dim">/5</span></p>
                  <p className="mt-1 font-mono text-[9.5px] tracking-[0.18em] text-dim uppercase">
                    38 ocen · frame.io
                  </p>
                </div>
                <span className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, n) => (
                    <Star key={n} className="h-3.5 w-3.5 fill-amber text-amber" />
                  ))}
                </span>
              </div>
            </Reveal>
          }
        />
      </div>

      <div className="mt-12 space-y-4">
        <Marquee dur="58s" items={rowA} gap="gap-4" itemClassName="py-1" />
        <Marquee reverse dur="66s" items={rowB} gap="gap-4" itemClassName="py-1" />
      </div>
    </section>
  );
}
