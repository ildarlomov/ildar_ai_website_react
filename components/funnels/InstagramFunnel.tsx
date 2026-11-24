"use client";

// Instagram → Telegram auto-funnel deck, shown as a done-for-you service for creators:
// keyword under a Reel → agent replies in DMs by script → Telegram bot → channel + gift →
// 72h warm-up → one-click payment → mini-product in the bot → CRM with your own agent.
// Light, rosy deck so it reads apart from the dark Threads deck above it.

import React from "react";
import type { Lang } from "@/lib/content";
import { FUNNELS, type FunnelCopy } from "@/lib/funnels";
import SlideDeck, { LIGHT, FD, Slide, TextBlock, d, split, type DeckTheme } from "@/components/SlideDeck";
import { Appear, Ava, Bubble, InstagramLogo, Phone, TelegramLogo, useStagger } from "@/components/funnels/mocks";
import { CtaPill } from "@/components/funnels/ThreadsFunnel";

type T = FunnelCopy["instagram"];
type P = { active: boolean; t: T; cta: string };

const ROSE: DeckTheme = {
  ...LIGHT,
  pageBg: "#f8e7e3",
  accent: "#a8512d", // darker than the brand accent: AA for 11px eyebrows on the rosy panel
  glow: "rgba(255,190,200,0.7)",
};
const HERO_BG = "linear-gradient(180deg, #fbefe9 0%, #f8e7e3 50%, #f3d9e2 100%)";
const CARD: React.CSSProperties = { background: "rgba(255,255,255,0.78)", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 18, boxShadow: "0 24px 70px rgba(120,60,60,0.14)", backdropFilter: "blur(12px)" };
const IG_GRAD = "linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5)";

/* ───────── small icons for the step list ───────── */

function CardIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="M3 10h18M7 15h3" />
    </svg>
  );
}
function CrmIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M3 9h18M9 9v11" />
    </svg>
  );
}
const STEP_ICON = {
  ig: <InstagramLogo size={20} />,
  tg: <TelegramLogo size={20} />,
  pay: <CardIcon />,
  crm: <CrmIcon />,
};

// Brand avatar used for "your blog" in the mock-ups.
function BlogAva({ size = 28 }: { size?: number }) {
  return (
    <span style={{ padding: 2, borderRadius: 999, background: IG_GRAD, display: "inline-flex" }}>
      <Ava name="Your Blog" size={size} />
    </span>
  );
}

/* ───────── 0 · intro: the steps ───────── */

