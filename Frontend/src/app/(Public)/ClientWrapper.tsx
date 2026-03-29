"use client";

import React from "react";
import dynamic from "next/dynamic";
import { PortfolioInfoProvider } from "../context/PortfolioInfoContext";


const Chatbot = dynamic(() => import("./components/Chatbot"), {
  ssr: false,
  loading: () => null,
});


interface ClientWrapperProps {
  children: React.ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  return (
        <PortfolioInfoProvider>
          {children}
          <Chatbot />
        </PortfolioInfoProvider>
  );
}