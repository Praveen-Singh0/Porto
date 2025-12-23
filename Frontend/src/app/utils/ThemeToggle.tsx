"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-2 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        className="relative w-6 h-6 flex items-center justify-center"
        initial={false}
        animate={{
          rotate: theme === "dark" ? 180 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {theme === "light" ? (
          <FiSun className="w-5 h-5 text-yellow-500" />
        ) : (
          <FiMoon className="w-5 h-5 text-blue-400" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;