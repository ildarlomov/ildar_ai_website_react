"use client";

// Threads auto-funnel ("AI commenting") deck: AI search → selection → comment → signals of interest →
// Telegram in the client's voice → CRM + qualified-lead alert → (optional) traffic anywhere.
// Public copy: no implementation details (no extension, feed, model names). Dark deck.

import React from "react";
import type { Lang } from "@/lib/content";
import { FUNNELS, type FunnelCopy } from "@/lib/funnels";
import SlideDeck, { DARK, FD, Slide, TextBlock, d, split, Arrow } from "@/components/SlideDeck";
import { Appear, Ava, Bubble, Phone, TelegramLogo, ThreadsLogo, useStagger, useTypewriter } from "@/components/funnels/mocks";

type T = FunnelCopy["threads"];
type P = { active: boolean; t: T; cta: string };

const ACC = DARK.accent;
const LINE = "rgba(255,255,255,0.10)";
const PANEL: React.CSSProperties = { background: "rgba(255,255,255,0.04)", border: `1px solid ${LINE}`, borderRadius: 18, boxShadow: "0 30px 80px rgba(0,0,0,0.35)" };
const HERO_BG = "radial-gradient(ellipse 80% 60% at 85% 10%, rgba(196,106,68,0.22) 0%, transparent 60%), #171514";

export function CtaPill({ children }: { children: React.ReactNode }) {
  return (
    <a
      href="#contact"
      className="inline-flex items-center gap-2 rounded-full bg-accent-deep px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(196,106,68,0.35)] transition hover:brightness-110"
    >
      {children} <Arrow size={14} />
    </a>
  );
}

/* ───────── 0 · intro: the pipeline ───────── */

