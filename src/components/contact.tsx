"use client";

import { useState, useTransition, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, CheckCircle2, X, AlertCircle } from "lucide-react";
import { SectionWrapper } from "@/components/section-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SOCIALS, CONTACT_CONTENT } from "@/lib/constants";
import { SOCIAL_ICON_MAP } from "@/components/icons";
import { sendContactEmail } from "@/app/actions/contact";

export function Contact() {
  const [isPending, startTransition] = useTransition();
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    const name = (formData.get("name") as string)?.trim() || "there";

    startTransition(async () => {
      const result = await sendContactEmail(formData);

      if (result.success) {
        setSubmittedName(name);
        setShowThankYouModal(true);
        formRef.current?.reset();
      } else {
        setErrorMessage(
          result.error || "Something went wrong. Please try again or email directly."
        );
      }
    });
  };

  return (
    <SectionWrapper id="contact" className="py-24 md:py-32 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-3"
          style={{ color: "var(--brand)" }}
        >
          {CONTACT_CONTENT.sectionLabel}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          {CONTACT_CONTENT.heading}
        </h2>
        <p className="text-muted-foreground mb-12 max-w-md leading-relaxed text-sm sm:text-base">
          {CONTACT_CONTENT.description}
        </p>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          {/* Contact Form */}
          <div className="p-5 sm:p-8 rounded-2xl border border-border/80 bg-card/85 backdrop-blur-sm shadow-xs">
            {errorMessage && (
              <div className="mb-6 p-3.5 rounded-xl border border-destructive/40 bg-destructive/10 text-destructive text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs font-medium">
                    Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    className="h-11 px-3.5 text-xs sm:text-sm rounded-xl"
                    required
                    disabled={isPending}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-medium">
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="h-11 px-3.5 text-xs sm:text-sm rounded-xl"
                    required
                    disabled={isPending}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="text-xs font-medium">
                  Subject
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="Project inquiry, freelancing, or hello"
                  className="h-11 px-3.5 text-xs sm:text-sm rounded-xl"
                  disabled={isPending}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-xs font-medium">
                  Message <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project, timeline, or idea..."
                  rows={4}
                  className="px-3.5 py-3 text-xs sm:text-sm rounded-xl resize-none"
                  required
                  disabled={isPending}
                />
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className="w-full gap-2 h-11 text-xs sm:text-sm font-medium rounded-xl cursor-pointer"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Social Links & Info */}
          <div className="flex flex-col justify-between py-2 space-y-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Prefer direct communication?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Whether you need a fullstack web app, custom AI agent, or advice on your next product,
                feel free to reach out directly through any of my official channels.
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Official Profiles
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SOCIALS.map((social) => {
                  const Icon = SOCIAL_ICON_MAP[social.id] || Send;
                  return (
                    <Link
                      key={social.id}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3.5 rounded-xl border border-border bg-card/60 hover:border-primary/50 hover:bg-card transition-all group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-foreground">{social.label}</p>
                        <p className="text-[11px] text-muted-foreground">{social.handle}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Thank You Popup Modal */}
      <AnimatePresence>
        {showThankYouModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative w-full max-w-md p-6 sm:p-8 rounded-2xl border border-border bg-card shadow-2xl overflow-hidden text-center"
            >
              {/* Close Icon */}
              <button
                onClick={() => setShowThankYouModal(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg"
                aria-label="Close thank you modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Animated Success Badge */}
              <div className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center bg-primary/10 border border-primary/25 text-primary">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="text-xl font-bold tracking-tight text-foreground mb-2">
                Thank You, {submittedName}!
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Your message has been successfully delivered. I&apos;ll review your details and get
                back to you within <span className="font-semibold text-foreground">24 hours</span>.
              </p>

              <Button
                onClick={() => setShowThankYouModal(false)}
                className="w-full h-10 text-xs sm:text-sm font-medium rounded-xl cursor-pointer"
              >
                Great, thanks!
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
