"use client";

// Small, hand-drawn UI mock-ups for the funnel decks: a phone, a Threads post, an Instagram post,
// DM / Telegram chat bubbles and a CRM card. Pure presentation, no real data.

import React, { useEffect, useState } from "react";

export const FONT = "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

/* ───────── brand marks ───────── */

export function ThreadsLogo({ size = 22, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path d="M12.19 22h-.01c-2.98-.02-5.27-1-6.81-2.92C4 17.37 3.3 15 3.27 12.01v-.01c.03-3 .73-5.37 2.1-7.08C6.92 3 9.21 2.02 12.19 2h.01c2.29.02 4.2.6 5.68 1.74 1.39 1.07 2.37 2.6 2.91 4.53l-1.7.47c-.92-3.28-3.25-4.95-6.9-4.98-2.42.02-4.25.78-5.44 2.26-1.11 1.39-1.69 3.4-1.71 5.97.02 2.57.6 4.58 1.71 5.97 1.19 1.48 3.02 2.24 5.44 2.26 2.18-.02 3.63-.52 4.83-1.69 1.37-1.34 1.35-2.98.91-3.98-.26-.59-.73-1.08-1.36-1.46-.16 1.13-.52 2.04-1.07 2.73-.74.92-1.79 1.42-3.12 1.5-1.01.05-1.98-.19-2.73-.68-.89-.58-1.41-1.47-1.47-2.5-.11-2.04 1.5-3.5 4.02-3.65.89-.05 1.73-.01 2.5.12-.1-.62-.31-1.11-.63-1.47-.43-.49-1.11-.74-1.99-.75h-.03c-.71 0-1.68.2-2.3 1.12l-1.47-.99c.83-1.22 2.17-1.9 3.77-1.9h.04c2.68.02 4.28 1.66 4.44 4.52.09.04.18.08.27.12 1.24.58 2.15 1.46 2.63 2.55.67 1.51.73 3.98-1.28 5.95-1.54 1.5-3.4 2.18-6.03 2.2zm.82-9.75c-.2 0-.41 0-.62.02-1.52.09-2.47.78-2.42 1.77.06 1.04 1.2 1.52 2.3 1.46 1.01-.05 2.32-.45 2.54-3.05-.56-.13-1.17-.2-1.8-.2z" />
    </svg>
  );
}

export function InstagramLogo({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <radialGradient id="ig-grad" cx="30%" cy="107%" r="150%">
          <stop offset="0" stopColor="#fdf497" />
          <stop offset="0.05" stopColor="#fdf497" />
          <stop offset="0.45" stopColor="#fd5949" />
          <stop offset="0.6" stopColor="#d6249f" />
          <stop offset="0.9" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#ig-grad)" />
      <rect x="6.5" y="6.5" width="11" height="11" rx="5.5" fill="none" stroke="#fff" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="#fff" />
    </svg>
  );
}

export function TelegramLogo({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#2AABEE" />
      <path d="M5.4 11.7l11.1-4.3c.5-.2 1 .1.8.9l-1.9 8.9c-.1.6-.5.8-1 .5l-2.9-2.1-1.4 1.3c-.2.2-.3.3-.6.3l.2-2.9 5.3-4.8c.2-.2 0-.3-.3-.1l-6.6 4.1-2.8-.9c-.6-.2-.6-.6.1-.9z" fill="#fff" />
    </svg>
  );
}

/* ───────── containers ───────── */

// Phone outline; content scrolls inside a fixed 9:19 screen.
export function Phone({ children, dark = false, width = 300 }: { children: React.ReactNode; dark?: boolean; width?: number }) {
  return (
    <div style={{ width, maxWidth: "100%", aspectRatio: "9 / 18.5", borderRadius: 40, padding: 9, background: "#111", boxShadow: "0 40px 90px rgba(0,0,0,0.35), inset 0 0 0 1.5px rgba(255,255,255,0.12)" }}>
      <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 32, overflow: "hidden", background: dark ? "#101010" : "#fff", color: dark ? "#f3f3f3" : "#111", fontFamily: FONT }}>
        <div style={{ position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)", width: 84, height: 22, borderRadius: 999, background: "#000", zIndex: 3 }} />
        <div style={{ position: "absolute", inset: 0, paddingTop: 40, display: "flex", flexDirection: "column" }}>{children}</div>
      </div>
    </div>
  );
}

