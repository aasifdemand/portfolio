'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, Mail, Sparkles, ArrowUpRight } from 'lucide-react'
import { SectionWrapper } from '@/components/section-wrapper'
import { Button } from '@/components/ui/button'
import { SERVICES, type Service, PERSONAL_INFO } from '@/lib/constants'

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const mailtoHref = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
    service.contactSubject
  )}&body=${encodeURIComponent(
    `Hi Aasif,\n\nI am interested in your "${service.title}" service (${service.priceINR}).\n\nProject brief:\n- Scope/Idea: \n- Timeline: \n\nLooking forward to hearing from you!`
  )}`

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-40px' }}
      transition={{ duration: 0.45, ease: 'easeOut', delay: index * 0.1 }}
      className={`relative flex flex-col justify-between p-6 rounded-2xl border bg-card transition-all duration-200 hover:-translate-y-1 ${
        service.popular
          ? 'border-primary/60 shadow-md ring-1 ring-primary/20'
          : 'border-border hover:border-primary/40 shadow-xs'
      }`}
    >
      <div>
        {/* Top bar: Title + Badge */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-lg font-bold tracking-tight text-foreground leading-snug">
            {service.title}
          </h3>
          {service.badge && (
            <span
              className={`shrink-0 text-[10px] font-semibold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 ${
                service.popular
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-primary/10 text-primary border border-primary/20'
              }`}
            >
              {service.popular && <Sparkles className="w-2.5 h-2.5" />}
              {service.badge}
            </span>
          )}
        </div>

        {/* Pricing & Delivery Tag */}
        <div className="flex items-baseline justify-between pt-1 pb-3 mb-3 border-b border-border/70 flex-wrap gap-2">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-primary">
              {service.priceINR}
            </span>
            <span className="text-[10px] text-muted-foreground uppercase font-medium">
              INR
            </span>
          </div>
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-muted text-muted-foreground border border-border">
            {service.deliveryTime}
          </span>
        </div>

        {/* Concise Description */}
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4">
          {service.description}
        </p>

        {/* Deliverables Checklist (Brief & concise) */}
        <ul className="space-y-2 mb-6">
          {service.features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 bg-primary/15 text-primary">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </div>
              <span className="leading-tight text-foreground/85">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Button */}
      <div className="pt-3 border-t border-border/50">
        <Link href={mailtoHref} className="block w-full">
          <Button
            className="w-full gap-1.5 h-9 text-xs font-medium cursor-pointer"
            variant={service.popular ? 'default' : 'outline'}
          >
            <Mail className="w-3.5 h-3.5" />
            Book Service
            <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
          </Button>
        </Link>
      </div>
    </motion.article>
  )
}

export function Services() {
  return (
    <SectionWrapper id="services">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-start mb-8 sm:mb-10">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: 'var(--brand)' }}
          >
            Services & Pricing
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            How I can help your project
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
            Transparent pricing in INR (₹) with clear deliverables, modern design, and fast turnaround.
          </p>
        </div>

        {/* Services Grid (Compact & balanced) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Custom inquiry strip */}
        <div className="mt-8 p-4 sm:p-5 rounded-xl border border-border bg-card/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="font-semibold text-foreground text-sm">
              Need a custom tailored solution or ongoing freelance support?
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              Have specific feature requirements, APIs, or architectural needs? Let&apos;s talk.
            </p>
          </div>
          <Link href={`mailto:${PERSONAL_INFO.email}?subject=Custom%20Project%20Inquiry`}>
            <Button variant="outline" size="sm" className="shrink-0 gap-1.5 h-8 text-xs cursor-pointer">
              <Mail className="w-3.5 h-3.5" />
              Custom Inquiry
            </Button>
          </Link>
        </div>
      </div>
    </SectionWrapper>
  )
}
