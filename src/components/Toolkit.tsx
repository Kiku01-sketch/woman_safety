import { useMemo, useState } from "react";
import { PLAN_SECTIONS, RED_FLAGS } from "../data";
import { useLocalStorage } from "../hooks";
import {
  IconAlert,
  IconCheck,
  IconCopy,
  IconDoc,
  IconPhone,
  IconPrint,
  IconScales,
  IconShield,
  Reveal,
  SectionHeading,
} from "../ui";

/* ------------------------------------------------------------------ */
/*  Safety plan builder                                                */
/* ------------------------------------------------------------------ */
const ALL_IDS = PLAN_SECTIONS.flatMap((s) => s.items.map((i) => i.id));

function ProgressRing({ pct }: { pct: number }) {
  const C = 2 * Math.PI * 52;
  return (
    <div className="relative h-36 w-36">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(46,23,51,0.12)" strokeWidth="10" />
        <circle
          cx="60"
          cy="60"
          r="52"
          fill="none"
          stroke={pct === 100 ? "var(--color-tide)" : "var(--color-rosewood)"}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - pct / 100)}
          style={{ transition: "stroke-dashoffset 0.6s cubic-bezier(0.2,0.7,0.25,1), stroke 0.4s" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-3xl font-black text-ink">{Math.round(pct)}%</span>
        <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-wine/60">ready</span>
      </div>
    </div>
  );
}

