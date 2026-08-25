import type { ReactNode, CSSProperties } from "react";
import { useReveal } from "./hooks";

/* ------------------------------------------------------------------ */
/*  Reveal wrapper                                                     */
/* ------------------------------------------------------------------ */
export function Reveal({
  children,
  delay = 0,
  className = "",
  style,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const { ref, inView } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section heading                                                    */
/* ------------------------------------------------------------------ */
export function SectionHeading({
  kicker,
  title,
  lead,
  tone = "light",
  align = "left",
}: {
  kicker: string;
  title: ReactNode;
  lead?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
}) {
  const dim = tone === "light" ? "text-wine/70" : "text-shell/60";
  const strong = tone === "light" ? "text-ink" : "text-petal";
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <p
        className={`flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] ${dim} ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <span className={`inline-block h-px w-10 ${tone === "light" ? "bg-rosewood" : "bg-flare"}`} />
        {kicker}
      </p>
      <h2
        className={`font-display mt-4 text-4xl font-black leading-[1.04] sm:text-5xl lg:text-6xl ${strong}`}
      >
        {title}
      </h2>
      {lead && <p className={`mt-5 max-w-2xl text-lg leading-relaxed ${dim}`}>{lead}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Buttons                                                            */
/* ------------------------------------------------------------------ */
export function ButtonLink({
  href,
  children,
  variant = "flare",
  className = "",
  onClick,
}: {
  href: string;
  children: ReactNode;
  variant?: "flare" | "ghost" | "gold" | "dark";
  className?: string;
  onClick?: () => void;
}) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold uppercase tracking-[0.14em] transition-all duration-300 hover:-translate-y-0.5";
  const variants: Record<string, string> = {
    flare:
      "bg-flare text-ink shadow-[0_10px_30px_-10px_rgba(247,92,126,0.7)] hover:bg-petal hover:shadow-[0_14px_36px_-10px_rgba(247,92,126,0.9)]",
    gold: "bg-gold text-ink shadow-[0_10px_30px_-12px_rgba(239,163,60,0.7)] hover:bg-shell",
    ghost:
      "border border-petal/30 text-petal hover:border-flare hover:bg-flare/10 hover:text-petal",
    dark: "bg-ink text-petal hover:bg-wine",
  };
  return (
    <a href={href} onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      {children}
      <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 12h15M13 6l6 6-6 6" />
      </svg>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  Custom inline icon set                                             */
/* ------------------------------------------------------------------ */
type IconProps = { className?: string };
const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const IconVenusShield = ({ className = "h-6 w-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M12 2.6 19.5 5.6v6c0 5-3.2 8.4-7.5 10.3C7.7 20 4.5 16.6 4.5 11.6v-6L12 2.6Z" fill="currentColor" opacity="0.16" />
    <path d="M12 2.6 19.5 5.6v6c0 5-3.2 8.4-7.5 10.3C7.7 20 4.5 16.6 4.5 11.6v-6L12 2.6Z" {...S} />
    <circle cx="12" cy="10.2" r="2.4" {...S} />
    <path d="M12 12.6v5.6M9.8 16h4.4" {...S} />
  </svg>
);

export const IconSiren = ({ className = "h-6 w-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M7 16.5v-5a5 5 0 0 1 10 0v5" {...S} />
    <path d="M4.5 16.5h15v3.4a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1v-3.4Z" {...S} />
    <path d="M12 3.2v2M5.8 6 7.2 7.4M18.2 6l-1.4 1.4M2.5 11.5h2M19.5 11.5h2" {...S} />
  </svg>
);

export const IconPhone = ({ className = "h-6 w-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M5 4.5A1.5 1.5 0 0 1 6.5 3h2.2a1 1 0 0 1 .95.7L10.8 7a1 1 0 0 1-.3 1.1L8.8 9.5a12.5 12.5 0 0 0 5.7 5.7l1.4-1.7a1 1 0 0 1 1.1-.3l3.3 1.15a1 1 0 0 1 .7.95v2.2a1.5 1.5 0 0 1-1.5 1.5C11.3 19 5 12.7 5 4.5Z" {...S} />
  </svg>
);

export const IconExit = ({ className = "h-6 w-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M11 3.5H5.5a1 1 0 0 0-1 1v15a1 1 0 0 0 1 1H11" {...S} />
    <path d="M15 8l4 4-4 4M19 12H9" {...S} />
  </svg>
);

export const IconEye = ({ className = "h-6 w-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M2.5 12S6.2 5.8 12 5.8 21.5 12 21.5 12 17.8 18.2 12 18.2 2.5 12 2.5 12Z" {...S} />
    <circle cx="12" cy="12" r="2.6" {...S} />
  </svg>
);

export const IconPalm = ({ className = "h-6 w-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M8 12.5V6.2a1.3 1.3 0 0 1 2.6 0V11M10.6 11V4.6a1.3 1.3 0 0 1 2.6 0V11M13.2 11V6a1.3 1.3 0 0 1 2.6 0v7.4" {...S} />
    <path d="M15.8 13.4v1.4c0 3.4-2.4 6-5.9 6-2.7 0-4.4-1.5-5.3-3.9l-1.9-4.3c-.4-.9.3-1.9 1.3-1.7 1 .2 1.7.9 2.1 1.8l1 2V12.5" {...S} />
  </svg>
);

export const IconBolt = ({ className = "h-6 w-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M13 2.5 4.5 13.5h6l-1.5 8L18 10.5h-6l1-8Z" {...S} />
  </svg>
);

export const IconElbow = ({ className = "h-6 w-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="m4 5 7 7-7 7M13 5l7 7-7 7" {...S} />
  </svg>
);

export const IconEscape = ({ className = "h-6 w-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M8 12h13M16 6.5 21.5 12 16 17.5" {...S} />
    <path d="M3 7.5h4M3 12h3M3 16.5h4" {...S} />
  </svg>
);

export const IconMegaphone = ({ className = "h-6 w-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M3.5 10v4l9.5 3.8V6.2L3.5 10Z" {...S} />
    <path d="M13 8.2c1.6.6 2.7 2 2.7 3.8s-1.1 3.2-2.7 3.8M6 14.5V19a1.5 1.5 0 0 0 3 0v-3.3" {...S} />
  </svg>
);

export const IconLock = ({ className = "h-6 w-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <rect x="5" y="10.5" width="14" height="10" rx="2" {...S} />
    <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5M12 14.5v2.5" {...S} />
  </svg>
);

export const IconPin = ({ className = "h-6 w-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M12 21.5s-6.8-5.6-6.8-10.6a6.8 6.8 0 0 1 13.6 0c0 5-6.8 10.6-6.8 10.6Z" {...S} />
    <circle cx="12" cy="10.8" r="2.3" {...S} />
  </svg>
);

export const IconBug = ({ className = "h-6 w-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M12 8.5a4.2 4.2 0 0 1 4.2 4.2v2.6a4.2 4.2 0 0 1-8.4 0v-2.6A4.2 4.2 0 0 1 12 8.5Z" {...S} />
    <path d="M9.5 8.5 8 6.2M14.5 8.5 16 6.2M7.8 12.5H4.5M7.8 16.2 5 18.4M16.2 12.5h3.3M16.2 16.2l2.8 2.2M12 12.5v4.2" {...S} />
  </svg>
);

export const IconShield = ({ className = "h-6 w-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M12 2.6 19.5 5.6v6c0 5-3.2 8.4-7.5 10.3C7.7 20 4.5 16.6 4.5 11.6v-6L12 2.6Z" {...S} />
    <path d="m8.8 11.8 2.3 2.3 4.2-4.6" {...S} />
  </svg>
);

export const IconKey = ({ className = "h-6 w-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <circle cx="8" cy="12" r="3.8" {...S} />
    <path d="M11.8 12H21M18 12v3M15 12v2.2" {...S} />
  </svg>
);

export const IconDoc = ({ className = "h-6 w-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M7 3.5h7.5L18.5 8v12.5h-11.5V3.5Z" {...S} />
    <path d="M14 3.5V8h4.5M9.8 12h4.4M9.8 15.5h4.4" {...S} />
  </svg>
);

export const IconPrint = ({ className = "h-6 w-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M7 8.5V3.5h10v5" {...S} />
    <path d="M5 8.5h14a1.5 1.5 0 0 1 1.5 1.5v5.5h-4v5H7.5v-5h-4V10A1.5 1.5 0 0 1 5 8.5Z" {...S} />
  </svg>
);

export const IconCopy = ({ className = "h-6 w-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <rect x="8.5" y="8.5" width="11" height="11" rx="1.5" {...S} />
    <path d="M5.5 14.5h-1a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v1" {...S} />
  </svg>
);

export const IconSearch = ({ className = "h-6 w-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <circle cx="10.5" cy="10.5" r="6" {...S} />
    <path d="m15.2 15.2 5.3 5.3" {...S} />
  </svg>
);

export const IconAlert = ({ className = "h-6 w-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M12 3.2 2.8 19.3h18.4L12 3.2Z" {...S} />
    <path d="M12 9.5v4.5M12 16.8v.4" {...S} />
  </svg>
);

export const IconScales = ({ className = "h-6 w-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M12 4v15.5M7.5 19.5h9M5 7l7-1.8L19 7" {...S} />
    <path d="M5 7 2.8 12a2.9 2.9 0 0 0 4.4 0L5 7ZM19 7l-2.2 5a2.9 2.9 0 0 0 4.4 0L19 7Z" {...S} />
  </svg>
);

export const IconChevron = ({ className = "h-6 w-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="m6 9.5 6 6 6-6" {...S} />
  </svg>
);

export const IconCheck = ({ className = "h-6 w-6", drawn = true }: IconProps & { drawn?: boolean }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m4.5 12.8 5 5L19.5 6.6" className={`tick-path ${drawn ? "tick-drawn" : ""}`} />
  </svg>
);

export const IconUsers = ({ className = "h-6 w-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <circle cx="9" cy="8.5" r="3.2" {...S} />
    <path d="M3.2 19.5c.8-3.3 3-5 5.8-5s5 1.7 5.8 5" {...S} />
    <circle cx="16.8" cy="9.5" r="2.6" {...S} />
    <path d="M15.9 14.7c2.4.2 4.2 1.7 4.9 4.4" {...S} />
  </svg>
);

export const MOVE_ICONS: Record<string, (p: IconProps) => ReactNode> = {
  voice: (p) => <IconMegaphone {...p} />,
  palm: (p) => <IconPalm {...p} />,
  knee: (p) => <IconBolt {...p} />,
  elbow: (p) => <IconElbow {...p} />,
  escape: (p) => <IconEscape {...p} />,
};

export const DIGITAL_ICONS: Record<string, (p: IconProps) => ReactNode> = {
  bug: (p) => <IconBug {...p} />,
  lock: (p) => <IconLock {...p} />,
  pin: (p) => <IconPin {...p} />,
  eye: (p) => <IconEye {...p} />,
  shield: (p) => <IconShield {...p} />,
  siren: (p) => <IconSiren {...p} />,
};
