import { NextResponse } from "next/server";
import { DICT, SERVICE_KEYS, type ServiceKey } from "@/lib/content";

// Requests are delivered to Ildar's own Telegram chat.
// The chat id is a fixed fact (not a secret), so it is hardcoded rather than configured.
const OWNER_CHAT_ID = 94235955;

// Only the bot token is a secret → LEADS_TLG_BOT_TOKEN (server-side env var).
const TOKEN = process.env.LEADS_TLG_BOT_TOKEN;

// Tiny in-memory throttle (per server instance): 5 requests / 10 min per IP.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;
const hits = new Map<string, number[]>();

function throttled(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((ts) => now - ts < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_HITS;
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const clip = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  // Honeypot filled → pretend success, send nothing.
  if (clip(body.website, 200)) {
    console.log("[lead] honeypot hit, dropped");
    return NextResponse.json({ ok: true });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (throttled(ip)) {
    console.log("[lead] throttled", ip);
    return NextResponse.json({ ok: false, error: "too_many_requests" }, { status: 429 });
  }

  const name = clip(body.name, 120);
  const contact = clip(body.contact, 200);
  const message = clip(body.message, 3000);
  const lang = body.lang === "ru" ? "ru" : "en";
  const serviceKey = SERVICE_KEYS.includes(body.service as ServiceKey) ? (body.service as ServiceKey) : null;

  if (!name || !contact) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  if (!TOKEN) {
    console.error("[lead] LEADS_TLG_BOT_TOKEN is not set — cannot deliver request");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 500 });
  }

  const serviceTitle = serviceKey ? DICT.en.services.items[serviceKey].title : "—";
  const text = [
    "<b>📩 New request from ildar.ai</b>",
    "",
    `<b>Name:</b> ${esc(name)}`,
    `<b>Contact:</b> ${esc(contact)}`,
    `<b>Service:</b> ${esc(serviceTitle)}`,
    `<b>Site language:</b> ${lang.toUpperCase()}`,
    message ? `\n<b>Message:</b>\n${esc(message)}` : "",
  ]
    .filter((line) => line !== "")
    .join("\n");

  try {
    const res = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: OWNER_CHAT_ID,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
    if (!res.ok) {
      console.error("[lead] telegram rejected the message", res.status, await res.text());
      return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
    }
    console.log("[lead] delivered", { name, lang, service: serviceKey });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[lead] telegram request failed", err);
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }
}
