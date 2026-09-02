'use client'

import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { SectionWrapper } from '@/components/section-wrapper'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { PROJECTS, type Project, SOCIALS } from '@/lib/constants'
import { GithubIcon } from '@/components/icons'

const githubSocial = SOCIALS.find((s) => s.id === 'github')

function ProjectCard({
  project,
  delay,
}: {
  project: Project
  delay: number
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-60px' }}
      transition={{ duration: 0.55, ease: 'easeOut', delay }}
      className="card-glow relative flex flex-col gap-4 p-6 rounded-2xl border border-border bg-card h-full"
    >
      {project.featured && (
        <span
          className="absolute top-4 right-4 text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full"
          style={{
            background: 'oklch(from var(--brand) l c h / 0.12)',
            color: 'var(--brand)',
          }}
        >
          Featured
        </span>
      )}

      <div>
        <h3 className="text-lg font-semibold tracking-tight mb-2">{project.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
      </div>

      <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
        {project.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="text-xs rounded-md">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="flex items-center gap-2 pt-1">
        <Link href={project.github} target="_blank" rel="noopener noreferrer">
          <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-xs cursor-pointer">
            <GithubIcon className="h-3.5 w-3.5" />
            Code
          </Button>
        </Link>
        {project.live && project.live !== '#' && (
          <Link href={project.live} target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1.5 text-xs border-primary/30 hover:border-primary text-foreground hover:text-primary cursor-pointer"
            >
              <ExternalLink className="h-3.5 w-3.5 text-primary" />
              Live Demo
            </Button>
          </Link>
        )}
      </div>
    </motion.article>
  )
}

export function Projects() {
  return (
    <SectionWrapper id="projects">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--brand)' }}>
          Projects
        </p>
        <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Things I&apos;ve built
          </h2>
          <Link
            href={githubSocial?.href ?? 'https://github.com'}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors"
          >
            <GithubIcon className="h-4 w-4" />
            See all on GitHub
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
