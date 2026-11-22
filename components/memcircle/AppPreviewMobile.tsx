"use client";

import React from "react";
import { Icon } from "@/components/memcircle/Icon";
import { Avatar } from "@/components/memcircle/Avatar";
import { LiveDot } from "@/components/memcircle/LiveDot";

const LIGHT_VARS = `
  --t-bg:#faf2e8;--t-canvas:#faf6ee;--t-card:#ffffff;--t-card-2:#f6ecdb;
  --t-line:rgba(0,0,0,0.06);--t-line-2:rgba(0,0,0,0.04);--t-divider:rgba(0,0,0,0.08);
  --t-fg-1:#1a1a1a;--t-fg-2:#4a4a4a;--t-fg-3:#7a7a7a;--t-fg-4:#a0998d;
  --t-accent:#c46a44;--t-accent-bg:rgba(255,180,100,0.18);--t-accent-bg-2:rgba(255,180,100,0.08);
  --t-accent-border:rgba(196,106,68,0.25);--t-accent-strong:#c46a44;
  --t-accent-bg-strong:rgba(196,106,68,0.12);--t-accent-on:#ffffff;
  --t-btn-bg:#1a1a1a;--t-btn-fg:#faf2e8;--t-btn-shadow:0 6px 14px rgba(0,0,0,0.18);
  --t-cb-border:rgba(0,0,0,0.2);
  --t-gradient-bg:linear-gradient(180deg,#f6e3cf 0%,#faf2e8 60%,#f0d4d4 100%);
  --t-card-warm:linear-gradient(135deg,#ffe8cf 0%,#ffd2a3 60%,#f9c8b1 100%);
  --t-card-warm-fg:#1a1a1a;--t-card-warm-fg-2:#4a4a4a;
  --t-card-warm-glow:radial-gradient(circle,rgba(255,217,176,0.95) 0%,transparent 70%);
  --t-card-warm-shadow:0 12px 30px rgba(196,106,68,0.15);
  --t-card-warm-avatar-border:#ffe8cf;
  --t-frosted-bg:rgba(255,255,255,0.6);--t-frosted-bg-strong:rgba(255,255,255,0.7);
  --t-frosted-border:rgba(0,0,0,0.06);--t-frosted-shadow:0 12px 30px rgba(120,80,30,0.12);
  --t-warm-tile:#faf2e8;
`;

const ANIMS = `
  @keyframes mcPulse{0%,100%{opacity:1;transform:scale(1);}50%{opacity:0.4;transform:scale(0.85);}}
  .mc-chips-row::-webkit-scrollbar{display:none;}
`;

const SOURCES: Record<string, { label: string; color: string }> = {
  gWork:     { label: "Work",     color: "#3b82f6" },
  gPersonal: { label: "Personal", color: "#22c55e" },
  outlook:   { label: "Outlook",  color: "#0ea5e9" },
  icloud:    { label: "iCloud",   color: "#a855f7" },
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
}

const SEED: Meeting[] = [
  { id: "m-1", group: "Now",      time: "10:00", dur: "60m",  title: "Q3 Roadmap Review",      loc: "Zoom",           people: ["Anya Patel","Marcus Lee","Priya Shah","You"], source: "gWork",     live: true,  bot: true  },
  { id: "m-2", group: "Today",    time: "11:30", dur: "30m",  title: "1:1 — Anya",             loc: "Google Meet",    people: ["Anya Patel","You"],                           source: "gWork",               bot: true  },
  { id: "m-3", group: "Today",    time: "1:00",  dur: "45m",  title: "Design crit",            loc: "Zoom",           people: ["Priya Shah","Jules K.","David M.","You"],     source: "gWork",               bot: true  },
  { id: "m-4", group: "Today",    time: "2:30",  dur: "30m",  title: "Dentist",                loc: "Mission St",     people: ["You"],                                        source: "gPersonal",           bot: false, declined: true },
  { id: "m-5", group: "Today",    time: "4:00",  dur: "60m",  title: "Acme partnership sync",  loc: "Microsoft Teams",people: ["Maya Chen","Daniel R.","You"],                source: "outlook",             bot: true  },
  { id: "m-6", group: "Tomorrow", time: "9:30",  dur: "15m",  title: "Standup",                loc: "Zoom",           people: ["Eng team"],                                   source: "gWork",               bot: false },
  { id: "m-7", group: "Tomorrow", time: "11:00", dur: "45m",  title: "Sequoia intro",          loc: "Zoom",           people: ["Roelof B.","Maya Chen","You"],                source: "gWork",               bot: true  },
  { id: "m-8", group: "Tomorrow", time: "6:00",  dur: "90m",  title: "Pottery class",          loc: "Pottery SF",     people: ["You"],                                        source: "icloud",              bot: false },
];

