"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROLES, SOCIALS, PERSONAL_INFO } from "@/lib/constants";
import { SOCIAL_ICON_MAP } from "@/components/icons";

function useTypewriter(words: readonly string[]) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index];
    const speed = deleting ? 45 : 90;
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length)
          setTimeout(() => setDeleting(true), 2200);
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length - 1 === 0) {
          setDeleting(false);
          setIndex((i) => (i + 1) % words.length);
        }
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [text, deleting, index, words]);

  return text;
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

// Hero shows first 3 socials (github, linkedin, email)
const HERO_SOCIALS = SOCIALS.filter((s) =>
  ["github", "linkedin", "email"].includes(s.id),
);

export function Hero() {
  const displayRole = useTypewriter(ROLES);
  const { scrollY } = useScroll();
  const scrollOpacity = useTransform(scrollY, [0, 90], [1, 0]);
  const scrollYOffset = useTransform(scrollY, [0, 90], [0, 16]);

  return (
    <section
      id="hero"
      className="relative z-10 min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-16 sm:py-0"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
      >
        {/* Status badge */}
        <motion.div
          variants={item}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-5 sm:mb-6"
        >
          <span className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full border border-border bg-card/80 backdrop-blur-sm text-muted-foreground shadow-xs">
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "var(--brand)" }}
            />
            {PERSONAL_INFO.status}
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={item}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4 leading-[1.15]"
        >
          Hi, I&apos;m{" "}
          <span className="gradient-text">{PERSONAL_INFO.name}</span>
        </motion.h1>

        {/* Typewriter role */}
        <motion.div
          variants={item}
          transition={{ duration: 0.6 }}
          className="min-h-10 sm:h-12 flex items-center justify-center mb-5 sm:mb-6 px-2"
        >
          <p className="text-lg sm:text-2xl text-muted-foreground font-light text-center">
            {displayRole}
            <span
              className="typewriter-cursor ml-0.5 font-thin"
              style={{ color: "var(--brand)" }}
            >
              |
            </span>
          </p>
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={item}
          transition={{ duration: 0.6 }}
          className="text-sm sm:text-lg text-muted-foreground max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed"
        >
          {PERSONAL_INFO.tagline}
        </motion.p>

        {/* CTAs (Full width on mobile, inline on desktop) */}
        <motion.div
          variants={item}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12 sm:mb-14 w-full max-w-xs sm:max-w-none mx-auto"
        >
          <Link href="#projects" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto h-11 px-6 gap-2 group cursor-pointer">
              View my work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link href="#contact" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto h-11 px-6 bg-card/60 backdrop-blur-sm cursor-pointer">
              Get in touch
            </Button>
          </Link>
        </motion.div>

        {/* Social links */}
        <motion.div
          variants={item}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-4"
        >
          {HERO_SOCIALS.map((social) => {
            const Icon = SOCIAL_ICON_MAP[social.id];
            return (
              <Link
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="h-10 w-10 flex items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon className="h-4 w-4" />
              </Link>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Scroll indicator — visible initially in hero view, smoothly fades out as user scrolls */}
      <motion.div
        style={{ opacity: scrollOpacity, y: scrollYOffset }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-xs text-muted-foreground tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="w-px h-8 rounded-full"
          style={{
            background: "linear-gradient(to bottom, var(--brand), transparent)",
          }}
        />
      </motion.div>
    </section>
  );
}
