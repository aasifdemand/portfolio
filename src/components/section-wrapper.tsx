'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionWrapperProps {
  children: React.ReactNode
  id?: string
  className?: string
  delay?: number
}

export function SectionWrapper({
  children,
  id,
  className,
  delay = 0,
}: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-80px' }}
      transition={{ duration: 0.65, ease: 'easeOut', delay }}
      className={cn('py-20 md:py-28 relative z-10', className)}
    >
      {children}
    </motion.section>
  )
}