function IntroSlide({ active, t, cta }: P) {
  const shown = useStagger(active, t.steps.length, 170, 400);
  return (
    <Slide active={active} bg={HERO_BG}>
      <div className={split}>
        <TextBlock s={t.slides[0]}>
          <div className="cs-in mt-8" style={d(0.34)}>
            <CtaPill>{cta}</CtaPill>
          </div>
        </TextBlock>
        <div className="cs-in cs-vis mx-auto w-full max-w-[520px]" style={{ ...CARD, padding: "18px 18px 14px", ...d(0.25) }}>
          {t.steps.map((s, i) => (
            <Appear key={s.text} show={i < shown}>
              <div style={{ display: "grid", gridTemplateColumns: "28px 36px 1fr", alignItems: "center", gap: 10, padding: "7px 4px", borderBottom: i < t.steps.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none" }}>
                <span style={{ fontFamily: FD, fontSize: 13, fontWeight: 600, color: ROSE.accent }}>{String(i + 1).padStart(2, "0")}</span>
                <span style={{ width: 34, height: 34, borderRadius: 10, display: "grid", placeItems: "center", background: "#fff", border: "1px solid rgba(0,0,0,0.06)" }}>{STEP_ICON[s.icon]}</span>
                <span style={{ fontSize: 14.5, lineHeight: 1.3, color: ROSE.fg }}>{s.text}</span>
              </div>
            </Appear>
          ))}
        </div>
      </div>
    </Slide>
  );
}

/* ───────── 1 · keyword under a Reel ───────── */

function ReelSlide({ active, t }: P) {
  const shown = useStagger(active, t.reel.comments.length + 1, 650, 700);
  return (
    <Slide active={active}>
      <div className={split}>
        <TextBlock s={t.slides[1]} />
        <div className="cs-in cs-vis flex justify-center" style={d(0.25)}>
          <Phone width={280}>
            <div style={{ position: "relative", flex: 1, background: "linear-gradient(170deg,#c9a7d8 0%,#e7b6a5 55%,#f3d2b8 100%)" }}>
              <span style={{ position: "absolute", left: 12, top: 8, fontSize: 13, fontWeight: 700, color: "#fff" }}>Reels</span>
              <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
                <span style={{ width: 54, height: 54, borderRadius: 999, background: "rgba(255,255,255,0.35)", display: "grid", placeItems: "center", backdropFilter: "blur(6px)" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
                </span>
              </div>
              <div style={{ position: "absolute", left: 12, right: 50, bottom: 12, color: "#fff", textShadow: "0 1px 6px rgba(0,0,0,0.35)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12.5, fontWeight: 600 }}>
                  <BlogAva size={22} /> {t.handle}
                </div>
                <div style={{ fontSize: 12, lineHeight: 1.4, marginTop: 6 }}>{t.reel.caption}</div>
              </div>
              <div style={{ position: "absolute", right: 10, bottom: 16, display: "grid", gap: 14, color: "#fff", fontSize: 10.5, textAlign: "center" }}>
                <span>♥<br />2.4k</span><span>💬<br />318</span><span>➤</span>
              </div>
            </div>
            <div style={{ padding: "10px 12px 12px", display: "grid", gap: 8, background: "#fff" }}>
              {t.reel.comments.map((c, i) => (
                <Appear key={c.author} show={i < shown}>
                  <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <Ava name={c.author} size={22} />
                    <div style={{ fontSize: 12 }}>
                      <b>{c.author}</b> <span style={{ fontWeight: 700, color: "#d62976" }}>{c.text}</span>
                      {i === 0 && (
                        <Appear show={shown > t.reel.comments.length}>
                          <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 6, color: "#555" }}>
                            <Ava name="Your Blog" size={16} /> <span><b>{t.handle}</b> {t.reel.replied}</span>
                          </div>
                        </Appear>
                      )}
                    </div>
                  </div>
                </Appear>
              ))}
            </div>
          </Phone>
        </div>
      </div>
    </Slide>
  );
}

/* ───────── 2 · agent in DMs → Telegram ───────── */

function DmSlide({ active, t }: P) {
  const shown = useStagger(active, t.dm.msgs.length, 950, 500);
  return (
    <Slide active={active}>
      <div className={split}>
        <TextBlock s={t.slides[2]} />
        <div className="cs-in cs-vis flex justify-center" style={d(0.25)}>
          <Phone width={280}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "4px 14px 10px", borderBottom: "1px solid #efefef" }}>
              <BlogAva size={28} />
              <div style={{ flex: 1, fontSize: 13.5, fontWeight: 600 }}>{t.dm.name}</div>
              <InstagramLogo size={20} />
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 8, padding: 12 }}>
              {t.dm.msgs.map((m, i) => (
                // The follower is "me" here (right side); the creator's agent replies on the left.
                <Appear key={i} show={i < shown}>
                  <Bubble m={{ ...m, from: m.from === "them" ? "me" : "them" }} tone="ig" />
                </Appear>
              ))}
            </div>
          </Phone>
        </div>
      </div>
    </Slide>
  );
}

/* ───────── 3 · Telegram bot: channel + gift ───────── */

function TgPhone({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <Phone width={280}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "4px 14px 10px", borderBottom: "1px solid #eee" }}>
        <Ava name="Your Blog" size={30} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13.5, fontWeight: 600 }}>{name}</div>
          <div style={{ fontSize: 11, color: "#888" }}>bot</div>
        </div>
        <TelegramLogo size={20} />
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 8, padding: 12, background: "linear-gradient(160deg,#e6d6ee,#f3d6cf)" }}>{children}</div>
    </Phone>
  );
}

function ChannelSlide({ active, t }: P) {
  const shown = useStagger(active, t.bot.msgs.length, 1000, 500);
  return (
    <Slide active={active}>
      <div className={split}>
        <TextBlock s={t.slides[3]} />
        <div className="cs-in cs-vis flex justify-center" style={d(0.25)}>
          <TgPhone name={t.bot.name}>
            {t.bot.msgs.map((m, i) => (
              // The user's /start is "me" (right), the bot answers on the left.
              <Appear key={i} show={i < shown}>
                <Bubble m={{ ...m, from: m.from === "them" ? "me" : "them" }} tone="tg" />
              </Appear>
            ))}
          </TgPhone>
        </div>
      </div>
    </Slide>
  );
}

/* ───────── 4 · warm-up chain ───────── */

function ChainSlide({ active, t }: P) {
  const shown = useStagger(active, t.chain.length, 380, 450);
  return (
    <Slide active={active}>
      <div className={split}>
        <TextBlock s={t.slides[4]} />
        <div className="cs-in cs-vis mx-auto w-full max-w-[520px]" style={{ ...CARD, padding: "24px 22px", ...d(0.25) }}>
          {t.chain.map((s, i) => (
            <Appear key={s.time} show={i < shown}>
              <div style={{ display: "grid", gridTemplateColumns: "64px 22px 1fr", minHeight: 52 }}>
                <span style={{ fontFamily: FD, fontSize: 14.5, fontWeight: 600, color: ROSE.accent }}>{s.time}</span>
                <span style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <span style={{ width: 11, height: 11, borderRadius: 99, marginTop: 4, background: i >= 3 ? "#d62976" : "#e8855c" }} />
                  {i < t.chain.length - 1 && <span style={{ flex: 1, width: 2, background: "rgba(0,0,0,0.08)", marginTop: 5 }} />}
                </span>
                <span style={{ fontSize: 14.5, lineHeight: 1.4, paddingLeft: 6, color: ROSE.fg }}>{s.text}</span>
              </div>
            </Appear>
          ))}
        </div>
      </div>
    </Slide>
  );
}

