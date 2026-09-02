"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { motion, AnimatePresence } from "framer-motion";
import { PERSONAL_INFO } from "@/lib/constants";
import { ChatTrigger } from "./chatbot/chat-trigger";
import { ChatHeader } from "./chatbot/chat-header";
import { ChatSuggestions } from "./chatbot/chat-suggestions";
import { ChatMessages } from "./chatbot/chat-messages";
import { ChatInput } from "./chatbot/chat-input";

const INITIAL_MESSAGES = [
  {
    id: "welcome",
    role: "assistant" as const,
    content: `Hi! 👋 I'm **${PERSONAL_INFO.name}'s Assistant**.\n\nAsk me anything about Aasif's **skills**, **projects**, or freelance **services & INR pricing**!`,
  },
];

export function Chatbot() {
  // Opens automatically when website loads for immediate visitor engagement
  const [isOpen, setIsOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fast streaming managed by Vercel AI SDK
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    status,
    setMessages,
    append,
  } = useChat({
    api: "/api/chat",
    initialMessages: INITIAL_MESSAGES,
    onError(err) {
      console.error('Chat error:', err)
    },
  });

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, status]);

  return (
    <>
      {/* Floating AI Glowing Orb Trigger */}
      <ChatTrigger isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: "spring", damping: 25, stiffness: 320 }}
            className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-102.5 h-[520px] max-h-[78vh] sm:max-h-[540px] flex flex-col rounded-2xl border border-border bg-card/95 shadow-2xl backdrop-blur-2xl overflow-hidden"
          >
            <ChatHeader
              onReset={() => setMessages(INITIAL_MESSAGES)}
              onClose={() => setIsOpen(false)}
            />

            <ChatSuggestions
              onSelect={(suggestion) =>
                append({ role: "user", content: suggestion })
              }
              disabled={isLoading}
            />

            <ChatMessages
              messages={messages}
              isLoading={isLoading}
              messagesEndRef={messagesEndRef}
            />

            <ChatInput
              input={input}
              isLoading={isLoading}
              onInputChange={handleInputChange}
              onSubmit={handleSubmit}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
