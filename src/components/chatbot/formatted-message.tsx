'use client'

import { ExternalLink } from 'lucide-react'

interface FormattedMessageProps {
  text: string
  isUser: boolean
}

/**
 * Formats message markdown safely into clean, readable UI elements.
 * Filters out raw table pipes, raw HTML tags, and markdown headers.
 */
export function FormattedMessage({ text, isUser }: FormattedMessageProps) {
  if (isUser) {
    return <p className="leading-relaxed font-normal">{text}</p>
  }

  // Pre-process: strip raw HTML tags like <br>, <a>, <div>
  const sanitized = text
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<a\s+(?:[^>]*?\s+)?href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)')
    .replace(/<[^>]+>/g, '')

  const lines = sanitized.split('\n')

  const parseInline = (line: string) => {
    // Strip header hashes at start of line
    const cleanLine = line.replace(/^#{1,4}\s+/, '')
    const tokenRegex = /(\[.*?\]\(.*?\)|\*\*.*?\*\*|`.*?`)/g
    const parts = cleanLine.split(tokenRegex)

    return parts.map((part, index) => {
      // Link: [label](url)
      const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/)
      if (linkMatch) {
        return (
          <a
            key={index}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-medium hover:opacity-80 inline-flex items-center gap-0.5 text-primary"
          >
            {linkMatch[1]}
            <ExternalLink className="w-2.5 h-2.5 inline opacity-70" />
          </a>
        )
      }

      // Bold: **text**
      const boldMatch = part.match(/^\*\*(.*?)\*\*$/)
      if (boldMatch) {
        return (
          <strong key={index} className="font-semibold text-foreground">
            {boldMatch[1]}
          </strong>
        )
      }

      // Code: `code`
      const codeMatch = part.match(/^`(.*?)`$/)
      if (codeMatch) {
        return (
          <code
            key={index}
            className="px-1.5 py-0.5 rounded text-[11px] font-mono bg-muted border border-border text-foreground font-semibold"
          >
            {codeMatch[1]}
          </code>
        )
      }

      return part
    })
  }

  return (
    <div className="space-y-2 text-xs sm:text-sm leading-relaxed text-foreground/90">
      {lines.map((line, idx) => {
        const trimmed = line.trim()
        if (!trimmed) {
          return null
        }

        // Ignore markdown table divider lines (e.g. |---|---|)
        if (/^\|[-|\s]+\|$/.test(trimmed)) {
          return null
        }

        // If line is formatted as table row "| col | col |", format cleanly as key-value
        if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
          const cells = trimmed
            .split('|')
            .map((c) => c.trim())
            .filter(Boolean)
          if (cells.length >= 2) {
            return (
              <div key={idx} className="flex items-baseline gap-2 py-0.5">
                <span className="font-semibold text-foreground">{cells[0]}:</span>
                <span className="text-muted-foreground">{parseInline(cells.slice(1).join(' - '))}</span>
              </div>
            )
          }
        }

        // Bullet point
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.startsWith('• ')) {
          const bulletText = trimmed.replace(/^[-*•]\s+/, '')
          return (
            <div key={idx} className="flex items-start gap-2.5 pl-0.5 my-1">
              <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-primary" />
              <div className="flex-1 leading-snug">{parseInline(bulletText)}</div>
            </div>
          )
        }

        return (
          <p key={idx} className="leading-snug">
            {parseInline(line)}
          </p>
        )
      })}
    </div>
  )
}
