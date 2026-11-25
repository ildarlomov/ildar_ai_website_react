"use client";

// "Video content factory" deck: AI influencers that post 60 videos a month for a brand.
// Trendwatching → AI avatar → production → publishing → growth & sales → live accounts.
// Cool light deck: sits between the dark hero and the rosy Instagram deck. Copy: lib/contentFactory.ts.

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Lang } from "@/lib/content";
import { FACTORY, type FactoryCopy } from "@/lib/contentFactory";
import { BRAND_ICONS } from "@/lib/brandIcons";
import SlideDeck, { LIGHT, FD, Slide, TextBlock, d, split, type DeckTheme } from "@/components/SlideDeck";
import { Appear, InstagramLogo, useStagger } from "@/components/funnels/mocks";

type T = FactoryCopy;
type P = { active: boolean; t: T };

const COOL: DeckTheme = {
  ...LIGHT,
  pageBg: "#eaecf6",
  fgMuted: "#5d6170",
  accent: "#4b47c9", // AA for 11px eyebrows on the cool panel
  glow: "rgba(170,180,255,0.6)",
};
const HERO_BG = "linear-gradient(180deg, #f3f4fb 0%, #eaecf6 100%)";
const CARD: React.CSSProperties = { background: "rgba(255,255,255,0.85)", border: "1px solid rgba(20,20,60,0.07)", borderRadius: 18, boxShadow: "0 24px 70px rgba(40,40,110,0.12)" };
const ACC = COOL.accent;

// Reel frames from real videos made on the factory (public/content-factory/).
const REELS = ["m-dc-0", "m-tm-0", "m-hk-0", "m-aw2-0", "m-vl-0", "m-kr-0"].map((n) => `/content-factory/${n}.webp`);

function Glyph({ name, size = 16, color }: { name: "tiktok" | "youtube"; size?: number; color?: string }) {
  const i = BRAND_ICONS[name];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color ?? i.hex} aria-hidden="true">
      <path d={i.path} />
    </svg>
  );
}

// A reel frame in a phone-like rounded card.
function Reel({ src, className = "", style }: { src: string; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`overflow-hidden rounded-[18px] bg-black ${className}`} style={{ boxShadow: "0 24px 60px rgba(20,20,60,0.28)", border: "3px solid #111", ...style }}>
      <Image src={src} alt="" width={507} height={900} sizes="(min-width: 768px) 220px, 40vw" className="h-auto w-full" />
    </div>
  );
}

function PlatformChips() {
  return (
    <div className="flex flex-wrap gap-2">
      {[
        { k: "ig", el: <InstagramLogo size={16} />, n: "Instagram" },
        { k: "tt", el: <Glyph name="tiktok" color="#111" />, n: "TikTok" },
        { k: "yt", el: <Glyph name="youtube" />, n: "YouTube" },
      ].map((p) => (
        <span key={p.k} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-ink shadow-[0_4px_14px_rgba(20,20,60,0.08)]">
          {p.el} {p.n}
        </span>
      ))}
    </div>
  );
}

// "Book a call with the team" (Ildar's messenger, new tab): on every slide of the deck.
function CallButton({ t }: { t: T }) {
  return (
      <a
        href={t.callHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 self-start rounded-full bg-accent-deep px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(196,106,68,0.35)] transition hover:brightness-110"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="5" width="18" height="16" rx="3" />
          <path d="M3 10h18M8 3v4M16 3v4" />
        </svg>
        {t.call}
      </a>
  );
}

// First and last slide: the call button + the site form.
function CallCtas({ t }: { t: T }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <CallButton t={t} />
      <a
        href="#contact"
        className="inline-flex items-center justify-center rounded-full border border-ink/15 bg-white/60 px-6 py-3.5 text-sm font-semibold text-ink transition hover:bg-white"
      >
        {t.cta}
      </a>
    </div>
  );
}

/* ───────── 0 · intro: 3D cylinder of real accounts ───────── */

// AI-influencer accounts from the factory (frames from their real reels).
const WALL = [
  { handle: "@ai.honeycove", img: "tw-05" },
  { handle: "@drcintas", img: "show-drcintas" },
  { handle: "@ai.with.andrew", img: "acc-ai_with_andrew" },
  { handle: "@kathrynjcross", img: "acc-kathrynjcross" },
  { handle: "@hackonomics.ai", img: "show-hack" },
  { handle: "@assmooorre.ai", img: "show-assmo" },
  { handle: "@zaraazuevvaa", img: "acc-zaraazuevvaa" },
  { handle: "@vladojoinee", img: "show-vlad" },
  { handle: "@ai.akshu", img: "acc-ai_akshu" },
];

