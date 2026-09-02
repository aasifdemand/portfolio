'use client'

import { RefObject } from 'react'
import { Bot, User } from 'lucide-react'
import { FormattedMessage } from './formatted-message'

interface MessageItem {
  id: string
  role: 'user' | 'assistant' | string
  content: string
}

interface ChatMessagesProps {
  messages: MessageItem[]
  isLoading: boolean
  messagesEndRef: RefObject<HTMLDivElement | null>
}

export function ChatMessages({ messages, isLoading, messagesEndRef }: ChatMessagesProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs sm:text-sm">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex items-start gap-2.5 ${
            msg.role === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
          {msg.role === 'assistant' && (
            <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 text-xs shadow-xs bg-primary/10 border border-primary/20 text-primary">
              <Bot className="w-3.5 h-3.5" />
            </div>
          )}

          <div
            className={`rounded-2xl px-4 py-2.5 max-w-[84%] shadow-xs ${
              msg.role === 'user'
                ? 'bg-primary text-primary-foreground font-medium'
                : 'border border-border bg-muted/40 text-foreground'
            }`}
          >
            <FormattedMessage
              text={
                msg.content ||
                (Array.isArray((msg as unknown as { parts?: Array<{ type: string; text: string }> }).parts)
                  ? (msg as unknown as { parts: Array<{ type: string; text: string }> }).parts
                      .filter((p) => p.type === 'text')
                      .map((p) => p.text)
                      .join('')
                  : '')
              }
              isUser={msg.role === 'user'}
            />
          </div>

          {msg.role === 'user' && (
            <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center shrink-0 mt-0.5 text-xs text-muted-foreground border border-border">
              <User className="w-3.5 h-3.5" />
            </div>
          )}
        </div>
      ))}

      {isLoading && (
        <div className="flex items-center gap-2 text-muted-foreground text-xs pl-9">
          <div className="flex gap-1 items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" />
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:0.2s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:0.4s]" />
          </div>
          <span>Thinking...</span>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  )
}
