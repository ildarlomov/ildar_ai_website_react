import { NextResponse, type NextRequest } from "next/server";
import { LANG_COOKIE, LANG_PATH } from "@/lib/site";

// Auto-language for the English home page ("/"): a first-time visitor from a Russian-speaking
// country (Vercel geo-IP) or with Russian as the browser's first language goes to /ru.
// - An explicit choice from the header switcher (cookie) always wins.
// - Search/preview bots are never redirected, otherwise YandexBot (Russian IPs) would never see "/".
// - /ru itself is never redirected, so shared links open exactly what was shared.
const RU_COUNTRIES = new Set(["RU", "BY", "KZ", "KG", "UZ", "TJ", "TM", "AM", "AZ", "MD"]);
const BOT_UA = /bot|crawl|spider|slurp|preview|lighthouse|facebookexternalhit|yandex|google|bing|baidu|duckduck/i;

export function middleware(req: NextRequest) {
  const choice = req.cookies.get(LANG_COOKIE)?.value;
  if (choice === "en") return NextResponse.next();

  if (choice !== "ru") {
    if (BOT_UA.test(req.headers.get("user-agent") ?? "")) return NextResponse.next();
    const country = req.headers.get("x-vercel-ip-country") ?? "";
    const firstLang = (req.headers.get("accept-language") ?? "").split(",")[0].trim().toLowerCase();
    if (!RU_COUNTRIES.has(country) && !firstLang.startsWith("ru")) return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = LANG_PATH.ru;
  return NextResponse.redirect(url, 307);
}

export const config = { matcher: "/" };
