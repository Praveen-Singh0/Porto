import React from "react";
import ClientWrapper from "./ClientWrapper";

export const metadata = {
  title: "Praveen's Portfolio",
  description:
    "Full-stack developer. I build fast, scalable, and user-focused web applications with clean UI and modern architecture.",
  icons: {
    icon: "/assets/img/logo.png", // ✅ PNG as favicon
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
        <ClientWrapper>{children}</ClientWrapper>
  );
}
