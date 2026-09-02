"use client";

import { useEffect, useRef } from "react";

export function InteractiveBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId: number | null = null;
    let targetX = -1000;
    let targetY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          container.style.setProperty("--mouse-x", `${targetX}px`);
          container.style.setProperty("--mouse-y", `${targetY}px`);
          container.style.setProperty("--mouse-opacity", "1");
          rafId = null;
        });
      }
    };

    const handleMouseLeave = () => {
      container.style.setProperty("--mouse-opacity", "0");
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave,
      );
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={
        {
          "--mouse-x": "-1000px",
          "--mouse-y": "-1000px",
          "--mouse-opacity": "0",
        } as React.CSSProperties
      }
    >
      {/* 1. Crisp Dot Matrix Grid (Visible across the entire page in both themes) */}
      <div className="absolute inset-0 bg-dots pointer-events-none" />

      {/* 2. Interactive Cursor Spotlight (Vibrant in dark mode, subtle in light mode) */}
      {/* Light Mode Spotlight */}
      <div
        className="absolute inset-0 transition-opacity duration-300 hidden md:block dark:hidden"
        style={{
          opacity: "var(--mouse-opacity)",
          background:
            "radial-gradient(650px circle at var(--mouse-x) var(--mouse-y), rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.08) 40%, transparent 75%)",
        }}
      />
      {/* Dark Mode Spotlight (Bright & atmospheric glow) */}
      <div
        className="absolute inset-0 transition-opacity duration-300 hidden md:dark:block"
        style={{
          opacity: "var(--mouse-opacity)",
          background:
            "radial-gradient(650px circle at var(--mouse-x) var(--mouse-y), rgba(139, 92, 246, 0.26) 0%, rgba(99, 102, 241, 0.16) 40%, transparent 72%)",
        }}
      />

      {/* 3. Floating Ambient Gradient Orbs (GPU-accelerated, rich vibrancy) */}
      {/* Top-Right Electric Violet Glow */}
      <div
        className="absolute top-[-12%] right-[-8%] w-145 h-145 rounded-full blur-[100px] opacity-35 dark:opacity-45 animate-float-slow"
        style={{
          background:
            "radial-gradient(circle, rgba(124, 58, 237, 0.75) 0%, rgba(99, 102, 241, 0.45) 45%, transparent 75%)",
        }}
      />

      {/* Mid-Left Cyan/Sky Ambient Glow */}
      <div
        className="absolute top-[35%] left-[-12%] w-130 h-130 rounded-full blur-[110px] opacity-30 dark:opacity-40 animate-float-reverse"
        style={{
          background:
            "radial-gradient(circle, rgba(14, 165, 233, 0.7) 0%, rgba(59, 130, 246, 0.35) 45%, transparent 75%)",
        }}
      />

      {/* Bottom-Right Deep Purple Glow */}
      <div
        className="absolute bottom-[-8%] right-[10%] w-155 h-155 rounded-full blur-[120px] opacity-30 dark:opacity-40 animate-float-slow"
        style={{
          background:
            "radial-gradient(circle, rgba(168, 85, 247, 0.65) 0%, rgba(124, 58, 237, 0.35) 45%, transparent 75%)",
        }}
      />
    </div>
  );
}
