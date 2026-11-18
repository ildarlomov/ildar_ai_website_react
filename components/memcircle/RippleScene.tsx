"use client";

import React from "react";

export interface RippleSceneProps {
  size?: number;
  intensity?: number;
}

export function RippleScene({ size = 600, intensity = 0.55 }: RippleSceneProps) {
  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "grid",
        placeItems: "center",
        pointerEvents: "none",
      }}
    >
      {/* Warm bokeh */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: `radial-gradient(circle at 50% 50%, rgba(255,200,140,${0.45 * intensity}) 0%, rgba(255,180,100,0.18) 25%, transparent 60%)`,
          filter: "blur(8px)",
        }}
      />
      {/* Drifting accents */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "25%",
          width: 14,
          height: 14,
          borderRadius: 999,
          background: "#ffd9b0",
          boxShadow: "0 0 30px 8px rgba(255,217,176,0.7)",
          animation: "mcDrift 9s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "70%",
          left: "70%",
          width: 8,
          height: 8,
          borderRadius: 999,
          background: "#ffd9b0",
          boxShadow: "0 0 20px 6px rgba(255,217,176,0.6)",
          animation: "mcDrift 11s ease-in-out infinite reverse",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "60%",
          left: "15%",
          width: 6,
          height: 6,
          borderRadius: 999,
          background: "#ffe2c4",
          boxShadow: "0 0 14px 4px rgba(255,226,196,0.5)",
          animation: "mcDrift 13s ease-in-out infinite",
        }}
      />
      {/* Concentric ripple rings */}
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            borderRadius: "50%",
            border: "1px solid rgba(255,217,176,0.6)",
            width: 40,
            height: 40,
            animation: `mcRipple 6s cubic-bezier(0.2,0.7,0.1,1) ${i * 1.2}s infinite`,
          }}
        />
      ))}
      {/* Core flare */}
      <div
        style={{
          position: "relative",
          width: 22,
          height: 22,
          borderRadius: 999,
          background: "#ffd9b0",
          boxShadow:
            "0 0 80px 20px rgba(255,200,140,0.7), 0 0 200px 50px rgba(255,180,100,0.35)",
        }}
      />
    </div>
  );
}