function IntroSlide({ active, t, cta }: P) {
  const shown = useStagger(active, t.funnel.length, 220, 400);
  const n = t.funnel.length;
  return (
    <Slide active={active} bg={HERO_BG}>
      <div className={split}>
        <TextBlock s={t.slides[0]}>
          <div className="cs-in mt-8" style={d(0.34)}>
            <CtaPill>{cta}</CtaPill>
          </div>
        </TextBlock>
        <div className="cs-in cs-vis" style={d(0.25)}>
          <div style={{ ...PANEL, padding: "26px 20px 20px" }}>
            {/* the funnel: each layer narrower than the one above, warming up towards the deal */}
            <div style={{ display: "grid", gap: 6, justifyItems: "center" }}>
              {t.funnel.map((f, i) => (
                <Appear key={f.label} show={i < shown} style={{ width: `${100 - i * (56 / (n - 1))}%` }}>
                  <div
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, height: 50, padding: "0 16px",
                      borderRadius: i === n - 1 ? "10px 10px 22px 22px" : 10,
                      background: `linear-gradient(90deg, rgba(196,106,68,${0.1 + i * 0.13}), rgba(201,118,83,${0.18 + i * 0.16}))`,
                      border: `1px solid rgba(201,118,83,${0.25 + i * 0.12})`,
                    }}
                  >
                    <span style={{ fontSize: 13.5, fontWeight: 600, lineHeight: 1.2, minWidth: 0 }}>{f.label}</span>
                    {f.value && <span style={{ fontFamily: FD, fontSize: 13.5, fontWeight: 600, whiteSpace: "nowrap", color: i >= 3 ? "#fff" : ACC }}>{f.value}</span>}
                  </div>
                </Appear>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3 border-t pt-5" style={{ borderColor: LINE }}>
              {t.stats.map((s) => (
                <div key={s.label} style={{ minWidth: 0 }}>
                  <div style={{ fontFamily: FD, fontSize: "clamp(19px, 2.3vw, 28px)", fontWeight: 600, letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>{s.value}</div>
                  <div style={{ fontSize: 12, lineHeight: 1.35, color: DARK.fgMuted, marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
}

/* ───────── 1 · search: feed scan ───────── */

function SearchSlide({ active, t }: P) {
  const shown = useStagger(active, t.feed.length, 550, 500);
  const query = useTypewriter(active, t.search, 300, 18);
  return (
    <Slide active={active}>
      <div className={split}>
        <TextBlock s={t.slides[1]} />
        <div className="cs-in cs-vis flex justify-center" style={d(0.25)}>
          <Phone dark width={290}>
            <div style={{ display: "flex", justifyContent: "center", padding: "2px 0 10px" }}><ThreadsLogo size={24} color="#f3f3f3" /></div>
            <div style={{ margin: "0 12px 8px", padding: "8px 12px", borderRadius: 12, background: "#262626", fontSize: 12.5, color: "#bbb" }}>
              🔍 {query}<span className="cs-blink" style={{ display: "inline-block", width: 1, height: 13, background: "#bbb", marginLeft: 1, verticalAlign: "middle" }} />
            </div>
            <div style={{ position: "relative", flex: 1, overflow: "hidden" }}>
              {t.feed.map((p, i) => (
                <Appear key={p.author} show={i < shown}>
                  <div style={{ display: "flex", gap: 10, padding: "11px 14px", borderBottom: "1px solid #262626", background: p.hit && i < shown ? "rgba(201,118,83,0.12)" : "transparent", transition: "background 0.6s" }}>
                    <Ava name={p.author} size={30} />
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontSize: 12.5, fontWeight: 600 }}>{p.author}</span>
                        {p.hit && (
                          <span style={{ marginLeft: "auto", fontSize: 9.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "2px 7px", borderRadius: 999, background: ACC, color: "#fff" }}>{p.verdict}</span>
                        )}
                      </div>
                      <div style={{ fontSize: 12.5, lineHeight: 1.4, color: "#ddd", marginTop: 3 }}>{p.text}</div>
                    </div>
                  </div>
                </Appear>
              ))}
              <div className="cs-scan" style={{ position: "absolute", left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${ACC}, transparent)`, boxShadow: `0 0 18px ${ACC}` }} />
            </div>
          </Phone>
        </div>
      </div>
    </Slide>
  );
}

/* ───────── 2 · AI selection ───────── */

const KIND = {
  direct: { bg: "rgba(63,182,139,0.16)", fg: "#5fd3a5", border: "rgba(63,182,139,0.45)" },
  indirect: { bg: "rgba(224,179,64,0.14)", fg: "#e9c46a", border: "rgba(224,179,64,0.4)" },
  miss: { bg: "rgba(255,255,255,0.05)", fg: "rgba(246,239,230,0.55)", border: LINE },
};

function SelectSlide({ active, t }: P) {
  const shown = useStagger(active, t.verdicts.items.length, 700, 600);
  return (
    <Slide active={active}>
      <div className={split}>
        <TextBlock s={t.slides[2]} />
        <div className="cs-in cs-vis" style={{ ...PANEL, padding: 22, ...d(0.25) }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: DARK.fgMuted, marginBottom: 14 }}>
            <span className="cs-rec" style={{ width: 7, height: 7, borderRadius: 99, background: ACC }} /> {t.verdicts.title}
          </div>
          <div style={{ display: "grid", gap: 10 }}>
            {t.verdicts.items.map((it, i) => {
              const k = KIND[it.kind];
              return (
                <div key={it.text} style={{ padding: 14, borderRadius: 14, background: "rgba(255,255,255,0.03)", border: `1px solid ${LINE}` }}>
                  <div style={{ fontSize: 14, lineHeight: 1.45, opacity: it.kind === "miss" ? 0.6 : 1 }}>{it.text}</div>
                  <Appear show={i < shown} style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 6 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 999, background: k.bg, color: k.fg, border: `1px solid ${k.border}` }}>{it.verdict}</span>
                    {it.category && <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 999, background: "rgba(255,255,255,0.06)", color: DARK.fgBody }}>→ CRM · {it.category}</span>}
                  </Appear>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Slide>
  );
}

/* ───────── 3 · the comment ───────── */

// Fake screenshots of "your work" attached to the comment.
const GALLERY = [
  "linear-gradient(160deg, #3a6df0, #7aa2ff)",
  "linear-gradient(160deg, #e8855c, #f3b38f)",
  "linear-gradient(160deg, #2f8a5b, #6fcf9b)",
];

function CommentSlide({ active, t }: P) {
  const typed = useTypewriter(active, t.reply, 900, 45);
  const done = typed.length === t.reply.length;
  return (
    <Slide active={active}>
      <div className={split}>
        <TextBlock s={t.slides[3]} />
        <div className="cs-in cs-vis mx-auto w-full max-w-[540px]" style={{ ...PANEL, background: "#101010", padding: "20px 20px 22px", ...d(0.25) }}>
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Ava name={t.post.author} size={36} />
              <span style={{ flex: 1, width: 2, background: "#2b2b2b", marginTop: 8, borderRadius: 2 }} />
            </div>
            <div style={{ flex: 1, minWidth: 0, paddingBottom: 18 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{t.post.author} <span style={{ fontWeight: 400, color: "#8a8a8a", marginLeft: 6 }}>{t.post.time}</span></div>
              <div style={{ fontSize: 14.5, lineHeight: 1.5, marginTop: 4, color: "#eaeaea" }}>{t.post.text}</div>
              <div style={{ display: "flex", gap: 18, marginTop: 12, color: "#8a8a8a", fontSize: 12 }}>
                <span>♡ 24</span><span>💬 7</span><span>↻ 2</span>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <span style={{ width: 36, display: "flex", justifyContent: "center" }}><Ava name="Your Brand" size={30} ring={ACC} /></span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{t.replyAuthor} <span style={{ fontWeight: 400, color: "#8a8a8a", marginLeft: 6 }}>{done ? "1m" : "…"}</span></div>
              <div style={{ fontSize: 14.5, lineHeight: 1.5, marginTop: 4, color: "#eaeaea", minHeight: 66 }}>
                {typed}
                {!done && <span className="cs-blink" style={{ display: "inline-block", width: 2, height: 15, background: ACC, marginLeft: 2, verticalAlign: "middle" }} />}
              </div>
              {/* attached gallery: appears once the text is typed */}
              <Appear show={done} style={{ marginTop: 10 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 6 }} aria-label={t.gallery}>
                  {GALLERY.map((g, i) => (
                    <div key={i} style={{ aspectRatio: "3 / 4", borderRadius: 10, background: g, border: "1px solid rgba(255,255,255,0.08)", position: "relative", overflow: "hidden" }}>
                      <span style={{ position: "absolute", left: "14%", right: "14%", top: "16%", height: "34%", borderRadius: 6, background: "rgba(255,255,255,0.55)" }} />
                      <span style={{ position: "absolute", left: "14%", width: "50%", top: "58%", height: 5, borderRadius: 3, background: "rgba(255,255,255,0.7)" }} />
                      <span style={{ position: "absolute", left: "14%", width: "34%", top: "66%", height: 5, borderRadius: 3, background: "rgba(255,255,255,0.45)" }} />
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 11.5, color: "#8a8a8a", marginTop: 6 }}>🖼 {t.gallery}</div>
              </Appear>
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
}

/* ───────── 4 · signals of interest → agent decides → next step ───────── */

function Chip({ children, hot = false }: { children: React.ReactNode; hot?: boolean }) {
  return (
    <div style={{ padding: "9px 12px", borderRadius: 12, fontSize: 13, lineHeight: 1.3, background: hot ? "rgba(196,106,68,0.16)" : "rgba(255,255,255,0.05)", border: `1px solid ${hot ? "rgba(201,118,83,0.45)" : LINE}` }}>
      {children}
    </div>
  );
}

function SignalsSlide({ active, t }: P) {
  const sg = t.signals;
  const shown = useStagger(active, 3, 700, 500);
  const head: React.CSSProperties = { fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: DARK.fgMuted, marginBottom: 10 };
  return (
    <Slide active={active}>
      <div className={split}>
        <TextBlock s={t.slides[4]} />
        <div className="cs-in cs-vis" style={{ ...PANEL, padding: 20, ...d(0.25) }}>
          <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-4 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
            <Appear show={shown >= 1}>
              <div style={head}>{sg.inTitle}</div>
              <div style={{ display: "grid", gap: 6 }}>{sg.in.map((x) => <Chip key={x}>{x}</Chip>)}</div>
            </Appear>
            <Appear show={shown >= 2} style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ position: "relative", width: 92, height: 92, borderRadius: 999, display: "grid", placeItems: "center", textAlign: "center", background: "radial-gradient(circle, rgba(201,118,83,0.35), rgba(201,118,83,0.08))", border: "1px solid rgba(201,118,83,0.5)" }}>
                <span className="cs-ring" style={{ position: "absolute", inset: -3, borderRadius: 999, border: `1px solid ${ACC}` }} />
                <span style={{ fontSize: 12, fontWeight: 700, lineHeight: 1.25, padding: 8 }}>{sg.brain}</span>
              </div>
            </Appear>
            <Appear show={shown >= 3}>
              <div style={head}>{sg.outTitle}</div>
              <div style={{ display: "grid", gap: 6 }}>{sg.out.map((x, i) => <Chip key={x} hot={i === 0}>{x}</Chip>)}</div>
            </Appear>
          </div>
          <Appear show={shown >= 3} style={{ marginTop: 16, paddingTop: 14, borderTop: `1px solid ${LINE}`, display: "flex", flexWrap: "wrap", gap: 6 }}>
            {sg.channels.map((c) => (
              <span key={c} style={{ fontSize: 12, fontWeight: 600, padding: "5px 11px", borderRadius: 999, background: "rgba(255,255,255,0.06)", color: DARK.fgBody }}>{c}</span>
            ))}
          </Appear>
        </div>
      </div>
    </Slide>
  );
}

/* ───────── 5 · Telegram + AI ───────── */

function TelegramSlide({ active, t }: P) {
  const shown = useStagger(active, t.chat.msgs.length, 1000, 500);
  return (
    <Slide active={active}>
      <div className={split}>
        <TextBlock s={t.slides[5]} />
        <div className="cs-in cs-vis flex justify-center" style={d(0.25)}>
          <Phone width={290}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "4px 14px 10px", borderBottom: "1px solid #eee" }}>
              <Ava name="Your Brand" size={32} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 600 }}>{t.chat.name}</div>
                <div style={{ fontSize: 11, color: "#2AABEE" }}>{t.chat.status}</div>
              </div>
              <TelegramLogo size={22} />
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 8, padding: 12, background: "linear-gradient(160deg,#cfe3c2,#a9cf9a)" }}>
              {t.chat.msgs.map((m, i) => (
                <Appear key={i} show={i < shown}>
                  <Bubble m={m} tone="tg" />
                </Appear>
              ))}
            </div>
          </Phone>
        </div>
      </div>
    </Slide>
  );
}

/* ───────── 6 · CRM + call alert ───────── */

function Heat({ n }: { n: number }) {
  return (
    <span style={{ display: "inline-flex", gap: 2 }} aria-label={`heat ${n}/5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ width: 5, height: 10, borderRadius: 2, background: i < n ? (n >= 5 ? "#ff7a45" : ACC) : "rgba(255,255,255,0.12)" }} />
      ))}
    </span>
  );
}

function CrmSlide({ active, t }: P) {
  return (
    <Slide active={active}>
      <div className={split}>
        <TextBlock s={t.slides[6]} />
        <div className="cs-in cs-vis relative pb-16 sm:pb-10" style={d(0.25)}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3" style={{ ...PANEL, padding: 14 }}>
            {t.crm.columns.map((col, ci) => (
              <div key={col.title} className={ci === 0 ? "hidden sm:block" : ""} style={{ borderRadius: 12, background: "rgba(255,255,255,0.03)", padding: 10 }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: DARK.fgMuted, marginBottom: 8 }}>{col.title} · {col.cards.length}</div>
                <div style={{ display: "grid", gap: 8 }}>
                  {col.cards.map((c, i) => (
                    <div key={c.name} className="cs-in" style={{ ...d(0.45 + ci * 0.15 + i * 0.08), padding: 10, borderRadius: 10, background: "#211e1c", border: `1px solid ${c.heat >= 5 ? "rgba(255,122,69,0.4)" : LINE}` }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <Ava name={c.name} size={22} />
                        <span style={{ fontSize: 12.5, fontWeight: 600, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.name}</span>
                        <span style={{ marginLeft: "auto" }}><Heat n={c.heat} /></span>
                      </div>
                      <div style={{ fontSize: 11.5, color: DARK.fgMuted, marginTop: 6 }}>{c.note}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/* phone-call alert */}
          <div className="cs-in cs-pop absolute bottom-0 right-2 sm:-bottom-4 sm:right-4" style={{ ...d(1.1), width: 250, borderRadius: 22, padding: "12px 14px", background: "rgba(40,36,34,0.92)", border: "1px solid rgba(255,255,255,0.14)", boxShadow: "0 24px 60px rgba(0,0,0,0.5)", backdropFilter: "blur(14px)", display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ position: "relative", width: 40, height: 40, borderRadius: 999, background: "#34c759", display: "grid", placeItems: "center" }}>
              <span className="cs-ring" style={{ position: "absolute", inset: -4, borderRadius: 999, border: "2px solid #34c759" }} />
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z" /></svg>
            </span>
            <span style={{ minWidth: 0 }}>
              <span style={{ display: "block", fontSize: 13, fontWeight: 600 }}>{t.crm.call}</span>
              <span style={{ display: "block", fontSize: 11.5, color: DARK.fgMuted, marginTop: 2 }}>{t.crm.callSub}</span>
            </span>
          </div>
        </div>
      </div>
    </Slide>
  );
}

/* ───────── 7 · optional: send the traffic anywhere ───────── */

function TrafficSlide({ active, t, cta }: P) {
  const shown = useStagger(active, t.traffic.targets.length, 160, 500);
  return (
    <Slide active={active} bg={HERO_BG}>
      <div className={split}>
        <TextBlock s={t.slides[7]}>
          <div className="cs-in mt-8" style={d(0.34)}>
            <CtaPill>{cta}</CtaPill>
          </div>
        </TextBlock>
        <div className="cs-in cs-vis" style={{ ...PANEL, padding: "26px 20px", ...d(0.25) }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 999, background: "#f6efe6", color: "#171514", fontWeight: 700, fontSize: 14 }}>
              <ThreadsLogo size={18} /> {t.traffic.center}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {t.traffic.targets.map((x, i) => (
              <Appear key={x} show={i < shown}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 12px", borderRadius: 14, background: "rgba(255,255,255,0.05)", border: `1px solid ${LINE}`, fontSize: 13.5, fontWeight: 500 }}>
                  <span style={{ color: ACC }}><Arrow size={14} /></span> {x}
                </div>
              </Appear>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  );
}

const SLIDES = [IntroSlide, SearchSlide, SelectSlide, CommentSlide, SignalsSlide, TelegramSlide, CrmSlide, TrafficSlide];

const DISC: React.CSSProperties = { width: 30, height: 30, borderRadius: 999, display: "grid", placeItems: "center", background: "#fff", boxShadow: "0 4px 12px rgba(0,0,0,0.35)" };

export default function ThreadsFunnel({ lang }: { lang: Lang }) {
  const f = FUNNELS[lang];
  return (
    <SlideDeck
      theme={DARK}
      label={f.threads.label}
      prev={f.prev}
      next={f.next}
      mark={
        // Same mark as the Instagram deck: overlapping platform discs + names (names hidden on phones).
        <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: FD, fontSize: 16, fontWeight: 600 }}>
          <span style={{ display: "inline-flex" }}>
            <span style={DISC}><ThreadsLogo size={18} color="#111" /></span>
            <span style={{ ...DISC, marginLeft: -8 }}><TelegramLogo size={20} /></span>
          </span>
          <span className="hidden sm:inline">Threads + Telegram</span>
        </span>
      }
      renderSlides={(active) => SLIDES.map((S, i) => <S key={i} active={i === active} t={f.threads} cta={f.cta} />)}
    />
  );
}
