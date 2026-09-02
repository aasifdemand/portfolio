// ─── Profile & Personal Info ──────────────────────────────────────────────────

export const PERSONAL_INFO = {
  name: 'Aasif Ali',
  logoInitials: 'AA',
  domain: 'Aasif.dev',
  email: 'aasifali.dev@gmail.com',
  status: 'Open to new opportunities',
  tagline: 'I build modern fullstack web applications powered by AI — clean code, responsive interfaces, and practical integrations.',
  resumeUrl: 'https://drive.google.com/file/d/18G5Hh8mXFcybPtNSgsZ3Rd_SyQtGVDqM/view?usp=sharing',
} as const

// ─── Navigation ──────────────────────────────────────────────────────────────

export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
] as const

// ─── Hero ─────────────────────────────────────────────────────────────────────

export const ROLES = [
  'Fullstack Engineer',
  'Building Apps with AI',
  'Next.js & React Developer',
  'Node.js & Python APIs',
] as const

// ─── About ────────────────────────────────────────────────────────────────────

export const ABOUT_CONTENT = {
  sectionLabel: 'About me',
  heading: 'Building modern web applications with AI',
  paragraphs: [
    "I'm a Fullstack Engineer actively building modern web applications integrated with AI. I focus on creating complete, end-to-end products — from intuitive, polished user interfaces to solid backend APIs and databases.",
    "My daily work involves developing with Next.js, React, TypeScript, and Node/Python, while integrating practical AI features such as LLM-assisted workflows, real-time chat, and semantic search to solve real-world problems.",
    "I love experimenting with new web technologies and AI APIs, writing maintainable code, and turning ideas into clean, functional applications that deliver great user experience.",
  ],
} as const

export const STATS = [
  { value: '2+', label: 'Years building web & AI apps' },
  { value: '15+', label: 'Projects & apps built' },
  { value: '10+', label: 'AI & third-party APIs integrated' },
  { value: '100%', label: 'Focused on clean code & UX' },
] as const

export const PHILOSOPHY_TAGS = [
  'Fullstack Development',
  'AI Integrations',
  'TypeScript & React',
  'Next.js App Router',
  'REST & GraphQL APIs',
  'Modern UI/UX',
] as const

// ─── Skills ───────────────────────────────────────────────────────────────────

export type Skill = {
  name: string
  /** skillicons.dev slug — undefined means show letter-initial fallback */
  slug?: string
  initials?: string
}

export const SKILLS: Record<string, Skill[]> = {
  Languages: [
    { name: 'TypeScript', slug: 'typescript' },
    { name: 'JavaScript', slug: 'js' },
    { name: 'Python', slug: 'python' },
    { name: 'SQL', slug: 'postgresql' },
    { name: 'HTML5', slug: 'html' },
    { name: 'CSS3', slug: 'css' },
  ],
  Frontend: [
    { name: 'Next.js', slug: 'nextjs' },
    { name: 'React', slug: 'react' },
    { name: 'Angular', slug: 'angular' },
    { name: 'Tailwind CSS', slug: 'tailwind' },
    { name: 'Redux/Zustand', slug: 'redux' },
    { name: 'Vite', slug: 'vite' },

  ],
  Backend: [
    { name: 'Node.js', slug: 'nodejs' },
    { name: 'Express', slug: 'express' },
    { name: 'FastAPI', slug: 'fastapi' },
    { name: 'PostgreSQL', slug: 'postgresql' },
    { name: 'MongoDB', slug: 'mongodb' },
    { name: 'Redis', slug: 'redis' },
    { name: 'Prisma', slug: 'prisma' },
    { name: 'Supabase', slug: 'supabase' },
    {
      name: 'Firebase', slug: 'firebase'
    },
    {
      name: 'NestJS', slug: 'nestjs'
    },
    {
      name: 'GraphQL', slug: 'graphql'
    },
    {
      name: 'RabbitMQ', slug: 'rabbitmq'
    }
  ],
  'AI & Tools': [

    { name: 'AI APIs & LLMs', initials: 'AI' },
    { name: 'LangChain', initials: 'LC' },
    { name: 'Langgraph', initials: 'LG' },
    { name: 'Pinecone', initials: 'PC' },
    { name: 'Weaviate', initials: 'WV' },
    { name: 'Retrieval-Augmented Generation', initials: 'RAG' },
    { name: 'Git & GitHub', slug: 'github' },
    { name: 'Docker', slug: 'docker' },
    { name: 'Vercel', slug: 'vercel' },
    { name: 'Postman', slug: 'postman' },
    { name: 'Figma', slug: 'figma' },
    { name: 'Android Studio', slug: 'androidstudio' },
    { name: 'VS Code', slug: 'vscode' },

  ],
  'Cloud': [
    { name: 'AWS', slug: 'aws' },
    { name: 'Google Cloud', slug: 'googlecloud' },
    { name: 'Azure', slug: 'azure' },
  ]
}

