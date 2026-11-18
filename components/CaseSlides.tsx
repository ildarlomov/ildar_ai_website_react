"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Dict } from "@/lib/content";

// Memcircle-style deck: near-black canvas, one blue accent, text-first.
const BLUE = "text-[#6a9bff]";
const MEMCIRCLE_URL = "https://memcircle.com";

type T = Dict["cases"];

// Animation helper: element fades up (or pops) when its slide becomes active.
const d = (sec: number) => ({ "--d": `${sec}s` }) as React.CSSProperties;

function Arrow({ dir = "right" }: { dir?: "left" | "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true" className={dir === "left" ? "rotate-180" : ""}>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ───────────── visuals, one per slide ───────────── */

function Window({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#12161f] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.45)] sm:p-5">
      <div className="mb-4 flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        {label && <span className="ml-auto text-[0.7rem] font-medium uppercase tracking-wider text-white/35">{label}</span>}
      </div>
      {children}
    </div>
  );
}

function Wave({ bars = 28, className = "h-16" }: { bars?: number; className?: string }) {
  return (
    <div className={`flex items-center gap-[3px] ${className}`} aria-hidden="true">
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className="cs-bar block w-[3px] flex-1 rounded-full bg-[#5b8cff]"
          style={{ height: `${30 + ((i * 37) % 70)}%`, animationDelay: `${(i % 9) * 0.11}s`, animationDuration: `${0.9 + (i % 5) * 0.15}s` }}
        />
      ))}
    </div>
  );
}

function VisualIntro({ t }: { t: T }) {
  return (
    <Window label="Memcircle">
      <div className="cs-in flex items-center gap-2" style={d(0.1)}>
        <span className="cs-rec h-2.5 w-2.5 rounded-full bg-[#ff5a5a]" />
        <span className="text-sm font-semibold text-white/85">{t.demo.rec}</span>
        <span className="ml-auto font-mono text-sm text-white/45">00:42:17</span>
      </div>
      <div className="cs-in mt-5" style={d(0.25)}>
        <Wave bars={34} className="h-24" />
      </div>
      <div className="cs-in mt-5 flex gap-2" style={d(0.45)}>
        {t.demo.platforms.map((p) => (
          <span key={p} className="rounded-full bg-white/8 px-3 py-1 text-xs font-medium text-white/60">
            {p}
          </span>
        ))}
      </div>
    </Window>
  );
}

