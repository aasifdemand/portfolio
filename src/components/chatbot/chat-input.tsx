'use client'

import { ChangeEvent, FormEvent } from 'react'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface ChatInputProps {
  input: string
  isLoading: boolean
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
}

export function ChatInput({ input, isLoading, onInputChange, onSubmit }: ChatInputProps) {
  return (
    <form onSubmit={onSubmit} className="p-3 border-t border-border bg-card flex items-center gap-2">
      <Input
        value={input}
        onChange={onInputChange}
        placeholder="Ask about skills, INR pricing, projects..."
        className="h-10 text-xs px-3.5 focus-visible:ring-1 rounded-xl bg-background"
        disabled={isLoading}
      />
      <Button
        type="submit"
        size="icon"
        disabled={isLoading || !input.trim()}
        className="h-10 w-10 shrink-0 rounded-xl"
      >
        <Send className="w-4 h-4" />
      </Button>
    </form>
  )
}
