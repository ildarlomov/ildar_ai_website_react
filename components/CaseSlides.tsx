"use client";

// Case study: the Memcircle landing, ported section by section into a full-page horizontal pager.
// Visuals + copy come from memcircle.com (memcircle_landing/components/landing/LandingClient.tsx),
// so the whole block is in Memcircle's own "golden light" style. The product copy is English.

import React, { useCallback, useEffect, useRef, useState } from "react";
import type { Dict } from "@/lib/content";
import { Icon } from "@/components/memcircle/Icon";
import { Avatar } from "@/components/memcircle/Avatar";
import { LiveDot } from "@/components/memcircle/LiveDot";
import { RippleScene } from "@/components/memcircle/RippleScene";
import { MemcircleWordmark } from "@/components/memcircle/MemcircleWordmark";

type T = Dict["cases"];

const SITE = "https://memcircle.com";
const START = "https://app.memcircle.com/?login=true";

// Same palette as the Memcircle landing.
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

const eyebrow: React.CSSProperties = {
  color: C.fgMuted,
  fontSize: 11,
  fontWeight: 500,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  margin: 0,
};
const h2: React.CSSProperties = {
  fontFamily: FD,
  fontSize: "clamp(32px, 4.4vw, 52px)",
  fontWeight: 500,
  letterSpacing: "-0.025em",
  lineHeight: 1.1,
  margin: "20px 0 0",
  color: C.fg,
};
const body: React.CSSProperties = { color: C.fgBody, fontSize: 16, lineHeight: 1.6, margin: "22px 0 0", maxWidth: 480 };
const card: React.CSSProperties = {
  background: C.cardBg,
  borderRadius: 14,
  padding: 24,
  border: `1px solid ${C.cardBorder}`,
  boxShadow: C.cardShadow,
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
};
const twoCol = "grid items-center gap-10 md:grid-cols-2 md:gap-20";

// Reveal helper: elements fade up when their slide becomes active (see .cs-in in globals.css).
const d = (sec: number) => ({ "--d": `${sec}s` }) as React.CSSProperties;

/* ───────────── small shared bits ───────────── */

