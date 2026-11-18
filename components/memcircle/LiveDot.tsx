"use client";

import React from "react";

export interface LiveDotProps {
  size?: number;
}

export function LiveDot({ size = 8 }: LiveDotProps) {
  return (
    <span
      style={{
        display: "inline-block",
        width: size,
        height: size,
        borderRadius: 999,
        background: "#5cc7d6",
        boxShadow: "0 0 18px 4px rgba(92,199,214,0.55)",
        animation: "mcPulse 1.6s cubic-bezier(0.6,0,0.2,1) infinite",
      }}
    />
  );
}
