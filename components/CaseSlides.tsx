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
const split = "grid items-center gap-9 md:grid-cols-[0.8fr_1.2fr] md:gap-14";

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
      aria-hidden={!active}
      className="cs-slide relative flex w-full shrink-0 snap-center flex-col justify-center overflow-hidden px-5 pb-28 pt-24 md:px-14 md:pt-28"
      style={{ background: bg, minHeight: "100svh" }}
    >
      {/* soft sun glow behind every slide */}
      <div style={{ position: "absolute", top: -60, right: "-8%", width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,217,176,0.75) 0%, rgba(255,217,176,0) 68%)", filter: "blur(14px)", pointerEvents: "none" }} />
      <div className="relative z-[1] mx-auto w-full max-w-[1200px]">{children}</div>
    </div>
  );
}

function TextBlock({ s, children }: { s: T["slides"][number]; children?: React.ReactNode }) {
  return (
    <div>
      <p className="cs-in" style={{ ...eyebrow, ...d(0) }}>{s.tag}</p>
      <h3 className="cs-in" style={{ ...h3, ...d(0.1) }}>{s.title}</h3>
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
      <div className="grid items-center gap-9 lg:grid-cols-[0.78fr_1.22fr] lg:gap-12">
        <TextBlock s={t.slides[0]}>
          <div className="cs-in mt-8" style={d(0.34)}>
            <Pill href={SITE}>{t.ui.open} <Arrow size={14} /></Pill>
          </div>
        </TextBlock>
        <div className="cs-in cs-vis" style={d(0.25)}>
          <Fit w={900} h={696}><HomeV2Preview /></Fit>
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
          <Fit w={900} h={696}><HomeV2Preview /></Fit>
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

const LINK_ICONS = ["sparkles", "home", "settings", "mic", "plus"] as const;

function LinksSlide({ active, t }: SlideProps) {
  return (
    <Slide active={active}>
      <div className="mx-auto text-center" style={{ maxWidth: 720 }}>
        <p className="cs-in" style={{ ...eyebrow, ...d(0) }}>{t.slides[5].tag}</p>
        <h3 className="cs-in" style={{ ...h3, ...d(0.1) }}>{t.slides[5].title}</h3>
        <p className="cs-in" style={{ ...body, ...d(0.22), margin: "20px auto 0" }}>{t.slides[5].text}</p>
      </div>

      <div className="mx-auto mt-10 grid max-w-[1040px] gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {LINKS.map((href, i) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="cs-in group flex flex-col rounded-2xl p-5 transition hover:-translate-y-1"
            style={{ ...d(0.32 + i * 0.08), background: "rgba(255,250,243,0.85)", border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 12px 32px rgba(120,80,40,0.08)", textDecoration: "none" }}
          >
            <div style={{ width: 38, height: 38, borderRadius: 10, background: "#fff", border: "1px solid rgba(0,0,0,0.05)", display: "grid", placeItems: "center" }}>
              <Icon name={LINK_ICONS[i]} size={18} color={C.accent} />
            </div>
            <div style={{ fontFamily: FD, fontSize: 17, fontWeight: 500, letterSpacing: "-0.01em", marginTop: 16, color: C.fg }}>{t.ui.linkTitles[i]}</div>
            <div style={{ marginTop: 4, fontSize: 12, color: C.fgMuted, flex: 1 }}>{t.ui.linkSubs[i]}</div>
            <div className="mt-4 transition group-hover:translate-x-1" style={{ color: C.accent }}><Arrow size={16} /></div>
          </a>
        ))}
      </div>

      <p className="cs-in mx-auto mt-8 text-center" style={{ ...d(0.8), maxWidth: 560, fontSize: 13, lineHeight: 1.6, color: C.fgMuted }}>
        <Icon name="check" size={12} color="#2f8a5b" /> {t.ui.privacy}
      </p>
    </Slide>
  );
}

/* ───────────── the pager ───────────── */

const SLIDES = [IntroSlide, DevicesSlide, SummarySlide, TasksSlide, ChromeSlide, LinksSlide];

export default function CaseSlides({ t }: { t: T }) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
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

  return (
    <div className="relative" style={{ background: C.pageBg, color: C.fg }} role="region" aria-roledescription="carousel" aria-label={t.eyebrow}>
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
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto scroll-smooth outline-none"
      >
        {SLIDES.map((S, i) => (
          <S key={i} active={i === active} t={t} />
        ))}
      </div>

      {/* pager controls */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-center justify-between gap-4 px-5 pb-6 md:px-14">
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
        <div className="pointer-events-auto flex items-center gap-2">
          <span className="mr-2 hidden text-xs md:inline" style={{ color: C.fgFaint }}>{t.hint}</span>
          <button type="button" onClick={() => go(active - 1)} disabled={active === 0} aria-label={t.prev} className="flex h-11 w-11 items-center justify-center rounded-full transition hover:bg-black/5 disabled:opacity-30" style={{ border: "1px solid rgba(0,0,0,0.18)", color: C.fg }}>
            <Arrow dir="left" size={18} />
          </button>
          <button type="button" onClick={() => go(active + 1)} disabled={active === count - 1} aria-label={t.next} className="flex h-11 w-11 items-center justify-center rounded-full transition hover:opacity-85 disabled:opacity-30" style={{ background: "#1a1a1a", color: "#fff", boxShadow: "0 4px 14px rgba(0,0,0,0.18)" }}>
            <Arrow size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