/* ───────── 5 · one-click payment ───────── */

function PaySlide({ active, t }: P) {
  const shown = useStagger(active, 2, 1500, 1200);
  return (
    <Slide active={active}>
      <div className={split}>
        <TextBlock s={t.slides[5]} />
        <div className="cs-in cs-vis mx-auto w-full max-w-[420px]" style={{ ...CARD, padding: 24, ...d(0.25) }}>
          <div style={{ fontSize: 13, color: ROSE.fgMuted }}>{t.pay.title}</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 8 }}>
            <span style={{ fontFamily: FD, fontSize: 44, fontWeight: 600, letterSpacing: "-0.03em" }}>{t.pay.price}</span>
            <span style={{ fontSize: 18, color: ROSE.fgMuted, textDecoration: "line-through" }}>{t.pay.old}</span>
            <span style={{ marginLeft: "auto", fontSize: 11.5, fontWeight: 700, padding: "4px 10px", borderRadius: 999, background: "rgba(214,41,118,0.1)", color: "#a3215c", fontVariantNumeric: "tabular-nums" }}>⏳ {t.pay.deadline}</span>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2">
            {t.pay.methods.map((m, i) => (
              <div key={m} style={{ padding: "11px 12px", borderRadius: 12, fontSize: 13.5, fontWeight: 600, textAlign: "center", background: i === 0 ? "#000" : "rgba(0,0,0,0.04)", border: `1px solid ${i === 0 ? "#000" : "rgba(0,0,0,0.07)"}`, color: i === 0 ? "#fff" : ROSE.fg }}>
                {m}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: ROSE.fgMuted, textAlign: "center" }}>{t.pay.currencies}</div>
          <div style={{ marginTop: 14, position: "relative", height: 48 }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: 999, display: "grid", placeItems: "center", background: "#1a1a1a", color: "#fff", fontSize: 14, fontWeight: 600, transition: "opacity 0.4s, transform 0.2s", opacity: shown >= 2 ? 0 : 1, transform: shown === 1 ? "scale(0.97)" : "none" }}>{t.pay.button}</div>
            <div style={{ position: "absolute", inset: 0, borderRadius: 999, display: "grid", placeItems: "center", background: "#2f8a5b", color: "#fff", fontSize: 14, fontWeight: 600, transition: "opacity 0.4s", opacity: shown >= 2 ? 1 : 0 }}>✓ {t.pay.done}</div>
          </div>
        </div>
      </div>
    </Slide>
  );
}

/* ───────── 6 · the mini-product inside the bot ───────── */

