"use client";
import { motion } from "framer-motion";
import { Bell, Search, Menu, LogOut } from "lucide-react";
import ThemeToggle from "@/app/utils/ThemeToggle";
import { memo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";

interface UserInfo {
  id: number;
  name: string;
  email: string;
  role: "ADMIN" | "GUEST";
  lastLoginAt: string | null;
}

interface NavbarProps {
  user: UserInfo | null;
  onToggleSidebar: () => void;
}

const Navbar = memo(function Navbar({ user, onToggleSidebar }: NavbarProps) {
  const router = useRouter();
  const { logout } = authService;

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="
      sm:ml-12
      ml-0
    sticky top-0 z-30
    backdrop-blur-xl
    rounded-none
  "
    >
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left side */}
        <div className="flex items-center gap-4">
          {/* Mobile Hamburger */}
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-white transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-6 h-6" />
          </button>
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/assets/img/logo001.png"
              className="mr-2 h-9 sm:mr-3 rounded-full bg-[#4840e6] lg:h-9"
              alt="Logo"
              width={36}
              height={36}
            />
          </Link>

          <h1 className="hidden sm:block  text-2xl md:text-4xl tracking-tight text-gray-900 dark:text-gray-100">
            <span className="font-light">Good morning!</span>{" "}
            <span className="font-semibold">{user?.name}</span>
          </h1>

          {/* Search bar */}
          <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/20">
            <Search className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 w-64"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button
            className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-white transition-colors"
            type="button"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-600 to-pink-600 flex items-center justify-center text-white font-semibold">
            AD
          </div>

          <button
            onClick={handleLogout}
            className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-gray-700 dark:text-white transition-colors group"
            type="button"
            aria-label="Logout"
          >
            <LogOut className="w-5 h-5 group-hover:text-red-500 transition-colors" />
          </button>
        </div>
      </div>
    </motion.nav>
  );
});

export default Navbar;
