"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Home,
  User,
  Briefcase,
  GraduationCap,
  Code,
  FileText,
  Settings,
  LogOut,
  X,
} from "lucide-react";

type Role = "ADMIN" | "GUEST";

interface MenuItem {
  icon: LucideIcon;
  label: string;
  href: string;
  roles: Role[];
}

interface SidebarProps {
  userRole: Role;
  onLogout?: () => void;
  isOpen: boolean;
  onClose: () => void;
}

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  index: number;
  isActive: boolean;
  isLogout?: boolean;
  onClick?: () => void;
  isMobile?: boolean;
}

export default function Sidebar({
  userRole,
  onLogout,
  isOpen,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();

  const menuItems: MenuItem[] = useMemo(
    () => [
      { icon: Home, label: "Dashboard", href: "/", roles: ["ADMIN", "GUEST"] },
      {
        icon: User,
        label: "Profile",
        href: "/profile",
        roles: ["ADMIN", "GUEST"],
      },
      {
        icon: FileText,
        label: "Hero Section",
        href: "/hero",
        roles: ["ADMIN"],
      },
      { icon: User, label: "About", href: "/about", roles: ["ADMIN"] },
      {
        icon: Briefcase,
        label: "Experience",
        href: "/experience",
        roles: ["ADMIN", "GUEST"],
      },
      {
        icon: GraduationCap,
        label: "Education",
        href: "/education",
        roles: ["ADMIN", "GUEST"],
      },
      {
        icon: Code,
        label: "Skills",
        href: "/skills",
        roles: ["ADMIN", "GUEST"],
      },
      {
        icon: Settings,
        label: "Settings",
        href: "/settings",
        roles: ["ADMIN"],
      },
    ],
    []
  );

  const filteredItems = useMemo(
    () => menuItems.filter((item) => item.roles.includes(userRole)),
    [menuItems, userRole]
  );

  return (
    <>
      <motion.aside
        initial={false}
        animate={{ x: 0 }}
        className="hidden md:flex fixed left-4 top-[20%] -translate-y-1/2 z-40"
        aria-label="Sidebar"
      >
        <motion.div
          className=" w-16 py-4 px-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 shadow-2xl flex flex-col gap-2"
          style={{ borderRadius: "2rem" }}
        >
          <nav className="flex flex-col gap-2" aria-label="Primary">
            {filteredItems.map((item, index) => (
              <SidebarItem
                key={item.href}
                {...item}
                index={index}
                isActive={pathname === item.href}
              />
            ))}
          </nav>

          <div className="dark:border-white/10">
            <SidebarItem
              icon={LogOut}
              label="Logout"
              href="#"
              index={filteredItems.length}
              isActive={false}
              isLogout
              onClick={onLogout}
            />
          </div>
        </motion.div>
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={onClose}
              aria-hidden="true"
            />

            {/* Mobile Sidebar Panel */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-white/10 shadow-2xl z-50 md:hidden"
              aria-label="Mobile Sidebar"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-white/10">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Menu
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close sidebar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Navigation */}
              <nav className="p-4 space-y-2" aria-label="Mobile Navigation">
                {filteredItems.map((item, index) => (
                  <SidebarItem
                    key={item.href}
                    {...item}
                    index={index}
                    isActive={pathname === item.href}
                    isMobile
                    onClick={onClose}
                  />
                ))}
              </nav>

              {/* Mobile Logout */}
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-white/10">
                <SidebarItem
                  icon={LogOut}
                  label="Logout"
                  href="#"
                  index={filteredItems.length}
                  isActive={false}
                  isLogout
                  isMobile
                  onClick={() => {
                    onLogout?.();
                    onClose();
                  }}
                />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function SidebarItem({
  icon: Icon,
  label,
  href,
  index,
  isActive,
  isLogout = false,
  onClick,
  isMobile = false,
}: SidebarItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Desktop Pill Icon Style
  if (!isMobile) {
    const pillColors = isLogout
      ? "text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20"
      : isActive
      ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10";

    const content = (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: index * 0.05,
          type: "spring",
          stiffness: 400,
          damping: 20,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={[
          "w-10 h-10 rounded-full flex items-center justify-center",
          "transition-all duration-300 cursor-pointer border",
          pillColors,
        ].join(" ")}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Icon className="w-6 h-5" />

        {/* Hover Tooltip */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: -10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -10, scale: 0.9 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="absolute left-full ml-3 px-3 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl text-sm font-medium whitespace-nowrap shadow-xl pointer-events-none"
              role="tooltip"
            >
              {label}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 dark:bg-white rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );

    return isLogout ? (
      <button
        type="button"
        onClick={onClick}
        className="w-full"
        aria-label={label}
      >
        {content}
      </button>
    ) : (
      <Link href={href} aria-label={label}>
        {content}
      </Link>
    );
  }

  // Mobile Full Width Style
  const mobileColors = isLogout
    ? "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10"
    : isActive
    ? "bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white"
    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5";

  const content = (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className={[
        "flex items-center gap-4 px-4 py-3 rounded-xl transition-all cursor-pointer",
        mobileColors,
      ].join(" ")}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      <span className="font-medium">{label}</span>
    </motion.div>
  );

  return isLogout ? (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left"
      aria-label={label}
    >
      {content}
    </button>
  ) : (
    <Link href={href} onClick={onClick} aria-label={label}>
      {content}
    </Link>
  );
}
