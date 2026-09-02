'use client'

import { motion } from 'framer-motion'
import { SectionWrapper } from '@/components/section-wrapper'
import { STATS, PHILOSOPHY_TAGS, ABOUT_CONTENT } from '@/lib/constants'

function StatCard({ value, label, delay }: { value: string; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className="flex flex-col gap-1 p-4 sm:p-6 rounded-2xl border border-border/80 bg-card/80 backdrop-blur-sm shadow-xs hover:border-brand/40 transition-all"
    >
      <span
        className="text-3xl font-bold tracking-tight"
        style={{ color: 'var(--brand)' }}
      >
        {value}
      </span>
      <span className="text-sm text-muted-foreground leading-snug">{label}</span>
    </motion.div>
  )
}

export function About() {
  return (
    <SectionWrapper id="about">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--brand)' }}>
          {ABOUT_CONTENT.sectionLabel}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-10">
          {ABOUT_CONTENT.heading}
        </h2>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-start">
          {/* Bio from constants */}
          <div className="space-y-4 text-muted-foreground leading-relaxed text-sm sm:text-base">
            {ABOUT_CONTENT.paragraphs.map((para, index) => (
              <p key={index}>{para}</p>
            ))}

            <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2">
              {PHILOSOPHY_TAGS.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 sm:px-3 py-1 rounded-full border border-border/80 bg-card/80 backdrop-blur-sm text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            {STATS.map((stat, i) => (
              <StatCard key={stat.label} {...stat} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