function Pill({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="transition hover:opacity-85 active:scale-[0.98]"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: "12px 22px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        textDecoration: "none",
        ...(variant === "primary"
          ? { background: "#1a1a1a", color: "#fff", boxShadow: "0 4px 14px rgba(0,0,0,0.18)" }
          : { background: "transparent", color: "#1a1a1a", border: "1px solid rgba(0,0,0,0.18)" }),
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

function Slide({ active, bg = C.pageBg, children }: { active: boolean; bg?: string; children: React.ReactNode }) {
  return (
    <div
      data-active={active}
      aria-hidden={!active}
      className="cs-slide relative flex w-full shrink-0 snap-center flex-col justify-center overflow-hidden px-5 pb-28 pt-28 md:px-14"
      style={{ background: bg, minHeight: "100svh" }}
    >
      <div className="relative z-[1] mx-auto w-full max-w-[1200px]">{children}</div>
    </div>
  );
}

/* ───────────── slide 1: Hero (from memcircle.com) ───────────── */

function HeroSlide({ active }: { active: boolean }) {
  return (
    <Slide active={active} bg={C.heroBg}>
      <div style={{ position: "absolute", top: -20, left: "50%", transform: "translateX(-50%)", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, #ffd9b0 0%, rgba(255,217,176,0) 70%)", filter: "blur(12px)", opacity: 0.8 }} />
      <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", opacity: 0.7, pointerEvents: "none", overflow: "hidden" }}>
        <RippleScene size={900} intensity={0.55} />
      </div>

      <div className="relative mx-auto text-center" style={{ maxWidth: 760 }}>
        <div className="cs-in" style={{ ...d(0), display: "inline-flex", alignItems: "center", gap: 10, padding: "6px 14px", marginBottom: 28, borderRadius: 999, background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.08)", fontSize: 11, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: C.fgMuted }}>
          <LiveDot size={6} /> Now with live meeting detection
        </div>
        <h3 className="cs-in" style={{ ...d(0.1), fontFamily: FD, fontSize: "clamp(36px, 6.2vw, 80px)", fontWeight: 500, letterSpacing: "-0.03em", lineHeight: 1.02, margin: 0, color: C.fg }}>
          Finally, an AI meeting recorder
          <br className="hidden sm:block" /> that works everywhere.
        </h3>
        <p className="cs-in" style={{ ...d(0.25), maxWidth: 540, margin: "28px auto 0", color: C.fgBody, fontSize: 16, lineHeight: 1.6 }}>
          Zoom, Meet, Teams, browser calls, local audio, bot capture, record on the go from your phone, headphones, speakers, whatever you want — choose the setup that fits your workflow and privacy needs.
        </p>
        <div className="cs-in flex flex-col items-center justify-center gap-3 sm:flex-row" style={{ ...d(0.4), marginTop: 40 }}>
          <Pill href={START}>Start Free</Pill>
          <Pill href={SITE} variant="ghost">
            <Icon name="play" size={10} /> Watch demo
          </Pill>
        </div>
        <p className="cs-in" style={{ ...d(0.55), marginTop: 20, fontSize: 11, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: C.fgFaint }}>
          Available on macOS, Windows, Web, iOS &amp; Chrome
        </p>
      </div>
    </Slide>
  );
}

/* ───────────── slide 2: After every meeting ───────────── */

const RECAP_ACTIONS = [
  { who: "Anya Patel", title: "Send Q3 forecast to board", desc: "Circulate the internal draft Wednesday with the revenue beat called out up top, then send the final to the board on Friday.", due: "Friday", done: false },
  { who: "Marcus Lee", title: "Draft revised pricing tiers (Q4)", desc: "Outline the seat + usage-based proposal for enterprise, including grandfathering rules for existing annual contracts.", due: "Mon, May 4", done: false },
  { who: "You", title: "Schedule follow-up with Sequoia", desc: "Book a 30-minute slot this week. Bring the renewal-mix one-pager and an early read on Q4 pricing direction.", due: "This week", done: false },
  { who: "Priya Shah", title: "Coordinate API redesign + pricing release", desc: "Confirm the joint launch window: docs, customer comms, and pricing announcement go together.", due: "Today", done: true },
];
const RECAP_DECISIONS = [
  "API redesign ships before the Q4 pricing change.",
  "Q3 forecast goes to the board on Friday.",
  "Sequoia gets a renewal-mix breakdown next call.",
  "Existing annual contracts honored at current pricing through renewal.",
];

function SectionTitle({ children, badge, tone }: { children: React.ReactNode; badge: string; tone: "accent" | "green" }) {
  const t = tone === "accent" ? { bg: "rgba(196,106,68,0.12)", fg: C.accent } : { bg: "rgba(47,138,91,0.10)", fg: "#2f8a5b" };
  return (
    <div style={{ fontFamily: FD, fontSize: 15, fontWeight: 600, letterSpacing: "-0.005em", margin: "26px 0 14px", color: "#1a1a1a", display: "flex", alignItems: "center", gap: 8 }}>
      {children}
      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "2px 8px", borderRadius: 999, background: t.bg, color: t.fg }}>{badge}</span>
    </div>
  );
}

function RecapSlide({ active }: { active: boolean }) {
  return (
    <Slide active={active}>
      <div className="cs-in text-center" style={{ ...d(0), marginBottom: 40 }}>
        <p style={{ ...eyebrow, marginBottom: 16 }}>After every meeting</p>
        <h3 style={{ ...h2, margin: "0 auto 20px", maxWidth: 580 }}>Your recap, ready to share.</h3>
        <p style={{ ...body, margin: "0 auto", maxWidth: 460 }}>
          Action items, decisions, deadlines — structured and sent the moment the call ends. Works online and offline, shareable with one link.
        </p>
      </div>

      <div className="cs-in" style={{ ...d(0.2), maxWidth: 720, margin: "0 auto", borderRadius: 14, overflow: "hidden", boxShadow: "0 40px 100px rgba(80,50,20,0.22), 0 2px 8px rgba(0,0,0,0.10)", border: "1px solid rgba(0,0,0,0.14)" }}>
        <div style={{ background: "#ddd5c8", padding: "10px 16px", display: "flex", gap: 7, borderBottom: "1px solid rgba(0,0,0,0.12)" }}>
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <div key={c} style={{ width: 12, height: 12, borderRadius: 999, background: c }} />
          ))}
        </div>
        <div style={{ background: "#ede4d8", padding: "10px 22px", borderBottom: "1px solid rgba(0,0,0,0.08)", display: "grid", gap: 3, fontSize: 12, lineHeight: 1.6 }}>
          {[["From", "Memcircle <recap@memcircle.com>"], ["To", "you@company.com"]].map(([l, v]) => (
            <div key={l} style={{ display: "flex", gap: 8 }}>
              <span style={{ color: "#8a7e72", fontWeight: 500, width: 36, flexShrink: 0 }}>{l}</span>
              <span style={{ color: "#2a2620" }}>{v}</span>
            </div>
          ))}
        </div>
        <div
          className="px-5 sm:px-11"
          style={{
            color: "#2a2620",
            background: "#faf2e8",
            backgroundImage: "radial-gradient(ellipse 70% 40% at 0% 0%, rgba(255,200,140,0.65) 0%, transparent 60%), radial-gradient(ellipse 65% 35% at 100% 0%, rgba(255,180,180,0.50) 0%, transparent 60%)",
            backgroundRepeat: "no-repeat",
            paddingTop: 32,
            paddingBottom: 36,
            maxHeight: "min(46vh, 440px)",
            overflowY: "auto",
          }}
        >
          <div style={{ fontFamily: FD, fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.2, color: "#1a1a1a" }}>Q3 Roadmap Review</div>
          <div style={{ marginTop: 7, fontSize: 13, color: "#6b6457" }}>Apr 29 · 10:00 AM · 47 min · 4 participants</div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 18, padding: "10px 16px", borderRadius: 999, background: "#1a1a1a", color: "#faf2e8", fontSize: 13, fontWeight: 600, boxShadow: "0 6px 14px rgba(0,0,0,0.18)" }}>
            View full meeting <Icon name="arrow" size={12} color="#faf2e8" />
          </div>

          <SectionTitle tone="accent" badge={`${RECAP_ACTIONS.filter((a) => !a.done).length} open`}>Action items</SectionTitle>
          <div style={{ display: "grid", gap: 20 }}>
            {RECAP_ACTIONS.map((a) => (
              <div key={a.title} style={{ display: "grid", gridTemplateColumns: "22px 1fr", gap: 14, alignItems: "start" }}>
                <div style={{ width: 18, height: 18, borderRadius: 999, marginTop: 3, border: a.done ? "none" : "1.5px solid rgba(0,0,0,0.22)", background: a.done ? C.accent : "transparent", display: "grid", placeItems: "center" }}>
                  {a.done && <Icon name="check" size={10} color="#fff" />}
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "3px 10px 3px 3px", background: "rgba(196,106,68,0.10)", borderRadius: 999, fontSize: 12, fontWeight: 500, color: "#4a3a2e" }}>
                      <Avatar name={a.who} size={20} />
                      {a.who}
                    </span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a" }}>{a.title}</span>
                  </div>
                  <p style={{ margin: "6px 0 0", fontSize: 13.5, lineHeight: 1.55, color: C.fgBody, maxWidth: "52ch" }}>{a.desc}</p>
                  <div style={{ marginTop: 8, display: "inline-flex", alignItems: "center", gap: 5, fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.accent }}>
                    <Icon name="calendar" size={10} color={C.accent} /> Due {a.due}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ margin: "26px 0 0", height: 1, background: "rgba(0,0,0,0.08)" }} />
          <SectionTitle tone="green" badge={`${RECAP_DECISIONS.length} made`}>Decisions</SectionTitle>
          <div style={{ display: "grid", gap: 10 }}>
            {RECAP_DECISIONS.map((dec) => (
              <div key={dec} style={{ display: "grid", gridTemplateColumns: "22px 1fr", gap: 12, alignItems: "start", fontSize: 14, lineHeight: 1.55 }}>
                <div style={{ width: 20, height: 20, borderRadius: 999, marginTop: 1, background: "rgba(196,106,68,0.15)", display: "grid", placeItems: "center" }}>
                  <Icon name="check" size={10} color={C.accent} />
                </div>
                <span>{dec}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  );
}

/* ───────────── slide 3: Action items (interactive, like the site) ───────────── */

const ITEMS = [
  { who: "Anya", what: "Send Q3 forecast to board", due: "Friday" },
  { who: "Marcus", what: "Draft revised pricing tiers", due: "Mon, May 4" },
  { who: "You", what: "Schedule follow-up with Sequoia", due: "This week" },
  { who: "Priya", what: "Loop in design on the API spec", due: "Today" },
];

function ActionItemsSlide({ active }: { active: boolean }) {
  const [done, setDone] = useState<boolean[]>([true, false, false, false]);
  const toggle = (i: number) => setDone((p) => p.map((v, idx) => (idx === i ? !v : v)));
  return (
    <Slide active={active}>
      <div className={twoCol}>
        <div>
          <p className="cs-in" style={{ ...eyebrow, ...d(0) }}>Action Items</p>
          <h3 className="cs-in" style={{ ...h2, ...d(0.1) }}>
            Decisions, highlighted.
            <br />
            Next steps, taken.
          </h3>
          <p className="cs-in" style={{ ...body, ...d(0.22) }}>
            After every call, Memcircle pulls out who owes what to whom and when — with a one-line summary you can paste into Slack and a link back to the exact moment it was said.
          </p>
        </div>

        <div className="cs-in" style={{ ...card, ...d(0.3) }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, paddingBottom: 14, borderBottom: `1px solid ${C.divider2}` }}>
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
              style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: i < ITEMS.length - 1 ? `1px solid ${C.divider}` : "none", opacity: done[i] ? 0.5 : 1, cursor: "pointer", transition: "opacity 200ms ease" }}
            >
              <div style={{ width: 20, height: 20, minWidth: 20, borderRadius: 999, border: done[i] ? "none" : "1.5px solid rgba(0,0,0,0.25)", background: done[i] ? C.accent : "transparent", display: "grid", placeItems: "center", transition: "background 200ms" }}>
                {done[i] && <Icon name="check" size={11} color="#fff" />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, color: C.fg, textDecoration: done[i] ? "line-through" : "none" }}>{it.what}</div>
                <div style={{ fontSize: 12, color: C.fgMuted, marginTop: 2 }}>{it.who} · due {it.due}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