function VisualRecord({ t }: { t: T }) {
  return (
    <div className="flex w-full max-w-md flex-col items-center gap-6">
      <div className="cs-in cs-pop relative flex h-28 w-28 items-center justify-center" style={d(0.1)}>
        <span className="cs-rec absolute inset-0 rounded-full bg-[#ff5a5a]/15" />
        <span className="cs-rec h-14 w-14 rounded-full bg-[#ff5a5a]" />
      </div>
      <p className="cs-in rounded-full border border-white/12 px-4 py-1.5 text-sm font-medium text-white/75" style={d(0.3)}>
        <span className="mr-2 text-[#ff7a7a]">✕</span>
        {t.demo.noBot}
      </p>
      <div className="flex flex-wrap justify-center gap-2.5">
        {t.demo.platforms.map((p, i) => (
          <span
            key={p}
            className="cs-in cs-pop rounded-2xl border border-white/10 bg-[#12161f] px-5 py-3 text-sm font-semibold text-white/80"
            style={d(0.5 + i * 0.12)}
          >
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}

function VisualTranscript({ t }: { t: T }) {
  return (
    <Window label="Transcript">
      <ul className="space-y-3.5">
        {t.demo.transcript.map((line, i) => (
          <li key={i} className="cs-in flex gap-3" style={d(0.15 + i * 0.45)}>
            <span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${i % 2 ? "bg-white/10 text-white/70" : "bg-[#5b8cff]/20 text-[#8fb2ff]"}`}>
              {line.who[0]}
            </span>
            <div>
              <p className="text-xs font-semibold text-white/45">{line.who}</p>
              <p className="text-sm leading-relaxed text-white/85">{line.text}</p>
            </div>
          </li>
        ))}
        <li className="cs-in pl-10" style={d(0.15 + t.demo.transcript.length * 0.45)}>
          <span className="cs-caret inline-block h-4 w-[2px] bg-[#5b8cff] align-middle" />
        </li>
      </ul>
    </Window>
  );
}

function VisualStructure({ t }: { t: T }) {
  const { demo } = t;
  const label = "text-[0.7rem] font-semibold uppercase tracking-wider text-[#6a9bff]";
  return (
    <Window label="1 meeting = 1 screen">
      <div className="space-y-4">
        <div className="cs-in" style={d(0.1)}>
          <p className={label}>{demo.summaryLabel}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-white/85">{demo.summary}</p>
        </div>
        <div className="cs-in" style={d(0.4)}>
          <p className={label}>{demo.keyLabel}</p>
          <ul className="mt-1.5 space-y-1.5">
            {demo.keyPoints.map((k) => (
              <li key={k} className="flex gap-2 text-sm text-white/80">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#5b8cff]" />
                {k}
              </li>
            ))}
          </ul>
        </div>
        <div className="cs-in" style={d(0.7)}>
          <p className={label}>{demo.actionLabel}</p>
          <ul className="mt-1.5 space-y-1.5">
            {demo.actions.map((a, i) => (
              <li key={a} className="flex items-center gap-2.5 text-sm text-white/80">
                <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[0.6rem] ${i === 0 ? "border-[#3ecf8e] bg-[#3ecf8e]/20 text-[#3ecf8e]" : "border-white/25"}`}>
                  {i === 0 ? "✓" : ""}
                </span>
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Window>
  );
}

function VisualAI({ t }: { t: T }) {
  return (
    <Window label={t.demo.askLabel}>
      <div className="space-y-3">
        <div className="cs-in ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-[#5b8cff] px-4 py-2.5 text-sm font-medium text-white" style={d(0.15)}>
          {t.demo.question}
        </div>
        <div className="cs-in max-w-[92%] rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.05] px-4 py-3 text-sm leading-relaxed text-white/85" style={d(0.8)}>
          {t.demo.answer}
        </div>
        <div className="cs-in flex flex-wrap gap-2 pt-1" style={d(1.3)}>
          {["Transcript", t.demo.summaryLabel, t.demo.actionLabel].map((chip) => (
            <span key={chip} className="rounded-full border border-white/12 px-3 py-1 text-xs text-white/50">
              {chip}
            </span>
          ))}
        </div>
      </div>
    </Window>
  );
}

/* ───────────── the deck ───────────── */

export default function CaseSlides({ t }: { t: T }) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = t.slides.length;

  const go = useCallback((i: number) => {
    const el = track.current;
    if (!el) return;
    const next = Math.max(0, Math.min(count - 1, i));
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
  }, [count]);

  // Native scroll-snap does the swiping; we only read which slide is centred.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => setActive(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const visuals = [VisualIntro, VisualRecord, VisualTranscript, VisualStructure, VisualAI];

  return (
    <div className="mt-10">
      <div
        className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0d12] text-white shadow-[0_30px_80px_rgba(30,20,10,0.25)]"
        role="region"
        aria-roledescription="carousel"
        aria-label={t.title}
      >
        {/* blue glow, same family as the Memcircle brand */}
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] opacity-70"
          style={{ background: "radial-gradient(closest-side, rgba(91,140,255,0.28), transparent)" }}
          aria-hidden="true"
        />

        <div
          ref={track}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") { e.preventDefault(); go(active + 1); }
            if (e.key === "ArrowLeft") { e.preventDefault(); go(active - 1); }
          }}
          className="no-scrollbar relative flex snap-x snap-mandatory overflow-x-auto scroll-smooth outline-none"
        >
          {t.slides.map((slide, i) => {
            const Visual = visuals[i];
            const isActive = i === active;
            return (
              <div
                key={slide.kicker}
                data-active={isActive}
                aria-hidden={!isActive}
                className="cs-slide grid w-full shrink-0 snap-center items-center gap-8 px-6 pb-24 pt-10 sm:px-10 md:min-h-[520px] md:grid-cols-[1.05fr_1fr] md:gap-12 md:px-14 md:pb-24 md:pt-14"
              >
                <div>
                  <p className={`cs-in text-xs font-semibold uppercase tracking-[0.18em] ${BLUE}`} style={d(0)}>
                    {slide.kicker}
                  </p>
                  <h3 className="cs-in font-display mt-4 text-3xl font-bold leading-[1.08] sm:text-[2.6rem]" style={d(0.1)}>
                    {slide.title}
                  </h3>
                  <p className="cs-in mt-5 max-w-md text-base leading-relaxed text-white/65" style={d(0.22)}>
                    {slide.text}
                  </p>
                  {i === count - 1 && (
                    <a
                      href={MEMCIRCLE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cs-in mt-7 inline-flex items-center gap-2 rounded-full bg-[#5b8cff] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
                      style={d(0.4)}
                    >
                      {t.open} <Arrow />
                    </a>
                  )}
                </div>
                <div className="flex justify-center md:justify-end">
                  <Visual t={t} />
                </div>
              </div>
            );
          })}
        </div>

        {/* controls */}
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 px-6 pb-6 sm:px-10 md:px-14">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-white/40">
              {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </span>
            <div className="flex gap-1.5">
              {t.slides.map((s, i) => (
                <button
                  key={s.kicker}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`${i + 1} / ${count}`}
                  className={`h-1.5 rounded-full transition-all ${i === active ? "w-7 bg-[#5b8cff]" : "w-1.5 bg-white/25 hover:bg-white/45"}`}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="mr-2 hidden text-xs text-white/35 sm:inline">{t.demoNote}</span>
            <button
              type="button"
              onClick={() => go(active - 1)}
              disabled={active === 0}
              aria-label={t.prev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <Arrow dir="left" />
            </button>
            <button
              type="button"
              onClick={() => go(active + 1)}
              disabled={active === count - 1}
              aria-label={t.next}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5b8cff] text-white transition hover:brightness-110 disabled:opacity-30"
            >
              <Arrow />
            </button>
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-ink-3 md:hidden">{t.hint}</p>
    </div>
  );
}
