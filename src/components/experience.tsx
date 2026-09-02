'use client'

import { motion } from 'framer-motion'
import { SectionWrapper } from '@/components/section-wrapper'
import { MapPin, Briefcase, GraduationCap, BookOpen } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  EXPERIENCES,
  EDUCATION,
  type Experience as ExperienceType,
  type Education as EducationType,
} from '@/lib/constants'

function TimelineItem({
  exp,
  index,
  isLast,
}: {
  exp: ExperienceType
  index: number
  isLast: boolean
}) {
  return (
    <motion.article
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, margin: '-60px' }}
      transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.12 }}
      className={`relative pl-7 ${!isLast ? 'timeline-line pb-10' : ''}`}
    >
      {/* Dot */}
      <span
        className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-background z-10"
        style={{
          background: 'var(--brand)',
          boxShadow: '0 0 0 2px var(--brand)',
        }}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2.5">
        <div>
          <h4 className="font-semibold text-foreground text-base">{exp.role}</h4>
          <p className="text-sm font-medium" style={{ color: 'var(--brand)' }}>
            {exp.company}
          </p>
        </div>
        <div className="flex flex-col sm:items-end gap-0.5 text-xs text-muted-foreground shrink-0">
          <span className="font-medium">{exp.period}</span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {exp.location}
          </span>
        </div>
      </div>

      {/* Bullets */}
      <ul className="space-y-1.5">
        {exp.bullets.map((bullet, i) => (
          <li key={i} className="text-xs sm:text-sm text-muted-foreground flex gap-2 leading-relaxed">
            <span
              className="mt-1.5 w-1 h-1 rounded-full shrink-0"
              style={{ background: 'var(--brand)' }}
            />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </motion.article>
  )
}

function EducationCard({ edu, index }: { edu: EducationType; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-60px' }}
      transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.15 }}
      className="p-6 rounded-2xl border border-border/80 bg-card/80 backdrop-blur-sm shadow-xs space-y-4"
    >
      <div className="flex items-start justify-between gap-2 flex-wrap">
        <div>
          <h4 className="font-bold text-foreground text-base leading-snug">
            {edu.degree}
          </h4>
          <p className="text-sm text-muted-foreground font-medium mt-1">
            {edu.institution}
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 shrink-0">
          {edu.period}
        </span>
      </div>

      <div>
        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2.5">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Relevant Coursework</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {edu.coursework.map((course) => (
            <Badge
              key={course}
              variant="secondary"
              className="text-xs rounded-lg py-1 px-2.5 font-normal bg-muted/70 text-foreground/90 border border-border/60"
            >
              {course}
            </Badge>
          ))}
        </div>
      </div>
    </motion.article>
  )
}

export function Experience() {
  return (
    <SectionWrapper id="experience" className="bg-muted/15 backdrop-blur-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--brand)' }}>
          Career & Education
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">
          Experience & Academic Background
        </h2>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Work Experience (Left Column) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-border/60 text-foreground font-semibold text-lg">
              <Briefcase className="w-4 h-4 text-primary" />
              <h3>Work Experience</h3>
            </div>
            <div className="pt-2">
              {EXPERIENCES.map((exp, i) => (
                <TimelineItem
                  key={exp.company + i}
                  exp={exp}
                  index={i}
                  isLast={i === EXPERIENCES.length - 1}
                />
              ))}
            </div>
          </div>

          {/* Education & Academic Background (Right Column) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-border/60 text-foreground font-semibold text-lg">
              <GraduationCap className="w-4 h-4 text-primary" />
              <h3>Education</h3>
            </div>
            <div className="pt-2 space-y-4">
              {EDUCATION.map((edu, i) => (
                <EducationCard key={edu.institution + i} edu={edu} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
