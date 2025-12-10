"use client";
import React from "react";
import { motion } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { usePathname } from "next/navigation";
import HeroSection from "./pages/heroSection";
import About from "./pages/about";
import EducationSection from "./pages/education";
import ProjectSection from "./pages/projects";
import GradientBackground from "./utils/gradientBackground";
import SkillsSection from "./pages/skillsSection";
import ContactSection from "./pages/contact";

// Reusable scroll animation wrapper
const ScrollSection = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  const pathname = usePathname();
  const hideHeaderFooter =
    pathname === "/login" || pathname === "/admin-dashboard";

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <GradientBackground />
      <div className="pt-0 lg:px-0">
        <ScrollSection>
          <HeroSection />
        </ScrollSection>

        <ScrollSection delay={0.1}>
          <About />
        </ScrollSection>

        <ScrollSection delay={0.2}>
          <EducationSection />
        </ScrollSection>

        <ScrollSection delay={0.2}>
          <SkillsSection />
        </ScrollSection>

        <ScrollSection delay={0.3}>
          <ProjectSection />
        </ScrollSection>

        <ScrollSection delay={0.3}>
          <ContactSection />
        </ScrollSection>
      </div>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}
