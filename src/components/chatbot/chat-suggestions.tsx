'use client'

import { Zap } from 'lucide-react'
import { CHATBOT_PROMPT_SUGGESTIONS } from '@/lib/constants'

interface ChatSuggestionsProps {
  onSelect: (suggestion: string) => void
  disabled?: boolean
}

export function ChatSuggestions({ onSelect, disabled }: ChatSuggestionsProps) {
  return (
    <div className="px-3.5 py-2.5 border-b border-border/60 bg-muted/25 flex gap-1.5 overflow-x-auto no-scrollbar">
      {CHATBOT_PROMPT_SUGGESTIONS.map((suggestion, i) => (
        <button
          key={i}
          onClick={() => onSelect(suggestion)}
          disabled={disabled}
          className="shrink-0 text-[11px] font-medium px-2.5 py-1 rounded-full border border-border bg-card hover:border-primary hover:text-primary text-muted-foreground transition-all flex items-center gap-1 cursor-pointer disabled:opacity-50"
        >
          <Zap className="w-2.5 h-2.5 text-primary" />
          {suggestion}
        </button>
      ))}
    </div>
  )
}
