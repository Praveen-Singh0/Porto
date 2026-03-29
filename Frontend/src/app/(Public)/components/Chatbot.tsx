"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import Image from "next/image";

import { useAutoScroll } from "@/hooks/useAutoScroll";

export interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  time: Date;
}

const WELCOME_TEXT =
  "Hey there 👋 I'm **Praveen's AI assistant**. Ask me anything — his skills, experience, projects, or how to work with him. I've got you covered!";

const WELCOME_MSG: Message = {
  id: "welcome",
  role: "assistant",
  text: WELCOME_TEXT,
  time: new Date(),
};

const SUGGESTIONS: string[] = [
  "What are his top skills?",
  "Tell me about his experience",
  "What projects has he built?",
  "How can I hire him?",
];

function generateMockReply(input: string): string {
  const q = input.toLowerCase();
  if (q.includes("skill") || q.includes("tech") || q.includes("stack"))
    return "Praveen specializes in **React, Next.js, Node.js & TypeScript**. He's also experienced with Tailwind CSS, MongoDB, PostgreSQL, and REST/GraphQL APIs — full-stack through and through! 💻";
  if (
    q.includes("experience") ||
    q.includes("work") ||
    q.includes("background")
  )
    return "Praveen has **2+ years of experience** building production-grade web applications. He's worked on SaaS products, portfolio systems, and e-commerce platforms with international teams.";
  if (q.includes("project") || q.includes("built") || q.includes("portfolio"))
    return "Some of his notable projects include an **AI-powered portfolio chatbot** (yes, like me! 😄), a real-time SaaS dashboard, and a freelance marketplace. Each crafted with performance and UX in mind.";
  if (
    q.includes("hire") ||
    q.includes("contact") ||
    q.includes("work with") ||
    q.includes("reach")
  )
    return "Great news — Praveen is **open to freelance and full-time opportunities**! You can reach him via the contact form on this site or on LinkedIn. He typically responds within 24 hours. 🚀";
  return "That's a great question! Praveen is a passionate full-stack developer who loves building elegant, user-first products. Want to know about his **skills**, **projects**, or how to **get in touch**?";
}

export default function Chatbot() {
  const [open, setOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MSG]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  const chatRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const close = (e: MouseEvent) =>
      !chatRef.current?.contains(e.target as Node) && setOpen(false);

    open && document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  useAutoScroll(bottomRef, messages);

  const sendMessage = async (text: string): Promise<void> => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      text: text.trim(),
      time: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    // Simulate streaming delay — replace with real API call
    await new Promise<void>((resolve) =>
      setTimeout(resolve, 1100 + Math.random() * 700),
    );

    const reply: Message = {
      id: `bot-${Date.now()}`,
      role: "assistant",
      text: generateMockReply(text),
      time: new Date(),
    };

    setMessages((prev) => [...prev, reply]);
    setLoading(false);
  };

  const handleOpen = (): void => {
    setOpen(true);
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: "assistant",
        text: WELCOME_TEXT,
        time: new Date(),
      },
    ]);
  };

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="fab"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpen}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center
        bg-gradient-to-br from-indigo-500 to-violet-600
        cursor-pointer"
            aria-label="Open AI assistant"
          >
            {/* Ripple rings */}
            {[0].map((i) => (
              <span
                key={i}
                className="absolute inset-1 rounded-full border-2 
             border-indigo-400 
             dark:border-indigo-300
             animate-ripple"
                style={{
                  animation: `ripplePulse 2.4s ease-out infinite`,
                  animationDelay: `${i * 0.8}s`,
                }}
              />
            ))}

            <Image
              className="w-9 h-9 rounded-full border-2 border-gray-200 dark:border-gray-700 relative z-10"
              src="/assets/img/avatar.jpg"
              alt="Avatar"
              width={50}
              height={50}
            />

            <span className="absolute -top-1 -right-1 z-20 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow">
              1
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chatwindow"
            ref={chatRef}
            initial={{ opacity: 0, y: 40, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.93 }}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}
            className="fixed sm:bottom-6 bottom-0 sm:right-6 z-50 sm:w-[370px] sm:max-w-[95vw] flex flex-col rounded overflow-hidden shadow-2xl
              border border-white/10
              bg-white/80 dark:bg-zinc-900/85
              backdrop-blur-2xl"
            style={{ height: "600px", margin: "0rem 1rem" }}
          >
            <ChatHeader onClose={() => setOpen(false)} />

            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-thin scrollbar-thumb-indigo-200 dark:scrollbar-thumb-zinc-700">
              <ChatMessages messages={messages} loading={loading} />

              <AnimatePresence>
                {showSuggestions && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="flex flex-wrap gap-2 pt-1"
                  >
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => sendMessage(s)}
                        className="text-[11px] font-medium px-3 py-1.5 rounded-full
                          border border-indigo-200 dark:border-indigo-800
                          text-indigo-600 dark:text-indigo-400
                          bg-indigo-50 dark:bg-indigo-950/50
                          hover:bg-indigo-100 dark:hover:bg-indigo-900/60
                          transition-colors cursor-pointer"
                      >
                        {s}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={bottomRef} />
            </div>

            <ChatInput onSend={sendMessage} disabled={loading} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

interface ChatHeaderProps {
  onClose: () => void;
}

function ChatHeader({ onClose }: ChatHeaderProps) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 border-b border-black/5 dark:border-white/5
      bg-gradient-to-r from-indigo-500/10 to-violet-500/10 dark:from-indigo-900/30 dark:to-violet-900/20"
    >
      <div className="relative flex-shrink-0">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 overflow-hidden shadow-md flex items-center justify-center">
          <Image
            className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border-2 border-gray-200 dark:border-gray-700"
            src="/assets/img/avatar.jpg"
            alt="Avatar"
            width={50}
            height={50}
          />{" "}
        </div>
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white dark:border-zinc-900 shadow" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-zinc-800 dark:text-white leading-tight truncate">
          Praveen's AI
        </p>
        <p className="text-[11px] text-emerald-500 font-medium">
          ● Online · Always ready
        </p>
      </div>

      <button
        onClick={onClose}
        className="w-7 h-7 rounded-xl flex items-center justify-center
          text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200
          hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
        aria-label="Close chatbot"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
