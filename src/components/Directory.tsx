import { useMemo, useState } from "react";
import { CATEGORIES, COUNTRIES, HELPLINES, STORIES } from "../data";
import { IconPhone, IconSearch, Reveal, SectionHeading } from "../ui";
import { quickExit } from "./Chrome";

/* ------------------------------------------------------------------ */
/*  Helpline directory                                                 */
/* ------------------------------------------------------------------ */
const CAT_STYLE: Record<string, string> = {
  Emergency: "text-flare border-flare/50 bg-flare/10",
  "Domestic violence": "text-mist border-mist/50 bg-mist/10",
  "Sexual assault": "text-gold border-gold/50 bg-gold/10",
  Cybercrime: "text-tide border-tide/50 bg-tide/10",
  "Mental health": "text-shell border-shell/40 bg-shell/5",
  "Teen & dating": "text-petal border-petal/40 bg-petal/5",
  Trafficking: "text-gold border-gold/40 bg-gold/5",
};

export function HelplineDirectory() {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState<string>("All");
  const [category, setCategory] = useState<string>("All");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return HELPLINES.filter((h) => {
      const matchQ =
        !q ||
        h.name.toLowerCase().includes(q) ||
        h.number.toLowerCase().includes(q) ||
        h.country.toLowerCase().includes(q) ||
        h.category.toLowerCase().includes(q);
      const matchC = country === "All" || h.country === country;
      const matchCat = category === "All" || h.category === category;
      return matchQ && matchC && matchCat;
    });
  }, [query, country, category]);

  return (
    <section id="helplines" className="relative overflow-hidden bg-ink">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute -left-24 bottom-0 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(247,92,126,0.15),transparent_65%)]" />
        <div className="absolute -right-24 top-10 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(183,156,216,0.12),transparent_60%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <SectionHeading
          tone="dark"
          kicker="Directory — Real humans, 24/7"
          title={
            <>
              A voice on the line
              <em className="text-flare"> at 3 a.m.</em>
            </>
          }
          lead="Free, confidential, and staffed by trained advocates. Every number below is official — tap to call from your phone. Filters keep only what you need on screen."
        />

        {/* controls */}
        <Reveal delay={150}>
          <div className="mt-12 flex flex-col gap-5 rounded-3xl border border-wine/60 bg-plum/60 p-6 sm:p-7">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <label className="relative flex-1">
                <span className="sr-only">Search helplines</span>
                <IconSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-shell/40" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={"Search by name, number or need — try \u201cstalking\u201d or \u201cRAINN\u201d"}
                  className="w-full rounded-full border border-wine/70 bg-ink/60 py-3.5 pl-12 pr-5 text-sm text-petal placeholder:text-shell/35 transition-colors focus:border-flare focus:outline-none"
                />
              </label>
              <label className="flex items-center gap-3">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-shell/50">Need</span>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="cursor-pointer rounded-full border border-wine/70 bg-ink/60 px-5 py-3.5 text-sm font-semibold text-petal transition-colors focus:border-flare focus:outline-none"
                >
                  <option value="All">All categories</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </label>
            </div>
            <div className="flex flex-wrap gap-2">
              {["All", ...COUNTRIES].map((c) => (
                <button
                  key={c}
                  onClick={() => setCountry(c)}
                  aria-pressed={country === c}
                  className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] transition-all duration-300 ${
                    country === c
                      ? "bg-flare text-ink shadow-[0_8px_24px_-8px_rgba(247,92,126,0.8)]"
                      : "border border-wine/70 text-shell/60 hover:border-flare/60 hover:text-petal"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <p className="mt-6 text-xs font-bold uppercase tracking-[0.22em] text-shell/45" aria-live="polite">
          {results.length} {results.length === 1 ? "line" : "lines"} found
        </p>

        {/* results */}
        {results.length > 0 ? (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {results.map((h, i) => (
              <Reveal key={h.id} delay={Math.min(i, 8) * 60}>
                <div className="group flex h-full items-center justify-between gap-5 rounded-3xl border border-wine/60 bg-plum/45 p-6 transition-all duration-400 hover:-translate-y-1 hover:border-flare/50 hover:bg-plum/80 hover:shadow-[0_24px_50px_-25px_rgba(247,92,126,0.5)]">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] ${CAT_STYLE[h.category] ?? "text-shell border-shell/40"}`}>
                        {h.category}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-mist/80">{h.country}</span>
                    </div>
                    <h3 className="font-display mt-2.5 text-lg font-black leading-tight text-petal">{h.name}</h3>
                    <p className="mt-1 text-xs text-shell/55">{h.hours}</p>
                    {h.note && <p className="mt-1 text-xs font-semibold text-gold/90">{h.note}</p>}
                  </div>
                  <a
                    href={`tel:${h.tel}`}
                    className="flex shrink-0 flex-col items-end gap-1.5 rounded-2xl border border-flare/40 bg-rosewood/20 px-5 py-3.5 transition-all duration-300 group-hover:border-flare group-hover:bg-rosewood"
                    aria-label={`Call ${h.name} at ${h.number}`}
                  >
                    <IconPhone className="h-4 w-4 text-flare transition-colors group-hover:text-petal" />
                    <span className="font-display text-lg font-black leading-none text-petal">{h.number}</span>
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-3xl border border-dashed border-wine/70 p-12 text-center">
            <p className="font-display text-2xl font-black text-petal">No lines match that filter.</p>
            <p className="mt-2 text-sm text-shell/60">
              In an emergency, your local number always works: 911 · 112 · 999 · 000.
            </p>
            <button
              onClick={() => {
                setQuery("");
                setCountry("All");
                setCategory("All");
              }}
              className="mt-5 rounded-full bg-flare px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-petal"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Survivor voices — scattered postcards                              */
/* ------------------------------------------------------------------ */
export function Stories() {
  return (
    <section id="stories" className="relative bg-shell text-ink">
      <div className="dot-grid absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <SectionHeading
          tone="light"
          align="center"
          kicker="Survivor voices"
          title={
            <>
              The other side of fear
              <em className="text-rosewood"> is written by women like you.</em>
            </>
          }
          lead="Shared with permission; names and details changed to protect privacy."
        />

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {STORIES.map((s, i) => (
            <Reveal key={s.name} delay={i * 110} className={i % 2 === 1 ? "lg:translate-y-10" : ""}>
              <figure
                className="postcard relative rounded-2xl border border-wine/15 bg-white p-8 shadow-[0_18px_44px_-24px_rgba(46,23,51,0.35)] sm:p-10"
                style={{ transform: `rotate(${s.tilt})` }}
              >
                <span className="absolute -top-3 left-1/2 h-7 w-24 -translate-x-1/2 rotate-[-3deg] rounded-sm bg-gold/30 backdrop-blur-[1px]" aria-hidden="true" />
                <span className="font-display text-7xl font-black leading-none text-flare/20" aria-hidden="true">
                  &ldquo;
                </span>
                <blockquote className="font-display -mt-5 text-xl font-medium italic leading-relaxed text-ink/85 sm:text-[1.35rem]">
                  {s.quote}
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink font-display text-sm font-black text-flare">
                    {s.name[0]}
                  </span>
                  <span>
                    <span className="block text-sm font-black uppercase tracking-[0.12em] text-ink">{s.name}</span>
                    <span className="block text-xs text-wine/60">{s.meta}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="mt-16 text-center text-sm text-wine/55">
            Healing is not linear, and leaving is a process — most survivors try several times.
            Every attempt counts. <span className="font-bold text-rosewood">Yours will too.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Final band                                                         */
/* ------------------------------------------------------------------ */
export function FinalBand() {
  return (
    <section className="relative overflow-hidden bg-rosewood">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(239,163,60,0.35),transparent_65%)]" />
        <div className="absolute -bottom-24 right-0 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(28,15,32,0.4),transparent_60%)]" />
        <div className="dot-grid-light absolute inset-0 opacity-20" />
      </div>
      <div className="relative mx-auto max-w-5xl px-5 py-24 text-center sm:px-8 lg:py-28">
        <Reveal>
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-petal/80">
            One last thing before you go
          </p>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="font-display mt-5 text-5xl font-black leading-[1.02] text-petal sm:text-7xl">
            You are not alone.
            <span className="mt-2 block italic text-gold">You never were.</span>
          </h2>
        </Reveal>
        <Reveal delay={240}>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-petal/85">
            Save one number. Tell one person. Build one part of the plan. Small acts of
            preparation are quiet acts of courage — and they compound.
          </p>
        </Reveal>
        <Reveal delay={360}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:18007997233"
              className="group inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-petal transition-all duration-300 hover:-translate-y-1 hover:bg-plum hover:shadow-[0_20px_50px_-18px_rgba(28,15,32,0.9)]"
            >
              <IconPhone className="h-5 w-5 text-flare transition-transform duration-300 group-hover:rotate-12" />
              US DV: 1-800-799-7233
            </a>
            <a
              href="#helplines"
              className="inline-flex items-center gap-2 rounded-full border-2 border-petal/60 px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-petal transition-all duration-300 hover:-translate-y-1 hover:border-petal hover:bg-petal hover:text-rosewood"
            >
              All helplines
            </a>
            <button
              onClick={quickExit}
              className="text-xs font-bold uppercase tracking-[0.2em] text-petal/70 underline decoration-petal/40 underline-offset-8 transition-colors hover:text-petal hover:decoration-petal"
            >
              Leave this site now
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
