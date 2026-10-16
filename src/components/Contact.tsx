import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { CONTACT, SOCIALS } from "../data/site";
import { cn } from "../utils/cn";
import { IconInstagram, IconTelegram, IconVimeo, IconX, IconYoutube } from "./icons";
import { Magnetic, MaskLines, Reveal } from "./ui";

const TYPES = ["Short-form / Reels", "YouTube long-form", "Reklama", "Teledysk", "Inne"];
const TERMS = ["ASAP (< 7 dni)", "2–4 tygodnie", "Pakiet miesięczny", "Stała współpraca"];

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  yt: IconYoutube,
  x: IconX,
  ig: IconInstagram,
  vm: IconVimeo,
  tg: IconTelegram,
};

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    type: TYPES[0],
    term: TERMS[1],
    budget: 4500,
    msg: "",
  });
  const [now, setNow] = useState("--:--:--");

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

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
    } catch {
      try {
        const ta = document.createElement("textarea");
        ta.value = CONTACT.email;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand?.("copy");
        ta.remove();
      } catch {
        /* clipboard niedostępny — e-mail i tak jest widoczny */
      }
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = [
      `Imię / marka: ${form.name}`,
      `Typ projektu: ${form.type}`,
      `Termin: ${form.term}`,
      `Budżet: ${form.budget} PLN`,
      "",
      form.msg,
    ].join("\n");
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      `Brief — ${form.type}`,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
    window.setTimeout(() => setSent(false), 4000);
  };

  return (
    <footer id="kontakt" className="relative pt-20 sm:pt-28">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="border-t border-white/10 pt-10">
          <Reveal>
            <p className="font-mono text-[10px] tracking-[0.3em] text-amber uppercase">
              § 06 — let's cut something
            </p>
          </Reveal>

          <h2 className="mt-6 text-[clamp(2.3rem,8vw,6rem)] leading-[0.94] font-medium text-chalk">
            <MaskLines
              lines={[
                <>Masz projekt?</>,
                <span className="text-mute">Stwórzmy coś</span>,
                <span className="relative flex w-full items-center gap-5">
                  niesamowitego.
                  <span className="hidden h-[3px] flex-1 bg-gradient-to-r from-amber/70 to-transparent sm:block" />
                </span>,
              ]}
            />
          </h2>
        </div>

        <div className="mt-14 grid gap-4 pb-16 lg:grid-cols-12 lg:gap-5">
          {/* brief form */}
          <Reveal className="lg:col-span-7">
            <form
              onSubmit={submit}
              className="h-full overflow-hidden rounded-xl border border-white/10 bg-ink-2/60 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between border-b border-white/8 px-5 py-3">
                <span className="font-mono text-[9.5px] tracking-[0.26em] text-dim uppercase">
                  szybki brief · 40 sekund
                </span>
                <span className="flex items-center gap-2 font-mono text-[9.5px] tracking-[0.18em] text-lime uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-lime animate-blink" />
                  odpowiadam w 12h
                </span>
              </div>

              <div className="space-y-5 p-5 sm:p-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="imię / marka">
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Jan Kowalski"
                      className="w-full bg-transparent pb-2 text-[15px] text-chalk placeholder:text-dim/70 focus:outline-none"
                    />
                  </Field>
                  <Field label="e-mail">
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="jan@studio.pl"
                      className="w-full bg-transparent pb-2 text-[15px] text-chalk placeholder:text-dim/70 focus:outline-none"
                    />
                  </Field>
                </div>

                <Field label="typ projektu">
                  <div className="mt-1 flex flex-wrap gap-2">
                    {TYPES.map((t) => (
                      <Chip key={t} on={form.type === t} onClick={() => setForm({ ...form, type: t })}>
                        {t}
                      </Chip>
                    ))}
                  </div>
                </Field>

                <Field label="termin / forma">
                  <div className="mt-1 flex flex-wrap gap-2">
                    {TERMS.map((t) => (
                      <Chip key={t} on={form.term === t} onClick={() => setForm({ ...form, term: t })}>
                        {t}
                      </Chip>
                    ))}
                  </div>
                </Field>

                <Field label={`budżet · ${form.budget.toLocaleString("pl-PL")} PLN`}>
                  <input
                    type="range"
                    min={500}
                    max={20000}
                    step={250}
                    value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: Number(e.target.value) })}
                    className="budget mt-3 w-full cursor-pointer"
                    style={{
                      background: `linear-gradient(90deg, #ffb454 ${((form.budget - 500) / 19500) * 100}%, rgba(255,255,255,0.1) ${((form.budget - 500) / 19500) * 100}%)`,
                    }}
                  />
                  <div className="mt-2 flex justify-between font-mono text-[9px] tracking-[0.16em] text-dim uppercase">
                    <span>500</span>
                    <span>20 000+</span>
                  </div>
                </Field>

                <Field label="o czym to jest?">
                  <textarea
                    rows={3}
                    value={form.msg}
                    onChange={(e) => setForm({ ...form, msg: e.target.value })}
                    placeholder="Materiał, długość, referencje, link do dysku…"
                    className="mt-1 w-full resize-none bg-transparent text-[15px] leading-relaxed text-chalk placeholder:text-dim/70 focus:outline-none"
                  />
                </Field>

                <Magnetic strength={0.2}>
                  <button
                    type="submit"
                    data-cursor="SEND"
                    className={cn(
                      "sheen relative mt-1 flex w-full items-center justify-center gap-3 overflow-hidden rounded-full py-4 text-[14.5px] font-medium transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] active:scale-[0.98]",
                      sent ? "bg-lime text-black" : "bg-white text-black hover:scale-[1.01]",
                    )}
                  >
                    {sent ? (
                      <>
                        <Check className="h-4 w-4" /> Otwieram klienta pocztowego…
                      </>
                    ) : (
                      <>
                        Wyślij brief <ArrowUpRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </Magnetic>
              </div>
            </form>
          </Reveal>

          {/* contact panel */}
          <div className="grid gap-4 lg:col-span-5">
            <Reveal delay={0.08}>
              <div className="rounded-xl border border-white/10 bg-ink-2/60 p-5 backdrop-blur-sm sm:p-6">
                <p className="font-mono text-[9.5px] tracking-[0.26em] text-dim uppercase">bezpośrednio</p>
                <button
                  type="button"
                  onClick={copy}
                  data-cursor={copied ? "OK!" : "COPY"}
                  className="group mt-3 flex w-full items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3.5 text-left transition-all duration-300 hover:border-white/30 hover:bg-white/[0.06]"
                >
                  <span className="truncate text-[15px] font-medium text-chalk">{CONTACT.email}</span>
                  <span className="flex shrink-0 items-center gap-2 font-mono text-[9.5px] tracking-[0.16em] uppercase">
                    <motion.span
                      animate={copied ? { opacity: [0, 1], y: [4, 0] } : { opacity: 1, y: 0 }}
                      className={cn(copied ? "text-lime" : "text-dim group-hover:text-mute")}
                    >
                      {copied ? "skopiowano!" : "kopiuj"}
                    </motion.span>
                    <span
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full border transition-colors duration-300",
                        copied
                          ? "border-lime/40 bg-lime/12 text-lime"
                          : "border-white/12 text-mute group-hover:border-white/30 group-hover:text-chalk",
                      )}
                    >
                      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    </span>
                  </span>
                </button>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <Info k="lokalizacja" v={CONTACT.city} />
                  <Info k="czas lokalny" v={now} accent />
                  <Info k="dostępność" v={CONTACT.availability} />
                  <Info k="response time" v="< 12 godzin" />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="overflow-hidden rounded-xl border border-white/10 bg-ink-2/60 backdrop-blur-sm">
                {SOCIALS.map((s) => {
                  const Icon = ICONS[s.id] ?? IconVimeo;
                  return (
                    <a
                      key={s.id}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      data-cursor="OPEN"
                      className="group flex items-center gap-4 border-b border-white/8 px-5 py-4 transition-colors duration-400 last:border-b-0 hover:bg-white/[0.04]"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-mute transition-all duration-400 group-hover:border-white/30 group-hover:text-chalk">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span>
                        <span className="block text-[14px] font-medium text-chalk">{s.label}</span>
                        <span className="block font-mono text-[9.5px] tracking-[0.16em] text-dim uppercase">
                          {s.handle}
                        </span>
                      </span>
                      <ArrowUpRight className="ml-auto h-4 w-4 text-dim transition-all duration-400 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-amber" />
                    </a>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* bottom bar */}
      <div className="border-t border-white/8">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="font-mono text-[9.5px] tracking-[0.2em] text-dim uppercase">
            © 2026 {CONTACT.name} · {CONTACT.role} · wszystkie prawa zastrzeżone
          </p>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-2 font-mono text-[9.5px] tracking-[0.2em] text-dim uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-rec animate-blink" />
              {now} waw
            </span>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              data-cursor="TOP"
              className="group flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 font-mono text-[9.5px] tracking-[0.2em] text-mute uppercase transition-colors duration-300 hover:border-white/30 hover:text-chalk"
            >
              back to top
              <motion.span
                className="block h-3 w-px bg-amber"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="font-mono text-[9.5px] tracking-[0.22em] text-dim uppercase">{label}</span>
      <span className="mt-1.5 block border-b border-white/10 transition-colors duration-300 focus-within:border-amber/70">
        {children}
      </span>
    </label>
  );
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3.5 py-2 text-[12.5px] transition-all duration-300 active:scale-[0.96]",
        on
          ? "border-amber/60 bg-amber/12 text-amber"
          : "border-white/10 text-mute hover:border-white/28 hover:text-chalk",
      )}
    >
      {children}
    </button>
  );
}

function Info({ k, v, accent }: { k: string; v: string; accent?: boolean }) {
  return (
    <div className="rounded-lg border border-white/8 bg-white/[0.02] px-3.5 py-3">
      <p className="font-mono text-[9px] tracking-[0.16em] text-dim uppercase">{k}</p>
      <p
        className={cn(
          "mt-1 font-mono text-[12.5px] tracking-tight text-chalk tabular-nums",
          accent && "text-amber",
        )}
      >
        {v}
      </p>
    </div>
  );
}
