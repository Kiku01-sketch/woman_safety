import { useCallback, useEffect, useRef, useState } from "react";
import { PRIMARY_SLOTS, useContacts } from "../contacts";
import { STATS, type Stat } from "../data";
import { useCountUp, useReveal, useScrambleCycle } from "../hooks";
import { ButtonLink, IconAlert, IconPhone, IconPin, IconSiren, IconUsers, Reveal } from "../ui";

const WORDS = ["unafraid.", "protected.", "believed.", "supported."];
const HOLD_MS = 2200;

/* ------------------------------------------------------------------ */
/*  SOS beacon with hold-to-activate                                   */
/* ------------------------------------------------------------------ */
function SOSBeacon() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"idle" | "sent">("idle");
  const raf = useRef(0);
  const startAt = useRef(0);
  const guardians = useContacts().slice(0, PRIMARY_SLOTS);

  const stop = useCallback(() => {
    cancelAnimationFrame(raf.current);
    if (phase === "idle") setProgress(0);
  }, [phase]);

  const begin = useCallback(() => {
    if (phase === "sent") return;
    startAt.current = performance.now();
    const tick = () => {
      const p = Math.min(1, (performance.now() - startAt.current) / HOLD_MS);
      setProgress(p);
      if (p >= 1) {
        setPhase("sent");
        return;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }, [phase]);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const reset = () => {
    setPhase("idle");
    setProgress(0);
  };

  const C = 2 * Math.PI * 84;

  return (
    <div className="relative mx-auto flex aspect-square w-[min(88vw,420px)] items-center justify-center">
      {/* ambient sweep + rings */}
      <div className="beacon-sweep absolute inset-0 rounded-full" aria-hidden="true" />
      <div className="pulse-ring absolute inset-4 rounded-full border border-flare/40" aria-hidden="true" />
      <div className="pulse-ring absolute inset-10 rounded-full border border-gold/25" style={{ animationDelay: "0.9s" }} aria-hidden="true" />
      <div className="pulse-ring absolute inset-16 rounded-full border border-mist/20" style={{ animationDelay: "1.7s" }} aria-hidden="true" />
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(247,92,126,0.16),transparent_65%)]" aria-hidden="true" />

      {phase === "idle" ? (
        <button
          onPointerDown={begin}
          onPointerUp={stop}
          onPointerLeave={stop}
          onPointerCancel={stop}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              if (progress === 0) begin();
            }
          }}
          onKeyUp={stop}
          className="sos-glow group relative z-10 flex h-56 w-56 touch-none select-none flex-col items-center justify-center rounded-full bg-rosewood text-petal transition-transform duration-200 active:scale-95 sm:h-64 sm:w-64"
          aria-label="Hold for 2 seconds to activate SOS alert"
        >
          <svg viewBox="0 0 180 180" className="pointer-events-none absolute inset-0 h-full w-full -rotate-90">
            <circle cx="90" cy="90" r="84" fill="none" stroke="rgba(253,241,244,0.18)" strokeWidth="5" />
            <circle
              cx="90"
              cy="90"
              r="84"
              fill="none"
              stroke="#fdf1f4"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={C * (1 - progress)}
            />
          </svg>
          <IconSiren className="h-10 w-10 text-petal/90 transition-transform duration-300 group-hover:scale-110" />
          <span className="font-display mt-2 text-5xl font-black tracking-tight">SOS</span>
          <span className="mt-1 text-[11px] font-bold uppercase tracking-[0.24em] text-petal/80">
            {progress > 0 ? `Arming… ${Math.round(progress * 100)}%` : "Hold 2 seconds"}
          </span>
        </button>
      ) : (
        <div className="relative z-10 flex h-64 w-64 flex-col items-center justify-center rounded-full border-2 border-tide/70 bg-plum px-8 text-center shadow-[0_0_70px_-10px_rgba(47,185,164,0.5)] sm:h-72 sm:w-72">
          <span className="blink-dot absolute top-6 h-3 w-3 rounded-full bg-tide" aria-hidden="true" />
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-tide">Alert active</p>
          {guardians.length > 0 ? (
            <>
              <p className="font-display mt-2 text-xl font-black leading-tight text-petal">Alert sent to</p>
              <ul className="mt-2 space-y-1.5">
                {guardians.map((g) => (
                  <li key={g.id} className="flex items-center justify-center gap-2 text-sm font-bold text-petal/90">
                    <span className="blink-dot h-1.5 w-1.5 shrink-0 rounded-full bg-tide" aria-hidden="true" />
                    <span className="truncate">{g.name}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-[11px] leading-relaxed text-shell/55">
                Live location shared · demo — wire to SMS / tracking API in production.
              </p>
            </>
          ) : (
            <>
              <p className="font-display mt-2 text-2xl font-black leading-tight text-petal">
                Guardians notified with your location
              </p>
              <a
                href="#circle"
                className="mt-2 text-[11px] font-bold uppercase tracking-[0.16em] text-gold underline decoration-gold/40 underline-offset-4 transition-colors hover:text-petal"
              >
                Circle is empty — add your people
              </a>
              <p className="mt-2 text-[11px] leading-relaxed text-shell/55">
                Demo simulation — wire to your SMS / live-tracking API in production.
              </p>
            </>
          )}
          <div className="mt-4 flex flex-col gap-2">
            <a
              href="tel:911"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-flare px-5 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-petal"
            >
              <IconPhone className="h-4 w-4" /> Call 911 / 112 now
            </a>
            <button
              onClick={reset}
              className="rounded-full border border-wine px-5 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-shell/70 transition-colors hover:border-flare hover:text-petal"
            >
              I'm safe — stand down
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */
export function Hero() {
  const word = useScrambleCycle(WORDS);
  const circle = useContacts().slice(0, PRIMARY_SLOTS);

  return (
    <section id="sos" className="relative overflow-hidden">
      {/* layered ambient background */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute -left-40 top-10 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(247,92,126,0.22),transparent_65%)]" />
        <div className="absolute -right-32 bottom-0 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(94,43,80,0.55),transparent_65%)]" />
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(239,163,60,0.14),transparent_60%)]" />
        <div className="dot-grid-light absolute inset-0 opacity-40" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-14 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8 lg:pb-28 lg:pt-20">
        <div>
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-gold">
              <span className="blink-dot inline-block h-2 w-2 rounded-full bg-flare" />
              A safety network for women — free & anonymous
            </p>
          </Reveal>

          <h1 className="font-display mt-6 text-[13.5vw] font-black leading-[0.98] tracking-tight text-petal sm:text-7xl lg:text-[5.4rem]">
            <span className="mask-line">
              <span style={{ animationDelay: "0.1s" }}>Walk home</span>
            </span>
            <span className="mask-line">
              <span style={{ animationDelay: "0.28s" }}>
                <em className="not-italic text-flare">{word}</em>
              </span>
            </span>
          </h1>

          <Reveal delay={350}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-shell/75">
              One tap to alert the people who'll come running. A plan before you need one,
              the law translated into plain words, and a voice on the line at 3 a.m.
              <span className="text-petal"> Everything here works without an account — and disappears when you leave.</span>
            </p>
          </Reveal>

          <Reveal delay={480}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <ButtonLink href="#safety-plan" variant="flare">Build my safety plan</ButtonLink>
              <ButtonLink href="#helplines" variant="ghost">Find a helpline</ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={600}>
            <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-[11px] font-bold uppercase tracking-[0.2em] text-mist">
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rotate-45 bg-tide" />No sign-up</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rotate-45 bg-tide" />Confidential</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rotate-45 bg-tide" />Works offline once loaded</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rotate-45 bg-tide" />Esc Esc to leave</li>
            </ul>
          </Reveal>
        </div>

        <Reveal delay={250} className="relative">
          <SOSBeacon />
          <div className="floaty absolute -left-2 top-6 hidden rounded-2xl border border-wine/70 bg-plum/90 px-4 py-3 shadow-xl sm:block" style={{ ["--tilt" as never]: "-3deg" }}>
            <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
              <IconPin className="h-4 w-4" /> Live location shared
            </p>
            <a
              href="#circle"
              className="mt-1 block text-xs text-shell/70 underline decoration-wine/70 underline-offset-4 transition-colors hover:text-gold"
            >
              {circle.length > 0
                ? `with ${circle.length} saved guardian${circle.length > 1 ? "s" : ""}`
                : "your circle is empty — add one"}
            </a>
          </div>
          <div className="floaty absolute -right-2 bottom-8 hidden rounded-2xl border border-wine/70 bg-plum/90 px-4 py-3 shadow-xl sm:block" style={{ ["--tilt" as never]: "2.5deg", animationDelay: "1.4s" }}>
            <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-tide">
              <IconUsers className="h-4 w-4" /> 12,400 guardians online
            </p>
            <p className="mt-1 text-xs text-shell/70">responding in your city</p>
          </div>
        </Reveal>
      </div>

      <StatsBand />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Stats band                                                         */
/* ------------------------------------------------------------------ */
function StatCell({ stat, index }: { stat: Stat; index: number }) {
  const { ref, inView } = useReveal<HTMLDivElement>(0.4);
  const value = useCountUp(stat.target, inView, 1300 + index * 150);
  return (
    <div ref={ref} className="group relative px-6 py-8 sm:px-8">
      <p className="font-display text-5xl font-black tracking-tight text-petal transition-colors duration-300 group-hover:text-flare lg:text-6xl">
        {stat.prefix}
        {value}
        <span className="text-flare">{stat.suffix}</span>
      </p>
      <div className="stat-bar mt-4 h-1 w-12 bg-gold" style={{ animationDelay: `${index * 120}ms` }} aria-hidden="true" />
      <p className="mt-4 max-w-[16rem] text-sm leading-relaxed text-shell/70">{stat.label}</p>
      <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.22em] text-mist/70">{stat.source}</p>
    </div>
  );
}

function StatsBand() {
  return (
    <div className="relative border-y border-wine/50 bg-plum/60">
      <div className="mx-auto grid max-w-7xl divide-y divide-wine/40 px-5 sm:grid-cols-2 sm:divide-y-0 sm:divide-x sm:px-8 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <StatCell key={s.label} stat={s} index={i} />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Immediate-help strip (shown at top on small context)               */
/* ------------------------------------------------------------------ */
export function HelpNowStrip() {
  return (
    <div className="relative overflow-hidden bg-rosewood">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-5 py-6 sm:px-8 lg:flex-row lg:items-center">
        <div className="flex items-start gap-4">
          <IconAlert className="mt-1 h-8 w-8 shrink-0 text-petal" />
          <div>
            <p className="font-display text-2xl font-black text-petal sm:text-3xl">
              In danger right now? Don't read — call.
            </p>
            <p className="mt-1 text-sm text-petal/80">
              911 (US/Canada) · 112 (EU/India) · 999 (UK) · 000 (Australia)
            </p>
          </div>
        </div>
        <a
          href="tel:911"
          className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-ink px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-petal transition-all duration-300 hover:-translate-y-0.5 hover:bg-plum"
        >
          <IconPhone className="h-5 w-5 text-flare transition-transform duration-300 group-hover:rotate-12" />
          Call emergency
        </a>
      </div>
    </div>
  );
}