// A ring of account cards on a cylinder: rotates slowly on its own, drag (mouse or finger) to spin,
// a flick keeps some momentum. Pauses on hover; reduced motion = no auto-rotation (drag still works).
function AccountCylinder({ hint }: { hint: string }) {
  const n = WALL.length;
  const ring = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(150); // card width, px
  const angle = useRef(0);
  const vel = useRef(0);
  const drag = useRef<{ x: number; t: number } | null>(null);
  const hover = useRef(false);

  // Card size follows the available width (phones get smaller cards).
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const fit = () => setW(Math.max(96, Math.min(160, el.clientWidth / 3.4)));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(64, now - last) / 1000;
      last = now;
      if (!drag.current) {
        if (Math.abs(vel.current) > 0.5) {
          angle.current += vel.current * dt;
          vel.current *= Math.pow(0.04, dt); // momentum decays within ~1 s
        } else if (!reduce && !hover.current) {
          angle.current -= 9 * dt; // ~40 s per turn
        }
      }
      if (ring.current) ring.current.style.transform = `translateZ(${-radius(w, n)}px) rotateY(${angle.current}deg)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [w, n]);

  const h = w * 1.78;
  return (
    <div
      ref={box}
      className="relative mx-auto w-full max-w-[560px] cursor-grab select-none touch-pan-y active:cursor-grabbing"
      style={{ height: h + 70, perspective: 1100 }}
      onPointerEnter={() => (hover.current = true)}
      onPointerLeave={() => (hover.current = false)}
      onPointerDown={(e) => {
        drag.current = { x: e.clientX, t: performance.now() };
        vel.current = 0;
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (!drag.current) return;
        const now = performance.now();
        const dx = e.clientX - drag.current.x;
        const deg = dx * 0.35;
        angle.current += deg;
        vel.current = (deg / Math.max(8, now - drag.current.t)) * 1000;
        drag.current = { x: e.clientX, t: now };
      }}
      onPointerUp={() => (drag.current = null)}
      onPointerCancel={() => (drag.current = null)}
      aria-label={hint}
      role="img"
    >
      <div className="absolute left-1/2 top-4" style={{ width: w, height: h, marginLeft: -w / 2, transformStyle: "preserve-3d" }}>
        <div ref={ring} className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
          {WALL.map((a, i) => (
            <figure
              key={a.handle}
              className="absolute inset-0 overflow-hidden rounded-[18px] bg-black"
              style={{
                transform: `rotateY(${(360 / n) * i}deg) translateZ(${radius(w, n)}px)`,
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                border: "3px solid #111",
                boxShadow: "0 20px 50px rgba(20,20,60,0.25)",
              }}
            >
              <Image src={`/content-factory/${a.img}.webp`} alt="" fill sizes="160px" className="pointer-events-none object-cover" draggable={false} />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-2.5 pb-2 pt-6 text-[11px] font-semibold text-white">
                {a.handle}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      <p className="absolute inset-x-0 bottom-0 text-center text-xs" style={{ color: COOL.fgMuted }}>{hint}</p>
    </div>
  );
}

// Cylinder radius so that n cards of width w sit edge to edge with a small gap.
function radius(w: number, n: number) {
  return (w / 2 / Math.tan(Math.PI / n)) * 1.12;
}

function IntroSlide({ active, t, cta }: P & { cta: string }) {
  return (
    <Slide active={active} bg={HERO_BG}>
      <div className={split}>
        <TextBlock s={t.slides[0]}>
          <div className="cs-in mt-6" style={d(0.3)}>
            <PlatformChips />
          </div>
          <div className="cs-in mt-7 grid max-w-md grid-cols-3 gap-4" style={d(0.36)}>
            {t.facts.map((f) => (
              <div key={f.label}>
                <div style={{ fontFamily: FD, fontSize: 30, fontWeight: 600, letterSpacing: "-0.02em", color: COOL.fg }}>{f.value}</div>
                <div style={{ fontSize: 12, lineHeight: 1.35, color: COOL.fgMuted, marginTop: 2 }}>{f.label}</div>
              </div>
            ))}
          </div>
          <div className="cs-in mt-8" style={d(0.42)}>
            <CallCtas t={t} />
          </div>
        </TextBlock>
        <div className="cs-in cs-vis" style={d(0.25)}>
          <AccountCylinder hint={t.dragHint} />
        </div>
      </div>
    </Slide>
  );
}

/* ───────── 1 · trendwatching ───────── */

function TrendSlide({ active, t }: P) {
  const shown = useStagger(active, t.hooks.length, 450, 500);
  return (
    <Slide active={active}>
      <div className={split}>
        <TextBlock s={t.slides[1]}>
          <div className="cs-in mt-7" style={d(0.4)}>
            <CallButton t={t} />
          </div>
        </TextBlock>
        <div className="cs-in cs-vis mx-auto w-full max-w-[540px]" style={{ ...CARD, padding: 22, ...d(0.25) }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: COOL.fgMuted, marginBottom: 12 }}>{t.hooksTitle}</div>
          {t.hooks.map((h, i) => (
            <Appear key={h.title} show={i < shown}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderTop: i ? "1px solid rgba(20,20,60,0.06)" : "none" }}>
                <span style={{ fontFamily: FD, fontSize: 13, fontWeight: 700, color: ACC, minWidth: 18 }}>{i + 1}</span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ display: "block", fontSize: 14.5, fontWeight: 600, color: COOL.fg, lineHeight: 1.3 }}>{h.title}</span>
                  <span style={{ display: "block", fontSize: 12, color: COOL.fgMuted, marginTop: 2 }}>{h.text}</span>
                </span>
                <span style={{ fontFamily: FD, fontSize: 14, fontWeight: 700, color: COOL.fg, whiteSpace: "nowrap" }}>▶ {h.views}</span>
              </div>
            </Appear>
          ))}
        </div>
      </div>
    </Slide>
  );
}

/* ───────── 2 · the avatar ───────── */

function AvatarSlide({ active, t }: P) {
  return (
    <Slide active={active}>
      <div className={split}>
        <TextBlock s={t.slides[2]}>
          <div className="cs-in mt-6 flex flex-wrap gap-2" style={d(0.32)}>
            {t.avatarTags.map((x) => (
              <span key={x} className="rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-ink shadow-[0_4px_14px_rgba(20,20,60,0.08)]">{x}</span>
            ))}
          </div>
          <div className="cs-in mt-7" style={d(0.4)}>
            <CallButton t={t} />
          </div>
        </TextBlock>
        <div className="cs-in cs-vis mx-auto grid w-full max-w-[460px] grid-cols-2 gap-4" style={d(0.25)}>
          {[t.accounts[0], t.accounts[1]].map((a, i) => (
            <figure key={a.handle} className={i === 1 ? "translate-y-8" : ""}>
              <Reel src={a.img} />
              <figcaption className="mt-3 text-center text-sm font-semibold text-ink">{a.handle}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </Slide>
  );
}

/* ───────── 3 · production ───────── */

function ProductionSlide({ active, t }: P) {
  const shown = useStagger(active, REELS.length, 160, 300);
  return (
    <Slide active={active}>
      <div className={split}>
        <TextBlock s={t.slides[3]}>
          <div className="cs-in mt-6 flex flex-wrap gap-2" style={d(0.32)}>
            {t.production.tags.map((x) => (
              <span key={x} className="rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-ink shadow-[0_4px_14px_rgba(20,20,60,0.08)]">{x}</span>
            ))}
          </div>
          <div className="cs-in mt-7" style={d(0.4)}>
            <CallButton t={t} />
          </div>
        </TextBlock>
        <div className="cs-in cs-vis mx-auto grid w-full max-w-[520px] grid-cols-3 gap-3" style={d(0.25)}>
          {REELS.map((src, i) => (
            <Appear key={src} show={i < shown}>
              <Reel src={src} style={{ borderRadius: 14, border: "2px solid #111" }} />
            </Appear>
          ))}
        </div>
      </div>
    </Slide>
  );
}

/* ───────── 4 · publishing ───────── */

function PublishSlide({ active, t }: P) {
  const shown = useStagger(active, 3, 350, 400);
  const phones = [
    { icon: <InstagramLogo size={26} />, name: "Instagram", src: REELS[3] },
    { icon: <Glyph name="tiktok" size={24} color="#111" />, name: "TikTok", src: REELS[4] },
    { icon: <Glyph name="youtube" size={26} />, name: "YouTube", src: REELS[5] },
  ];
  return (
    <Slide active={active}>
      <div className={split}>
        <TextBlock s={t.slides[4]}>
          <div className="cs-in mt-7" style={d(0.4)}>
            <CallButton t={t} />
          </div>
        </TextBlock>
        <div className="cs-in cs-vis mx-auto grid w-full max-w-[520px] grid-cols-3 gap-4" style={d(0.25)}>
          {phones.map((p, i) => (
            <Appear key={p.name} show={i < shown}>
              <div className="flex flex-col items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-[0_6px_18px_rgba(20,20,60,0.1)]">{p.icon}</span>
                <Reel src={p.src} style={{ borderRadius: 22, border: "5px solid #111" }} />
                <span className="text-center text-xs leading-snug text-ink-2">
                  {t.publish.device}
                  <br />
                  {t.publish.geo} · {t.publish.daily}
                </span>
              </div>
            </Appear>
          ))}
        </div>
      </div>
    </Slide>
  );
}

/* ───────── 5 · growth & sales ───────── */

function GrowthSlide({ active, t }: P) {
  const shown = useStagger(active, t.growth.length, 400, 400);
  return (
    <Slide active={active}>
      <div className={split}>
        <TextBlock s={t.slides[5]}>
          <div className="cs-in mt-7" style={d(0.4)}>
            <CallButton t={t} />
          </div>
        </TextBlock>
        <div className="cs-in cs-vis mx-auto w-full max-w-[520px]" style={{ ...CARD, padding: "24px 22px", ...d(0.25) }}>
          <div className="flex h-44 items-end gap-3">
            {t.growth.map((g, i) => (
              <div key={g.period} className="flex flex-1 flex-col items-center justify-end gap-2" style={{ height: "100%" }}>
                {g.mult && <span style={{ fontFamily: FD, fontSize: 15, fontWeight: 700, color: ACC }}>{g.mult}</span>}
                <div
                  className="w-full rounded-t-xl"
                  style={{
                    height: i < shown ? `${[34, 58, 100][i]}%` : "4%",
                    transition: "height 0.5s cubic-bezier(0.2,0.7,0.2,1)",
                    background: `linear-gradient(180deg, ${ACC}, rgba(75,71,201,0.55))`,
                  }}
                />
              </div>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {t.growth.map((g) => (
              <div key={g.period} className="text-center">
                <div style={{ fontSize: 12, fontWeight: 700, color: COOL.fg }}>{g.period}</div>
                <div style={{ fontSize: 11, color: COOL.fgMuted, marginTop: 1 }}>{g.stage}</div>
                <div style={{ fontSize: 12, color: COOL.fgBody, marginTop: 4 }}>{g.reach}</div>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 14, fontSize: 11.5, color: COOL.fgMuted, textAlign: "center" }}>{t.growthNote}</p>
        </div>
      </div>
    </Slide>
  );
}

/* ───────── 6 · live accounts ───────── */

function AccountsSlide({ active, t, cta }: P & { cta: string }) {
  return (
    <Slide active={active} bg={HERO_BG}>
      <div className={split}>
        <TextBlock s={t.slides[6]}>
          <div className="cs-in mt-8" style={d(0.34)}>
            <CallCtas t={t} />
          </div>
        </TextBlock>
        <div className="cs-in cs-vis grid gap-4 sm:grid-cols-2" style={d(0.25)}>
          {t.accounts.map((a) => (
            <div key={a.handle} style={{ ...CARD, padding: 16 }}>
              <div className="flex items-center gap-3">
                <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-white">
                  <Image src={a.img} alt="" fill sizes="48px" className="object-cover object-[50%_82%]" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[0.95rem] font-bold text-ink">{a.handle}</span>
                  <span className="block text-xs text-ink-3">{a.niche}</span>
                </span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {[
                  [a.followers, t.stat.followers],
                  [a.views, t.stat.views],
                  [a.er, t.stat.er],
                ].map(([v, l]) => (
                  <div key={l}>
                    <div style={{ fontFamily: FD, fontSize: 18, fontWeight: 700, color: COOL.fg }}>{v}</div>
                    <div style={{ fontSize: 10.5, color: COOL.fgMuted, lineHeight: 1.3 }}>{l}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <a href={a.dashboard} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#1a1a1a] px-3.5 py-2 text-xs font-semibold text-white transition hover:opacity-85">
                  {t.links.dashboard} ↗
                </a>
                <a href={a.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-semibold text-ink shadow-[0_4px_14px_rgba(20,20,60,0.08)] transition hover:opacity-85">
                  <InstagramLogo size={14} /> {t.links.instagram} ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

export default function ContentFactory({ lang }: { lang: Lang }) {
  const t = FACTORY[lang];
  const slides = [
    (a: boolean) => <IntroSlide key="intro" active={a} t={t} cta={t.cta} />,
    (a: boolean) => <TrendSlide key="trend" active={a} t={t} />,
    (a: boolean) => <AvatarSlide key="avatar" active={a} t={t} />,
    (a: boolean) => <ProductionSlide key="prod" active={a} t={t} />,
    (a: boolean) => <PublishSlide key="pub" active={a} t={t} />,
    (a: boolean) => <GrowthSlide key="growth" active={a} t={t} />,
    (a: boolean) => <AccountsSlide key="acc" active={a} t={t} cta={t.cta} />,
  ];
  return (
    <SlideDeck
      theme={COOL}
      label={t.label}
      prev={t.prev}
      next={t.next}
      className="fast-deck"
      mark={
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: FD, fontSize: 17, fontWeight: 600, color: COOL.fg }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="5" width="13" height="14" rx="3" />
            <path d="M16 10l5-3v10l-5-3z" />
          </svg>
          {lang === "ru" ? "Видео" : "Video"}
        </span>
      }
      renderSlides={(active) => slides.map((S, i) => S(i === active))}
    />
  );
}
