"use client";

import { useEffect, useState } from "react";
import GlassCard from "../../components/GlassCard";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, ChevronDown, Loader2, MessageSquare, FileText, Zap, Hash } from "lucide-react";
import { chatService, ChatResponse } from "../../../../../services/aiChatbot";

export default function AIChatbotPage() {
  const [chats, setChats] = useState<ChatResponse[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const fetchChats = async (pageNum: number, isInitial = false) => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await chatService.getAll(pageNum);

      setChats((prev) => {
        const newChats = isInitial ? res.data : [...prev, ...res.data];
        return Array.from(
          new Map(newChats.map((item) => [item.id, item])).values()
        );
      });

      setTotal(res.total);
      setTotalPages(res.totalPages);
      setPage(pageNum + 1);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
    if (isInitial) setInitialLoading(false);
  };

  useEffect(() => {
    fetchChats(1, true);
  }, []);

  const handleLoadMore = () => {
    fetchChats(page);
  };

  const hasMore = page <= totalPages;
  const latestQuery = chats[0]?.query || "No queries yet";

  return (
    <div
      className="min-h-screen p-6 space-y-8"
      style={{ fontFamily: "'Sora', 'DM Sans', sans-serif" }}
    >
      {/* ── Header Card ─────────────────────────────────────── */}
      <GlassCard>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Icon */}
          <div className="relative flex-shrink-0">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <Bot className="w-7 h-7 text-white" />
            </div>
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white dark:border-gray-900 animate-pulse" />
          </div>

          {/* Title */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
              AI Chatbot Queries
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Track every question users ask about you
            </p>

            {/* Stat pills */}
            <div className="flex flex-wrap gap-2 mt-3">
              <StatPill icon={<MessageSquare className="w-3.5 h-3.5" />} label="Total Queries" value={total} color="emerald" />
              <StatPill icon={<FileText className="w-3.5 h-3.5" />} label="Pages" value={totalPages} color="teal" />
              <StatPill icon={<Zap className="w-3.5 h-3.5" />} label="Loaded" value={chats.length} color="cyan" />
            </div>
          </div>

          {/* Latest query badge */}
          <div className="w-full sm:w-64 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">
              Latest Query
            </p>
            <p className="text-xs text-gray-700 dark:text-gray-300 line-clamp-2 leading-relaxed">
              {latestQuery}
            </p>
          </div>
        </div>
      </GlassCard>

      {/* ── Loading skeleton ──────────────────────────────────── */}
      {initialLoading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-28 rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse"
              style={{ animationDelay: `${i * 80}ms` }}
            />
          ))}
        </div>
      )}

      {/* ── Chat Grid ─────────────────────────────────────────── */}
      {!initialLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {chats.map((chat, index) => (
              <motion.div
                key={chat.id}
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.4) }}
                className="group relative flex flex-col justify-between gap-3 p-5 rounded-2xl
                  border border-gray-200 dark:border-gray-700/70
                  bg-white dark:bg-gray-900
                  shadow-sm hover:shadow-xl hover:-translate-y-0.5
                  transition-all duration-200"
              >
                {/* Query number badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500">
                  <Hash className="w-3 h-3" />
                  <span className="text-[10px] font-semibold">{index + 1}</span>
                </div>

                {/* Query text */}
                <p className="text-sm leading-relaxed text-gray-800 dark:text-gray-200 pr-8 line-clamp-4">
                  {chat.query}
                </p>

                {/* Footer */}
                <div className="flex items-center gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex-shrink-0" />
                  <p className="text-[11px] text-gray-400 dark:text-gray-500">
                    {new Date(chat.createdAt).toLocaleString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* ── Empty state ───────────────────────────────────────── */}
      {!initialLoading && chats.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
            <MessageSquare className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">No queries yet</p>
          <p className="text-sm text-gray-400 mt-1">Queries will appear here once users start chatting.</p>
        </div>
      )}

      {/* ── Load More Button ─────────────────────────────────── */}
      {!initialLoading && hasMore && (
        <div className="flex flex-col items-center gap-2 pt-2">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Showing <span className="font-semibold text-gray-600 dark:text-gray-300">{chats.length}</span> of{" "}
            <span className="font-semibold text-gray-600 dark:text-gray-300">{total}</span> queries
          </p>

          <motion.button
            onClick={handleLoadMore}
            disabled={loading}
            whileTap={{ scale: 0.97 }}
            className="group flex items-center gap-2.5 px-6 py-3 rounded-full
              font-semibold text-sm
              bg-gradient-to-r from-emerald-500 to-teal-500
              text-white shadow-md shadow-emerald-500/25
              hover:shadow-lg hover:shadow-emerald-500/35
              disabled:opacity-60 disabled:cursor-not-allowed
              transition-all duration-200"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading page {page - 1}…
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                Load More Queries
                <span className="ml-0.5 px-2 py-0.5 rounded-full bg-white/20 text-xs">
                  Page {page} / {totalPages}
                </span>
              </>
            )}
          </motion.button>
        </div>
      )}

      {/* ── All loaded state ─────────────────────────────────── */}
      {!initialLoading && !hasMore && chats.length > 0 && (
        <p className="text-center text-xs text-gray-400 dark:text-gray-600 pt-2">
          ✓ All {total} queries loaded
        </p>
      )}
    </div>
  );
}

/* ── Helper: Stat Pill ──────────────────────────────────── */
function StatPill({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: "emerald" | "teal" | "cyan";
}) {
  const colors = {
    emerald: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400",
    teal: "bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400",
    cyan: "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400",
  };

  return (
    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${colors[color]}`}>
      {icon}
      <span>{label}:</span>
      <span>{value}</span>
    </div>
  );
}