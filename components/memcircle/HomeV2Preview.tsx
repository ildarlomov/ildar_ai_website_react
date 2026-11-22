"use client";

import React, { useState } from "react";
import { Avatar } from "@/components/memcircle/Avatar";
import { Icon } from "@/components/memcircle/Icon";
import { LiveDot } from "@/components/memcircle/LiveDot";
import { MemcircleWordmark } from "@/components/memcircle/MemcircleWordmark";

/* ─── data ─────────────────────────────────────────────────────────────── */

const SOURCES: Record<string, { label: string; color: string }> = {
  gWork:     { label: "Google · Work",     color: "#3b82f6" },
  gPersonal: { label: "Google · Personal", color: "#22c55e" },
  outlook:   { label: "Outlook",           color: "#0ea5e9" },
  icloud:    { label: "iCloud",            color: "#a855f7" },
};

interface Meeting {
  id: string;
  group: string;
  time: string;
  dur: string;
  title: string;
  loc: string;
  people: string[];
  source: string;
  live?: boolean;
  bot: boolean;
  declined?: boolean;
  snippet?: string;
}

const SEED: Meeting[] = [
  { id: "m-1", group: "Now",       time: "10:00 AM", dur: "60m",
    title: "Q3 Roadmap Review",    loc: "Zoom",
    people: ["Anya Patel","Marcus Lee","Priya Shah","You"],
    source: "gWork", live: true,  bot: true,
    snippet: "Marcus is walking through the proposed pricing tiers…" },

  { id: "m-2", group: "Today",     time: "11:30 AM", dur: "30m",
    title: "1:1 — Anya",           loc: "Google Meet",
    people: ["Anya Patel","You"],
    source: "gWork", bot: true },
  { id: "m-3", group: "Today",     time: "1:00 PM",  dur: "45m",
    title: "Design crit — onboarding v3", loc: "Zoom",
    people: ["Priya Shah","Jules K.","David M.","You"],
    source: "gWork", bot: true },
  { id: "m-4", group: "Today",     time: "2:30 PM",  dur: "30m",
    title: "Dentist",              loc: "In person · Mission St",
    people: ["You"],
    source: "gPersonal", bot: false, declined: true },
  { id: "m-5", group: "Today",     time: "4:00 PM",  dur: "60m",
    title: "Acme partnership sync",loc: "Microsoft Teams",
    people: ["Maya Chen","Daniel R.","You"],
    source: "outlook", bot: true },

  { id: "m-6", group: "Tomorrow",  time: "9:30 AM",  dur: "15m",
    title: "Standup",              loc: "Zoom",
    people: ["Eng team — 8 people"],
    source: "gWork", bot: false },
  { id: "m-7", group: "Tomorrow",  time: "11:00 AM", dur: "45m",
    title: "Sequoia intro call",   loc: "Zoom",
    people: ["Roelof B.","Maya Chen","You"],
    source: "gWork", bot: true },
  { id: "m-8", group: "Tomorrow",  time: "6:00 PM",  dur: "90m",
    title: "Pottery class",        loc: "In person · Pottery SF",
    people: ["You"],
    source: "icloud", bot: false },

  { id: "m-9",  group: "This week", time: "Thu · 10:00 AM", dur: "30m",
    title: "Board prep",           loc: "Zoom",
    people: ["Marcus Lee","Anya Patel","You"],
    source: "gWork", bot: true },
  { id: "m-10", group: "This week", time: "Thu · 3:00 PM",  dur: "60m",
    title: "Customer interview — Linear", loc: "Google Meet",
    people: ["You","David M.","Customer"],
    source: "gWork", bot: true },
  { id: "m-11", group: "This week", time: "Fri · 9:00 AM",  dur: "45m",
    title: "Weekly all-hands",     loc: "Zoom",
    people: ["12 people"],
    source: "gWork", bot: false },
];

const GROUP_ORDER = ["Today", "Tomorrow", "This week"];

/* ─── theme vars ────────────────────────────────────────────────────────── */

