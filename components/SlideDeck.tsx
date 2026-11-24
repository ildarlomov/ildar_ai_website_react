"use client";

// Shared full-page horizontal slide deck (the Memcircle case and the funnel decks).
// Native scroll-snap does the swiping; each slide is a whole section on desktop and hugs its
// content on phones. Slide reveal animations live in globals.css (.cs-slide / .cs-in / .cs-vis).

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

export type DeckTheme = {
  pageBg: string;
  fg: string;
  fgBody: string;
  fgMuted: string;
  accent: string;
  glow: string; // colour of the soft glow behind every slide
  dot: string; // inactive pager dot
  glass: React.CSSProperties; // prev/next arrow buttons
};

// Apple-style "liquid glass": blurred, saturated backdrop with a bright rim and soft inner highlight.
const GLASS_BASE: React.CSSProperties = {
  width: 56,
  height: 56,
  borderRadius: 999,
  backdropFilter: "blur(18px) saturate(180%)",
  WebkitBackdropFilter: "blur(18px) saturate(180%)",
};

export const LIGHT: DeckTheme = {
  pageBg: "#f6e3cf",
  fg: "#1a1a1a",
  fgBody: "#4a4a4a",
  fgMuted: "#666666", // AA (4.5:1) on the sand panel
  accent: "#c46a44",
  glow: "rgba(255,217,176,0.75)",
  dot: "rgba(0,0,0,0.2)",
  glass: {
    ...GLASS_BASE,
    color: "#1a1a1a",
    background: "linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.18) 100%)",
    border: "1px solid rgba(255,255,255,0.7)",
    boxShadow: "0 10px 30px rgba(80,50,20,0.22), inset 0 1px 1px rgba(255,255,255,0.9), inset 0 -1px 2px rgba(255,255,255,0.25)",
  },
};

export const DARK: DeckTheme = {
  pageBg: "#171514",
  fg: "#f6efe6",
  fgBody: "rgba(246,239,230,0.74)",
  fgMuted: "rgba(246,239,230,0.6)",
  accent: "#c97653", // brighter accent: AA on the dark panel
  glow: "rgba(196,106,68,0.32)",
  dot: "rgba(255,255,255,0.25)",
  glass: {
    ...GLASS_BASE,
    color: "#f6efe6",
    background: "linear-gradient(135deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.05) 100%)",
    border: "1px solid rgba(255,255,255,0.18)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.18)",
  },
};

const ThemeCtx = createContext<DeckTheme>(LIGHT);
export const useDeckTheme = () => useContext(ThemeCtx);

export const FD = "var(--font-inter-tight), 'Inter Tight', Inter, sans-serif";

// Reveal helper: elements fade up when their slide becomes active (.cs-in in globals.css).
export const d = (sec: number) => ({ "--d": `${sec}s` }) as React.CSSProperties;

// Text column + visual column; stacks on phones.
export const split = "grid grid-cols-[minmax(0,1fr)] items-center gap-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-14";

