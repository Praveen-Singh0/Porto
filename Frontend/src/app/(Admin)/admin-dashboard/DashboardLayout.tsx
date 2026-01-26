// components/DashboardLayout.tsx
"use client";
import { motion } from "framer-motion";
import { useState, useEffect, ReactNode, useCallback, memo } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { useAuth } from "@/app/context/AuthContext";

interface DashboardLayoutProps {
  children: ReactNode;
}

interface UserInfo {
  id: number;
  name: string;
  email: string;
  role: "ADMIN" | "GUEST";
  lastLoginAt: string | null;
}

const MemoizedNavbar = memo(Navbar);
const MemoizedSidebar = memo(Sidebar);

const DashboardLayout = memo(function DashboardLayout({
  children,
}: DashboardLayoutProps) {

    const { user, loading } = useAuth();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  const handleToggleSidebar = useCallback(() => {
    setIsSidebarOpen(true);
  }, []);

  const handleCloseSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

if(!user) return

  return (
    <div className="min-h-screen">
      {/* Background decoration */}
      <div className="fixed inset-0 bg-[url('https://images.freecreatives.com/wp-content/uploads/2016/04/Download-Abstract-Color-Background.jpg')] opacity-10 dark:opacity-20 pointer-events-none" />

      <div className="relative">
        <MemoizedSidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />

        <div className="flex-1">
          {/* Top Navbar with hamburger toggle */}
          <MemoizedNavbar user={user} onToggleSidebar={handleToggleSidebar} />

          {/* Page Content */}
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-6 md:pl-40`}
            // style={{ border: "solid red" }}
          >
            {children}
          </motion.main>
        </div>
      </div>
    </div>
  );
});

export default DashboardLayout;
