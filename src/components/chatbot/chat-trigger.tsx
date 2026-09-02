'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, X } from 'lucide-react'

interface ChatTriggerProps {
  isOpen: boolean
  onToggle: () => void
}

export function ChatTrigger({ isOpen, onToggle }: ChatTriggerProps) {
  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50">
      <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }} className="relative">
        {/* Ambient Glow Aura */}
        <div
          className="absolute -inset-1 rounded-full blur-md opacity-70 animate-pulse pointer-events-none"
          style={{
            background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
          }}
        />

        <button
          onClick={onToggle}
          className="relative w-14 h-14 rounded-full flex items-center justify-center p-0 border border-white/20 shadow-2xl transition-all overflow-hidden cursor-pointer"
          style={{
            background:
              'linear-gradient(135deg, var(--primary) 0%, oklch(from var(--primary) calc(l - 0.12) c h) 100%)',
            color: 'var(--primary-foreground)',
            boxShadow: '0 8px 30px oklch(from var(--primary) l c h / 0.45)',
          }}
          aria-label="Toggle Assistant"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X className="w-5 h-5" />
              </motion.div>
            ) : (
              <motion.div
                key="ai-orb"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center justify-center relative"
              >
                <Sparkles className="w-6 h-6 animate-pulse" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-background" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </motion.div>
    </div>
  )
}
