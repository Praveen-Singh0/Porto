"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <motion.div
      key="loader"
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 dark:bg-[#0d1117]/80 backdrop-blur-sm"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="text-center text-gray-700 dark:text-[#c9d1d9]">
        <div
          className="
            w-10 h-10 border-4 
            border-gray-300 dark:border-gray-600 
            border-t-blue-500 dark:border-t-white 
            rounded-full animate-spin mx-auto mb-4
          "
        />
        <p className="text-sm font-medium animate-pulse">
          Fetching data from GitHub API...
        </p>
      </div>
    </motion.div>
  );
}