// components/DashboardLayout.tsx
"use client";
import { motion } from "framer-motion";
import { useState, ReactNode } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
interface DashboardLayoutProps {
  children: ReactNode;
  userRole?: "ADMIN" | "GUEST";
}

export default function DashboardLayout({
  children,
  userRole = "GUEST",
}: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logging out...");
    // Example: router.push('/login');
  };

  return (
    <div className="min-h-screen">
      {/* Background decoration */}

      <div className="fixed inset-0 bg-[url('https://images.freecreatives.com/wp-content/uploads/2016/04/Download-Abstract-Color-Background.jpg')] opacity-10 dark:opacity-20 pointer-events-none" />

      <Sidebar
        userRole={userRole}
        onLogout={handleLogout}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div
        className="
  relative border
  m-0 md:m-12
  rounded-[2rem]
"
      >
        {/* Main Content - No margin shift needed for pill sidebar */}
        <div className="flex-1">
          {/* Top Navbar with hamburger toggle */}
          <Navbar onToggleSidebar={() => setIsSidebarOpen(true)} />

          {/* Page Content */}
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-6 md:pl-28"
          >
            {children}
          </motion.main>
        </div>
      </div>
    </div>
  );
}