// Initials avatar with a stable colour per name.
const AV_COLORS = ["#e8855c", "#7a8cff", "#3fb68b", "#d76fb0", "#e0b340", "#5aa9e6", "#9b7bd8"];
export function Ava({ name, size = 32, ring }: { name: string; size?: number; ring?: string }) {
  const n = Array.from(name).reduce((a, c) => a + c.charCodeAt(0), 0);
  const initials = name.replace(/[^\p{L}\s.]/gu, "").split(/[\s.]+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  return (
    <span style={{ width: size, height: size, minWidth: size, borderRadius: 999, display: "grid", placeItems: "center", background: AV_COLORS[n % AV_COLORS.length], color: "#fff", fontSize: size * 0.38, fontWeight: 700, boxShadow: ring ? `0 0 0 2px ${ring}` : undefined }}>
      {initials || "•"}
    </span>
  );
}

/* ───────── chat bubbles ───────── */

export type Msg = { from: "me" | "them"; text: string; buttons?: string[]; file?: string };

export function Bubble({ m, tone }: { m: Msg; tone: "ig" | "tg" | "threads" }) {
  const mine = m.from === "me";
  const bg = mine
    ? tone === "ig" ? "linear-gradient(135deg,#7b3cf5,#d23ea0)" : tone === "tg" ? "#e1ffc7" : "#3a3a3c"
    : tone === "tg" ? "#fff" : tone === "ig" ? "#efefef" : "#262626";
  const color = mine ? (tone === "tg" ? "#111" : "#fff") : tone === "threads" ? "#f3f3f3" : "#111";
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: mine ? "flex-end" : "flex-start", gap: 4 }}>
      <div style={{ maxWidth: "82%", padding: "8px 12px", borderRadius: 18, borderBottomRightRadius: mine ? 6 : 18, borderBottomLeftRadius: mine ? 18 : 6, background: bg, color, fontSize: 13, lineHeight: 1.4, boxShadow: tone === "tg" ? "0 1px 1px rgba(0,0,0,0.12)" : undefined, whiteSpace: "pre-line" }}>
        {m.file && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <span style={{ width: 34, height: 34, borderRadius: 999, background: "#2AABEE", display: "grid", placeItems: "center", color: "#fff", fontSize: 11, fontWeight: 700 }}>PDF</span>
            <span style={{ fontSize: 12.5, fontWeight: 600 }}>{m.file}</span>
          </div>
        )}
        {m.text}
      </div>
      {m.buttons && (
        <div style={{ display: "grid", gap: 4, width: "82%" }}>
          {m.buttons.map((b) => (
            <div key={b} style={{ textAlign: "center", padding: "7px 10px", borderRadius: 10, fontSize: 12.5, fontWeight: 600, background: tone === "tg" ? "rgba(0,0,0,0.28)" : "rgba(0,0,0,0.06)", color: tone === "tg" ? "#fff" : "#111", backdropFilter: "blur(6px)" }}>
              {b}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Messages appear one by one while the slide is active (restart when it becomes active again).
export function useStagger(active: boolean, count: number, stepMs = 900, startMs = 500) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (!active) {
      setShown(0);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(count);
      return;
    }
    const timers = Array.from({ length: count }, (_, i) => setTimeout(() => setShown(i + 1), startMs + i * stepMs));
    return () => timers.forEach(clearTimeout);
  }, [active, count, stepMs, startMs]);
  return shown;
}

// Types `text` out while active; full text otherwise (and for reduced motion).
export function useTypewriter(active: boolean, text: string, delayMs = 700, cps = 28) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) {
      setN(0);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(text.length);
      return;
    }
    let i = 0;
    let iv: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      iv = setInterval(() => {
        i += 1;
        setN(i);
        if (i >= text.length && iv) clearInterval(iv);
      }, 1000 / cps);
    }, delayMs);
    return () => {
      clearTimeout(start);
      if (iv) clearInterval(iv);
    };
  }, [active, text, delayMs, cps]);
  return text.slice(0, n);
}

export function Appear({ show, children, style }: { show: boolean; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ transition: "opacity 0.45s ease, transform 0.45s cubic-bezier(0.2,0.7,0.2,1)", opacity: show ? 1 : 0, transform: show ? "none" : "translateY(10px)", ...style }}>
      {children}
    </div>
  );
}
