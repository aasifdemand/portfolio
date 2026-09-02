"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorFollower() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  // Outer ring follows with spring lag for a smooth trailing feel
  const springConfig = { damping: 28, stiffness: 500, mass: 0.6 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable on desktop devices with mouse/trackpad and screen width >= 768px
    const isPointerFine = window.matchMedia("(pointer: fine)").matches;
    const isNotTouchOnly = !window.matchMedia("(hover: none)").matches;
    const isDesktopWidth = window.innerWidth >= 768;

    if (!isPointerFine || !isNotTouchOnly || !isDesktopWidth) {
      return;
    }

    setIsEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest('a, button, [role="button"], [data-cursor-expand]')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest('a, button, [role="button"], [data-cursor-expand]')) {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave,
      );
      document.documentElement.removeEventListener(
        "mouseenter",
        handleMouseEnter,
      );
    };
  }, [mouseX, mouseY, isVisible]);

  // Completely disabled on mobile and touch devices
  if (!isEnabled) {
    return null;
  }

  return (
    <>
      {/* Outer glow ring — lags behind for trail effect */}
      <motion.div
        className="hidden md:block fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        animate={{
          width: isHovering ? 56 : 36,
          height: isHovering ? 56 : 36,
          opacity: isVisible ? (isHovering ? 0.55 : 1) : 0,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          border: "1.5px solid var(--brand)",
          background: "oklch(from var(--brand) l c h / 0.1)",
          boxShadow: "0 0 20px oklch(from var(--brand) l c h / 0.35)",
          backdropFilter: "blur(1px)",
        }}
      />

      {/* Inner dot — tracks exactly with the mouse */}
      <motion.div
        className="hidden md:block fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 0 : 1,
        }}
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          width: 6,
          height: 6,
          background: "var(--brand)",
        }}
      />
    </>
  );
}