/* ───────────── slide 4: On the go ───────────── */

function MobileSlide({ active }: { active: boolean }) {
  return (
    <Slide active={active}>
      <div className={twoCol}>
        <div>
          <p className="cs-in" style={{ ...eyebrow, ...d(0) }}>Mobile</p>
          <h3 className="cs-in" style={{ ...h2, ...d(0.1) }}>
            Recordings and transcripts
            <br />
            on the go.
          </h3>
          <p className="cs-in" style={{ ...body, ...d(0.22) }}>
            Capture in-person meetings with one tap. Notes sync instantly to your library the moment the call ends.
          </p>
          <div className="cs-in" style={{ ...d(0.36), marginTop: 32 }}>
            <Pill href={`${SITE}/mobile`}>
              Mobile app <Arrow size={14} />
            </Pill>
          </div>
        </div>
        <div className="cs-in relative flex items-center justify-center" style={{ ...d(0.2), minHeight: 360 }}>
          <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", overflow: "hidden", opacity: 0.8 }}>
            <RippleScene size={520} intensity={0.8} />
          </div>
          <div style={{ position: "relative", width: 104, height: 104, borderRadius: 999, background: "#1a1a1a", display: "grid", placeItems: "center", boxShadow: "0 18px 50px rgba(80,50,20,0.35)" }}>
            <Icon name="mic" size={40} color="#faf2e8" strokeWidth={1.4} />
          </div>
        </div>
      </div>
    </Slide>
  );
}

