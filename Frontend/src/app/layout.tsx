import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../../public/assets/style/style.css";
import "../../public/assets/style/mystyle.scss";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
             try {
                  const theme =
                    localStorage.getItem("theme") ??
                    (window.matchMedia("(prefers-color-scheme: dark)").matches
                      ? "dark"
                      : "light");
                  document.documentElement.classList.add(theme);
                } catch {}
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}
      >
        <ThemeProvider>
          <ToastProvider>{children}</ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
