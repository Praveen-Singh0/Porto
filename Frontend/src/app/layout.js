"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../../public/assets/style/style.css"
import "../../public/assets/style/mystyle.scss"
import Footer from "./components/Footer";
import Header from "./components/Header";
import { usePathname } from "next/navigation";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({ children }) {
  const pathname = usePathname();
  const hideHeaderFooter = pathname === "/login" || pathname === "/admin-dashboard";

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {!hideHeaderFooter && <Header />}
        {children}
        {!hideHeaderFooter && <Footer />}
      </body>
    </html>
  );
}
