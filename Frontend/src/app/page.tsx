"use client";
import React from "react";
import { motion } from "framer-motion";
import Footer from "./components/Footer";
import Dock from "@/components/Dock";
import HeroSection from "./pages/heroSection";
import About from "./pages/about";
import EducationSection from "./pages/education";
import ProjectSection from "./pages/projects";
import GradientBackground from "./utils/gradientBackground";
import SkillsSection from "./pages/skillsSection";
import ContactSection from "./pages/contact";
import ExperienceSection from "./pages/experience";
import MajorProjects from "./pages/MajorProjectCard";
import { useScrollPosition } from "./utils/useScrollPosition";
import ThemeToggle from "./components/ThemeToggle";

import {
  HiHome,
  HiUser,
  HiBriefcase,
  HiAcademicCap,
  HiCode,
  HiFolder,
  HiMail,
} from "react-icons/hi";

// Reusable scroll animation wrapper
const ScrollSection = ({
  children,
  delay = 0,
  id,
}: {
  children: React.ReactNode;
  delay?: number;
  id?: string;
}) => {
  return (
    <motion.div
      id={id}
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
  const { isAtTop } = useScrollPosition();

  const showDock = !isAtTop;

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

const dockItems = [
  {
    icon: <HiHome size={24} />,
    label: "Home",
    onClick: () => scrollToSection("hero"),
  },
  {
    icon: <HiUser size={24} />,
    label: "About",
    onClick: () => scrollToSection("about"),
  },
  {
    icon: <HiBriefcase size={24} />,
    label: "Experience",
    onClick: () => scrollToSection("experience"),
  },
  {
    icon: <HiAcademicCap size={24} />,
    label: "Education",
    onClick: () => scrollToSection("education"),
  },
  {
    icon: <HiCode size={24} />,
    label: "Skills",
    onClick: () => scrollToSection("skills"),
  },
  {
    icon: <HiFolder size={24} />,
    label: "Projects",
    onClick: () => scrollToSection("projects"),
  },
  {
    icon: <HiMail size={24} />,
    label: "Contact",
    onClick: () => scrollToSection("contact"),
  },
  {
    icon: <ThemeToggle />,
    label: "Theme",
    onClick: () => {}, // Empty function or remove onClick entirely
  },
];


  return (
    <>
      <GradientBackground />

      <div className="pt-0 lg:px-0">
        <ScrollSection id="hero">
          <HeroSection />
        </ScrollSection>

        <ScrollSection delay={0.1} id="about">
          <About />
        </ScrollSection>
        <ScrollSection delay={0.2} id="experience">
          <ExperienceSection />
        </ScrollSection>
        <ScrollSection delay={0.2} id="education">
          <EducationSection />
        </ScrollSection>
        <ScrollSection delay={0.2} id="skills">
          <SkillsSection />
        </ScrollSection>
        <ScrollSection delay={0.3} id="projects">
          <ProjectSection />
        </ScrollSection>
        <ScrollSection delay={0.4} id="major-projects">
          <MajorProjects />
        </ScrollSection>
        <ScrollSection delay={0.3} id="contact">
          <ContactSection />
        </ScrollSection>
        
      </div>

      <div className="hidden sm:block">
      {showDock && (
        <Dock
          items={dockItems}
          panelHeight={68}
          baseItemSize={50}
          magnification={70}
          distance={180}
        />
      )}
      </div>

      <Footer />
    </>
  );
}
