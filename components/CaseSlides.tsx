"use client";

// Case study: Memcircle, presented as a full-page horizontal pager (each slide is a whole section).
// Visual language + app mock-ups are ported from the Memcircle landing, so the block looks like the product.
// Slide copy is bilingual (lib/content.ts); the product UI inside the mock-ups is the product's own English.

import React, { useCallback, useEffect, useRef, useState } from "react";
import type { Dict } from "@/lib/content";
import { Icon } from "@/components/memcircle/Icon";
import { Avatar } from "@/components/memcircle/Avatar";
import { MemcircleWordmark } from "@/components/memcircle/MemcircleWordmark";
import { HomeV2Preview } from "@/components/memcircle/HomeV2Preview";
import { AppPreviewMobile } from "@/components/memcircle/AppPreviewMobile";

type T = Dict["cases"];

const SITE = "https://memcircle.com";
const LINKS = [
  "https://app.memcircle.com/?login=true",
  SITE,
  `${SITE}/desktop`,
  `${SITE}/mobile`,
  "https://chromewebstore.google.com/detail/memcircle/kinngkocjegmnpakmicaiflbilgikdbp",
];

const C = {
  pageBg: "#f6e3cf",
  heroBg: "linear-gradient(180deg, #faf2e8 0%, #f6e3cf 45%, #f1d4b8 75%, #f0d4d4 100%)",
  fg: "#1a1a1a",
  fgBody: "#4a4a4a",
  fgMuted: "#7a7a7a",
  fgFaint: "#9a8878",
  cardBg: "rgba(255,255,255,0.72)",
  cardBorder: "rgba(0,0,0,0.08)",
  cardShadow: "0 12px 40px rgba(0,0,0,0.10)",
  divider: "rgba(0,0,0,0.05)",
  divider2: "rgba(0,0,0,0.07)",
  accent: "#c46a44",
};
const FD = "var(--font-inter-tight), 'Inter Tight', Inter, sans-serif";

const eyebrow: React.CSSProperties = { color: C.accent, fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", margin: 0 };
const h3: React.CSSProperties = { fontFamily: FD, fontSize: "clamp(30px, 4.2vw, 52px)", fontWeight: 500, letterSpacing: "-0.028em", lineHeight: 1.08, margin: "16px 0 0", color: C.fg };
const body: React.CSSProperties = { color: C.fgBody, fontSize: 17, lineHeight: 1.55, margin: "20px 0 0", maxWidth: 480 };
const card: React.CSSProperties = { background: C.cardBg, borderRadius: 14, padding: 24, border: `1px solid ${C.cardBorder}`, boxShadow: C.cardShadow, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" };
const split = "grid grid-cols-[minmax(0,1fr)] items-center gap-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-14";

// Reveal helper: elements fade up when their slide becomes active (.cs-in in globals.css).
const d = (sec: number) => ({ "--d": `${sec}s` }) as React.CSSProperties;

/* ───────────── shared bits ───────────── */

function Pill({ href, children, variant = "primary" }: { href: string; children: React.ReactNode; variant?: "primary" | "ghost" }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="transition hover:opacity-85 active:scale-[0.98]"
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px 22px", borderRadius: 999,
        fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", whiteSpace: "nowrap", textDecoration: "none",
        ...(variant === "primary"
          ? { background: "#1a1a1a", color: "#fff", boxShadow: "0 4px 14px rgba(0,0,0,0.18)" }
          : { background: "rgba(255,255,255,0.5)", color: "#1a1a1a", border: "1px solid rgba(0,0,0,0.18)" }),
      }}
    >
      {children}
    </a>
  );
}

