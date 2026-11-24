"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { AiAgentCopy } from "@/lib/aiAgent";

// "What the agent can do for you": an auto-advancing gallery, one task per slide.
// Each slide stays up long enough to read it: 1.5 s to find your place + 250 ms per word
// (~240 wpm, a comfortable skim), clamped to 6–11 s. The progress bar shows the time left.
// It only runs while the gallery is on screen, and pauses on hover, keyboard focus, a hidden tab
// or the pause button; prefers-reduced-motion starts it paused. Swipe / arrows / tabs switch by hand.

type G = AiAgentCopy["gallery"];

const words = (s: string) => s.split(/\s+/).filter(Boolean).length;
const slideMs = (it: G["items"][number]) =>
  Math.min(11000, Math.max(6000, 1500 + 250 * (words(it.title) + words(it.ask) + it.steps.reduce((n, x) => n + words(x), 0))));

function Check() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="mt-0.5 shrink-0 text-accent-ink">
      <circle cx="10" cy="10" r="10" fill="currentColor" opacity="0.15" />
      <path d="M6 10.2l2.6 2.6L14 7.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {dir === "left" ? <path d="M15 6l-6 6 6 6" /> : <path d="M9 6l6 6-6 6" />}
    </svg>
  );
}

export default function AgentGallery({ g }: { g: G }) {
  const n = g.items.length;
  const [i, setI] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);

  const paused = userPaused || hover || focus || !visible || tabHidden;
  const dur = slideMs(g.items[i]);

  // Reduced motion: no autoplay unless the visitor presses play.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setUserPaused(true);
  }, []);

  // Run only while on screen; restart from the first task the first time it scrolls in.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    const onVis = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  // Advance timer that survives pauses: keeps the remaining time for the current slide.
  const remaining = useRef(dur);
  const startedAt = useRef(0);
  useEffect(() => {
    remaining.current = dur; // new slide → full time
  }, [i, dur]);
  useEffect(() => {
    if (paused) return;
    startedAt.current = performance.now();
    const t = setTimeout(() => setI((x) => (x + 1) % n), remaining.current);
    return () => {
      clearTimeout(t);
      remaining.current = Math.max(0, remaining.current - (performance.now() - startedAt.current));
    };
  }, [i, paused, n]);

  const go = useCallback((to: number) => setI(((to % n) + n) % n), [n]);
  const it = g.items[i];

  // Progress bar: CSS animation restarted per slide (key), frozen while paused.
  const bar = (
    <span
      key={i}
      className="block h-full rounded-full bg-accent"
      style={{ animation: `ag-progress ${dur}ms linear forwards`, animationPlayState: paused ? "paused" : "running" }}
    />
  );

  return (
    <div
      ref={root}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setFocus(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && setFocus(false)}
      className="grid gap-8 md:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] md:gap-12"
      role="region"
      aria-roledescription="carousel"
      aria-label={g.title}
    >
      {/* desktop: task list as tabs, the active one shows the progress bar */}
      <div role="tablist" aria-label={g.title} className="hidden md:flex md:flex-col md:gap-1">
        {g.items.map((x, k) => (
          <button
            key={x.title}
            type="button"
            role="tab"
            aria-selected={k === i}
            onClick={() => go(k)}
            className={`rounded-2xl px-4 py-3 text-left transition ${k === i ? "bg-paper shadow-[0_10px_30px_rgba(80,50,20,0.08)]" : "hover:bg-ink/[0.04]"}`}
          >
            <span className={`font-display text-lg font-bold ${k === i ? "text-ink" : "text-ink-3"}`}>{x.title}</span>
            <span className={`mt-2 block h-1 overflow-hidden rounded-full ${k === i ? "bg-ink/10" : "bg-transparent"}`}>{k === i && bar}</span>
          </button>
        ))}
      </div>

      {/* the slide */}
      <div>
        <div
          className="relative min-h-[23rem] rounded-[2rem] bg-paper p-6 shadow-[0_20px_60px_rgba(80,50,20,0.08)] sm:p-9"
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current == null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1));
            touchX.current = null;
          }}
          aria-live={paused ? "polite" : "off"}
        >
          {/* phones: progress bar on top of the card */}
          <span className="mb-5 block h-1 overflow-hidden rounded-full bg-ink/10 md:hidden">{bar}</span>

          <div key={i} className="ag-in">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-ink">
              {String(i + 1).padStart(2, "0")} · {it.title}
            </p>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-ink-3">{g.you}</p>
            <p className="mt-2 border-l-2 border-accent pl-4 font-display text-xl font-semibold leading-snug text-ink sm:text-2xl">
              «{it.ask}»
            </p>
            <p className="mt-7 text-xs font-semibold uppercase tracking-[0.14em] text-ink-3">{g.agent}</p>
            <ol className="mt-3 space-y-2.5">
              {it.steps.map((s, k) => (
                <li key={s} className="ag-step flex gap-3 text-[1.02rem] leading-snug text-ink-2" style={{ animationDelay: `${0.25 + k * 0.35}s` }}>
                  <Check />
                  {s}
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* controls: arrows, dots, pause */}
        <div className="mt-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => go(i - 1)} aria-label="←" className="flex h-10 w-10 items-center justify-center rounded-full bg-ink/[0.06] text-ink transition hover:bg-ink/10">
              <Chevron dir="left" />
            </button>
            <button type="button" onClick={() => go(i + 1)} aria-label="→" className="flex h-10 w-10 items-center justify-center rounded-full bg-ink/[0.06] text-ink transition hover:bg-ink/10">
              <Chevron dir="right" />
            </button>
            <button
              type="button"
              onClick={() => setUserPaused((p) => !p)}
              aria-label={userPaused ? g.play : g.pause}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-ink/[0.06] text-ink transition hover:bg-ink/10"
            >
              {userPaused ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4l13 8-13 8z" /></svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 4h4v16H6zM14 4h4v16h-4z" /></svg>
              )}
            </button>
          </div>
          <div className="flex items-center">
            {g.items.map((x, k) => (
              <button key={x.title} type="button" onClick={() => go(k)} aria-label={x.title} className="flex h-6 min-w-6 items-center justify-center">
                <span className="block h-1.5 rounded-full transition-all" style={{ width: k === i ? 22 : 6, background: k === i ? "var(--color-accent)" : "rgba(0,0,0,0.18)" }} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
