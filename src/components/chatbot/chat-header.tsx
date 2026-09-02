'use client'

import { Sparkles, RotateCcw, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PERSONAL_INFO } from '@/lib/constants'

interface ChatHeaderProps {
  onReset: () => void
  onClose: () => void
}

export function ChatHeader({ onReset, onClose }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3.5 border-b border-border bg-muted/40">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 shadow-sm bg-primary text-primary-foreground">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h4 className="text-sm font-semibold text-foreground leading-none">
              {PERSONAL_INFO.name}&apos;s Assistant
            </h4>
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Ask anything or tap a topic below
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground rounded-lg"
          onClick={onReset}
          title="Reset conversation"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground rounded-lg"
          onClick={onClose}
          title="Minimize chat"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
