"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState, memo, useCallback, useEffect } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Home,
  User,
  Briefcase,
  GraduationCap,
  Code,
  Settings,
  X,
  Plane,
  Github,
  Bot,
  CreditCard,
  MessageCircle,
  NotebookPen
} from "lucide-react";

type Role = "ADMIN" | "GUEST";

interface MenuItem {
  icon: LucideIcon;
  label: string;
  href: string;
  roles: Role[];
  color?: string;
  category: "main" | "service";
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  index: number;
  isActive: boolean;
  onClick?: () => void;
  isMobile?: boolean;
  color?: string;
  category?: "main" | "service";
}

const MENU_ITEMS: MenuItem[] = [
  {
    icon: Home,
    label: "Dashboard",
    href: "/admin-dashboard",
    roles: ["ADMIN", "GUEST"],
    category: "main",
  },
  {
    icon: User,
    label: "About",
    href: "/admin-dashboard/about",
    roles: ["ADMIN"],
    category: "main",
  },
  {
    icon: Briefcase,
    label: "Experience",
    href: "/admin-dashboard/experience",
    roles: ["ADMIN", "GUEST"],
    category: "main",
  },
  {
    icon: GraduationCap,
    label: "Education",
    href: "/admin-dashboard/education",
    roles: ["ADMIN", "GUEST"],
    category: "main",
  },
  {
    icon: Code,
    label: "Skills",
    href: "/admin-dashboard/skills",
    roles: ["ADMIN", "GUEST"],
    category: "main",
  },
  {
    icon: NotebookPen,
    label: "Projects",
    href: "/admin-dashboard/Projects",
    roles: ["ADMIN"],
    category: "main",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/admin-dashboard/settings",
    roles: ["ADMIN"],
    category: "main",
  },
  {
    icon: Plane,
    label: "Flight Booking",
    href: "/admin-dashboard/services/flight-booking",
    roles: ["ADMIN"],
    color: "#1E40AF",
    category: "service",
  },
  {
    icon: Github,
    label: "GitHub",
    href: "/admin-dashboard/services/github",
    roles: ["ADMIN"],
    color: "#24292E",
    category: "service",
  },
  {
    icon: Bot,
    label: "OpenAI",
    href: "/admin-dashboard/services/openai",
    roles: ["ADMIN"],
    color: "#10A37F",
    category: "service",
  },
  {
    icon: MessageCircle,
    label: "Chat",
    href: "/admin-dashboard/services/chat",
    roles: ["ADMIN"],
    color: "#d84840ff",
    category: "service",
  },
  {
    icon: CreditCard,
    label: "Payment",
    href: "/admin-dashboard/services/payment",
    roles: ["ADMIN"],
    color: "#635BFF",
    category: "service",
  },
];

