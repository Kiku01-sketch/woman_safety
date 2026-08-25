import { useCallback, useEffect, useRef, useState } from "react";

/* ---------- prefers-reduced-motion ---------- */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/* ---------- reveal on scroll ---------- */
export function useReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ---------- count-up ---------- */
export function useCountUp(target: number, start: boolean, duration = 1400): number {
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(0);
  const raf = useRef<number>(0);
  useEffect(() => {
    if (!start) return;
    if (reduced) {
      setValue(target);
      return;
    }
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [start, target, duration, reduced]);
  return value;
}

/* ---------- scramble decode ---------- */
const GLYPHS = "#%@&*+=?!<>◊∆";

export function useScrambleCycle(words: string[], holdMs = 2600, speedMs = 34): string {
  const reduced = usePrefersReducedMotion();
  const [text, setText] = useState(words[0]);
  const idx = useRef(0);

  const decode = useCallback(
    (word: string) => {
      let frame = 0;
      const total = word.length * 3 + 6;
      const timer = window.setInterval(() => {
        frame += 1;
        const settled = Math.floor((frame / total) * word.length * 1.35);
        const out = word
          .split("")
          .map((ch, i) => {
            if (i < settled || ch === " ") return ch;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("");
        setText(out);
        if (frame >= total) {
          window.clearInterval(timer);
          setText(word);
        }
      }, speedMs);
      return timer;
    },
    [speedMs],
  );

  useEffect(() => {
    if (reduced) {
      setText(words[0]);
      return;
    }
    let timer = 0;
    let cycle: number;
    const next = () => {
      idx.current = (idx.current + 1) % words.length;
      timer = decode(words[idx.current]);
      cycle = window.setTimeout(next, holdMs + words[idx.current].length * 3 * speedMs);
    };
    cycle = window.setTimeout(next, holdMs);
    return () => {
      window.clearInterval(timer);
      window.clearTimeout(cycle);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, holdMs, speedMs]);

  return text;
}

/* ---------- local storage ---------- */
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage unavailable — keep in memory */
    }
  }, [key, value]);
  return [value, setValue] as const;
}
