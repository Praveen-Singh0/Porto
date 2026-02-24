export const dynamic = "force-static";
export const revalidate = 30;

import TopPage from "./pages/heroSection";
import About from "./pages/about";
import EducationSection from "./pages/education";
import MinorProject from "./pages/minorProjects";
import MajorProjects from "./pages/majorProject";
import GradientBackground from "../utils/gradientBackground";
import SkillsSection from "./pages/skillsSection";
import ContactSection from "./pages/contact";
import ExperienceSection from "./pages/experience";
import DockClient from "./components/DockClient";
import ScrollSectionClient from "./components/ScrollSectionClient";
import Footer from "./components/Footer";

import { heroService } from "@/services/heroSection.service";
import { aboutService } from "@/services/aboutSection.service";
import { portfolioInfoService } from "@/services/portfolio.service";
import { experienceService } from "@/services/experience.service";
import { educationService } from "@/services/education.service";
import { skillsService } from "@/services/skillSection.service";
import { majorProjectService } from "@/services/projectService";
import { minorProjectService } from "@/services/projectService";



export default async function Home() {
  
  const aboutData = await aboutService.getInfo();
  const heroData = await heroService.getInfo();
  const portfolioInfo = await portfolioInfoService.getInfo();
  const experienceData = await experienceService.getInfo();
  const educationData = await educationService.getInfo();
  const skillsData = await skillsService.getInfo();
  const majorProjects = await majorProjectService.getAll();
  const minorProjects = await minorProjectService.getAll();

  return (
    <>
      <GradientBackground />

      <ScrollSectionClient id="hero">
        <TopPage heroData={heroData} portfolioInfo={portfolioInfo} />
      </ScrollSectionClient>

      <ScrollSectionClient id="about">
        <About aboutData={aboutData} portfolioInfo={portfolioInfo} />
      </ScrollSectionClient>

      <ScrollSectionClient id="experience">
        <ExperienceSection data={experienceData} />
      </ScrollSectionClient>

      <ScrollSectionClient id="education">
        <EducationSection data={educationData} />
      </ScrollSectionClient>

      <ScrollSectionClient id="skills">
        <SkillsSection data={skillsData} />
      </ScrollSectionClient>

      <ScrollSectionClient id="projects">
        <MinorProject data={minorProjects} />
      </ScrollSectionClient>

      <ScrollSectionClient id="major-projects">
        <MajorProjects data={majorProjects} />
      </ScrollSectionClient>

      <ScrollSectionClient id="contact">
        <ContactSection />
      </ScrollSectionClient>

      <DockClient />

      <Footer />
    </>
  );
}