// ─── Services (INR Pricing) ───────────────────────────────────────────────────

export type Service = {
  id: string
  title: string
  tagline: string
  priceINR: string
  priceNote: string
  description: string
  features: string[]
  popular?: boolean
  badge?: string
  deliveryTime: string
  contactSubject: string
}

export const SERVICES: Service[] = [
  {
    id: 'static-website',
    title: 'Static Website / Landing Page',
    tagline: 'High-converting & fast web presence',
    priceINR: '₹14,999',
    priceNote: 'Starting price',
    description:
      'Fast, responsive website built with Next.js & Tailwind. Perfect for portfolios, startups, and marketing.',
    features: [
      'Responsive design (Mobile + Desktop)',
      '95+ Lighthouse performance & SEO',
      'Smooth scroll animations & contact form',
      'Free deployment on Vercel / Netlify',
    ],
    deliveryTime: '3–5 Days',
    badge: 'Quick Turnaround',
    contactSubject: 'Inquiry: Static Website / Landing Page',
  },
  {
    id: 'fullstack-app',
    title: 'Fullstack Web Application',
    tagline: 'Production-ready dynamic SaaS or dashboard',
    priceINR: '₹39,999',
    priceNote: 'Starting price',
    description:
      'Custom fullstack application with secure auth, database schema, and custom admin dashboard.',
    features: [
      'Next.js App Router & TypeScript',
      'User auth & database (Postgres / Mongo)',
      'Admin dashboard & CRUD workflows',
      'REST APIs & payment integrations',
    ],
    deliveryTime: '2–3 Weeks',
    popular: true,
    badge: 'Most Popular',
    contactSubject: 'Inquiry: Fullstack Web Application',
  },
  {
    id: 'fullstack-ai-chatbot',
    title: 'Fullstack App + AI Chatbot',
    tagline: 'Smart apps with LLM & agent workflows',
    priceINR: '₹69,999',
    priceNote: 'Starting price',
    description:
      'Complete web app integrated with custom AI chatbots, grounded RAG knowledge, or autonomous agents.',
    features: [
      'Fullstack app + LLM integrations',
      'Knowledge retrieval (RAG / Embeddings)',
      'Fast real-time streaming chat UI',
      'Custom prompts & guardrails',
    ],
    deliveryTime: '3–4 Weeks',
    badge: 'AI Powered',
    contactSubject: 'Inquiry: Fullstack App with AI Chatbot',
  },
]

// ─── Projects ─────────────────────────────────────────────────────────────────

export type Project = {
  title: string
  description: string
  tags: string[]
  github: string
  live: string
  featured: boolean
  bullets?: string[]
}

