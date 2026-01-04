"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ThemeToggle from "../utils/ThemeToggle";
import Button from "./ui/Button";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import AuthModalController from "./ui/AuthModalController";

const Header = () => {
  const router = useRouter();
  const { verify_Its_Me } = authService;

  const [open, setOpen] = useState(false);

  const [authOpen, setAuthOpen] = useState(false);

  const handleLoginClick = async () => {
    try {
      await verify_Its_Me();
      router.push("/admin-dashboard");
    } catch {
            router.push("/admin-dashboard");

      setAuthOpen(true);
    }
  };

  const navItems = [
    { name: "Home", current: true },
    { name: "About", current: false },
    { name: "Experience", current: false },
    { name: "Education", current: false },
    { name: "Skills", current: false },
    { name: "Projects", current: false },
    { name: "Contact", current: false },
  ];

  const menuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.2 },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.2 },
    },
  };

  return (
    <header className="p-1 transition-all duration-500 ease-in-out z-50 top-0 bg-transparent">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <nav className="border-gray-200 px-3 md:px-6 lg:px-6 py-2.5">
          {/* Top row: Logo + Desktop Menu + Right Actions */}
          <div className="flex flex-wrap justify-between mx-auto max-w-screen-xl items-center">
            {/* Logo - Responsive sizing */}
            <a href="#" className="flex items-center flex-shrink-0">
              <Image
                src="https://flowbite.com/docs/images/logo.svg"
                className="mr-2 h-5 sm:mr-3 sm:h-7 md:h-8 lg:h-9"
                alt="Logo"
                width={36}
                height={36}
              />
              <span className="self-center text-base sm:text-lg md:text-xl font-semibold whitespace-nowrap dark:text-white">
                Flowbite
              </span>
            </a>

            {/* Desktop Menu - Scrollable with hidden scrollbar on lg+ */}
            <div className="hidden justify-center lg:flex lg:flex-1 lg:order-1 lg:mx-4 lg:overflow-x-auto no-scrollbar">
              <ul className="flex font-medium lg:space-x-8 lg:mt-0 whitespace-nowrap">
                {navItems.map((item, index) => (
                  <li key={index} className="flex-shrink-0">
                    <a
                      href={`#${item.name.toLowerCase()}`}
                      className={`block py-2 px-3 rounded transition-colors duration-200 lg:bg-transparent
                        ${
                          item.current
                            ? "text-blue-700 dark:text-blue-400"
                            : "text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                        }`}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Actions - Responsive spacing and sizing */}
            <div className="flex items-center lg:order-2 gap-2 sm:gap-3 flex-shrink-0">
              <ThemeToggle />
              <Button
                variant="ghost"
                onClick={handleLoginClick}
                className="text-gray-800 dark:text-white bg-pink-300 dark:bg-gray-600 hover:bg-pink-400 dark:hover:bg-pink-600 focus:ring-3 focus:ring-gray-300 dark:focus:ring-gray-600 font-medium rounded-lg text-xs sm:text-sm px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 lg:py-2.5 transition-colors duration-200"
              >
                Log in
              </Button>

              {/* Avatar - Responsive sizing */}
              <div className="relative">
                <img
                  className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border-2 border-gray-200 dark:border-gray-700"
                  src="/assets/img/avatar.jpg"
                  alt="Avatar"
                />
                <span className="top-0 left-5 sm:left-6 md:left-7 absolute w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
              </div>

              {/* Mobile/Tablet Hamburger - Visible below lg (1024px) */}
              <Button
                variant="ghost"
                onClick={() => setOpen(!open)}
                className="lg:hidden p-1.5"
                aria-expanded={open}
                aria-label="Toggle menu"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5h14a1 1 0 010 2H3a1 1 0 110-2zm0 5h14a1 1 0 010 2H3a1 1 0 110-2zm0 5h14a1 1 0 010 2H3a1 1 0 110-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            </div>
          </div>

          {/* MOBILE/TABLET MENU - Visible below lg (1024px) */}
          <motion.div
            className="lg:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 overflow-hidden"
            initial="hidden"
            animate={open ? "visible" : "hidden"}
            variants={menuVariants}
          >
            <ul className="p-3 sm:p-4 space-y-1.5 sm:space-y-2">
              {navItems.map((item, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  className="w-full"
                >
                  <a
                    href={`#${item.name.toLowerCase()}`}
                    onClick={() => setOpen(false)}
                    className={`block w-full py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg transition-colors duration-200 font-medium text-sm sm:text-base
                      ${
                        item.current
                          ? "text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                          : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                  >
                    {item.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </nav>

        {authOpen && (
          <AuthModalController
            isOpen={authOpen}
            onClose={() => setAuthOpen(false)}
          />
        )}
      </motion.div>
    </header>
  );
};

export default Header;