export function SafetyPlanBuilder() {
  const [checked, setChecked] = useLocalStorage<string[]>("safeher-plan", []);
  const [toast, setToast] = useState("");
  const [openSection, setOpenSection] = useState<string>(PLAN_SECTIONS[0].id);

  const pct = (checked.length / ALL_IDS.length) * 100;

  const toggle = (id: string) =>
    setChecked((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const planText = useMemo(() => {
    const lines = PLAN_SECTIONS.map((s) => {
      const done = s.items.filter((i) => checked.includes(i.id)).map((i) => `  [x] ${i.text}`);
      const todo = s.items.filter((i) => !checked.includes(i.id)).map((i) => `  [ ] ${i.text}`);
      return `${s.title.toUpperCase()}\n${[...done, ...todo].join("\n") || "  (nothing here yet)"}`;
    });
    return `MY SAFETY PLAN — SafeHer\n${"=".repeat(34)}\n\n${lines.join("\n\n")}\n\nHelplines: US DV 1-800-799-7233 · RAINN 1-800-656-4673 · UK 0808 2000 247 · India 181 · Emergency 911/112/999/000`;
  }, [checked]);

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(""), 2600);
  };

  const copyPlan = async () => {
    try {
      await navigator.clipboard.writeText(planText);
      showToast("Plan copied — paste it somewhere safe");
    } catch {
      showToast("Couldn't access clipboard — try printing instead");
    }
  };

  return (
    <section id="safety-plan" className="relative bg-petal text-ink">
      <div className="dot-grid absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          {/* sticky intro + progress */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              tone="light"
              kicker="Tool 01 — Personal safety plan"
              title={
                <>
                  Preparedness is<br />
                  <em className="text-rosewood">not paranoia.</em>
                </>
              }
              lead="Survivors say the single most useful thing they did was decide — in advance — what they'd grab, where they'd go, and who they'd call. Check things off as you prepare. Your progress stays on this device only."
            />
            <Reveal delay={150}>
              <div className="mt-10 flex items-center gap-7 rounded-3xl border border-wine/15 bg-white/70 p-7 shadow-[0_20px_50px_-25px_rgba(46,23,51,0.35)]">
                <ProgressRing pct={pct} />
                <div>
                  <p className="font-display text-2xl font-black">
                    {checked.length} <span className="text-wine/50">/ {ALL_IDS.length}</span>
                  </p>
                  <p className="mt-1 text-sm text-wine/70">steps prepared</p>
                  {pct === 100 && (
                    <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-tide/15 px-3 py-1 text-xs font-bold text-tide">
                      <IconShield className="h-4 w-4" /> Plan complete — you're harder to hurt
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
            <Reveal delay={260}>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => window.print()}
                  className="no-print inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-petal transition-all duration-300 hover:-translate-y-0.5 hover:bg-wine"
                >
                  <IconPrint className="h-4 w-4" /> Print plan
                </button>
                <button
                  onClick={copyPlan}
                  className="no-print inline-flex items-center gap-2 rounded-full border-2 border-ink/15 px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-rosewood hover:text-rosewood"
                >
                  <IconCopy className="h-4 w-4" /> Copy plan
                </button>
                <button
                  onClick={() => {
                    setChecked([]);
                    showToast("Plan cleared from this device");
                  }}
                  className="no-print rounded-full px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-wine/50 transition-colors hover:text-rosewood"
                >
                  Reset
                </button>
              </div>
            </Reveal>
            <Reveal delay={340}>
              <p className="mt-6 max-w-sm text-xs leading-relaxed text-wine/50">
                <IconDoc className="mr-1.5 inline h-4 w-4" />
                If someone else uses this device, print the plan and keep it at a trusted
                friend's home — not yours.
              </p>
            </Reveal>
          </div>

          {/* checklist */}
          <div className="space-y-5">
            {PLAN_SECTIONS.map((section, si) => {
              const done = section.items.filter((i) => checked.includes(i.id)).length;
              const open = openSection === section.id;
              return (
                <Reveal key={section.id} delay={si * 70}>
                  <div
                    className={`overflow-hidden rounded-3xl border transition-all duration-500 ${
                      open ? "border-rosewood/40 bg-white shadow-[0_24px_60px_-30px_rgba(217,46,92,0.4)]" : "border-wine/12 bg-white/60 hover:border-wine/30"
                    }`}
                  >
                    <button
                      className="flex w-full items-center gap-5 px-6 py-5 text-left sm:px-8"
                      onClick={() => setOpenSection(open ? "" : section.id)}
                      aria-expanded={open}
                    >
                      <span className="font-display text-3xl font-black text-rosewood/25">
                        {String(si + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1">
                        <span className="font-display block text-xl font-black text-ink sm:text-2xl">{section.title}</span>
                        <span className="mt-0.5 block text-sm text-wine/60">{section.brief}</span>
                      </span>
                      <span
                        className={`hidden shrink-0 rounded-full px-3 py-1 text-xs font-bold sm:block ${
                          done === section.items.length ? "bg-tide/15 text-tide" : "bg-shell text-wine/60"
                        }`}
                      >
                        {done}/{section.items.length}
                      </span>
                      <svg
                        viewBox="0 0 24 24"
                        className={`h-5 w-5 shrink-0 text-wine/50 transition-transform duration-400 ${open ? "rotate-180" : ""}`}
                        fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                      >
                        <path d="m6 9.5 6 6 6-6" />
                      </svg>
                    </button>
                    <div className={`acc-body ${open ? "open" : ""}`}>
                      <div className="acc-inner">
                        <ul className="space-y-1 border-t border-wine/10 px-6 py-4 sm:px-8">
                          {section.items.map((item) => {
                            const isOn = checked.includes(item.id);
                            return (
                              <li key={item.id}>
                                <button
                                  onClick={() => toggle(item.id)}
                                  className="group flex w-full items-start gap-4 rounded-2xl px-3 py-3 text-left transition-colors hover:bg-shell/70"
                                  aria-pressed={isOn}
                                >
                                  <span
                                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border-2 transition-all duration-300 ${
                                      isOn ? "border-rosewood bg-rosewood text-petal" : "border-wine/25 bg-white text-transparent group-hover:border-rosewood/60"
                                    }`}
                                  >
                                    <IconCheck className="h-4 w-4" drawn={isOn} />
                                  </span>
                                  <span className={`text-[15px] leading-snug transition-all duration-300 ${isOn ? "text-wine/45 line-through decoration-rosewood/50" : "text-ink/85"}`}>
                                    {item.text}
                                  </span>
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>

      {/* toast */}
      <div
        className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transition-all duration-400 ${
          toast ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
        }`}
        role="status"
      >
        <p className="rounded-full bg-ink px-6 py-3 text-sm font-bold text-petal shadow-2xl">{toast}</p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Red-flag checker                                                   */
/* ------------------------------------------------------------------ */
function tierMessage(count: number) {
  if (count === 0)
    return {
      tone: "bg-tide/10 border-tide/40 text-tide",
      title: "No flags raised — protect what's working.",
      body: "That's wonderful. Healthy relationships grow your world, they don't shrink it. Keep your safety basics in place anyway — the plan above takes twenty minutes and works for everyone.",
      cta: null as string | null,
    };
  if (count <= 3)
    return {
      tone: "bg-gold/10 border-gold/50 text-gold",
      title: "Early warning signs. Trust the discomfort.",
      body: "One or two of these can be the start of a pattern, not an accident. Name what you're seeing to someone you trust, and start the safety plan — it's easier to prepare before things escalate.",
      cta: null,
    };
  if (count <= 7)
    return {
      tone: "bg-flare/10 border-flare/50 text-rosewood",
      title: "This is a pattern of control — it's not your fault.",
      body: "Multiple flags together describe abuse, even without a single hit. You deserve support that takes this seriously. A confidential advocate can help you map your options — no pressure to leave, ever.",
      cta: "Talk to a helpline",
    };
  return {
    tone: "bg-rosewood text-petal border-rosewood",
    title: "You may be in real danger. Please reach out today.",
    body: "What you checked describes serious, potentially escalating abuse. Call the National Domestic Violence Hotline at 1-800-799-7233, your local women's helpline, or 911/112 if you're in immediate danger. Trained advocates are available right now, confidentially.",
    cta: "Open helplines",
  };
}

export function RedFlagChecker() {
  const [flags, setFlags] = useState<Set<number>>(new Set());
  const toggle = (i: number) =>
    setFlags((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const count = flags.size;
  const msg = tierMessage(count);
  const pct = Math.min(100, (count / RED_FLAGS.length) * 100);

  return (
    <section id="red-flags" className="relative overflow-hidden bg-ink">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute -right-40 top-0 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(217,46,92,0.2),transparent_65%)]" />
        <div className="dot-grid-light absolute inset-0 opacity-30" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              tone="dark"
              kicker="Tool 02 — Am I being abused?"
              title={
                <>
                  Abuse rarely announces
                  <em className="text-flare"> itself.</em>
                </>
              }
              lead="It starts small: a comment, a rule, a joke at your expense. Tap anything that has happened in your relationship — nothing is recorded, nothing leaves this page."
            />

            <Reveal delay={200}>
              <div className="mt-10 rounded-3xl border border-wine/60 bg-plum/70 p-7">
                <div className="flex items-end justify-between">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-shell/60">Flags raised</p>
                  <p className="font-display text-4xl font-black text-petal">
                    {count}
                    <span className="text-lg text-shell/40"> / {RED_FLAGS.length}</span>
                  </p>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-wine/50">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      count === 0 ? "bg-tide" : count <= 3 ? "bg-gold" : count <= 7 ? "bg-flare" : "bg-rosewood"
                    }`}
                    style={{ width: `${Math.max(pct, count > 0 ? 8 : 0)}%` }}
                  />
                </div>

                <div className={`mt-6 rounded-2xl border p-5 transition-colors duration-500 ${msg.tone}`} aria-live="polite">
                  <p className="font-display text-lg font-black leading-snug">{msg.title}</p>
                  <p className="mt-2 text-sm leading-relaxed opacity-90">{msg.body}</p>
                  {msg.cta && (
                    <a
                      href="#helplines"
                      className="mt-4 inline-flex items-center gap-2 rounded-full bg-petal px-5 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold"
                    >
                      <IconPhone className="h-4 w-4" /> {msg.cta}
                    </a>
                  )}
                </div>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <p className="mt-5 flex items-start gap-2.5 text-xs leading-relaxed text-shell/45">
                <IconScales className="mt-0.5 h-4 w-4 shrink-0 text-mist" />
                This self-check is educational, not a diagnosis. Only you know your situation —
                and whatever you're feeling about it is valid.
              </p>
            </Reveal>
          </div>

          <div className="grid content-start gap-3 sm:grid-cols-2">
            {RED_FLAGS.map((flag, i) => {
              const on = flags.has(i);
              return (
                <Reveal key={flag} delay={i * 45}>
                  <button
                    onClick={() => toggle(i)}
                    aria-pressed={on}
                    className={`group flex h-full w-full items-start gap-4 rounded-2xl border p-5 text-left transition-all duration-300 ${
                      on
                        ? "border-flare/70 bg-wine/70 shadow-[0_16px_40px_-20px_rgba(247,92,126,0.6)]"
                        : "border-wine/50 bg-plum/40 hover:-translate-y-1 hover:border-mist/50 hover:bg-plum/70"
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                        on ? "border-flare bg-flare text-ink" : "border-shell/30 text-transparent group-hover:border-shell/60"
                      }`}
                    >
                      <IconAlert className="h-3.5 w-3.5" />
                    </span>
                    <span className={`text-[15px] leading-snug transition-colors duration-300 ${on ? "text-petal" : "text-shell/75"}`}>
                      {flag}
                    </span>
                  </button>
                </Reveal>
              );
            })}
            <Reveal delay={300} className="sm:col-span-2">
              <button
                onClick={() => setFlags(new Set())}
                className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-shell/40 transition-colors hover:text-flare"
              >
                Clear my answers
              </button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
