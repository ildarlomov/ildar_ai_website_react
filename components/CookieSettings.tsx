"use client";

import { useEffect, useState } from "react";
import { CONSENT_KEY } from "@/lib/site";
import type { PrivacyCopy } from "@/lib/privacy";

// Shows the visitor's current cookie choice and lets them reset it (the banner then reappears).
export default function CookieSettings({ t }: { t: PrivacyCopy["settings"] }) {
  const [choice, setChoice] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    try {
      setChoice(localStorage.getItem(CONSENT_KEY));
    } catch {
      setChoice(null);
    }
  }, []);

  const reset = () => {
    console.log("[consent] reset from privacy page");
    try {
      localStorage.removeItem(CONSENT_KEY);
    } catch {
      /* ignore */
    }
    location.reload();
  };

  const label = choice === "granted" ? t.granted : choice === "denied" ? t.denied : t.none;

  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-line bg-paper p-6 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-ink-2">
        {t.current} <span className="font-semibold text-ink">{choice === undefined ? "…" : label}</span>
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-cream transition hover:bg-accent"
      >
        {t.button}
      </button>
    </div>
  );
}
