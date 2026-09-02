"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { NAV_LINKS, PERSONAL_INFO } from "@/lib/constants";

export function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled || mobileOpen
          ? "bg-background/80 dark:bg-background/85 backdrop-blur-md border-b border-border/80 shadow-xs"
          : "bg-transparent backdrop-blur-none border-b border-transparent shadow-none"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="#hero" className="flex items-center gap-2.5 group">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs tracking-wide transition-transform group-hover:scale-105"
            style={{
              background: "var(--brand)",
              color: "var(--brand-foreground)",
              fontFamily: "var(--font-syne)",
            }}
          >
            {PERSONAL_INFO.logoInitials}
          </div>
          <span className="font-semibold text-base tracking-tight leading-none">
            Aasif<span style={{ color: "var(--brand)" }}>.dev</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 relative overflow-hidden"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            aria-label="Toggle theme"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          {/* Desktop Resume Button */}
          <Link
            href={PERSONAL_INFO.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex"
          >
            <Button size="sm" className="h-8 text-xs cursor-pointer">
              Resume
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-9 w-9 cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={
          mobileOpen
            ? { height: "auto", opacity: 1 }
            : { height: 0, opacity: 0 }
        }
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="overflow-hidden md:hidden border-t border-border bg-background/95 backdrop-blur-xl"
      >
        <nav className="flex flex-col px-4 py-3 gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-2.5 px-3 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {/* Mobile Resume Button */}
          <Link
            href={PERSONAL_INFO.resumeUrl}
            className="mt-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="sm" className="w-full text-xs cursor-pointer">
              Resume
            </Button>
          </Link>
        </nav>
      </motion.div>
    </header>
  );
}