function ThemeStyles() {
  return (
    <style>{`
      .mc-preview {
        --t-bg:#faf2e8;--t-canvas:#faf6ee;--t-card:#ffffff;--t-card-2:#f6ecdb;
        --t-line:rgba(0,0,0,0.06);--t-line-2:rgba(0,0,0,0.04);--t-divider:rgba(0,0,0,0.08);
        --t-fg-1:#1a1a1a;--t-fg-2:#4a4a4a;--t-fg-3:#7a7a7a;--t-fg-4:#a0998d;
        --t-accent:#c46a44;--t-accent-bg:rgba(255,180,100,0.18);--t-accent-bg-2:rgba(255,180,100,0.08);
        --t-accent-border:rgba(196,106,68,0.25);--t-accent-strong:#c46a44;
        --t-accent-bg-strong:rgba(196,106,68,0.12);--t-accent-on:#ffffff;
        --t-search-bg:#ffffff;--t-row-hover:rgba(0,0,0,0.03);--t-row-hover-border:rgba(0,0,0,0.06);
        --t-kbd-bg:rgba(0,0,0,0.06);--t-pill-shadow:0 12px 40px rgba(120,80,30,0.12);
        --t-card-shadow:0 12px 40px rgba(120,80,30,0.08);
        --t-btn-bg:#1a1a1a;--t-btn-fg:#faf2e8;--t-btn-shadow:0 6px 14px rgba(0,0,0,0.18);
        --t-cb-border:rgba(0,0,0,0.2);
        --t-gradient-bg:linear-gradient(180deg,#f6e3cf 0%,#faf2e8 60%,#f0d4d4 100%);
        --t-card-warm:linear-gradient(135deg,#ffe8cf 0%,#ffd2a3 60%,#f9c8b1 100%);
        --t-card-warm-fg:#1a1a1a;--t-card-warm-fg-2:#4a4a4a;
        --t-card-warm-glow:radial-gradient(circle,rgba(255,217,176,0.95) 0%,transparent 70%);
        --t-card-warm-shadow:0 12px 30px rgba(196,106,68,0.15);
        --t-card-warm-avatar-border:#ffe8cf;
        --t-frosted-bg:rgba(255,255,255,0.6);--t-frosted-border:rgba(0,0,0,0.06);
        --t-frosted-shadow:0 12px 30px rgba(120,80,30,0.12);
        --t-warm-tile:#faf2e8;
        --t-row-hover-border:rgba(0,0,0,0.06);
      }
      @keyframes mcPulse {
        0%,100% { opacity:1; transform:scale(1); }
        50%      { opacity:0.4; transform:scale(0.85); }
      }
      @keyframes mcRipplePreview {
        0%   { width:30px; height:30px; opacity:0.85; }
        100% { width:200px; height:200px; opacity:0; }
      }
      .mc-preview ::-webkit-scrollbar { width:6px; }
      .mc-preview ::-webkit-scrollbar-thumb { background:rgba(0,0,0,0.08); border-radius:999px; }
      .mc-preview ::-webkit-scrollbar-track { background:transparent; }
    `}</style>
  );
}

/* ─── sub-components ────────────────────────────────────────────────────── */

function ThemedPill({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button onClick={onClick} style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      padding: "8px 14px", border: "none", borderRadius: 999,
      background: "var(--t-btn-bg)", color: "var(--t-btn-fg)",
      fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 700,
      letterSpacing: "0.16em", textTransform: "uppercase", cursor: "pointer",
      boxShadow: "var(--t-btn-shadow)", whiteSpace: "nowrap",
    }}>{children}</button>
  );
}