export const PROJECTS: Project[] = [
  {
    title: 'AI Chat & Knowledge App',
    description:
      'A fullstack chat application featuring streaming AI responses, conversation management, context memory, and document querying.',
    tags: ['Next.js', 'React', 'OpenAI API', 'Tailwind CSS', 'TypeScript'],
    github: 'https://github.com/meAasifAli',
    live: '#',
    featured: true,
  },
  {
    title: 'Blogify',
    description:
      'Fullstack blogging platform with rich content management, authenticated author workflows, responsive UI, and high-performance server rendering.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL (Neon)', 'Prisma ORM', 'Tailwind CSS'],
    github: 'https://github.com/meAasifAli/blogify',
    live: 'https://blogify-flax-seven.vercel.app/',
    featured: true,
  },
  {
    title: 'Finvault AI',
    description:
      'AI personal finance manager featuring smart budget tracking, goal setting, expense handling, and an intelligent LangGraph agent workflow to draw actionable spending insights.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL (Neon)', 'Prisma ORM', 'LangGraph', 'AI Workflows'],
    github: 'https://github.com/aasifdemand/AI-Finance-Manager',
    live: 'https://ai-finance-manager-five.vercel.app/',
    featured: true,
  },
  {
    title: 'Internal Expense Management System',
    description:
      'Enterprise expense & reimbursement platform with JWT-based Role-Based Access Control (RBAC), multi-role workflows, budget allocation, and dynamic filtering.',
    tags: ['React', 'NestJS', 'MySQL', 'TypeORM', 'JWT', 'RBAC'],
    github: 'https://github.com/aasifdemand/EXPENSE_V2',
    live: '#',
    featured: false,
    bullets: [
      'Developed an internal expense management application with JWT-based Role-Based Access Control (RBAC) supporting Super Admin and User roles.',
      'Built modules for Expense Management, Reimbursement Management, Budget Allocation, and User Management with secure authorization.',
      'Developed secure RESTful APIs for expense submission, reimbursement workflows, budget allocation, and role-based authorization.',
      'Designed responsive React dashboards with reusable UI components, role-specific views, filtering, and reporting capabilities.',
      'Optimized backend APIs and database queries to improve application performance and maintainability.',
    ],
  },
  {
    title: 'Social Media Web Application',
    description:
      'Fullstack social media application featuring authenticated user profiles, post feeds, likes & comments, RTK Query state management, and real-time WebSocket messaging.',
    tags: ['React', 'TypeScript', 'NestJS', 'TypeORM', 'MySQL', 'WebSockets', 'RTK Query'],
    github: 'https://github.com/meAasifAli',
    live: '#',
    featured: false,
    bullets: [
      'Developed a fullstack social media web application using React, TypeScript, NestJS, and TypeORM with interactive, responsive UI.',
      'Built reusable React components and managed server state efficiently using Redux Toolkit Query (RTK Query).',
      'Designed and developed secure RESTful APIs using NestJS and TypeORM with JWT-based authentication and Role-Based Access Control (RBAC).',
      'Implemented core features including user authentication, post creation, profile management, likes, comments, and modular backend architecture.',
      'Developed real-time messaging using WebSockets, enabling instant peer-to-peer communication with efficient state synchronization.',
    ],
  },
]

// ─── Experience ───────────────────────────────────────────────────────────────

export type Experience = {
  role: string
  company: string
  period: string
  location: string
  bullets: string[]
}

export const EXPERIENCES: Experience[] = [
  {
    role: 'Software Developer',
    company: 'Demand Curve Marketing Systems',
    period: '2025 — Present',
    location: 'Onsite',
    bullets: [
      'Architecting and building responsive fullstack web applications using Next.js, Node.js, React, TypeScript, and Tailwind CSS.',
      'Building Automation workflows, LLM integrations, and AI-powered features for marketing platforms',
      'Developing RESTful backend endpoints, managing state, and implementing secure database queries.',
    ],
  },
  {
    role: 'React Developer',
    company: 'Raybit Technologies',
    period: '2024 — 2025',
    location: 'Onsite',
    bullets: [
      'Built interactive, mobile-responsive interfaces and reusable UI component systems with React and modern CSS.',
      'Connected frontend clients with backend REST APIs and integrated third-party services.',
      'Focused on UI performance, smooth interactions, and intuitive user experiences.',
    ],
  },
]

// ─── Education ────────────────────────────────────────────────────────────────

export type Education = {
  degree: string
  institution: string
  period: string
  coursework: string[]
}

export const EDUCATION: Education[] = [
  {
    degree: 'B.Tech in Computer Science and Engineering',
    institution: 'APJ Abdul Kalam Technological University',
    period: '2019 – 2023',
    coursework: [
      'Data Structures',
      'Database Systems',
      'Operating Systems',
      'Software Engineering',
    ],
  },
]

