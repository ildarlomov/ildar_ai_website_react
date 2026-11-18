"use client";

import React from "react";

export interface MemcircleGlyphProps {
  size?: number;
  color?: string;
  glow?: boolean;
}

export function MemcircleGlyph({ size = 28, color = "currentColor", glow = false }: MemcircleGlyphProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      style={glow ? { filter: "drop-shadow(0 0 12px rgba(255,200,140,0.6))" } : undefined}
    >
      <circle cx="30" cy="30" r="3" fill={color} stroke="none" />
      <circle cx="30" cy="30" r="9" strokeWidth="1.2" opacity={0.85} />
      <circle cx="30" cy="30" r="16" strokeWidth="1.1" opacity={0.55} />
      <circle cx="30" cy="30" r="23" strokeWidth="1.0" opacity={0.3} />
    </svg>
  );
}
