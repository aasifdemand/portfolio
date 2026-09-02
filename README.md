# Aasif Ali — Fullstack & AI Portfolio

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js%2016-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript%205-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS%204-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel AI SDK](https://img.shields.io/badge/Vercel_AI_SDK-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Groq](https://img.shields.io/badge/Groq%20Cloud-F05A28?style=for-the-badge&logo=fastapi&logoColor=white)

**A high-performance, modern developer portfolio featuring an interactive real-time AI assistant, GPU-accelerated ambient visuals, server action contact workflows, and 100/100 SEO optimization.**

[Live Demo](https://aasifali.vercel.app) • [Report Bug](https://github.com/meAasifAli/personal_portfolio/issues) • [Request Feature](https://github.com/meAasifAli/personal_portfolio/issues)

</div>

---

## 🌟 Key Highlights

- 🤖 **Real-Time Streaming AI Assistant**: Integrated with the Vercel AI SDK (`ai`, `@ai-sdk/react`) and Groq Cloud (`openai/gpt-oss-120b`). It is strictly grounded in a typed portfolio knowledge base to answer recruiter and client questions in real time with sub-300ms latency.
- 🌌 **Interactive Ambient Lighting**: A GPU-accelerated canvas featuring an interactive cursor spotlight, crisp dot-matrix grid, and organic CSS keyframe floating gradient orbs (0% CPU overhead, 0% main-thread lag).
- 📍 **Dynamic Section Navigator**: A floating frosted-glass right-hand navigation bar that automatically detects visible viewport sections using the `IntersectionObserver` API and enables smooth one-click navigation.
- 📨 **Server Actions & Gmail SMTP**: Built-in contact form powered by Next.js Server Actions and `nodemailer`. Features direct client `reply-to`, an interactive button loading spinner, and an animated "Thank You" confirmation modal.
- 🎨 **OKLCH Electric Indigo Palette**: Sleek dark and light theme switching with zero server/client hydration mismatches, custom cursor trails, and glassmorphic card surfaces.
- 🚀 **100/100 Production SEO**: Full HTML5 semantic landmark hierarchy (`<header>`, `<main>`, `<article>`, `<section>`, `<footer>`), JSON-LD Schema (`schema.org/Person`), OpenGraph & Twitter social cards, and native `/robots.txt` and `/sitemap.xml` routes.

---

## 🛠️ Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack, React Server Components) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) (Strict mode, zero `any` types) |
| **Library** | [React 19](https://react.dev/) |
| **AI & LLM** | [Vercel AI SDK](https://sdk.vercel.ai/), [Groq Cloud SDK](https://groq.com/) (`openai/gpt-oss-120b`) |
| **Styling & Animations** | [Tailwind CSS v4](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/), [Lucide React](https://lucide.dev/) |
| **Backend & Actions** | Next.js Server Actions, [Nodemailer](https://nodemailer.com/) (Gmail SMTP) |
| **Deployment** | [Vercel Edge Network](https://vercel.com/) (Global Edge CDN, Automatic SSL) |

---

## 📂 Project Architecture

```text
personal_portfolio/
├── src/
│   ├── app/
│   │   ├── actions/
│   │   │   └── contact.ts          # Server Action for Gmail SMTP email dispatch
│   │   ├── api/
│   │   │   └── chat/
│   │   │       └── route.ts        # Streaming AI endpoint via Groq & AI SDK
│   │   ├── globals.css             # Tailwind v4 theme, OKLCH palette, GPU animations
│   │   ├── layout.tsx              # Root layout, JSON-LD schema, fonts, background
│   │   ├── page.tsx                # Main page entry point
│   │   ├── robots.ts               # Dynamic /robots.txt metadata route
│   │   └── sitemap.ts              # Dynamic /sitemap.xml metadata route
│   ├── components/
│   │   ├── chatbot/                # Modular AI chatbot system
│   │   │   ├── chat-header.tsx     # Chatbot header with reset & minimize controls
│   │   │   ├── chat-input.tsx      # Chat input bar with instant send
│   │   │   ├── chat-messages.tsx   # Message thread with thinking animation
│   │   │   ├── chat-suggestions.tsx# Quick-prompt suggestion pills
│   │   │   ├── chat-trigger.tsx    # Floating glowing AI Orb button
│   │   │   └── formatted-message.tsx# Safe markdown sanitizer & renderer
│   │   ├── ui/                     # Accessible UI components (Button, Input, etc.)
│   │   ├── about.tsx               # Bio, stats grid, and engineering philosophy
│   │   ├── chatbot.tsx             # Coordinator client component using useChat
│   │   ├── contact.tsx             # Contact form with loading spinner & modal
│   │   ├── cursor-follower.tsx     # Custom spring-trailing cursor ring
│   │   ├── experience.tsx          # Career timeline & academic education card
│   │   ├── footer.tsx              # Footer with copyright and official profiles
│   │   ├── hero.tsx                # Hero banner with typewriter & scroll fade
│   │   ├── interactive-background.tsx# Dot grid, mouse spotlight & gradient orbs
│   │   ├── navbar.tsx              # Glassmorphic header with scroll transition
│   │   ├── projects.tsx            # Project showcase cards with live demo links
│   │   ├── section-navigator.tsx   # Right-hand floating section tracker
│   │   ├── section-wrapper.tsx     # Viewport intersection animation wrapper
│   │   └── skills.tsx              # Categorized tech stack tabs with vector icons
│   └── lib/
│       ├── constants.ts            # Single source of truth (Projects, Experience, Knowledge Base)
│       └── utils.ts                # Class merge utility (cn)
├── .env.example                    # Environment variable template
├── next.config.ts                  # Next.js image domain and SVG config
├── package.json                    # Project dependencies and build scripts
├── tsconfig.json                   # TypeScript configuration
└── README.md                       # Documentation
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: `v20.x` or higher
- **Package Manager**: `pnpm` (recommended), `npm`, or `yarn`

### 2. Clone Repository
```bash
git clone https://github.com/meAasifAli/personal_portfolio.git
cd personal_portfolio
```

### 3. Install Dependencies
```bash
pnpm install
```

### 4. Configure Environment Variables
Create a `.env.local` file in the root directory (or copy from `.env.example`):
```bash
cp .env.example .env.local
```

Fill in your configuration:
```env
# Groq API Key for AI Assistant (openai/gpt-oss-120b)
GROQ_API_KEY=gsk_your_groq_api_key_here

# Gmail SMTP Credentials for Contact Form (Nodemailer Server Action)
GMAIL_USER=aasifali.dev@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
```

> **Note**: To obtain a Google App Password:
> 1. Visit your [Google Account Security Settings](https://myaccount.google.com/security).
> 2. Ensure **2-Step Verification** is enabled.
> 3. Search for **App Passwords**, generate a code under the name `Portfolio`, and copy the 16-character string into `GMAIL_APP_PASSWORD`.

### 5. Run Development Server
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Verify Production Build
```bash
pnpm build
```

---

## 🚢 Vercel Deployment Guide

This portfolio is fully optimized for **Vercel** with zero custom domain requirement:

1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com) and click **Add New... → Project**.
3. Import your `personal_portfolio` repository.
4. Under **Environment Variables**, supply your 3 keys:
   - `GROQ_API_KEY`
   - `GMAIL_USER`
   - `GMAIL_APP_PASSWORD`
5. Click **Deploy**. Vercel will assign a free, permanent `.vercel.app` domain with automatic global SSL!

---

## 👤 Author

**Aasif Ali**
- **Title**: Fullstack Engineer | Building Apps with AI
- **GitHub**: [@meAasifAli](https://github.com/meAasifAli)
- **LinkedIn**: [in/meAasifAli](https://linkedin.com/in/meAasifAli)
- **Twitter / X**: [@asifalimir18](https://x.com/asifalimir18)
- **Email**: [aasifali.dev@gmail.com](mailto:aasifali.dev@gmail.com)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
