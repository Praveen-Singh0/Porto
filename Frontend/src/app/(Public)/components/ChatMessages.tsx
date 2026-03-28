"use client";

import { motion } from "framer-motion";
import type { Message } from "./Chatbot";
import Image from "next/image";

interface ChatMessagesProps {
  messages: Message[];
  loading: boolean;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// Renders **bold** markdown inline
function renderText(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export default function ChatMessages({ messages, loading }: ChatMessagesProps) {
  return (
    <div className="flex flex-col gap-3">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} msg={msg} />
      ))}
      {loading && <TypingIndicator />}
    </div>
  );
}

interface MessageBubbleProps {
  msg: Message;
}

function MessageBubble({ msg }: MessageBubbleProps) {
  const isUser = msg.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", damping: 22, stiffness: 280 }}
      className={`flex items-end gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {!isUser && (
        <div className=" flex-shrink-0 flex items-center justify-center shadow-sm mb-0.5">
          <Image
          className="w-6 h-6 sm:w-6 sm:h-6 md:w-6 md:h-6 rounded-full border-2 border-gray-200 dark:border-gray-700"
          src="/assets/img/avatar.jpg"
          alt="Avatar"
          width={50}
          height={50}
        />
        </div>
      )}

      <div
        className={`max-w-[78%] flex flex-col gap-0.5 ${
          isUser ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
            isUser
              ? "bg-gradient-to-br from-indigo-500 to-violet-600 text-white rounded-br-sm"
              : "bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 border border-black/5 dark:border-white/5 rounded-bl-sm"
          }`}
        >
          {renderText(msg.text)}
        </div>
        <span className="text-[10px] text-zinc-400 dark:text-zinc-500 px-1">
          {formatTime(msg.time)}
        </span>
      </div>
    </motion.div>
  );
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex items-end gap-2"
    >
      <div className=" flex-shrink-0 flex items-center justify-center shadow-sm">
        <Image
          className="w-6 h-6 sm:w-6 sm:h-6 md:w-6 md:h-6 rounded-full border-2 border-gray-200 dark:border-gray-700"
          src="/assets/img/avatar.jpg"
          alt="Avatar"
          width={50}
          height={50}
        />
      </div>
      <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-white dark:bg-zinc-800 border border-black/5 dark:border-white/5 shadow-sm">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-indigo-400"
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 0.7,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}