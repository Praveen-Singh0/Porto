"use client"
import Header from "./components/Header";
import Footer from "./components/Footer";
import { usePathname } from "next/navigation";
import TopPage from "./pages/TopPage";
import About from "./pages/about";
import EducationSection from "./pages/education";
import ProjectSection from "./pages/projects";
import GradientBackground from "./utils/gradientBackground";
import SkillsSection from "./pages/SkillsSection";
import ContactSection from "./pages/contact";

export default function Home({ children }) {

  const pathname = usePathname();
  const hideHeaderFooter = pathname === "/login" || pathname === "/admin-dashboard";


  return (
    <>
      {!hideHeaderFooter && <Header />}
      <GradientBackground />
      <div className="pt-0 lg:px-0">
        <TopPage />
        <About />
        <EducationSection />
        <SkillsSection />
        <ProjectSection />
        <ContactSection />
      </div>
      {!hideHeaderFooter && <Footer />}
    </>

  );
}