function BotSwitch({ on, onChange, disabled, size = "md", label = "Record meeting" }: {
  label?: string;
  on: boolean; onChange: (v: boolean) => void; disabled?: boolean; size?: "md" | "lg";
}) {
  const W = size === "lg" ? 29 : 26;
  const H = size === "lg" ? 18 : 14;
  const KNOB = size === "lg" ? 14 : 10;
  const PAD = 2;
  return (
    <div
      role="switch"
      aria-checked={on}
      aria-label={label}
      tabIndex={disabled ? -1 : 0}
      onClick={(e) => { e.stopPropagation(); if (!disabled) onChange(!on); }}
      onKeyDown={(e) => {
        if (disabled) return;
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); e.stopPropagation(); onChange(!on); }
      }}
      style={{
        position: "relative", width: W, height: H, minWidth: W, maxWidth: W, minHeight: H, maxHeight: H,
        borderRadius: 999,
        background: disabled ? "var(--t-line)" : (on ? "var(--t-accent-strong)" : "var(--t-line)"),
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
        flex: `0 0 ${W}px`, padding: 0, margin: 0, boxSizing: "border-box",
        overflow: "hidden", transition: "background 160ms",
      }}>
      <span style={{
        position: "absolute", top: PAD,
        left: on ? W - KNOB - PAD : PAD,
        width: KNOB, height: KNOB, borderRadius: 999,
        background: "var(--t-accent-on)",
        boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
        transition: "left 160ms",
      }}/>
    </div>
  );
}

function LiveHero({ m, onToggle }: { m: Meeting; onToggle: (id: string, v: boolean) => void }) {
  return (
    <div style={{
      position: "relative", overflow: "hidden",
      borderRadius: 18, padding: "22px 26px",
      background: "var(--t-card-warm)",
      boxShadow: "var(--t-card-warm-shadow)",
    }}>
      <div style={{
        position: "absolute", top: -80, right: -60,
        width: 280, height: 280, borderRadius: "50%",
        background: "var(--t-card-warm-glow)", pointerEvents: "none",
      }}/>
      <div style={{
        position: "absolute", top: 20, right: 20,
        width: 120, height: 120, pointerEvents: "none", opacity: 0.7,
      }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{
            position: "absolute", inset: 0, margin: "auto",
            borderRadius: "50%", border: "1px solid rgba(196,106,68,0.35)",
            width: 30, height: 30,
            animation: `mcRipplePreview 6s cubic-bezier(0.2,0.7,0.1,1) ${i * 1.6}s infinite`,
          }}/>
        ))}
      </div>

      <div style={{ position: "relative", display: "flex",
        alignItems: "flex-start", justifyContent: "space-between", gap: 24 }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <LiveDot size={7}/>
            <span style={{ fontSize: 10, fontWeight: 600,
              color: "var(--t-accent-strong)", letterSpacing: "0.18em",
              textTransform: "uppercase" }}>Live · joining now</span>
          </div>
          <h2 style={{
            fontFamily: "'Inter Tight', sans-serif", fontSize: 24, fontWeight: 500,
            letterSpacing: "-0.02em", margin: "8px 0 0",
            color: "var(--t-card-warm-fg)", lineHeight: 1.15,
          }}>{m.title}</h2>
          <p style={{ color: "var(--t-card-warm-fg-2)", fontSize: 13,
            lineHeight: 1.5, margin: "6px 0 0" }}>
            {m.time} · {m.loc} · {m.people.length} people
          </p>
          {m.snippet && (
            <p style={{ color: "var(--t-card-warm-fg-2)", fontSize: 13,
              lineHeight: 1.5, margin: "10px 0 0", fontStyle: "italic", opacity: 0.85 }}>
              &ldquo;{m.snippet}&rdquo;
            </p>
          )}

          <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ display: "flex" }}>
              {m.people.slice(0, 4).map((p, i) => (
                <div key={i} style={{ marginLeft: i ? -8 : 0,
                  border: "2px solid var(--t-card-warm-avatar-border)", borderRadius: 999 }}>
                  <Avatar name={p} size={28}/>
                </div>
              ))}
            </div>
            <button style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "9px 16px", borderRadius: 999, border: "none",
              background: "var(--t-btn-bg)", color: "var(--t-btn-fg)",
              fontSize: 11, fontWeight: 700, letterSpacing: "0.14em",
              textTransform: "uppercase", cursor: "pointer",
              boxShadow: "var(--t-btn-shadow)",
            }}>Open meeting</button>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: "auto" }}>
              <span style={{ fontSize: 10, fontWeight: 600,
                color: "var(--t-accent-strong)", letterSpacing: "0.14em",
                textTransform: "uppercase" }}>Bot in room</span>
              <BotSwitch size="lg" label={`Record “${m.title}”`} on={m.bot} onChange={(v) => onToggle(m.id, v)}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function splitTime(t: string) {
  const m = t.match(/^([A-Za-z]+)\s*·\s*(.+)$/);
  return m ? { day: m[1], time: m[2] } : { day: null, time: t };
}