const Sidebar = memo(function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const filteredMainItems = useMemo(
    () => MENU_ITEMS.filter((item) => item.category === "main"),
    []
  );

  const filteredServiceItems = useMemo(
    () => MENU_ITEMS.filter((item) => item.category === "service"),
    []
  );

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <>
      {/* Desktop Unified Sidebar - Scrollable Container */}
      <motion.aside
        initial={false}
        animate={{ x: 0 }}
        className="hidden md:flex top-10 m-14 fixed z-40 max-h-[calc(100vh)]"
        aria-label="Main Sidebar"
      >
        <div className="flex flex-col rounded-full gap-4  scrollbar-thin ">
          <motion.div
            className="py-5 px-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 shadow-2xl "
            style={{ borderRadius: "2rem" }}
          >
            <nav className="flex flex-col gap-2" aria-label="Primary">
              {filteredMainItems.map((item, index) => (
                <SidebarItem
                  key={item.href}
                  icon={item.icon}
                  label={item.label}
                  href={item.href}
                  index={index}
                  isActive={pathname === item.href}
                  category={item.category}
                  color={item.color}
                />
              ))}
            </nav>
          </motion.div>

          {/* Services Sidebar - Directly Below */}
          {filteredServiceItems.length > 0 && (
            <motion.div
              className="w-16 py-4 px-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 shadow-2xl flex flex-col gap-2"
              style={{ borderRadius: "2rem" }}
            >
              <nav className="flex flex-col gap-2" aria-label="Services">
                {filteredServiceItems.map((item, index) => (
                  <SidebarItem
                    key={item.href}
                    icon={item.icon}
                    label={item.label}
                    href={item.href}
                    index={index}
                    isActive={pathname === item.href}
                    category={item.category}
                    color={item.color}
                  />
                ))}
              </nav>
            </motion.div>
          )}
        </div>
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={handleClose}
              aria-hidden="true"
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-white/10 shadow-2xl z-50 md:hidden overflow-y-auto"
              aria-label="Mobile Sidebar"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-white/10">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Menu
                </h2>
                <button
                  onClick={handleClose}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                  aria-label="Close sidebar"
                  type="button"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="p-4 space-y-2" aria-label="Mobile Navigation">
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-4">
                    Portfolio
                  </h3>
                  {filteredMainItems.map((item, index) => (
                    <SidebarItem
                      key={item.href}
                      icon={item.icon}
                      label={item.label}
                      href={item.href}
                      index={index}
                      isActive={pathname === item.href}
                      isMobile
                      onClick={handleClose}
                      category={item.category}
                      color={item.color}
                    />
                  ))}
                </div>

                {filteredServiceItems.length > 0 && (
                  <div className="border-t border-gray-200 dark:border-white/10 pt-4">
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-4">
                      Services
                    </h3>
                    {filteredServiceItems.map((item, index) => (
                      <SidebarItem
                        key={item.href}
                        icon={item.icon}
                        label={item.label}
                        href={item.href}
                        index={index + filteredMainItems.length}
                        isActive={pathname === item.href}
                        isMobile
                        onClick={handleClose}
                        category={item.category}
                        color={item.color}
                      />
                    ))}
                  </div>
                )}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
});

const SidebarItem = memo(
  function SidebarItem({
    icon: Icon,
    label,
    href,
    index,
    isActive,
    onClick,
    isMobile = false,
    color,
    category = "main",
  }: SidebarItemProps) {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = useCallback(() => setIsHovered(true), []);
    const handleMouseLeave = useCallback(() => setIsHovered(false), []);

    if (!isMobile) {
      const isServiceItem = category === "service";

      const pillColors =
        isActive && !isServiceItem
          ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
          : !isServiceItem
          ? "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10"
          : isActive
          ? "text-white shadow-lg"
          : "text-gray-700 dark:text-gray-300 hover:text-white border-gray-200 dark:border-gray-600 hover:border-transparent";

      const backgroundStyle =
        isServiceItem && color
          ? {
              backgroundColor: isActive || isHovered ? color : "transparent",
            }
          : undefined;

      return (
        <Link href={href} aria-label={label} onClick={onClick}>
          <motion.div
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: index * 0.05,
              type: "spring",
              stiffness: 400,
              damping: 20,
            }}
            whileHover={{ scale: 1 }}
            className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border ${pillColors}`}
            style={backgroundStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Icon className="w-6 h-5" />

            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, x: -10, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -10, scale: 0.9 }}
                  transition={{ type: "spring", damping: 20, stiffness: 300 }}
                  className="absolute left-full ml-3 px-3 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl text-sm font-medium whitespace-nowrap shadow-xl pointer-events-none z-50"
                  role="tooltip"
                >
                  {label}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 dark:bg-white rotate-45" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </Link>
      );
    }

    const mobileColors = isActive
      ? "bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white"
      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5";

    return (
      <Link href={href} onClick={onClick} aria-label={label}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${mobileColors}`}
        >
          <Icon className="w-5 h-5 flex-shrink-0" />
          <span className="font-medium">{label}</span>
        </motion.div>
      </Link>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.href === nextProps.href &&
      prevProps.isActive === nextProps.isActive &&
      prevProps.isMobile === nextProps.isMobile &&
      prevProps.index === nextProps.index
    );
  }
);

export default Sidebar;
