"use client";
import { useEffect, useState } from "react";
import LoginModal from "./LoginModal";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import ThemeToggle from "../utils/ThemeToggle";
import Button from "./ui/Button";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  const navItems = [
    { name: "Home", current: true },
    { name: "About", current: false },
    { name: "Education", current: false },
    { name: "Skills", current: false },
    { name: "Projects", current: false },
    { name: "Experience", current: false },
    { name: "Contact", current: false },
  ];

  const HandleLogin = () => {
    if (isLoggedIn) {
      router.push("/admin-dashboard");
    } else {
      setIsModalOpen(true);
    }
  };

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
        <nav className="border-gray-200 lg:px-6 py-2.5">
          {/* Top row: Logo + Desktop Menu + Right Actions + Mobile Hamburger */}
          <div className="flex flex-wrap justify-between mx-auto max-w-screen-xl items-center">
            {/* Logo */}
            <a href="#" className="flex items-center">
              <Image
                src="https://flowbite.com/docs/images/logo.svg"
                className="mr-3 h-6 sm:h-9"
                alt="Logo"
                width={36}
                height={36}
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                Flowbite
              </span>
            </a>

            {/* Desktop Menu - Always visible on lg+ */}
            <div className="hidden lg:flex lg:w-auto lg:order-1">
              <ul className="flex font-medium lg:space-x-8 lg:mt-0">
                {navItems.map((item, index) => (
                  <li key={index}>
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
            <div className="flex items-center lg:order-2 gap-3">
              <ThemeToggle />
              <Button
                variant="ghost"
                onClick={HandleLogin}
                className="text-gray-800 dark:text-white bg-pink-300 dark:bg-gray-600 hover:bg-pink-400 dark:hover:bg-pink-600 focus:ring-3 focus:ring-gray-300 dark:focus:ring-gray-600 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 transition-colors duration-200"
              >
                Log in
              </Button>

              <div className="relative">
                <img
                  className="w-10 h-10 rounded-full border-2 border-gray-200 dark:border-gray-700"
                  src="/assets/img/avatar.jpg"
                  alt="Avatar"
                />
                <span className="top-0 left-7 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
              </div>

              <Button
                variant="ghost"
                onClick={() => setOpen(!open)}
                className="lg:hidden"
                aria-expanded={open}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-6 h-6"
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

          {/* MOBILE MENU - Animated with Framer Motion (lg:hidden only) */}
          <motion.div
            className="lg:hidden bg-white dark:bg-gray-800 border-t border-gray-200 overflow-hidden"
            initial="hidden"
            animate={open ? "visible" : "hidden"}
            variants={menuVariants}
          >
            <ul className="p-4 space-y-2">
              {navItems.map((item, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  className="w-full"
                >
                  <a
                    href={`#${item.name.toLowerCase()}`}
                    onClick={() => setOpen(false)}
                    className={`block w-full py-3 px-4 rounded-lg transition-colors duration-200 font-medium
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

        <LoginModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </motion.div>
    </header>
  );
};

export default Header;
