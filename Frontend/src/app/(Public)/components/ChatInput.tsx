"use client";

import { useState, useRef, KeyboardEvent, ChangeEvent } from "react";
import { motion } from "framer-motion";
import { useAutosize } from "@/hooks/useAutosize";

interface ChatInputProps {
  onSend: (text: string) => Promise<void>;
  disabled: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useAutosize(textareaRef, value);

  const handleSend = (): void => {
    if (!value.trim() || disabled) return;
    onSend(value.trim());
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setValue(e.target.value);
  };

  const canSend = value.trim().length > 0 && !disabled;

  return (
    <div className="px-3 pb-3 pt-2 border-t border-black/5 dark:border-white/5 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md">
      <div className="flex items-end gap-2 bg-zinc-100/80 dark:bg-zinc-800/80 rounded-2xl px-3 py-2 border border-black/5 dark:border-white/5 shadow-inner">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          rows={1}
          placeholder="Ask me anything about Praveen..."
          className="flex-1 resize-none bg-transparent text-sm text-zinc-800 dark:text-zinc-100
            placeholder:text-zinc-400 dark:placeholder:text-zinc-500
            focus:outline-none min-h-[24px] max-h-32 leading-6 py-0.5
            disabled:opacity-50 [scrollbar-width:none]"
        />
        <motion.button
          onClick={handleSend}
          disabled={!canSend}
          whileTap={canSend ? { scale: 0.88 } : {}}
          className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer
            ${
              canSend
                ? "bg-gradient-to-br from-indigo-500 to-violet-600 shadow-md shadow-indigo-500/30 text-white"
                : "bg-zinc-200 dark:bg-zinc-700 text-zinc-400 cursor-not-allowed"
            }`}
          aria-label="Send message"
        >
          <svg
            className="w-4 h-4 translate-x-px"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </motion.button>
      </div>
      <p className="text-center text-[10px] text-zinc-400 dark:text-zinc-600 mt-2 leading-tight">
        Powered by AI · Built for Praveen's portfolio
      </p>
    </div>
  );
}