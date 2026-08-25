import { useEffect, useState } from "react";
import { EMERGENCY_STRIP, NAV_LINKS } from "../data";
import { IconExit, IconPhone, IconVenusShield } from "../ui";

/* ------------------------------------------------------------------ */
/*  Quick exit — replaces the page with an innocent search instantly   */
/* ------------------------------------------------------------------ */
export function quickExit() {
  window.location.replace("https://www.google.com/search?q=weather+today");
}

export function QuickExitButton({ compact = false }: { compact?: boolean }) {
  return (
    <button
      onClick={quickExit}
      className={`group inline-flex items-center gap-2 rounded-full bg-flare font-bold uppercase tracking-[0.14em] text-ink transition-all duration-300 hover:bg-petal hover:shadow-[0_8px_28px_-8px_rgba(247,92,126,0.9)] ${
        compact ? "px-4 py-2 text-[11px]" : "px-5 py-2.5 text-xs"
      }`}
      title="Instantly leave this site (or press Esc twice)"
    >
      <IconExit className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      Quick Exit
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Emergency ribbon                                                   */
/* ------------------------------------------------------------------ */
function StripContent() {
  return (
    <>
      {EMERGENCY_STRIP.map((s) => (
        <span key={`${s.label}-${s.number}`} className="flex items-center gap-3 pr-10 text-[12px] font-semibold tracking-wide whitespace-nowrap">
          <span className="h-1.5 w-1.5 rotate-45 bg-flare" aria-hidden="true" />
          <span className="text-shell/80">{s.label}</span>
          <a href={`tel:${s.number.replace(/[^0-9]/g, "")}`} className="font-display text-sm font-bold text-gold hover:text-petal transition-colors">
            {s.number}
          </a>
        </span>
      ))}
    </>
  );
}

export function EmergencyRibbon() {
  return (
    <div className="marquee no-print relative z-50 overflow-hidden border-b border-wine/60 bg-plum/90 py-2 text-petal">
      <div className="marquee-track">
        <StripContent />
        <StripContent />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Header                                                             */
/* ------------------------------------------------------------------ */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`no-print sticky top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "border-b border-wine/50 bg-ink/95 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.9)] backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        <a href="#top" className="group flex items-center gap-2.5" aria-label="SafeHer home">
          <span className="text-flare transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-110">
            <IconVenusShield className="h-9 w-9" />
          </span>
          <span className="leading-none">
            <span className="font-display block text-2xl font-black tracking-tight text-petal">
              Safe<span className="italic text-flare">Her</span>
            </span>
            <span className="mt-0.5 block text-[9px] font-bold uppercase tracking-[0.3em] text-mist">
              Safety Network
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-[13px] font-bold uppercase tracking-[0.16em] text-shell/75 transition-colors hover:text-petal"
            >
              {l.label}
              <span className="absolute -bottom-1.5 left-0 h-0.5 w-0 bg-flare transition-all duration-300 group-hover:w-full" aria-hidden="true" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:911"
            className="hidden items-center gap-2 rounded-full border border-gold/50 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-gold transition-all duration-300 hover:border-gold hover:bg-gold hover:text-ink md:inline-flex"
          >
            <IconPhone className="h-4 w-4" />
            Call 911
          </a>
          <QuickExitButton />
          <button
            className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full border border-wine text-petal lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span className={`h-0.5 w-5 bg-current transition-transform duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`h-0.5 w-5 bg-current transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-5 bg-current transition-transform duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {/* mobile menu */}
      <div
        className={`lg:hidden ${open ? "pointer-events-auto" : "pointer-events-none"} fixed inset-0 top-[64px] z-30 transition-all duration-400 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-ink/95" onClick={() => setOpen(false)} />
        <nav className="relative flex flex-col gap-1 px-8 pt-8" aria-label="Mobile">
          {NAV_LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-display border-b border-wine/40 py-4 text-3xl font-bold text-petal transition-all duration-300 hover:pl-3 hover:text-flare"
              style={{ transitionDelay: open ? `${i * 45}ms` : "0ms" }}
            >
              {l.label}
            </a>
          ))}
          <p className="mt-6 text-xs uppercase tracking-[0.2em] text-shell/50">
            In danger now? Call your local emergency number.
          </p>
        </nav>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */
export function Footer() {
  return (
    <footer className="relative border-t border-wine/50 bg-ink">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <a href="#top" className="flex items-center gap-2.5">
            <span className="text-flare">
              <IconVenusShield className="h-10 w-10" />
            </span>
            <span className="font-display text-3xl font-black text-petal">
              Safe<span className="italic text-flare">Her</span>
            </span>
          </a>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-shell/60">
            A free, anonymous safety network for women — SOS tools, safety planning,
            rights guides and helplines in one place. Built to be left quickly and
            remembered when it matters.
          </p>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-wine px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-mist">
            <span className="blink-dot h-2 w-2 rounded-full bg-tide" />
            Esc Esc leaves this site instantly
          </p>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.24em] text-gold">Explore</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-shell/70 transition-all duration-200 hover:pl-1.5 hover:text-flare">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#stories" className="text-shell/70 transition-all duration-200 hover:pl-1.5 hover:text-flare">
                Survivor Voices
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.24em] text-gold">Call now</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-shell/70">
            <li className="flex justify-between gap-3">
              <span>US / CA Emergency</span>
              <a href="tel:911" className="font-display font-bold text-petal hover:text-flare">911</a>
            </li>
            <li className="flex justify-between gap-3">
              <span>EU / India</span>
              <a href="tel:112" className="font-display font-bold text-petal hover:text-flare">112</a>
            </li>
            <li className="flex justify-between gap-3">
              <span>UK</span>
              <a href="tel:999" className="font-display font-bold text-petal hover:text-flare">999</a>
            </li>
            <li className="flex justify-between gap-3">
              <span>India Women's Helpline</span>
              <a href="tel:181" className="font-display font-bold text-petal hover:text-flare">181</a>
            </li>
            <li className="flex justify-between gap-3">
              <span>US DV Hotline</span>
              <a href="tel:18007997233" className="font-display font-bold text-petal hover:text-flare">1-800-799-7233</a>
            </li>
            <li className="flex justify-between gap-3">
              <span>RAINN</span>
              <a href="tel:18006564673" className="font-display font-bold text-petal hover:text-flare">1-800-656-4673</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.24em] text-gold">Please know</h3>
          <p className="mt-4 text-sm leading-relaxed text-shell/60">
            SafeHer is an educational resource, not a substitute for emergency services
            or legal advice. Laws vary by country and state. If you are in immediate
            danger, call your local emergency number now.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-shell/60">
            Searching for help can be monitored. If you share a device, use the{" "}
            <button onClick={quickExit} className="font-bold text-flare underline decoration-flare/40 underline-offset-4 hover:decoration-flare">
              Quick Exit
            </button>{" "}
            and clear your browser history afterwards.
          </p>
        </div>
      </div>
      <div className="border-t border-wine/40">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-5 text-[11px] uppercase tracking-[0.2em] text-shell/40 sm:flex-row sm:px-8">
          <span>SafeHer — for her, with her, since always</span>
          <span>Statistics: WHO · UN Women · Economist Impact</span>
        </div>
      </div>
    </footer>
  );
}