export function Arrow({ dir = "right", size = 16 }: { dir?: "left" | "right"; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true" style={dir === "left" ? { transform: "rotate(180deg)" } : undefined}>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Scales a fixed-size mock-up (w×h) down to the width of its container, so screenshots stay crisp and fit phones.
export function Fit({ w, h, children }: { w: number; h: number; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [s, setS] = useState(1);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setS(Math.min(1, el.clientWidth / w));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [w]);
  return (
    <div ref={ref} style={{ width: "100%", height: h * s, position: "relative" }}>
      <div style={{ width: w, height: h, transform: `scale(${s})`, transformOrigin: "top left", position: "absolute", top: 0, left: 0 }}>{children}</div>
    </div>
  );
}

// Bottom padding includes the 40px (md: 48px) that the NEXT page panel overlaps (PANEL -mt-10/-mt-12
// in Landing.tsx): the slide's own background then fills the area behind that panel's rounded corners,
// instead of a flat section colour that didn't match gradient slides. The pager sits above that band.
export function Slide({ active, bg, children }: { active: boolean; bg?: string; children: React.ReactNode }) {
  const th = useDeckTheme();
  return (
    <div
      data-active={active}
      // `inert` (not aria-hidden) for off-screen slides: it also removes their links/checkboxes
      // from tab order. aria-hidden over focusable content is a malformed accessibility tree
      // (flagged by Lighthouse "Agentic browsing" / a11y audits).
      inert={!active}
      className="cs-slide relative flex w-full min-w-0 max-w-full shrink-0 snap-center flex-col justify-center overflow-hidden px-5 pb-[7.5rem] pt-[88px] md:min-h-[100svh] md:px-14 md:pb-40 md:pt-28"
      style={{ background: bg ?? th.pageBg }}
    >
      {/* soft glow behind every slide */}
      <div style={{ position: "absolute", top: -60, right: "-8%", width: 520, height: 520, borderRadius: "50%", background: `radial-gradient(circle, ${th.glow} 0%, transparent 68%)`, filter: "blur(14px)", pointerEvents: "none" }} />
      <div className="relative z-[1] mx-auto w-full min-w-0 max-w-[1200px]">{children}</div>
    </div>
  );
}

export type SlideText = { tag: string; title: string; text: string };

export function TextBlock({ s, children }: { s: SlideText; children?: React.ReactNode }) {
  const th = useDeckTheme();
  return (
    <div>
      <p className="cs-in" style={{ color: th.accent, fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", margin: 0, ...d(0) }}>{s.tag}</p>
      <h2 className="cs-in" style={{ fontFamily: FD, fontSize: "clamp(30px, 4.2vw, 52px)", fontWeight: 500, letterSpacing: "-0.028em", lineHeight: 1.08, margin: "16px 0 0", color: th.fg, ...d(0.1) }}>{s.title}</h2>
      <p className="cs-in" style={{ color: th.fgBody, fontSize: 17, lineHeight: 1.55, margin: "20px 0 0", maxWidth: 480, ...d(0.22) }}>{s.text}</p>
      {children}
    </div>
  );
}

type DeckProps = {
  theme?: DeckTheme;
  label: string; // carousel name, also shown top-right
  prev: string;
  next: string;
  mark: React.ReactNode; // top-left: project / channel mark
  renderSlides: (active: number) => React.ReactNode[]; // one <Slide active={i === active}> per entry
  className?: string; // e.g. "fast-deck" (globals.css) to speed up the reveal animations
};

export default function SlideDeck({ theme = LIGHT, label, prev, next, mark, renderSlides, className = "" }: DeckProps) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [heights, setHeights] = useState<number[]>([]);
  const [mobile, setMobile] = useState(false);
  const slides = renderSlides(active);
  const count = slides.length;

  const go = useCallback(
    (i: number) => {
      const el = track.current;
      if (!el) return;
      el.scrollTo({ left: Math.max(0, Math.min(count - 1, i)) * el.clientWidth, behavior: "smooth" });
    },
    [count],
  );

  // We only read which slide is centred; the browser does the snapping.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => setActive(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // On phones every slide hugs its own content: the deck is as tall as the active slide (no empty bands).
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const mq = window.matchMedia("(max-width: 767px)");
    const syncMq = () => setMobile(mq.matches);
    syncMq();
    mq.addEventListener("change", syncMq);
    const measure = () => setHeights(Array.from(el.children).map((c) => (c as HTMLElement).offsetHeight));
    measure();
    const ro = new ResizeObserver(measure);
    Array.from(el.children).forEach((c) => ro.observe(c));
    return () => {
      mq.removeEventListener("change", syncMq);
      ro.disconnect();
    };
  }, []);

  return (
    <ThemeCtx.Provider value={theme}>
      <div className={`group relative ${className}`} style={{ background: theme.pageBg, color: theme.fg }} role="region" aria-roledescription="carousel" aria-label={label}>
        <header className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 pt-7 md:px-14">
          <div className="pointer-events-auto">{mark}</div>
          <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: theme.fgMuted }}>{label}</span>
        </header>

        <div
          ref={track}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") { e.preventDefault(); go(active + 1); }
            if (e.key === "ArrowLeft") { e.preventDefault(); go(active - 1); }
          }}
          className="no-scrollbar flex snap-x snap-mandatory items-start overflow-x-auto overflow-y-hidden scroll-smooth outline-none md:items-stretch"
          style={{ height: mobile && heights[active] ? heights[active] : undefined, transition: "height 0.45s cubic-bezier(0.2, 0.7, 0.2, 1)" }}
        >
          {slides}
        </div>

        {/* pager controls */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-center justify-center px-5 pb-16 md:justify-between md:px-14 md:pb-[4.5rem]">
          <div className="pointer-events-auto flex items-center gap-4">
            <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: theme.fgMuted }}>
              {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </span>
            <div className="flex items-center">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`${i + 1} / ${count}`}
                  // 24px tap target (WCAG 2.5.8); the visible 6px bar is the inner span.
                  className="flex h-6 min-w-6 items-center justify-center"
                >
                  <span
                    className="block h-1.5 rounded-full transition-all"
                    style={{ width: i === active ? 26 : 6, background: i === active ? theme.accent : theme.dot }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* liquid-glass arrows: centred over the slide, shown on hover (touch devices swipe instead) */}
        {active > 0 && (
          <button type="button" onClick={() => go(active - 1)} aria-label={prev} className="cs-glass left-3 md:left-6" style={theme.glass}>
            <Arrow dir="left" size={22} />
          </button>
        )}
        {active < count - 1 && (
          <button type="button" onClick={() => go(active + 1)} aria-label={next} className="cs-glass right-3 md:right-6" style={theme.glass}>
            <Arrow size={22} />
          </button>
        )}
      </div>
    </ThemeCtx.Provider>
  );
}