function CourseSlide({ active, t }: P) {
  const shown = useStagger(active, 3, 900, 500);
  return (
    <Slide active={active}>
      <div className={split}>
        <TextBlock s={t.slides[6]} />
        <div className="cs-in cs-vis relative flex justify-center" style={d(0.25)}>
          <TgPhone name={t.bot.name}>
            <Appear show={shown >= 1}>
              <Bubble m={{ from: "them", text: `${t.course.day}\n\n${t.course.items.map((x) => `• ${x}`).join("\n")}` }} tone="tg" />
            </Appear>
            <Appear show={shown >= 2}>
              <Bubble m={{ from: "them", text: t.course.quizQ, buttons: t.course.quizA }} tone="tg" />
            </Appear>
            <Appear show={shown >= 3}>
              <Bubble m={{ from: "me", text: t.course.quizA[0] }} tone="tg" />
            </Appear>
          </TgPhone>
          {/* content protection badge */}
          <div className="cs-in cs-pop absolute left-0 top-[12%] sm:left-[4%]" style={{ ...d(0.8), ...CARD, borderRadius: 14, padding: "10px 12px", display: "flex", alignItems: "center", gap: 8, maxWidth: 200 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 3l7 3v5.5c0 4.4-3 8.2-7 9.5-4-1.3-7-5.1-7-9.5V6z" fill="#2f8a5b" />
              <path d="M8.8 12.2l2.2 2.2 4.4-4.6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.3, color: ROSE.fg }}>{t.course.protect}</span>
          </div>
        </div>
      </div>
    </Slide>
  );
}

/* ───────── 7 · CRM + your agent ───────── */

function CrmSlide({ active, t, cta }: P) {
  return (
    <Slide active={active} bg={HERO_BG}>
      <div className={split}>
        <TextBlock s={t.slides[7]}>
          <div className="cs-in mt-8" style={d(0.34)}>
            <CtaPill>{cta}</CtaPill>
          </div>
        </TextBlock>
        <div className="cs-in cs-vis relative pt-16" style={d(0.25)}>
          <div style={{ ...CARD, padding: 0, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.3fr 0.8fr", padding: "12px 18px", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: ROSE.fgMuted, borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
              {t.crm.columns.map((c) => <span key={c}>{c}</span>)}
            </div>
            {t.crm.rows.map((r, i) => (
              <div key={r.name} className="cs-in" style={{ ...d(0.45 + i * 0.1), display: "grid", gridTemplateColumns: "1.2fr 1.3fr 0.8fr", alignItems: "center", padding: "11px 18px", fontSize: 13.5, borderBottom: "1px solid rgba(0,0,0,0.05)", background: r.name === t.crm.chatWith ? "rgba(214,41,118,0.05)" : undefined }}>
                <span style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}><Ava name={r.name} size={24} /> <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.name}</span></span>
                <span><span style={{ fontSize: 11.5, fontWeight: 700, padding: "3px 9px", borderRadius: 999, background: `${r.tone}1f`, color: r.tone === "#888" ? "#555" : r.tone }}>{r.status}</span></span>
                <span style={{ fontVariantNumeric: "tabular-nums", color: ROSE.fgBody }}>{r.paid}</span>
              </div>
            ))}
            {/* chat with a client right from the CRM */}
            <div className="cs-in" style={{ ...d(0.95), padding: "12px 18px 14px", display: "grid", gap: 6, background: "rgba(0,0,0,0.02)" }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: ROSE.fgMuted }}>💬 {t.crm.chatWith}</div>
              {t.crm.chat.map((m, i) => (
                <Bubble key={i} m={m} tone="ig" />
              ))}
              <div style={{ marginTop: 4, display: "inline-flex", alignSelf: "start", alignItems: "center", gap: 6, fontSize: 11.5, fontWeight: 700, color: "#2f8a5b" }}>
                <span className="cs-rec" style={{ width: 7, height: 7, borderRadius: 99, background: "#2f8a5b" }} /> {t.crm.agent}
              </div>
            </div>
          </div>
          {/* iPhone push */}
          <div className="cs-in cs-pop absolute right-2 top-0 sm:right-6" style={{ ...d(1.2), width: 260, borderRadius: 20, padding: "11px 13px", background: "rgba(255,255,255,0.94)", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 20px 50px rgba(0,0,0,0.18)", backdropFilter: "blur(14px)", display: "flex", gap: 10, alignItems: "center" }}>
            <span style={{ width: 34, height: 34, borderRadius: 9, background: "#1a1a1a", color: "#fff", display: "grid", placeItems: "center", fontSize: 13, fontWeight: 700 }}>CRM</span>
            <span style={{ minWidth: 0 }}>
              <span style={{ display: "block", fontSize: 13, fontWeight: 600 }}>{t.crm.push}</span>
              <span style={{ display: "block", fontSize: 11.5, color: "#666", marginTop: 1 }}>{t.crm.pushSub}</span>
            </span>
          </div>
        </div>
      </div>
    </Slide>
  );
}

const SLIDES = [IntroSlide, ReelSlide, DmSlide, ChannelSlide, ChainSlide, PaySlide, CourseSlide, CrmSlide];

// Top-left mark: the two platform logos on white discs, overlapping, plus their names.
function Mark() {
  const disc: React.CSSProperties = { width: 30, height: 30, borderRadius: 999, display: "grid", placeItems: "center", background: "#fff", boxShadow: "0 4px 12px rgba(120,60,60,0.18)" };
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: FD, fontSize: 16, fontWeight: 600, color: ROSE.fg }}>
      <span style={{ display: "inline-flex" }}>
        <span style={disc}><InstagramLogo size={20} /></span>
        <span style={{ ...disc, marginLeft: -8 }}><TelegramLogo size={20} /></span>
      </span>
      {/* names hidden on phones so the mark never collides with the deck label on the right */}
      <span className="hidden sm:inline">Instagram + Telegram</span>
    </span>
  );
}

export default function InstagramFunnel({ lang }: { lang: Lang }) {
  const f = FUNNELS[lang];
  return (
    <SlideDeck
      theme={ROSE}
      label={f.instagram.label}
      prev={f.prev}
      next={f.next}
      mark={<Mark />}
      className="fast-deck"
      renderSlides={(active) => SLIDES.map((S, i) => <S key={i} active={i === active} t={f.instagram} cta={f.cta} />)}
    />
  );
}