function Arrow({ dir = "right", size = 16 }: { dir?: "left" | "right"; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true" style={dir === "left" ? { transform: "rotate(180deg)" } : undefined}>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Scales a fixed-size mock-up (w×h) down to the width of its container, so screenshots stay crisp and fit phones.
function Fit({ w, h, children }: { w: number; h: number; children: React.ReactNode }) {
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

function Slide({ active, bg = C.pageBg, children }: { active: boolean; bg?: string; children: React.ReactNode }) {
  return (
    <div
      data-active={active}
      // `inert` (not aria-hidden) for off-screen slides: it also removes their links/checkboxes
      // from tab order. aria-hidden over focusable content is a malformed accessibility tree
      // (flagged by Lighthouse "Agentic browsing" / a11y audits).
      inert={!active}
      className="cs-slide relative flex w-full min-w-0 max-w-full shrink-0 snap-center flex-col justify-center overflow-hidden px-5 pb-20 pt-[88px] md:min-h-[100svh] md:px-14 md:pb-28 md:pt-28"
      style={{ background: bg }}
    >
      {/* soft sun glow behind every slide */}
      <div style={{ position: "absolute", top: -60, right: "-8%", width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,217,176,0.75) 0%, rgba(255,217,176,0) 68%)", filter: "blur(14px)", pointerEvents: "none" }} />
      <div className="relative z-[1] mx-auto w-full min-w-0 max-w-[1200px]">{children}</div>
    </div>
  );
}

function TextBlock({ s, children }: { s: T["slides"][number]; children?: React.ReactNode }) {
  return (
    <div>
      <p className="cs-in" style={{ ...eyebrow, ...d(0) }}>{s.tag}</p>
      <h2 className="cs-in" style={{ ...h3, ...d(0.1) }}>{s.title}</h2>
      <p className="cs-in" style={{ ...body, ...d(0.22) }}>{s.text}</p>
      {children}
    </div>
  );
}

type SlideProps = { active: boolean; t: T };

/* ───────────── slide 0: what it is ───────────── */

function IntroSlide({ active, t }: SlideProps) {
  return (
    <Slide active={active} bg={C.heroBg}>
      <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-8 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-12">
        <TextBlock s={t.slides[0]}>
          <div className="cs-in mt-8" style={d(0.34)}>
            <Pill href={SITE}>{t.ui.open} <Arrow size={14} /></Pill>
          </div>
        </TextBlock>
        <div className="cs-in cs-vis min-w-0" style={d(0.25)}>
          <div className="mx-auto w-[66%] max-w-[250px] md:hidden">
            <Fit w={340} h={720}><AppPreviewMobile /></Fit>
          </div>
          <div className="hidden md:block">
            <Fit w={1280} h={720}><HomeV2Preview height={720} /></Fit>
          </div>
        </div>
      </div>
    </Slide>
  );
}

/* ───────────── slide 1: any device ───────────── */

function DevicesSlide({ active, t }: SlideProps) {
  return (
    <Slide active={active}>
      <div className={split}>
        <TextBlock s={t.slides[1]}>
          <div className="cs-in mt-8 flex flex-wrap gap-3" style={d(0.34)}>
            <Pill href={LINKS[2]}>{t.ui.linkTitles[2]}</Pill>
            <Pill href={LINKS[3]} variant="ghost">{t.ui.linkTitles[3]}</Pill>
          </div>
        </TextBlock>
        <div className="cs-in cs-vis relative pb-10 pr-[10%] sm:pr-[6%]" style={d(0.25)}>
          <Fit w={1280} h={720}><HomeV2Preview height={720} /></Fit>
          <div className="cs-float absolute bottom-0 right-0 w-[34%] max-w-[240px]">
            <Fit w={340} h={720}><AppPreviewMobile /></Fit>
          </div>
        </div>
      </div>
    </Slide>
  );
}

/* ───────────── slide 2: transcript + summary ───────────── */

const OVERVIEW = [
  { title: "Overview", bullets: ["Revenue closed at 142% of plan, driven primarily by mid-market expansion.", "Net retention held at 118%, with gross margin up two points on infra savings.", "Sales cycle compressed from 47 to 38 days as the new self-serve trial flow caught on."] },
  { title: "Pricing changes for Q4", bullets: ["Proposal to add a usage-based tier alongside the seat model, targeting enterprise.", "Existing annual contracts honored at current pricing through their next renewal."] },
];
const DECISIONS = ["API redesign ships before the Q4 pricing change.", "Q3 forecast goes to the board on Friday."];

function WindowFrame({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <div style={{ borderRadius: 14, overflow: "hidden", boxShadow: "0 40px 100px rgba(80,50,20,0.22), 0 2px 8px rgba(0,0,0,0.10)", border: "1px solid rgba(0,0,0,0.14)" }}>
      <div style={{ background: "#ddd5c8", padding: "10px 16px", display: "flex", alignItems: "center", gap: 7, borderBottom: "1px solid rgba(0,0,0,0.12)" }}>
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => <div key={c} style={{ width: 12, height: 12, borderRadius: 999, background: c }} />)}
        {title && <span style={{ marginLeft: 10, fontSize: 12, color: "#8a7e72" }}>{title}</span>}
      </div>
      {children}
    </div>
  );
}

function SummarySlide({ active, t }: SlideProps) {
  return (
    <Slide active={active}>
      <div className={split}>
        <TextBlock s={t.slides[2]} />
        <div className="cs-in cs-vis" style={d(0.25)}>
          <WindowFrame title="Memcircle · Q3 Roadmap Review">
            <div className="px-5 py-6 sm:px-9" style={{ background: "#faf2e8", backgroundImage: "radial-gradient(ellipse 70% 40% at 0% 0%, rgba(255,200,140,0.65) 0%, transparent 60%), radial-gradient(ellipse 65% 35% at 100% 0%, rgba(255,180,180,0.50) 0%, transparent 60%)", backgroundRepeat: "no-repeat", color: "#2a2620" }}>
              <div style={{ fontFamily: FD, fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", color: "#1a1a1a" }}>Q3 Roadmap Review</div>
              <div style={{ marginTop: 6, fontSize: 13, color: "#6b6457" }}>Apr 29 · 10:00 AM · 47 min · 4 participants</div>
              <div style={{ display: "grid", gap: 18, marginTop: 22 }}>
                {OVERVIEW.map((b, bi) => (
                  <div key={b.title} className="cs-in" style={d(0.45 + bi * 0.25)}>
                    <div style={{ fontFamily: FD, fontSize: 14, fontWeight: 600, color: "#1a1a1a", marginBottom: 8 }}>{b.title}</div>
                    <div style={{ display: "grid", gap: 7 }}>
                      {b.bullets.map((x) => (
                        <div key={x} style={{ display: "grid", gridTemplateColumns: "14px 1fr", gap: 6, alignItems: "start" }}>
                          <span style={{ width: 5, height: 5, borderRadius: 999, background: C.accent, marginTop: 8 }} />
                          <span style={{ fontSize: 13.5, lineHeight: 1.55 }}>{x}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="cs-in" style={{ ...d(1), borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: 16 }}>
                  <div style={{ fontFamily: FD, fontSize: 14, fontWeight: 600, color: "#1a1a1a", marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
                    Decisions
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "2px 8px", borderRadius: 999, background: "rgba(47,138,91,0.10)", color: "#2f8a5b" }}>{DECISIONS.length} made</span>
                  </div>
                  {DECISIONS.map((x) => (
                    <div key={x} style={{ display: "grid", gridTemplateColumns: "22px 1fr", gap: 10, alignItems: "start", fontSize: 13.5, lineHeight: 1.55, marginBottom: 6 }}>
                      <div style={{ width: 20, height: 20, borderRadius: 999, background: "rgba(196,106,68,0.15)", display: "grid", placeItems: "center" }}><Icon name="check" size={10} color={C.accent} /></div>
                      <span>{x}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </WindowFrame>
        </div>
      </div>
    </Slide>
  );
}

/* ───────────── slide 3: tasks with owners ───────────── */

const ITEMS = [
  { who: "Anya Patel", what: "Send Q3 forecast to board", due: "Friday" },
  { who: "Marcus Lee", what: "Draft revised pricing tiers", due: "Mon, May 4" },
  { who: "You", what: "Schedule follow-up with Sequoia", due: "This week" },
  { who: "Priya Shah", what: "Loop in design on the API spec", due: "Today" },
];

function TasksSlide({ active, t }: SlideProps) {
  const [done, setDone] = useState<boolean[]>([true, false, false, false]);
  const toggle = (i: number) => setDone((p) => p.map((v, idx) => (idx === i ? !v : v)));
  return (
    <Slide active={active}>
      <div className={split}>
        <TextBlock s={t.slides[3]} />
        <div className="cs-in cs-vis mx-auto w-full max-w-[560px]" style={{ ...card, ...d(0.25), padding: 26 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, paddingBottom: 14, borderBottom: `1px solid ${C.divider2}` }}>
            <div>
              <div style={{ fontSize: 11, color: C.fgMuted, letterSpacing: "0.14em", textTransform: "uppercase" }}>Action items from</div>
              <div style={{ fontSize: 15, fontWeight: 500, marginTop: 4, color: C.fg }}>Q3 Roadmap Review · 47 min</div>
            </div>
            <Icon name="sparkles" size={18} color="#e8855c" />
          </div>
          {ITEMS.map((it, i) => (
            <div
              key={it.what}
              role="checkbox"
              aria-checked={done[i]}
              tabIndex={0}
              onClick={() => toggle(i)}
              onKeyDown={(e) => (e.key === " " || e.key === "Enter") && (e.preventDefault(), toggle(i))}
              className="cs-in"
              style={{ ...d(0.45 + i * 0.15), display: "flex", alignItems: "center", gap: 12, padding: "13px 0", borderBottom: i < ITEMS.length - 1 ? `1px solid ${C.divider}` : "none", cursor: "pointer" }}
            >
              <div style={{ width: 22, height: 22, minWidth: 22, borderRadius: 999, border: done[i] ? "none" : "1.5px solid rgba(0,0,0,0.25)", background: done[i] ? C.accent : "transparent", display: "grid", placeItems: "center", transition: "background 200ms" }}>
                {done[i] && <Icon name="check" size={12} color="#fff" />}
              </div>
              <div style={{ flex: 1, minWidth: 0, opacity: done[i] ? 0.5 : 1, transition: "opacity 200ms" }}>
                <div style={{ fontSize: 14.5, color: C.fg, textDecoration: done[i] ? "line-through" : "none" }}>{it.what}</div>
                <div style={{ marginTop: 5, display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: C.fgMuted }}>
                  <Avatar name={it.who} size={18} /> {it.who}
                  <span style={{ color: C.accent, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", fontSize: 10 }}>· due {it.due}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

/* ───────────── slide 4: Chrome extension ───────────── */

const MEET_NAMES = ["Anna K.", "Dmitri", "Sofia M.", "You"];

function ChromeSlide({ active, t }: SlideProps) {
  const [secs, setSecs] = useState(0);
  useEffect(() => {
    if (!active) return;
    setSecs(0);
    const i = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(i);
  }, [active]);
  const time = `${String(Math.floor(secs / 60)).padStart(2, "0")}:${String(secs % 60).padStart(2, "0")}`;

  return (
    <Slide active={active} bg={C.heroBg}>
      <div className={split}>
        <TextBlock s={t.slides[4]}>
          <div className="cs-in mt-8" style={d(0.34)}>
            <Pill href={LINKS[4]}>{t.ui.addChrome} <Arrow size={14} /></Pill>
            <p style={{ margin: "14px 0 0", fontSize: 12, color: C.fgFaint }}>{t.ui.chromeNote}</p>
          </div>
        </TextBlock>

        <div className="cs-in cs-vis relative" style={d(0.25)}>
          {/* browser window */}
          <div style={{ borderRadius: 14, overflow: "hidden", boxShadow: "0 40px 100px rgba(80,50,20,0.25), 0 2px 8px rgba(0,0,0,0.10)", border: "1px solid rgba(0,0,0,0.14)", background: "#1f1f23" }}>
            <div style={{ background: "#e9e1d4", padding: "9px 14px", display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid rgba(0,0,0,0.12)" }}>
              <div style={{ display: "flex", gap: 7 }}>
                {["#ff5f57", "#febc2e", "#28c840"].map((c) => <div key={c} style={{ width: 11, height: 11, borderRadius: 999, background: c }} />)}
              </div>
              <div style={{ flex: 1, background: "rgba(255,255,255,0.7)", borderRadius: 999, padding: "5px 14px", fontSize: 12, color: "#6b6457" }}>meet.google.com</div>
              <div style={{ position: "relative", width: 28, height: 28, borderRadius: 8, background: "#1a1a1a", display: "grid", placeItems: "center" }}>
                <span className="cs-ring" style={{ position: "absolute", inset: -3, borderRadius: 10, border: `1px solid ${C.accent}` }} />
                <svg width="16" height="16" viewBox="0 0 60 60" fill="none" stroke="#faf2e8" strokeLinecap="round"><circle cx="30" cy="30" r="3" fill="#faf2e8" stroke="none" /><circle cx="30" cy="30" r="12" strokeWidth="4" opacity={0.85} /><circle cx="30" cy="30" r="22" strokeWidth="4" opacity={0.5} /></svg>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 p-3 sm:p-4" style={{ background: "#202124" }}>
              {MEET_NAMES.map((n) => (
                <div key={n} style={{ aspectRatio: "16 / 10", borderRadius: 10, background: "#3c4043", display: "grid", placeItems: "center", position: "relative" }}>
                  <Avatar name={n} size={52} />
                  <span style={{ position: "absolute", left: 8, bottom: 6, fontSize: 11, color: "#e8eaed" }}>{n}</span>
                </div>
              ))}
            </div>
          </div>

          {/* extension popup */}
          <div
            className="cs-in cs-pop absolute right-2 top-12 sm:right-4"
            style={{ ...d(0.7), width: 210, borderRadius: 14, background: "#faf2e8", border: "1px solid rgba(0,0,0,0.1)", boxShadow: "0 24px 60px rgba(0,0,0,0.35)", padding: 16 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="cs-rec" style={{ width: 9, height: 9, borderRadius: 999, background: "#ff5a5a" }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: C.fg }}>{t.ui.recording}</span>
              <span style={{ marginLeft: "auto", fontFamily: "ui-monospace, monospace", fontSize: 12, color: C.fgMuted }}>{time}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 3, height: 34, marginTop: 12 }} aria-hidden="true">
              {Array.from({ length: 22 }).map((_, i) => (
                <span key={i} className="cs-bar" style={{ flex: 1, height: `${35 + ((i * 37) % 65)}%`, borderRadius: 3, background: C.accent, animationDelay: `${(i % 7) * 0.12}s` }} />
              ))}
            </div>
            <div style={{ marginTop: 12, fontSize: 11, color: "#2f8a5b", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
              <Icon name="check" size={11} color="#2f8a5b" /> {t.ui.noBot}
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
}

/* ───────────── slide 5: everywhere + links ───────────── */

function AppleIcon({ size = 18, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path d="M17.6 12.7c0-2.5 2-3.7 2.1-3.8-1.2-1.7-2.9-1.9-3.5-2-1.5-.2-3 .9-3.7.9-.8 0-2-.9-3.3-.8-1.7 0-3.3 1-4.1 2.5-1.8 3.1-.5 7.6 1.2 10.1.9 1.2 1.9 2.6 3.2 2.5 1.3 0 1.8-.8 3.3-.8s2 .8 3.3.8c1.4 0 2.3-1.2 3.1-2.5.5-.7.9-1.5 1.2-2.4-2.6-1-2.8-3.5-2.8-3.5zM15.4 5.5c.7-.9 1.2-2 1-3.2-1 0-2.2.7-3 1.5-.6.8-1.2 2-1 3.1 1.1.1 2.3-.5 3-1.4z" />
    </svg>
  );
}
function WindowsIcon({ size = 18, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path d="M3 5.5 11 4.4v7.1H3V5.5zm0 7.5h8v7.1L3 18.5V13zm9-8.7L21 3v8.5h-9V4.3zM12 13h9v8.5l-9-1.3V13z" />
    </svg>
  );
}
function ChromeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#ea4335" d="M6.68 14A20 20 0 0 1 41.32 14L24 24Z" />
      <path fill="#fbbc04" d="M41.32 14A20 20 0 0 1 24 44L24 24Z" />
      <path fill="#34a853" d="M24 44A20 20 0 0 1 6.68 14L24 24Z" />
      <circle cx="24" cy="24" r="10" fill="#fff" />
      <circle cx="24" cy="24" r="7.6" fill="#4285f4" />
    </svg>
  );
}
function GlobeIcon({ size = 18, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18" />
    </svg>
  );
}
function LaptopIcon({ size = 18, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="5" width="16" height="11" rx="1.5" />
      <path d="M2 19h20" />
    </svg>
  );
}

// Laptop with the desktop app on its screen (16:9 panel inside a bezel).
function Laptop({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div style={{ borderRadius: "16px 16px 4px 4px", background: "#16161a", padding: "2.4% 2.4% 3%", boxShadow: "0 30px 70px rgba(80,50,20,0.3), inset 0 0 0 1.5px rgba(255,255,255,0.08)" }}>
        <div style={{ borderRadius: 6, overflow: "hidden", background: "#000" }}>{children}</div>
      </div>
      <div style={{ position: "relative", height: 12, margin: "0 -5%", borderRadius: "0 0 18px 18px", background: "linear-gradient(180deg, #ddd5c8 0%, #b6ad9f 100%)", boxShadow: "0 12px 24px rgba(80,50,20,0.25)" }}>
        <div style={{ position: "absolute", left: "50%", top: 0, width: "16%", height: 5, transform: "translateX(-50%)", borderRadius: "0 0 8px 8px", background: "rgba(0,0,0,0.18)" }} />
      </div>
    </div>
  );
}

// Compact browser window showing the Chrome extension popup.
function MiniChrome({ label }: { label: string }) {
  return (
    <div style={{ borderRadius: 12, overflow: "hidden", background: "#fff", border: "1px solid rgba(0,0,0,0.12)", boxShadow: "0 24px 60px rgba(80,50,20,0.3)" }}>
      <div style={{ background: "#e9e1d4", padding: "7px 10px", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ display: "flex", gap: 5 }}>
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => <span key={c} style={{ width: 8, height: 8, borderRadius: 99, background: c }} />)}
        </div>
        <div style={{ flex: 1, background: "rgba(255,255,255,0.7)", borderRadius: 99, padding: "3px 8px", fontSize: 9, color: "#6b6457" }}>meet.google.com</div>
        <span style={{ width: 18, height: 18, borderRadius: 5, background: "#1a1a1a", display: "grid", placeItems: "center" }}>
          <svg width="11" height="11" viewBox="0 0 60 60" fill="none" stroke="#faf2e8" strokeLinecap="round"><circle cx="30" cy="30" r="3" fill="#faf2e8" stroke="none" /><circle cx="30" cy="30" r="12" strokeWidth="5" /><circle cx="30" cy="30" r="22" strokeWidth="5" opacity={0.5} /></svg>
        </span>
      </div>
      <div style={{ background: "#202124", padding: 8, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5, position: "relative" }}>
        {MEET_NAMES.slice(0, 4).map((n) => (
          <div key={n} style={{ aspectRatio: "16 / 10", borderRadius: 6, background: "#3c4043", display: "grid", placeItems: "center" }}>
            <Avatar name={n} size={22} />
          </div>
        ))}
        <div style={{ position: "absolute", right: 8, top: 8, width: "58%", borderRadius: 9, background: "#faf2e8", boxShadow: "0 10px 26px rgba(0,0,0,0.4)", padding: "8px 10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10, fontWeight: 600, color: C.fg }}>
            <span className="cs-rec" style={{ width: 6, height: 6, borderRadius: 99, background: "#ff5a5a" }} /> {label}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 2, height: 14, marginTop: 6 }} aria-hidden="true">
            {Array.from({ length: 14 }).map((_, i) => (
              <span key={i} className="cs-bar" style={{ flex: 1, height: `${35 + ((i * 37) % 65)}%`, borderRadius: 2, background: C.accent, animationDelay: `${(i % 7) * 0.12}s` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Floating glass badge with an OS / platform logo.
function OsBadge({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <div className={`cs-float absolute ${className}`} style={{ animationDelay: `${delay}s` }}>
      <div style={{ width: 52, height: 52, borderRadius: 999, display: "grid", placeItems: "center", color: C.fg, background: "linear-gradient(135deg, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.3) 100%)", border: "1px solid rgba(255,255,255,0.8)", backdropFilter: "blur(14px) saturate(180%)", WebkitBackdropFilter: "blur(14px) saturate(180%)", boxShadow: "0 10px 26px rgba(80,50,20,0.2), inset 0 1px 1px rgba(255,255,255,0.9)" }}>
        {children}
      </div>
    </div>
  );
}

function LinksSlide({ active, t }: SlideProps) {
  const icons = [<GlobeIcon key="w" color={C.accent} />, <Icon key="s" name="home" size={18} color={C.accent} />, <LaptopIcon key="d" color={C.accent} />, <AppleIcon key="i" color={C.accent} />, <ChromeIcon key="c" />];
  const platforms: [React.ReactNode, string][] = [
    [<AppleIcon key="a" size={15} />, "macOS"],
    [<WindowsIcon key="w" size={15} />, "Windows"],
    [<AppleIcon key="i" size={15} />, "iOS"],
    [<ChromeIcon key="c" size={15} />, "Chrome"],
    [<GlobeIcon key="g" size={15} />, "Web"],
  ];
  return (
    <Slide active={active} bg={C.heroBg}>
      <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div className="lg:col-start-1 lg:row-start-1 lg:self-end">
          <p className="cs-in" style={{ ...eyebrow, ...d(0) }}>{t.slides[5].tag}</p>
          <h2 className="cs-in" style={{ ...h3, ...d(0.1) }}>{t.slides[5].title}</h2>
          <p className="cs-in" style={{ ...body, ...d(0.2) }}>{t.slides[5].text}</p>

          <div className="cs-in mt-6 flex flex-wrap gap-2" style={d(0.3)}>
            {platforms.map(([icon, name]) => (
              <span key={name} style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "7px 13px", borderRadius: 999, background: "rgba(255,255,255,0.6)", border: "1px solid rgba(0,0,0,0.08)", color: C.fg, fontSize: 12, fontWeight: 600 }}>
                {icon}{name}
              </span>
            ))}
          </div>

        </div>

        {/* devices scene */}
        <div className="cs-in cs-vis relative mx-auto w-full max-w-[660px] pb-14 pt-8 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:pt-10" style={d(0.25)}>
          <div className="mx-auto w-[88%]">
            <Laptop>
              <Fit w={1280} h={720}><HomeV2Preview height={720} /></Fit>
            </Laptop>
          </div>
          <div className="cs-float absolute bottom-0 right-0 w-[23%] max-w-[150px]" style={{ animationDelay: "0.6s" }}>
            <Fit w={340} h={720}><AppPreviewMobile /></Fit>
          </div>
          <div className="absolute bottom-0 left-0 hidden w-[44%] sm:block">
            <MiniChrome label={t.ui.recording} />
          </div>
          <OsBadge className="left-[2%] top-0" delay={0}><AppleIcon size={24} /></OsBadge>
          <OsBadge className="right-[10%] top-0" delay={0.8}><WindowsIcon size={22} /></OsBadge>
          <OsBadge className="-left-1 top-[34%] hidden sm:block" delay={1.4}><ChromeIcon size={26} /></OsBadge>
          <OsBadge className="-right-1 top-[30%] hidden sm:block" delay={2}><GlobeIcon size={24} /></OsBadge>
        </div>
        <div className="lg:col-start-1 lg:row-start-2 lg:self-start">
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            {LINKS.map((href, i) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`cs-in group/link flex min-w-0 items-center gap-2.5 rounded-2xl p-2.5 transition hover:-translate-y-0.5 sm:gap-3 sm:p-3 ${i === LINKS.length - 1 ? "col-span-2 sm:col-span-1" : ""}`}
                style={{ ...d(0.38 + i * 0.07), background: "rgba(255,250,243,0.85)", border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 10px 26px rgba(120,80,40,0.08)", textDecoration: "none" }}
              >
                <span style={{ width: 38, height: 38, borderRadius: 10, background: "#fff", border: "1px solid rgba(0,0,0,0.05)", display: "grid", placeItems: "center", flexShrink: 0 }}>{icons[i]}</span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ display: "block", fontFamily: FD, fontSize: 15, fontWeight: 500, color: C.fg }}>{t.ui.linkTitles[i]}</span>
                  <span style={{ display: "block", fontSize: 11.5, color: C.fgMuted, marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.ui.linkSubs[i]}</span>
                </span>
                <span className="hidden transition group-hover/link:translate-x-0.5 sm:inline" style={{ color: C.accent }}><Arrow size={15} /></span>
              </a>
            ))}
          </div>

          <p className="cs-in mt-6" style={{ ...d(0.8), maxWidth: 480, fontSize: 12.5, lineHeight: 1.6, color: C.fgMuted }}>
            <Icon name="check" size={12} color="#2f8a5b" /> {t.ui.privacy}
          </p>
        </div>
      </div>
    </Slide>
  );
}

/* ───────────── the pager ───────────── */

// Apple-style "liquid glass": blurred, saturated backdrop with a bright rim and soft inner highlight.
const GLASS: React.CSSProperties = {
  width: 56,
  height: 56,
  borderRadius: 999,
  color: C.fg,
  background: "linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.18) 100%)",
  border: "1px solid rgba(255,255,255,0.7)",
  backdropFilter: "blur(18px) saturate(180%)",
  WebkitBackdropFilter: "blur(18px) saturate(180%)",
  boxShadow: "0 10px 30px rgba(80,50,20,0.22), inset 0 1px 1px rgba(255,255,255,0.9), inset 0 -1px 2px rgba(255,255,255,0.25)",
};

const SLIDES = [IntroSlide, DevicesSlide, SummarySlide, TasksSlide, ChromeSlide, LinksSlide];

export default function CaseSlides({ t }: { t: T }) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [heights, setHeights] = useState<number[]>([]);
  const [mobile, setMobile] = useState(false);
  const count = SLIDES.length;

  const go = useCallback(
    (i: number) => {
      const el = track.current;
      if (!el) return;
      el.scrollTo({ left: Math.max(0, Math.min(count - 1, i)) * el.clientWidth, behavior: "smooth" });
    },
    [count],
  );

  // Native scroll-snap does the swiping (touch + trackpad); we only read which slide is centred.
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
    <div className="group relative" style={{ background: C.pageBg, color: C.fg }} role="region" aria-roledescription="carousel" aria-label={t.eyebrow}>
      {/* case header: project mark + case label (no site navigation) */}
      <header className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 pt-7 md:px-14">
        <a href={SITE} target="_blank" rel="noopener noreferrer" className="pointer-events-auto" aria-label="Memcircle">
          <MemcircleWordmark height={24} color={C.fg} />
        </a>
        <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: C.fgMuted }}>{t.eyebrow}</span>
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
        {SLIDES.map((S, i) => (
          <S key={i} active={i === active} t={t} />
        ))}
      </div>

      {/* pager controls */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-center justify-center px-5 pb-6 md:justify-between md:px-14">
        <div className="pointer-events-auto flex items-center gap-4">
          <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: C.fgMuted }}>
            {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
          <div className="flex gap-1.5">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`${i + 1} / ${count}`}
                className="h-1.5 rounded-full transition-all"
                style={{ width: i === active ? 26 : 6, background: i === active ? C.accent : "rgba(0,0,0,0.2)" }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* liquid-glass arrows: centred over the slide, shown on hover (touch devices swipe instead) */}
      {active > 0 && (
        <button type="button" onClick={() => go(active - 1)} aria-label={t.prev} className="cs-glass left-3 md:left-6" style={GLASS}>
          <Arrow dir="left" size={22} />
        </button>
      )}
      {active < count - 1 && (
        <button type="button" onClick={() => go(active + 1)} aria-label={t.next} className="cs-glass right-3 md:right-6" style={GLASS}>
          <Arrow size={22} />
        </button>
      )}
    </div>
  );
}
