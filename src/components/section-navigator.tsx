'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'services', label: 'Services' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

export function SectionNavigator() {
  const [activeSection, setActiveSection] = useState('hero')
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-35% 0px -40% 0px',
        threshold: 0,
      }
    )

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-3.5 sm:right-5 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center"
    >
      <div className="relative flex flex-col items-center gap-3.5 p-2 rounded-full border border-border/80 bg-card/80 backdrop-blur-md shadow-lg shadow-black/5">
        {SECTIONS.map((section) => {
          const isActive = activeSection === section.id
          const isHovered = hoveredSection === section.id

          return (
            <div
              key={section.id}
              className="relative flex items-center justify-center"
              onMouseEnter={() => setHoveredSection(section.id)}
              onMouseLeave={() => setHoveredSection(null)}
            >
              {/* Tooltip Label (Floats to the left on hover) */}
              <AnimatePresence>
                {isHovered && (
                  <motion.span
                    initial={{ opacity: 0, x: 8, scale: 0.92 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 6, scale: 0.92 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-7 px-2.5 py-1 rounded-md text-[11px] font-medium bg-popover text-popover-foreground shadow-md border border-border whitespace-nowrap pointer-events-none"
                  >
                    {section.label}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Navigation Dot Button */}
              <button
                onClick={() => scrollToSection(section.id)}
                aria-label={`Scroll to ${section.label}`}
                className="group relative flex items-center justify-center p-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full cursor-pointer"
              >
                <motion.span
                  layout
                  className={`rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-2.5 h-6 bg-primary shadow-xs shadow-primary/50'
                      : 'w-2 h-2 bg-muted-foreground/35 group-hover:bg-foreground/75 group-hover:scale-125'
                  }`}
                />
              </button>
            </div>
          )
        })}
      </div>
    </nav>
  )
}
