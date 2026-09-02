import type { Metadata } from "next";
import { Inter, Syne, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { CursorFollower } from "@/components/cursor-follower";
import { InteractiveBackground } from "@/components/interactive-background";
import { SectionNavigator } from "@/components/section-navigator";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://aasifali.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Aasif Ali — Fullstack Engineer | Building with AI",
    template: "%s | Aasif Ali",
  },
  description:
    "Fullstack Engineer specializing in Next.js, React, TypeScript, Python, PostgreSQL, and AI agent workflows. Available for freelance & engineering roles.",
  keywords: [
    "Aasif Ali",
    "Fullstack Engineer",
    "Next.js Developer",
    "React Developer",
    "TypeScript Engineer",
    "AI Agent Engineer",
    "Python Developer",
    "LangGraph Developer",
    "Web Developer Portfolio",
    "PostgreSQL",
    "Freelance Developer India",
  ],
  authors: [{ name: "Aasif Ali", url: "https://github.com/meAasifAli" }],
  creator: "Aasif Ali",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Aasif Ali — Fullstack Engineer | Building with AI",
    description:
      "Fullstack Engineer building modern web applications, clean APIs, and practical AI integrations.",
    siteName: "Aasif Ali Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aasif Ali — Fullstack Engineer | Building with AI",
    description:
      "Fullstack Engineer building modern web applications, clean APIs, and practical AI integrations.",
    creator: "@asifalimir18",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Aasif Ali",
  url: siteUrl,
  jobTitle: "Fullstack Engineer",
  email: "aasifali.dev@gmail.com",
  sameAs: [
    "https://github.com/meAasifAli",
    "https://linkedin.com/in/meAasifAli",
    "https://x.com/asifalimir18",
  ],
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "Python",
    "PostgreSQL",
    "Tailwind CSS",
    "AI Agents",
    "LangGraph",
    "REST APIs",
    "NestJS",
  ],
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "APJ Abdul Kalam Technological University",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${syne.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange={false}
        >
          <InteractiveBackground />
          <SectionNavigator />
          <CursorFollower />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
