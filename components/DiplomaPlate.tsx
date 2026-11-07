"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { DICT, type Lang } from "@/lib/content";

// Natural size of public/diploma.jpg (shown as-is, screenshot included).
const W = 1440;
const H = 1742;

export default function DiplomaPlate({ lang }: { lang: Lang }) {
  const t = DICT[lang].plate;
  const [open, setOpen] = useState(false);

  // Esc closes the lightbox; page scroll is locked while it is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <div className="flex max-w-md items-center gap-4 lg:max-w-sm">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`${t.alt} — ${t.hint}`}
          className="group relative h-[80px] w-36 shrink-0 cursor-zoom-in overflow-hidden rounded-lg border border-white/15 shadow-md transition hover:-translate-y-0.5 hover:border-white/40 lg:h-[97px] lg:w-45"
        >
          <Image src="/diploma.jpg" alt={t.alt} width={W} height={H} sizes="180px" className="h-full w-full object-cover" />
          <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition group-hover:bg-black/25 group-hover:opacity-100">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-white">
              <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="2" />
              <path d="M16 16l4.5 4.5M11 8.5v5M8.5 11h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        </button>

        <div>
          <p className="text-sm font-semibold text-cream">
            {t.title} <span aria-hidden="true">🙂</span>
          </p>
          <p className="mt-1 text-sm leading-relaxed text-cream/65">{t.text}</p>
        </div>
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t.alt}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={t.close}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/30"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <Image
            src="/diploma.jpg"
            alt={t.alt}
            width={W}
            height={H}
            sizes="90vw"
            priority
            className="max-h-[92svh] w-auto max-w-full rounded-lg object-contain shadow-2xl"
          />
        </div>
      )}
    </>
  );
}