const GROUP_ORDER = ["Now", "Today", "Tomorrow"];

function BotSwitch({ on, onChange, disabled = false, label = "Record meeting" }: {
  label?: string;
  on: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  const W = 32, H = 18, KNOB = 14, PAD = 2;
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
      }}
    >
      <span style={{
        position: "absolute", top: PAD,
        left: on ? W - KNOB - PAD : PAD,
        width: KNOB, height: KNOB, borderRadius: 999,
        background: "var(--t-accent-on)",
        boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
        transition: "left 160ms",
      }} />
    </div>
  );
}

function MMeetingRow({ m, onToggle, hero }: { m: Meeting; onToggle: (id: string, v: boolean) => void; hero: boolean }) {
  const src = SOURCES[m.source];
  const muted = !!m.declined;

  if (hero) {
    return (
      <div style={{
        padding: 18, borderRadius: 18,
        background: "var(--t-card-warm)",
        position: "relative", overflow: "hidden",
        boxShadow: "var(--t-card-warm-shadow)",
      }}>
        <div style={{ position: "absolute", top: -40, right: -30, width: 160, height: 160, borderRadius: "50%", background: "var(--t-card-warm-glow)" }} />
        <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 8 }}>
          <LiveDot size={6} />
          <span style={{ fontSize: 10, fontWeight: 600, color: "var(--t-accent-strong)", letterSpacing: "0.16em", textTransform: "uppercase" }}>
            Live · joining now
          </span>
        </div>
        <h3 style={{
          position: "relative", fontFamily: "'Inter Tight', sans-serif",
          fontSize: 22, fontWeight: 500, letterSpacing: "-0.015em",
          margin: "10px 0 0", color: "var(--t-card-warm-fg)",
        }}>
          {m.title}
        </h3>
        <p style={{ position: "relative", color: "var(--t-card-warm-fg-2)", fontSize: 13, lineHeight: 1.5, margin: "6px 0 0" }}>
          {m.time} — {m.loc} · {m.people.length} people
        </p>
        <div style={{ position: "relative", marginTop: 14, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex" }}>
            {m.people.slice(0, 4).map((p, i) => (
              <div key={i} style={{ marginLeft: i ? -8 : 0, border: "2px solid var(--t-card-warm-avatar-border)", borderRadius: 999 }}>
                <Avatar name={p} size={26} />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 10, fontWeight: 600, color: "var(--t-accent-strong)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
              Bot in room
            </span>
            <BotSwitch label={`Record “${m.title}”`} on={m.bot} onChange={(v) => onToggle(m.id, v)} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: 12,
      padding: "12px 14px", borderRadius: 14,
      background: "var(--t-card)", border: "1px solid var(--t-line)",
      opacity: muted ? 0.55 : 1,
    }}>
      {/* Time tile */}
      <div style={{ width: 54, flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2 }}>
        <span style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 16, fontWeight: 500, color: "var(--t-fg-1)", letterSpacing: "-0.005em", lineHeight: 1 }}>
          {m.time}
        </span>
        <span style={{ fontSize: 9, color: "var(--t-fg-4)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
          {m.dur}
        </span>
      </div>

      {/* Source rail */}
      <span style={{ width: 3, alignSelf: "stretch", borderRadius: 4, background: src.color, flexShrink: 0, marginTop: 2, opacity: muted ? 0.5 : 1 }} />

      {/* Body */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 14, fontWeight: 500, color: "var(--t-fg-1)", lineHeight: 1.25, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", flex: 1, minWidth: 0 }}>
            {m.title}
          </span>
          {m.declined && (
            <span style={{ padding: "2px 6px", borderRadius: 999, background: "var(--t-line)", color: "var(--t-fg-4)", fontSize: 8, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Declined
            </span>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4, fontSize: 11, color: "var(--t-fg-3)" }}>
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", minWidth: 0 }}>{m.loc}</span>
          <span style={{ width: 3, height: 3, borderRadius: 999, background: "var(--t-fg-4)", flexShrink: 0 }} />
          <span style={{ whiteSpace: "nowrap" }}>
            {m.people.length === 1 ? m.people[0] : `${m.people.length} people`}
          </span>
        </div>
        <div style={{ marginTop: 10, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Icon name="sparkles" size={11} color={m.bot && !muted ? "var(--t-accent-strong)" : "var(--t-fg-4)"} />
            <span style={{ fontSize: 10, fontWeight: 600, color: m.bot && !muted ? "var(--t-accent-strong)" : "var(--t-fg-4)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
              {muted ? "Skipped" : (m.bot ? "Bot will join" : "Bot off")}
            </span>
          </div>
          <BotSwitch label={`Record “${m.title}”`} on={m.bot} disabled={muted} onChange={(v) => onToggle(m.id, v)} />
        </div>
      </div>
    </div>
  );
}

function SourceChips({ filter, setFilter }: { filter: string; setFilter: (f: string) => void }) {
  const items = [
    { id: "all", label: "All", color: null as string | null },
    ...Object.entries(SOURCES).map(([id, s]) => ({ id, label: s.label, color: s.color })),
  ];
  return (
    <div className="mc-chips-row" style={{ display: "flex", gap: 8, padding: "4px 20px 4px 20px", overflowX: "auto", scrollbarWidth: "none" }}>
      {items.map((it) => {
        const active = filter === it.id;
        return (
          <div key={it.id} role="button" tabIndex={0} onClick={() => setFilter(it.id)}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setFilter(it.id); } }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "5px 10px 5px 8px", borderRadius: 999,
              background: active ? "var(--t-btn-bg)" : "var(--t-frosted-bg)",
              color: active ? "var(--t-btn-fg)" : "var(--t-fg-2)",
              border: active ? "none" : "1px solid var(--t-line)",
              fontSize: 12, fontWeight: 500, whiteSpace: "nowrap",
              cursor: "pointer", flexShrink: 0, fontFamily: "Inter, sans-serif",
            }}>
            {it.color && <span style={{ width: 7, height: 7, borderRadius: 999, background: it.color }} />}
            {it.label}
          </div>
        );
      })}
    </div>
  );
}

function MobileHomeV2Screen() {
  const [list, setList] = React.useState<Meeting[]>(SEED);
  const [filter, setFilter] = React.useState("all");
  const [autoAll, setAutoAll] = React.useState(true);

  const visible = filter === "all" ? list : list.filter((m) => m.source === filter);
  const grouped = GROUP_ORDER.map((g) => ({ label: g, items: visible.filter((m) => m.group === g) }));

  const total = visible.length;
  const willJoin = visible.filter((m) => m.bot && !m.declined).length;

  const toggle = (id: string, v: boolean) =>
    setList(list.map((m) => (m.id === id ? { ...m, bot: v } : m)));

  const flipAll = () => {
    const next = !autoAll;
    setAutoAll(next);
    setList(list.map((m) => (m.declined ? m : { ...m, bot: next })));
  };

  return (
    <div
      className="mc-mob"
      data-theme="light"
      style={{ width: "100%", height: "100%", background: "var(--t-gradient-bg)", color: "var(--t-fg-1)", fontFamily: "Inter, sans-serif", display: "flex", flexDirection: "column" }}
    >
      {/* Status bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 24px 6px", fontFamily: "-apple-system,'SF Pro',system-ui", fontWeight: 600, fontSize: 15, color: "var(--t-fg-1)", flexShrink: 0 }}>
        <span>9:41</span>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <svg width="18" height="11" viewBox="0 0 18 11">
            <rect x="0"  y="7" width="3" height="4"  rx="0.7" fill="currentColor"/>
            <rect x="5"  y="5" width="3" height="6"  rx="0.7" fill="currentColor"/>
            <rect x="10" y="3" width="3" height="8"  rx="0.7" fill="currentColor"/>
            <rect x="15" y="0" width="3" height="11" rx="0.7" fill="currentColor"/>
          </svg>
          <svg width="25" height="12" viewBox="0 0 25 12">
            <rect x="0.5" y="0.5" width="22" height="11" rx="3" stroke="currentColor" strokeOpacity="0.45" fill="none"/>
            <rect x="2"   y="2"   width="19" height="8"  rx="1.5" fill="currentColor"/>
          </svg>
        </div>
      </div>

      {/* Header */}
      <header style={{ padding: "8px 20px 6px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
        <div>
          <p style={{ color: "var(--t-fg-3)", fontSize: 10, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", margin: 0 }}>
            Wednesday · April 29
          </p>
          {/* Mocked-up in-app UI preview, not a page heading — was an
              <h1>, duplicating the real hero heading on every page that
              embeds this preview (home, /mobile). */}
          <div style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 28, fontWeight: 500, letterSpacing: "-0.025em", margin: "4px 0 0", color: "var(--t-fg-1)", lineHeight: 1.05 }}>
            Upcoming
          </div>
          <p style={{ color: "var(--t-fg-3)", fontSize: 12, margin: "4px 0 0" }}>
            {willJoin} of {total} — bot will join
          </p>
        </div>
        <div style={{ marginTop: 18, flexShrink: 0 }}>
          <Avatar name="Ildar Lomov" size={36} />
        </div>
      </header>

      {/* Auto-all bot strip */}
      <div style={{ margin: "10px 20px 0", padding: "10px 14px", borderRadius: 14, background: "var(--t-accent-bg)", border: "1px solid var(--t-accent-border)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: "var(--t-warm-tile)", display: "grid", placeItems: "center", flexShrink: 0 }}>
            <Icon name="sparkles" size={14} color="var(--t-accent-strong)" />
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: "var(--t-fg-1)" }}>Memcircle bot</div>
            <div style={{ fontSize: 11, color: "var(--t-fg-3)", marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Joins all calls automatically
            </div>
          </div>
        </div>
        <BotSwitch label="Record all meetings" on={autoAll} onChange={flipAll} />
      </div>

      {/* Source chips */}
      <div style={{ marginTop: 10 }}>
        <SourceChips filter={filter} setFilter={setFilter} />
      </div>

      {/* Scrollable meeting list */}
      <div style={{ flex: 1, overflowY: "auto", padding: "8px 20px 110px" }}>
        {grouped.map((g) =>
          g.items.length > 0 ? (
            <div key={g.label} style={{ marginBottom: 18 }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", margin: "8px 4px 8px" }}>
                <p style={{ color: "var(--t-fg-4)", fontSize: 10, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", margin: 0 }}>
                  {g.label}
                </p>
                <span style={{ fontSize: 10, color: "var(--t-fg-4)", letterSpacing: "0.04em" }}>
                  {g.items.length} meeting{g.items.length === 1 ? "" : "s"}
                </span>
              </div>
              <div style={{ display: "grid", gap: 8 }}>
                {g.items.map((m) => (
                  <MMeetingRow key={m.id} m={m} onToggle={toggle} hero={!!m.live} />
                ))}
              </div>
            </div>
          ) : null
        )}
      </div>

      {/* Bottom tab bar */}
      <div style={{ position: "absolute", left: 12, right: 12, bottom: 22, display: "flex", alignItems: "center", justifyContent: "space-around", padding: "10px 6px", borderRadius: 28, background: "var(--t-frosted-bg-strong)", backdropFilter: "blur(20px) saturate(180%)", border: "1px solid var(--t-frosted-border)", boxShadow: "var(--t-frosted-shadow)" }}>
        {(["home", "meetings", "ask", "profile"] as const).map((id) => {
          const iconMap = { home: "home", meetings: "note", ask: "sparkles", profile: "users" } as const;
          const labelMap = { home: "Home", meetings: "Meetings", ask: "Ask", profile: "You" };
          const isActive = id === "home";
          return (
            <div key={id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "4px 8px", borderRadius: 16, minWidth: 56, color: isActive ? "var(--t-accent-strong)" : "var(--t-fg-3)" }}>
              <Icon name={iconMap[id]} size={20} color={isActive ? "var(--t-accent-strong)" : "var(--t-fg-3)"} strokeWidth={isActive ? 2 : 1.5} />
              <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" }}>{labelMap[id]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function AppPreviewMobile() {
  return (
    <>
      <style>{`.mc-mob[data-theme="light"]{${LIGHT_VARS}}${ANIMS}`}</style>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: 340, height: 720, padding: 9, borderRadius: 52, background: "#1a1a1a", boxShadow: "0 32px 80px rgba(0,0,0,0.45), inset 0 0 0 1.5px rgba(255,255,255,0.08)", position: "relative", flexShrink: 0 }}>
          <div style={{ width: "100%", height: "100%", borderRadius: 44, overflow: "hidden", background: "#faf2e8", position: "relative" }}>
            <MobileHomeV2Screen />
            <div style={{ position: "absolute", top: 9, left: "50%", transform: "translateX(-50%)", width: 104, height: 30, borderRadius: 999, background: "#000", zIndex: 50 }} />
            <div style={{ position: "absolute", bottom: 7, left: "50%", transform: "translateX(-50%)", width: 112, height: 4, borderRadius: 999, background: "rgba(0,0,0,0.35)", zIndex: 60 }} />
          </div>
        </div>
      </div>
    </>
  );
}
