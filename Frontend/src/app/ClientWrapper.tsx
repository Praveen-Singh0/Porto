"use client";

import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { PortfolioInfoProvider } from "./context/PortfolioInfoContext";
import { ToastProvider } from "./context/ToastContext";

interface ClientWrapperProps {
  children: React.ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  return (
    <ThemeProvider>
        <PortfolioInfoProvider>
          <ToastProvider>{children}</ToastProvider>
        </PortfolioInfoProvider>
    </ThemeProvider>
  );
}