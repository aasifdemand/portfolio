import { streamText } from 'ai'
import { createGroq } from '@ai-sdk/groq'
import { getPortfolioKnowledgeBase, PERSONAL_INFO } from '@/lib/constants'

export const maxDuration = 30

const SYSTEM_PROMPT = `
You are the personal AI Assistant on Aasif Ali's official portfolio website.
Help visitors learn about Aasif, his fullstack engineering background, skills, projects, and development services with INR (₹) pricing.

=========================================
CRITICAL OUTPUT RULES (SHORT, PUNCHY & CLEAN):
=========================================
1. KEEP RESPONSES SHORT & CONCISE: Under 60–80 words maximum. Avoid long-winded paragraphs. Do NOT burn tokens.
2. NEVER USE MARKDOWN TABLES (No "| col | col |"). They look terrible in a narrow chat window.
3. NEVER USE RAW HTML TAGS (No "<br>", "<a>", "<div>", "<p>").
4. NEVER mention what model, engine, or provider you are (NEVER say "Groq", "Llama", "OpenAI", or "GPT"). Simply act as Aasif's smart portfolio assistant.
5. ONLY answer from the Portfolio Knowledge Base below. Never fabricate degrees, companies, or personal details.
6. If asked about something not in the knowledge base, politely state:
   "I don't have that specific info in Aasif's records. You can reach Aasif directly at ${PERSONAL_INFO.email}!"
7. Format with simple, clean bullet points (using "- ") and bold highlights ("**word**").
8. All service pricing must strictly be quoted in INR (₹):
   - Static Website: ₹14,999 (3–5 days)
   - Fullstack Web App: ₹39,999 (2–3 weeks)
   - Fullstack + AI Agent: ₹69,999 (3–4 weeks)

=========================================
PORTFOLIO KNOWLEDGE BASE:
=========================================
${getPortfolioKnowledgeBase()}
`

function makeFallbackResponse(content: string) {
  // Direct Vercel AI Data Stream formatted chunk (0:"text"\n)
  const escaped = JSON.stringify(content)
  return new Response(`0:${escaped}\n`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'x-vercel-ai-data-stream': 'v1',
    },
  })
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    const apiKey = process.env.GROQ_API_KEY?.trim()

    if (!apiKey || apiKey.startsWith('your_')) {
      return makeFallbackResponse(
        `Hi! I'm Aasif's Assistant.\n\nHere are Aasif's core services & transparent INR pricing:\n- **Static Website**: **₹14,999** (3–5 days)\n- **Fullstack Web App**: **₹39,999** (2–3 weeks)\n- **Fullstack + AI**: **₹69,999** (3–4 weeks)\n\nEmail Aasif at **${PERSONAL_INFO.email}** to get started!\n\n*(Configure \`GROQ_API_KEY\` in \`.env.local\` for live AI)*`
      )
    }

    const groq = createGroq({ apiKey })

    const result = streamText({
      model: groq('openai/gpt-oss-120b'),
      system: SYSTEM_PROMPT,
      messages,
      temperature: 0.1, // low temperature for high precision & brevity
    })

    const streamResult = result as unknown as {
      toDataStreamResponse?: () => Response
      toTextStreamResponse?: () => Response
      textStream?: ReadableStream
    }

    if (typeof streamResult.toDataStreamResponse === 'function') {
      return streamResult.toDataStreamResponse()
    }

    if (typeof streamResult.toTextStreamResponse === 'function') {
      return streamResult.toTextStreamResponse()
    }

    return new Response(streamResult.textStream)
  } catch (error: unknown) {
    console.error('Chat API error:', error)
    const errorMsg = error instanceof Error ? error.message : 'Chat error'
    return makeFallbackResponse(
      `I'm having trouble connecting right now (${errorMsg}). Please reach out to Aasif directly at **${PERSONAL_INFO.email}**!`
    )
  }
}
