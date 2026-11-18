"use client";

import React from "react";

export interface AvatarProps {
  name?: string;
  src?: string;
  size?: number;
  glow?: boolean;
}

export function Avatar({ name = "", src, size = 32, glow = false }: AvatarProps) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const hue = name.length ? (name.charCodeAt(0) * 13) % 360 : 0;

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 999,
        background: src ? `url(${src}) center/cover` : `hsl(${hue}, 30%, 35%)`,
        display: "grid",
        placeItems: "center",
        color: "#fafafa",
        fontFamily: "Inter, sans-serif",
        fontWeight: 600,
        fontSize: size * 0.4,
        flexShrink: 0,
        boxShadow: glow ? "0 0 16px 2px rgba(255,200,140,0.5)" : undefined,
        border: glow ? "1px solid rgba(255,217,176,0.6)" : "none",
      }}
    >
      {!src && initials}
    </div>
  );
}