// ─── Contact ──────────────────────────────────────────────────────────────────

export const CONTACT_CONTENT = {
  sectionLabel: 'Contact',
  heading: "Let's work together",
  description:
    'Have an opportunity, project, or want to collaborate on building modern fullstack and AI applications? Feel free to reach out directly!',
} as const

// ─── Socials ──────────────────────────────────────────────────────────────────

export type SocialId = 'github' | 'linkedin' | 'x' | 'email'

export type Social = {
  id: SocialId
  label: string
  href: string
  handle: string
}

export const SOCIALS: Social[] = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/meAasifAli', handle: '@meAasifAli' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/meAasifAli', handle: 'in/meAasifAli' },
  { id: 'x', label: 'Twitter / X', href: 'https://x.com/asifalimir18', handle: '@asifalimir18' },
  { id: 'email', label: 'Email', href: 'mailto:aasifali.dev@gmail.com', handle: 'aasifali.dev@gmail.com' },
]

// ─── Chatbot Suggestions & System Context ─────────────────────────────────────

export const CHATBOT_PROMPT_SUGGESTIONS = [
  'What services do you offer and what are the prices?',
  'What is your technical stack?',
  'Tell me about your fullstack experience',
  'How can I contact or hire Aasif?',
] as const

/**
 * Builds a clean, grounded markdown context for the Groq LLM system prompt.
 * This guarantees the AI only knows what is officially in constants.ts.
 */
export function getPortfolioKnowledgeBase(): string {
  const skillsList = Object.entries(SKILLS)
    .map(([cat, list]) => `- **${cat}**: ${list.map((s) => s.name).join(', ')}`)
    .join('\n')

  const servicesList = SERVICES.map(
    (s) =>
      `### ${s.title} (${s.priceINR})
- **Tagline**: ${s.tagline}
- **Pricing**: ${s.priceINR} (${s.priceNote})
- **Delivery Time**: ${s.deliveryTime}
- **Description**: ${s.description}
- **Included Features**: ${s.features.join(', ')}
- **Contact to book**: Email ${PERSONAL_INFO.email} with subject "${s.contactSubject}"`
  ).join('\n\n')

  const projectsList = PROJECTS.map(
    (p) =>
      `- **${p.title}**: ${p.description} (Tech: ${p.tags.join(', ')})` +
      (p.bullets ? '\n  ' + p.bullets.map((b) => `• ${b}`).join('\n  ') : '')
  ).join('\n\n')

  const experienceList = EXPERIENCES.map(
    (e) => `### ${e.role} at ${e.company} (${e.period}, ${e.location})
${e.bullets.map((b) => `- ${b}`).join('\n')}`
  ).join('\n\n')

  const educationList = EDUCATION.map(
    (ed) => `### ${ed.degree}
- **Institution**: ${ed.institution} (${ed.period})
- **Relevant Coursework**: ${ed.coursework.join(', ')}`
  ).join('\n\n')

  return `
# PORTFOLIO KNOWLEDGE BASE FOR AASIF ALI

## Personal Info
- **Name**: ${PERSONAL_INFO.name}
- **Title**: Fullstack Engineer | Building Apps with AI
- **Email**: ${PERSONAL_INFO.email}
- **Domain**: ${PERSONAL_INFO.domain}
- **Availability**: ${PERSONAL_INFO.status}
- **Tagline**: ${PERSONAL_INFO.tagline}

## About Aasif Ali
${ABOUT_CONTENT.paragraphs.join('\n\n')}

## Services & INR Pricing
${servicesList}

## Skills & Technologies
${skillsList}

## Featured Projects
${projectsList}

## Experience
${experienceList}

## Education
${educationList}

## Social & Contact Channels
- GitHub: https://github.com/meAasifAli
- LinkedIn: https://linkedin.com/in/meAasifAli
- Twitter / X: https://x.com/asifalimir18
- Direct Email: ${PERSONAL_INFO.email}
`
}