/* ───────────── slide 5: Desktop ───────────── */

const WHY = [
  { h: "No meeting bots", p: "Capture meetings automatically without a bot joining the call. Your call stays your call." },
  { h: "Notifications", p: "Get notifications for upcoming meetings, with one-click join and record." },
  { h: "Easy access", p: "Quickly start a recording, view upcoming meetings, or jot down notes from your desktop." },
  { h: "Support for all meeting platforms", p: "Works with any meeting you join on your computer — Zoom, Google Meet, Microsoft Teams, Webex, Discord, RingCentral, and more." },
  { h: "Record in-person too", p: "A device microphone is all you need. Run a hallway sync the same way as a Zoom." },
  { h: "Offline-first transcripts", p: "Audio captures locally while you record. Sync to the cloud when you're ready — or never." },
];
const SPECS: [string, string][] = [
  ["Platforms", "macOS 14+, Windows 10+"],
  ["Architectures", "Apple Silicon · Intel · x64 · ARM64"],
  ["Footprint", "~87 MB, < 80 MB RAM idle"],
  ["Security", "Code-signed · Notarized · No telemetry"],
];

function DesktopSlide({ active }: { active: boolean }) {
  return (
    <Slide active={active}>
      <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
        <div>
          <p className="cs-in" style={{ ...eyebrow, ...d(0) }}>Desktop app</p>
          <h3 className="cs-in" style={{ ...h2, ...d(0.1) }}>
            Memcircle for <span style={{ color: C.accent }}>desktop.</span>
          </h3>
          <p className="cs-in" style={{ ...d(0.2), marginTop: 18, color: C.fgBody, fontSize: 17, lineHeight: 1.55 }}>Works everywhere. No meeting bots.</p>
          <div className="cs-in" style={{ ...d(0.3), marginTop: 28 }}>
            <Pill href={`${SITE}/desktop`}>
              Full desktop page <Arrow size={14} />
            </Pill>
          </div>
          <div className="cs-in" style={{ ...d(0.4), marginTop: 32, padding: "20px 22px", borderRadius: 16, background: "rgba(255,255,255,0.55)", border: "1px solid rgba(0,0,0,0.06)", display: "grid", gap: 14 }}>
            {SPECS.map(([k, v]) => (
              <div key={k}>
                <p style={{ margin: 0, color: C.fgMuted, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 500 }}>{k}</p>
                <p style={{ margin: "4px 0 0", color: C.fg, fontSize: 13, lineHeight: 1.4 }}>{v}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2 sm:self-center">
          {WHY.map((pt, i) => (
            <div key={pt.h} className="cs-in" style={{ ...d(0.15 + i * 0.08), paddingTop: 20, borderTop: "1px solid rgba(0,0,0,0.10)" }}>
              <h4 style={{ fontFamily: FD, fontSize: 18, fontWeight: 500, letterSpacing: "-0.01em", margin: 0, color: C.fg }}>{pt.h}</h4>
              <p style={{ margin: "8px 0 0", color: C.fgBody, fontSize: 14, lineHeight: 1.6 }}>{pt.p}</p>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

/* ───────────── slide 6: Privacy & security ───────────── */

function PrivacyIcon({ name }: { name: "mic" | "doc" | "shield" | "lock" }) {
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: C.accent, strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (name === "mic") return <Icon name="mic" size={18} color={C.accent} />;
  if (name === "doc") return <Icon name="file" size={18} color={C.accent} />;
  if (name === "lock")
    return (
      <svg {...common}>
        <rect x="4" y="11" width="16" height="10" rx="2" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M12 3 4 6v6c0 4.5 3.2 8 8 9 4.8-1 8-4.5 8-9V6z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

const PRIVACY = [
  { icon: "mic", title: "Audio deleted immediately", body: "Your recording is discarded the moment transcription finishes. Nothing is stored beyond that point." },
  { icon: "doc", title: "Transcript protection", body: "Once the summary and action items are generated, the raw transcript is purged from our systems." },
  { icon: "shield", title: "Never used to train models", body: "Your meetings are yours. We have no right to use your data for model training, fine-tuning, or benchmarking." },
  { icon: "lock", title: "Encrypted at rest & in transit", body: "All data is encrypted with AES-256 at rest and TLS 1.3 in transit. Keys are managed per-account." },
] as const;

const panel: React.CSSProperties = { padding: 24, borderRadius: 16, background: "rgba(255,250,243,0.85)", border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 12px 32px rgba(120,80,40,0.06)" };

function PrivacySlide({ active }: { active: boolean }) {
  return (
    <Slide active={active}>
      <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
        <div className="md:self-center">
          <p className="cs-in" style={{ ...eyebrow, ...d(0) }}>Privacy &amp; Security</p>
          <h3 className="cs-in" style={{ ...h2, ...d(0.1) }}>
            Your meetings never
            <br />
            leave your control.
          </h3>
          <p className="cs-in" style={{ ...body, ...d(0.22) }}>
            We built Memcircle with a zero-retention mindset. By the time you read your summary, the audio and transcript are already gone.
          </p>
          <div className="cs-in" style={{ ...panel, ...d(0.34), marginTop: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "#fff", border: "1px solid rgba(0,0,0,0.05)", display: "grid", placeItems: "center" }}>
                <PrivacyIcon name="shield" />
              </div>
              <h4 style={{ fontFamily: FD, fontSize: 18, fontWeight: 500, letterSpacing: "-0.015em", margin: 0, color: C.fg }}>GDPR-aligned by design</h4>
            </div>
            <p style={{ margin: "12px 0 0", color: C.fgBody, fontSize: 14, lineHeight: 1.6 }}>
              Data minimisation, purpose limitation, and right-to-erasure are built into the architecture.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:self-center">
          {PRIVACY.map((c, i) => (
            <div key={c.title} className="cs-in" style={{ ...panel, ...d(0.15 + i * 0.1) }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "#fff", border: "1px solid rgba(0,0,0,0.05)", display: "grid", placeItems: "center" }}>
                <PrivacyIcon name={c.icon} />
              </div>
              <h4 style={{ fontFamily: FD, fontSize: 18, fontWeight: 500, letterSpacing: "-0.015em", margin: "16px 0 0", color: C.fg }}>{c.title}</h4>
              <p style={{ margin: "10px 0 0", color: C.fgBody, fontSize: 14, lineHeight: 1.6 }}>{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

/* ───────────── the pager: each slide is a whole section ───────────── */

const SLIDES = [HeroSlide, RecapSlide, ActionItemsSlide, MobileSlide, DesktopSlide, PrivacySlide];
const LABELS = ["Hero", "Recap", "Action items", "Mobile", "Desktop", "Privacy"];

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

  // Native scroll-snap does the swiping; we only read which slide is centred.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => setActive(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative" style={{ background: C.pageBg, color: C.fg }} role="region" aria-roledescription="carousel" aria-label={t.eyebrow}>
      {/* Memcircle header, ported from the landing: wordmark · nav capsule · sign in / start */}
      <header className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 pt-8 md:px-14">
        <a href={SITE} target="_blank" rel="noopener noreferrer" className="pointer-events-auto" aria-label="Memcircle">
          <MemcircleWordmark height={26} color={C.fg} />
        </a>
        <nav className="pointer-events-auto absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full p-1.5 md:flex" style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(0,0,0,0.08)", backdropFilter: "blur(12px)" }}>
          {[["DESKTOP", "/desktop"], ["MOBILE", "/mobile"], ["PRICING", "/pricing"]].map(([label, path]) => (
            <a key={label} href={`${SITE}${path}`} target="_blank" rel="noopener noreferrer" className="rounded-full px-4 py-2 transition hover:bg-black/5" style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.14em", color: "#4a4a4a" }}>
              {label}
            </a>
          ))}
        </nav>
        <div className="pointer-events-auto flex items-center gap-4">
          <a href="https://app.memcircle.com/" target="_blank" rel="noopener noreferrer" className="hidden sm:inline" style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.14em", color: "#4a4a4a" }}>
            SIGN IN
          </a>
          <Pill href={START}>Start Free</Pill>
        </div>
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
          <S key={LABELS[i]} active={i === active} />
        ))}
      </div>

      {/* pager controls */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-center justify-between gap-4 px-5 pb-7 md:px-14">
        <div className="pointer-events-auto flex items-center gap-4">
          <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: C.fgMuted }}>
            <span className="hidden md:inline">{t.eyebrow} · </span>
            {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")} <span className="hidden sm:inline">· {LABELS[active]}</span>
          </span>
          <div className="hidden gap-1.5 sm:flex">
            {LABELS.map((l, i) => (
              <button
                key={l}
                type="button"
                onClick={() => go(i)}
                aria-label={l}
                className="h-1.5 rounded-full transition-all"
                style={{ width: i === active ? 28 : 6, background: i === active ? C.accent : "rgba(0,0,0,0.2)" }}
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
