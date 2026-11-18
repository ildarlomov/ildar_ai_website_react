"use client";

import React from "react";
import { MemcircleGlyph } from "./MemcircleGlyph";

export interface MemcircleWordmarkProps {
  height?: number;
  color?: string;
}

export function MemcircleWordmark({ height = 28, color = "currentColor" }: MemcircleWordmarkProps) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 10, color }}>
      <MemcircleGlyph size={height} color={color} />
      <span
        style={{
          fontFamily: "'Inter Tight', Inter, sans-serif",
          fontSize: height * 0.85,
          fontWeight: 600,
          letterSpacing: "-0.02em",
        }}
      >
        memcircle
      </span>
    </span>
  );
}
