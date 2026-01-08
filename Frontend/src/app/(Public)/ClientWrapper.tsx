"use client";

import React from "react";
import { PortfolioInfoProvider } from "../context/PortfolioInfoContext";

interface ClientWrapperProps {
  children: React.ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  return (
        <PortfolioInfoProvider>
          {children}
        </PortfolioInfoProvider>
  );
}