function MeetingRow({ m, onToggle }: { m: Meeting; onToggle: (id: string, v: boolean) => void }) {
  const muted = m.declined;
  const { day, time } = splitTime(m.time);
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "72px 1fr auto auto",
      gap: 18, alignItems: "center",
      padding: "12px 14px 12px 12px", borderRadius: 14,
      background: "var(--t-card)", border: "1px solid var(--t-line)",
      boxShadow: "0 1px 2px rgba(120,80,30,0.04)",
      cursor: "pointer", opacity: muted ? 0.6 : 1,
      transition: "transform 160ms, box-shadow 180ms, border-color 180ms",
    }}
    onMouseEnter={(e) => {
      (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
      (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 16px rgba(120,80,30,0.08)";
      (e.currentTarget as HTMLElement).style.borderColor = "var(--t-row-hover-border)";
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLElement).style.transform = "none";
      (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 2px rgba(120,80,30,0.04)";
      (e.currentTarget as HTMLElement).style.borderColor = "var(--t-line)";
    }}>
      <div style={{
        padding: day ? "6px 8px 8px" : "10px 8px", borderRadius: 10,
        background: "var(--t-warm-tile)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
        overflow: "hidden",
      }}>
        {day && (
          <span style={{ fontSize: 9, fontWeight: 600, color: "var(--t-accent-strong)",
            letterSpacing: "0.14em", textTransform: "uppercase", lineHeight: 1 }}>{day}</span>
        )}
        <span style={{
          fontFamily: "'Inter Tight', sans-serif", fontSize: 13, fontWeight: 500,
          color: "var(--t-fg-1)", fontFeatureSettings: '"tnum"',
          letterSpacing: "-0.005em", lineHeight: 1.1, whiteSpace: "nowrap",
        }}>{time}</span>
        <span style={{ fontSize: 9, color: "var(--t-fg-4)",
          letterSpacing: "0.12em", textTransform: "uppercase" }}>{m.dur}</span>
      </div>

      <div style={{ minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
          <span style={{ fontSize: 14, fontWeight: 500, color: "var(--t-fg-1)",
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.title}</span>
          {m.declined && (
            <span style={{
              padding: "2px 7px", borderRadius: 999,
              background: "var(--t-line)", color: "var(--t-fg-4)",
              fontSize: 9, fontWeight: 600, letterSpacing: "0.12em",
              textTransform: "uppercase", flexShrink: 0,
            }}>Declined</span>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 3,
          fontSize: 12, color: "var(--t-fg-3)", minWidth: 0 }}>
          <span style={{ overflow: "hidden", textOverflow: "ellipsis",
            whiteSpace: "nowrap", minWidth: 0 }}>{m.loc}</span>
          <span style={{ width: 3, height: 3, borderRadius: 999,
            background: "var(--t-fg-4)", flexShrink: 0 }}/>
          <span style={{ whiteSpace: "nowrap" }}>
            {m.people.length === 1 ? m.people[0] : `${m.people.length} people`}
          </span>
        </div>
      </div>

      <div style={{ display: "flex" }}>
        {m.people.slice(0, 3).map((p, i) => (
          <div key={i} style={{ marginLeft: i ? -8 : 0,
            border: "2px solid var(--t-card)", borderRadius: 999 }}>
            <Avatar name={p} size={26}/>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
        <BotSwitch label={`Record “${m.title}”`} on={m.bot} disabled={muted} onChange={(v) => onToggle(m.id, v)}/>
      </div>
    </div>
  );
}

function AppSidebar() {
  const items = [
    { id: "home",    icon: "home",     label: "Home" },
    { id: "meeting", icon: "note",     label: "Meeting" },
    { id: "ask",     icon: "sparkles", label: "Ask Memcircle" },
  ];
  const folders = [
    { dot: "#f5c84b", name: "Starred" },
    { dot: "#5b9cff", name: "Customers" },
    { dot: "#e85a5a", name: "Investors" },
    { dot: "#f0884a", name: "1:1s" },
    { dot: "#b285e8", name: "Team standups" },
  ];
  return (
    <aside style={{
      width: 220, background: "var(--t-canvas)", borderRight: "1px solid var(--t-line)",
      padding: 16, display: "flex", flexDirection: "column", gap: 16, height: "100%",
      color: "var(--t-fg-1)", flexShrink: 0,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 4 }}>
        <MemcircleWordmark height={18} color="var(--t-fg-1)"/>
      </div>

      <div style={{
        display: "flex", alignItems: "center", gap: 8, padding: "7px 10px",
        background: "var(--t-search-bg)", border: "1px solid var(--t-line)",
        borderRadius: 8, color: "var(--t-fg-3)", fontSize: 13,
      }}>
        <Icon name="search" size={13}/> Search…
        <span style={{ marginLeft: "auto", fontSize: 10,
          padding: "2px 6px", borderRadius: 4,
          background: "var(--t-kbd-bg)" }}>⌘K</span>
      </div>

      <nav style={{ display: "grid", gap: 2 }}>
        {items.map((it) => {
          const active = it.id === "home";
          return (
            <div key={it.id} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "8px 10px", borderRadius: 8,
              background: active ? "var(--t-row-hover)" : "transparent",
              color: active ? "var(--t-fg-1)" : "var(--t-fg-2)",
              fontSize: 13, fontFamily: "Inter, sans-serif",
              fontWeight: active ? 500 : 400,
            }}>
              <Icon name={it.icon} size={14}
                color={active ? "var(--t-accent-strong)" : "var(--t-fg-3)"}/>
              {it.label}
            </div>
          );
        })}
      </nav>

      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "0 10px 10px" }}>
          <span style={{ color: "var(--t-fg-4)", fontSize: 11, fontWeight: 500,
            letterSpacing: "0.14em", textTransform: "uppercase" }}>Folders</span>
          <Icon name="plus" size={12} color="var(--t-fg-4)"/>
        </div>
        <div style={{ display: "grid", gap: 2 }}>
          {folders.map((f) => (
            <div key={f.name} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "7px 10px", borderRadius: 8,
              color: "var(--t-fg-2)", fontSize: 13, fontFamily: "Inter, sans-serif",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: f.dot, flexShrink: 0 }}/>
              {f.name}
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 10,
        padding: 8, borderRadius: 10, background: "var(--t-line-2)",
        border: "1px solid var(--t-line)" }}>
        <Avatar name="You Smith" size={26}/>
        <div style={{ fontSize: 12, lineHeight: 1.3 }}>
          <div style={{ color: "var(--t-fg-1)", fontWeight: 500 }}>You</div>
          <div style={{ color: "var(--t-fg-4)", fontSize: 11 }}>Memcircle Pro</div>
        </div>
        <Icon name="settings" size={13} color="var(--t-fg-4)"/>
      </div>
    </aside>
  );
}

function HomeV2View() {
  const [list, setList] = useState<Meeting[]>(SEED);
  const [autoAll, setAutoAll] = useState(true);

  const live = list.find((m) => m.live);
  const visible = list.filter((m) => !m.live);
  const grouped = GROUP_ORDER.map((g) => ({
    label: g,
    items: visible.filter((m) => m.group === g),
  }));

  const toggle = (id: string, v: boolean) =>
    setList(list.map((m) => (m.id === id ? { ...m, bot: v } : m)));
  const flipAll = () => {
    const next = !autoAll;
    setAutoAll(next);
    setList(list.map((m) => (m.declined ? m : { ...m, bot: next })));
  };

  return (
    <div style={{ flex: 1, overflowY: "auto",
      background: "var(--t-gradient-bg)", color: "var(--t-fg-1)" }}>
      <div style={{ padding: "28px 36px 16px" }}>
        <div style={{ display: "flex", alignItems: "flex-end",
          justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
          <div>
            <p style={{ color: "var(--t-fg-4)", fontSize: 11, fontWeight: 500,
              letterSpacing: "0.16em", textTransform: "uppercase", margin: 0 }}>
              Wednesday · April 29
            </p>
            {/* This is a mocked-up in-app UI preview, not a page heading —
                was an <h1>, which meant every page embedding this preview
                (home, /desktop) picked up a second, unrelated <h1>. */}
            <div style={{
              fontFamily: "'Inter Tight', sans-serif", fontSize: 28,
              fontWeight: 500, letterSpacing: "-0.025em",
              margin: "6px 0 0", color: "var(--t-fg-1)",
            }}>Upcoming</div>
          </div>
          <ThemedPill><Icon name="mic" size={12}/> Join a meeting</ThemedPill>
        </div>
      </div>

      {live && (
        <div style={{ padding: "4px 36px 0" }}>
          <LiveHero m={live} onToggle={toggle}/>
        </div>
      )}

      <div style={{ padding: "16px 36px 0" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 14,
          padding: "14px 16px", borderRadius: 14,
          background: "var(--t-accent-bg)",
          border: "1px solid var(--t-accent-border)",
        }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: "var(--t-warm-tile)",
            display: "grid", placeItems: "center", flexShrink: 0,
          }}>
            <Icon name="sparkles" size={15} color="var(--t-accent-strong)"/>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: "var(--t-fg-1)" }}>
              Memcircle bot
            </div>
            <div style={{ fontSize: 12, color: "var(--t-fg-3)", marginTop: 2 }}>
              Joins all your meetings automatically
            </div>
          </div>
          <BotSwitch size="lg" label="Record all meetings" on={autoAll} onChange={flipAll}/>
        </div>
      </div>

      <div style={{ padding: "24px 36px 48px" }}>
        {grouped.map((g) => g.items.length > 0 && (
          <div key={g.label} style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "baseline",
              justifyContent: "space-between", margin: "0 4px 10px" }}>
              <p style={{ color: "var(--t-fg-4)", fontSize: 11, fontWeight: 500,
                letterSpacing: "0.16em", textTransform: "uppercase", margin: 0 }}>
                {g.label}
              </p>
              <span style={{ fontSize: 11, color: "var(--t-fg-4)" }}>
                {g.items.length} meeting{g.items.length === 1 ? "" : "s"}
              </span>
            </div>
            <div style={{ display: "grid", gap: 8 }}>
              {g.items.map((m) => (
                <MeetingRow key={m.id} m={m} onToggle={toggle}/>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── macOS window chrome ───────────────────────────────────────────────── */

function MacChrome() {
  return (
    <div style={{
      height: 40, background: "var(--t-canvas)",
      borderBottom: "1px solid var(--t-line)",
      display: "flex", alignItems: "center",
      padding: "0 16px", flexShrink: 0,
      borderRadius: "14px 14px 0 0",
    }}>
      <div style={{ display: "flex", gap: 8 }}>
        {["#ff5f56","#ffbd2e","#27c93f"].map((c) => (
          <span key={c} style={{
            width: 12, height: 12, borderRadius: 999, background: c,
            flexShrink: 0,
          }}/>
        ))}
      </div>
    </div>
  );
}

/* ─── public export ─────────────────────────────────────────────────────── */

export function HomeV2Preview({ height = 696 }: { height?: number }) {
  return (
    <div className="mc-preview" style={{
      borderRadius: 16,
      overflow: "hidden",
      boxShadow: "0 32px 80px rgba(120,80,30,0.18), 0 2px 8px rgba(0,0,0,0.06)",
      border: "1px solid rgba(0,0,0,0.07)",
      display: "flex", flexDirection: "column",
      height,
      fontFamily: "Inter, -apple-system, sans-serif",
      fontSize: 14,
    }}>
      <ThemeStyles/>
      <MacChrome/>
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <AppSidebar/>
        <HomeV2View/>
      </div>
    </div>
  );
}
