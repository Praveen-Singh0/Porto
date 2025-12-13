"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
  setTheme: () => {},
});

export const useTheme = () => {
  return useContext(ThemeContext);
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>("light");

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("theme") as Theme;
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      
      const initialTheme = savedTheme || systemTheme;
      setThemeState(initialTheme);
    } catch (error) {
      console.log("Theme initialization error:", error);
    }
  }, []);

  // Apply theme to document when theme changes
  useEffect(() => {
    try {
      const root = document.documentElement;
      const body = document.body;
      
      // Apply to both html and body
      root.classList.remove("light", "dark");
      root.classList.add(theme);
      
      body.classList.remove("light", "dark");
      body.classList.add(theme);
      
      localStorage.setItem("theme", theme);
    } catch (error) {
      console.log("Theme application error:", error);
    }
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "light" ? "dark" : "light"));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};