"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "../../utils/ThemeToggle";
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
      setAuthOpen(true);
    }
  };

  const navItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "#about" },
    { name: "Github", link: "/github" },
    { name: "Payment", link: "#payment" },
    { name: "Chat", link: "#chat" },
    { name: "Projects", link: "#projects" },
    { name: "Contact", link: "#contact" },
  ];

  return (
    <header className="p-1 transition-all duration-500 ease-in-out z-50 top-0 bg-transparent">
      <div>
        <nav className="border-gray-200 px-3 md:px-6 lg:px-6 py-2.5">
          <div className="flex flex-wrap justify-between mx-auto max-w-screen-xl items-center">

            {/* LOGO */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <Image
                src="/assets/img/logo001.png"
                className="mr-2 h-9 sm:mr-3 rounded-full bg-[#4840e6] lg:h-9"
                alt="Logo"
                width={36}
                height={36}
              />
              <span className="hidden sm:inline self-center text-base sm:text-lg md:text-xl font-semibold whitespace-nowrap dark:text-white">
                Praveenio.space
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden justify-center lg:flex lg:flex-1 lg:order-1 lg:mx-4 lg:overflow-x-auto no-scrollbar">
              <ul className="flex font-medium lg:space-x-8 whitespace-nowrap">
                {navItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.link}
                      className="block py-2 px-3 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center lg:order-2 gap-2 sm:gap-3 flex-shrink-0">

              <ThemeToggle />

              <Button
                variant="ghost"
                onClick={handleLoginClick}
                className="text-gray-800 dark:text-white bg-pink-300 dark:bg-gray-600 hover:bg-pink-400 dark:hover:bg-pink-600 font-medium rounded-lg text-xs sm:text-sm px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2"
              >
                Log in
              </Button>

              {/* Avatar */}
              <div className="relative">
                <Image
                  className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border-2 border-gray-200 dark:border-gray-700"
                  src="/assets/img/avatar.jpg"
                  alt="Avatar"
                  width={50}
                  height={50}
                />
                <span className="top-0 left-6 absolute w-3 h-3 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                onClick={() => setOpen(!open)}
                className="lg:hidden p-1.5"
              >
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

          {/* MOBILE MENU */}
          {open && (
            <div className="lg:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <ul className="p-4 space-y-2">
                {navItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.link}
                      onClick={() => setOpen(false)}
                      className="block py-3 px-4 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </nav>

        {authOpen && (
          <AuthModalController
            isOpen={authOpen}
            onClose={() => setAuthOpen(false)}
          />
        )}
      </div>
    </header>
  );
};

export default Header;