'use client'

import Image from 'next/image'
import { motion, type Variants } from 'framer-motion'
import { SectionWrapper } from '@/components/section-wrapper'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SKILLS, type Skill } from '@/lib/constants'

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
}

const cardItem: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.92 },
  show:   { opacity: 1, y: 0,  scale: 1     },
}

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <motion.div
      variants={cardItem}
      transition={{ duration: 0.28 }}
      className="group flex flex-col items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-brand hover:-translate-y-1 transition-all duration-200 cursor-default"
    >
      {skill.slug ? (
        <div className="relative w-10 h-10">
          {/* Dark mode icon - Next.js Image with unoptimized for SVGs */}
          <Image
            src={`https://skillicons.dev/icons?i=${skill.slug}&theme=dark`}
            alt={skill.name}
            width={40}
            height={40}
            unoptimized
            className="w-10 h-10 hidden dark:block"
          />
          {/* Light mode icon - Next.js Image with unoptimized for SVGs */}
          <Image
            src={`https://skillicons.dev/icons?i=${skill.slug}&theme=light`}
            alt={skill.name}
            width={40}
            height={40}
            unoptimized
            className="w-10 h-10 block dark:hidden"
          />
        </div>
      ) : (
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold tracking-wide"
          style={{ background: 'oklch(from var(--brand) l c h / 0.12)', color: 'var(--brand)' }}
        >
          {skill.initials ?? skill.name.slice(0, 2)}
        </div>
      )}
      <span className="text-xs text-muted-foreground group-hover:text-foreground text-center leading-tight font-medium transition-colors">
        {skill.name}
      </span>
    </motion.div>
  )
}

export function Skills() {
  return (
    <SectionWrapper id="skills" className="bg-muted/15 backdrop-blur-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--brand)' }}>
          Skills
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8 sm:mb-10">
          What I work with
        </h2>

        <Tabs defaultValue="Languages" className="w-full">
          <TabsList className="mb-8 flex flex-wrap sm:flex-nowrap overflow-x-auto no-scrollbar h-auto gap-1.5 bg-muted/40 p-1.5 rounded-xl border border-border/60">
            {Object.keys(SKILLS).map((tab) => (
              <TabsTrigger key={tab} value={tab} className="shrink-0 rounded-lg text-xs sm:text-sm data-[state=active]:shadow-sm">
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(SKILLS).map(([tab, items]) => (
            <TabsContent key={tab} value={tab} className="mt-0">
              <motion.div
                key={tab}
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-2 min-[380px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3"
              >
                {items.map((skill) => (
                  <SkillCard key={skill.name} skill={skill} />
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </SectionWrapper>
  )
}
