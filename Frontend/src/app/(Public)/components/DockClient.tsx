"use client";
import Dock from "./Dock";
import { useScrollPosition } from "../../utils/useScrollPosition";
import {
  HiHome,
  HiUser,
  HiBriefcase,
  HiAcademicCap,
  HiCode,
  HiFolder,
  HiMail,
} from "react-icons/hi";
import ThemeToggle from "@/app/utils/ThemeToggle";

export default function DockClient() {
  const { isAtTop } = useScrollPosition();
  const showDock = !isAtTop;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 80;
    const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const items = [
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
    { icon: <ThemeToggle />, label: "Theme", onClick: () => {} },
  ];

  if (!showDock) return null;

  return (
    <Dock
      items={items}
      baseItemSize={50}
      panelHeight={68}
      magnification={70}
      distance={180}
    />
  );
}
