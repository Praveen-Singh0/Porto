"use client";
import { useEffect, useState } from "react";
import LoginModal from "./LoginModal";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";

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

  console.log("isLoggedIn header", isLoggedIn);

  const HandleLogin = () => {
    if (isLoggedIn) {
      router.push("/admin-dashboard");
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <header
      className={` p-1 transition-all duration-500 ease-in-out z-50 top-0 bg-transparent`}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <nav className="border-gray-200 lg:px-6 py-2.5 ">
          <div className="flex flex-wrap justify-between mx-auto max-w-screen-xl">
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
            <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1">
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                {navItems.map((item, index) => (
                  <li key={index}>
                    <a
                      href={`#${item.name.toLowerCase()}`}
                      className={`block py-2 pr-4 pl-3 rounded lg:bg-transparent lg:p-0 transition-colors duration-200
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
              {/* Theme Toggle */}
              <ThemeToggle />

              <button
                onClick={HandleLogin}
                className="text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-800 hover:bg-pink-300 dark:hover:bg-pink-600 focus:ring-3 focus:ring-gray-300 dark:focus:ring-gray-600 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 transition-colors duration-200"
              >
                Log in
              </button>

              <div className="relative">
                <img
                  className="w-10 h-10 rounded-full border-2 border-gray-200 dark:border-gray-700"
                  src="/assets/img/avatar.jpg"
                  alt="Avatar"
                />
                <span className="top-0 left-7 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
              </div>

              <button
                onClick={() => setOpen(!open)}
                className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 dark:text-gray-400 rounded-lg lg:hidden hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors duration-200"
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
              </button>
            </div>
          </div>
        </nav>

        <LoginModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </motion.div>
    </header>
  );
};

export default Header;
