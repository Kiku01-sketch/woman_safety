import { useState } from "react";
import { DIGITAL_TIPS, FIVE_DS, MOVES, RIGHTS } from "../data";
import {
  DIGITAL_ICONS,
  IconChevron,
  IconPhone,
  IconScales,
  MOVE_ICONS,
  Reveal,
  SectionHeading,
} from "../ui";

/* ------------------------------------------------------------------ */
/*  Know your rights — sticky rail + accordion                         */
/* ------------------------------------------------------------------ */
export function RightsSection() {
  const [active, setActive] = useState(RIGHTS[0].id);
  const [openQ, setOpenQ] = useState(0);
  const category = RIGHTS.find((c) => c.id === active) ?? RIGHTS[0];

  const select = (id: string) => {
    setActive(id);
    setOpenQ(0);
  };

  return (
    <section id="rights" className="relative bg-shell text-ink">
      <div className="dot-grid absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <SectionHeading
          tone="light"
          kicker="Knowledge — Know your rights"
          title={
            <>
              The law is on your side.
              <em className="text-rosewood"> Even when it doesn't feel like it.</em>
            </>
          }
          lead="Rights translated from legalese into plain words — what counts as a crime, what orders you can get, and how to file. Examples drawn from India, the UK and the US; local helplines can confirm your jurisdiction."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          {/* sticky category rail */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="flex flex-wrap gap-2.5 lg:flex-col lg:gap-3">
              {RIGHTS.map((c, i) => {
                const isActive = c.id === active;
                return (
                  <Reveal key={c.id} delay={i * 60} className="lg:w-full">
                    <button
                      onClick={() => select(c.id)}
                      aria-pressed={isActive}
                      className={`group flex w-full items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-all duration-300 ${
                        isActive
                          ? "border-rosewood bg-ink text-petal shadow-[0_18px_44px_-20px_rgba(28,15,32,0.7)]"
                          : "border-wine/15 bg-white/70 hover:-translate-y-0.5 hover:border-wine/40"
                      }`}
                    >
                      <span className={`font-display text-xl font-black ${isActive ? "text-flare" : "text-rosewood/30"}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1">
                        <span className={`font-display block text-lg font-black leading-tight ${isActive ? "text-petal" : "text-ink"}`}>
                          {c.title}
                        </span>
                        <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${isActive ? "text-mist" : "text-wine/50"}`}>
                          {c.kicker}
                        </span>
                      </span>
                      <span className={`transition-transform duration-300 ${isActive ? "translate-x-1 text-flare" : "text-wine/30 group-hover:translate-x-1"}`}>
                        <IconChevron className="h-5 w-5 -rotate-90" />
                      </span>
                    </button>
                  </Reveal>
                );
              })}
            </div>
            <Reveal delay={420}>
              <div className="mt-8 hidden rounded-2xl border border-gold/40 bg-gold/10 p-5 lg:block">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gold">
                  <IconScales className="h-4 w-4" /> Free legal aid exists
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">
                  NALSA (India), legal-aid societies (US/UK) and law-school clinics all take
                  cases at no cost. You never need money to be protected.
                </p>
              </div>
            </Reveal>
          </div>

          {/* accordion */}
          <div key={category.id} className="space-y-4">
            {category.items.map((item, i) => {
              const open = openQ === i;
              return (
                <Reveal key={item.q} delay={i * 100}>
                  <div
                    className={`rounded-3xl border transition-all duration-400 ${
                      open ? "border-rosewood/50 bg-white shadow-[0_26px_60px_-30px_rgba(217,46,92,0.45)]" : "border-wine/15 bg-white/65 hover:border-wine/35"
                    }`}
                  >
                    <button
                      className="flex w-full items-center gap-4 px-6 py-5 text-left sm:px-8"
                      onClick={() => setOpenQ(open ? -1 : i)}
                      aria-expanded={open}
                    >
                      <span className={`font-display flex-1 text-lg font-black leading-snug sm:text-xl ${open ? "text-rosewood" : "text-ink"}`}>
                        {item.q}
                      </span>
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-400 ${
                          open ? "rotate-180 border-rosewood bg-rosewood text-petal" : "border-wine/25 text-wine/60"
                        }`}
                      >
                        <IconChevron className="h-4 w-4" />
                      </span>
                    </button>
                    <div className={`acc-body ${open ? "open" : ""}`}>
                      <div className="acc-inner">
                        <div className="space-y-3 border-t border-wine/10 px-6 py-5 sm:px-8">
                          {item.body.map((p) => (
                            <p key={p.slice(0, 24)} className="text-[15px] leading-relaxed text-ink/75">
                              {p}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
            <Reveal delay={260}>
              <p className="px-2 pt-2 text-xs leading-relaxed text-wine/50">
                Laws differ by country, state and circumstance — treat this as orientation, and
                confirm specifics with a local advocate or lawyer. Nothing here is legal advice.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Self-defense                                                       */
/* ------------------------------------------------------------------ */
export function SelfDefense() {
  return (
    <section id="defense" className="relative overflow-hidden bg-ink">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute -left-32 top-24 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(247,92,126,0.14),transparent_65%)]" />
        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(239,163,60,0.1),transparent_60%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            tone="dark"
            kicker="Knowledge — 5 moves that matter"
            title={
              <>
                You don't need to win.
                <em className="text-gold"> You need to get away.</em>
              </>
            }
            lead="Real self-defense is 90% awareness and voice, 10% technique. These five come from women's IMPACT and Krav Maga curricula — practice them once, and your body will remember."
          />
          <Reveal delay={200}>
            <div className="max-w-xs rounded-2xl border border-gold/40 bg-plum/70 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Myth to retire</p>
              <p className="mt-2 text-sm leading-relaxed text-shell/70">
                Keys between the knuckles? Forget it — you'll break your own hand.
                Open palm, hard targets, loud voice, then run toward people and light.
              </p>
            </div>
          </Reveal>
        </div>

        <ol className="mt-14">
          {MOVES.map((m, i) => {
            const Icon = MOVE_ICONS[m.icon];
            return (
              <Reveal key={m.n} delay={i * 80}>
                <li
                  className={`group grid items-center gap-5 border-t border-wine/50 py-7 transition-all duration-400 last:border-b hover:bg-plum/50 hover:pl-4 sm:grid-cols-[90px_1fr_2fr_auto] sm:gap-8 sm:py-9 ${
                    i % 2 === 1 ? "sm:pl-10 lg:pl-24" : ""
                  }`}
                >
                  <span className="font-display text-6xl font-black leading-none text-wine transition-colors duration-400 group-hover:text-flare sm:text-7xl">
                    {m.n}
                  </span>
                  <div className="flex items-center gap-4">
                    <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl border border-wine/60 bg-plum p-3 text-mist transition-all duration-400 group-hover:border-flare/60 group-hover:text-flare">
                      <Icon className="h-7 w-7" />
                    </span>
                    <div>
                      <h3 className="font-display text-2xl font-black text-petal">{m.title}</h3>
                      <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.24em] text-gold">{m.target}</p>
                    </div>
                  </div>
                  <p className="text-[15px] leading-relaxed text-shell/70">{m.how}</p>
                  <span className="hidden text-shell/25 transition-all duration-400 group-hover:translate-x-2 group-hover:text-flare sm:block">
                    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 12h15M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </li>
              </Reveal>
            );
          })}
        </ol>

        <Reveal delay={200}>
          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-shell/50">
            Reading is not training. A single weekend course — IMPACT, Model Mugging, Krav Maga
            or a local women's self-defense workshop — teaches these under stress and builds the
            reflex that reading can't. Many are free through community centres and campuses.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Bystander — the 5 Ds                                               */
/* ------------------------------------------------------------------ */
export function FiveDs() {
  return (
    <section id="bystander" className="relative overflow-hidden bg-wine">
      <div className="dot-grid-light absolute inset-0 opacity-25" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              tone="dark"
              kicker="For allies — Bystander power"
              title={
                <>
                  See something?
                  <em className="text-gold"> Be the reason she got home.</em>
                </>
              }
              lead="Most harassment happens in front of witnesses who freeze. The 5 Ds — taught by Green Dot and Hollaback! — turn freezing into five moves anyone can make, at any comfort level."
            />
            <Reveal delay={250}>
              <p className="mt-8 max-w-md text-sm leading-relaxed text-shell/60">
                You don't have to be brave for all five. One <span className="font-bold text-petal">Distract</span> from
                a stranger has ended more incidents than any confrontation ever has.
              </p>
            </Reveal>
          </div>

          <div className="space-y-4">
            {FIVE_DS.map((d, i) => (
              <Reveal key={d.d} delay={i * 90}>
                <div
                  className="group relative overflow-hidden rounded-3xl border border-flare/25 bg-ink/40 p-7 transition-all duration-400 hover:-translate-y-1 hover:border-gold/50 hover:bg-ink/70 sm:p-8"
                  style={{ marginLeft: `${i * 4}%`, maxWidth: `${100 - i * 2}%` }}
                >
                  <span className="font-display pointer-events-none absolute -right-4 -top-8 text-[7rem] font-black leading-none text-petal/6 transition-colors duration-400 group-hover:text-flare/12 sm:text-[8.5rem]" aria-hidden="true">
                    {d.d[0]}
                  </span>
                  <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-gold">D {i + 1} of 5</p>
                  <h3 className="font-display mt-2 text-3xl font-black text-petal">{d.d}</h3>
                  <p className="mt-1 font-bold text-flare">{d.desc}</p>
                  <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-shell/70">{d.example}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Digital safety bento                                               */
/* ------------------------------------------------------------------ */
const SPANS: Record<string, string> = {
  lg: "sm:col-span-2 lg:col-span-4",
  md: "sm:col-span-2 lg:col-span-2",
};

export function DigitalSafety() {
  return (
    <section id="digital" className="relative bg-petal text-ink">
      <div className="dot-grid absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            tone="light"
            kicker="Knowledge — Digital armor"
            title={
              <>
                He found you online?
                <em className="text-rosewood"> Close the doors tonight.</em>
              </>
            }
            lead="Stalking, image abuse and account takeovers are modern weapons. Six fixes, in order of impact — the first one takes twenty minutes."
          />
          <Reveal delay={200}>
            <a
              href="#helplines"
              className="group inline-flex items-center gap-2 rounded-full border-2 border-ink/15 px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-rosewood hover:text-rosewood"
            >
              <IconPhone className="h-4 w-4" /> Cybercrime helplines
            </a>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {DIGITAL_TIPS.map((tip, i) => {
            const Icon = DIGITAL_ICONS[tip.icon];
            return (
              <Reveal key={tip.id} delay={i * 70} className={`${SPANS[tip.span]} col-span-1`}>
                <div
                  className={`group flex h-full flex-col rounded-3xl border p-7 transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-30px_rgba(217,46,92,0.45)] sm:p-8 ${
                    tip.span === "lg"
                      ? "border-wine/80 bg-ink text-petal"
                      : "border-wine/15 bg-white/75 hover:border-rosewood/40"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-400 group-hover:rotate-6 ${
                        tip.span === "lg" ? "bg-wine text-flare" : "bg-shell text-rosewood"
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className={`font-display text-4xl font-black ${tip.span === "lg" ? "text-wine" : "text-shell"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className={`font-display mt-5 text-2xl font-black ${tip.span === "lg" ? "text-petal" : "text-ink"}`}>
                    {tip.title}
                  </h3>
                  <p className={`mt-3 text-[15px] leading-relaxed ${tip.span === "lg" ? "text-shell/70" : "text-ink/70"}`}>
                    {tip.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
