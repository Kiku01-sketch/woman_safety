import { useEffect, useState } from "react";
import { EmergencyRibbon, Footer, Header, quickExit } from "./components/Chrome";
import { FinalBand, HelplineDirectory, Stories } from "./components/Directory";
import { HelpNowStrip, Hero } from "./components/Hero";
import { DigitalSafety, FiveDs, RightsSection, SelfDefense } from "./components/Knowledge";
import { RedFlagChecker, SafetyPlanBuilder } from "./components/Toolkit";

function useEscEsc() {
  useEffect(() => {
    let last = 0;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const now = Date.now();
      if (now - last < 600) quickExit();
      last = now;
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`no-print fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-wine bg-plum text-flare shadow-[0_14px_36px_-12px_rgba(0,0,0,0.8)] transition-all duration-400 hover:-translate-y-1 hover:bg-wine ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 19V5M6 11l6-6 6 6" />
      </svg>
    </button>
  );
}

export default function App() {
  useEscEsc();

  return (
    <div id="top" className="relative min-h-screen">
      <a
        href="#sos"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-gold focus:px-5 focus:py-2.5 focus:text-xs focus:font-bold focus:uppercase focus:tracking-widest focus:text-ink"
      >
        Skip to SOS tools
      </a>

      <div className="noise-layer" aria-hidden="true" />

      <EmergencyRibbon />
      <Header />

      <main>
        <Hero />
        <HelpNowStrip />
        <SafetyPlanBuilder />
        <RedFlagChecker />
        <RightsSection />
        <SelfDefense />
        <FiveDs />
        <DigitalSafety />
        <HelplineDirectory />
        <Stories />
        <FinalBand />
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
