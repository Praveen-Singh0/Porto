"use client";
import { useEffect, useState } from "react";
import LoginModal from "./LoginModal";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";


const Header = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isLoggedIn } = useAuth();
  const router = useRouter();

    
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isModalOpen]);

  const navItems = [
    { name: 'Home', current: true },
    { name: 'About', current: false },
    { name: 'Education', current: false },
    { name: 'Experience', current: false },
    { name: 'Projects', current: false },
    { name: 'Contact', current: false }
  ];

  console.log("isLoggedIn header", isLoggedIn )

  const HandleLogin = () => {
    if (isLoggedIn) {
      router.push("/admin-dashboard");
    } else {
      setIsModalOpen(true);
    }
  }



  return (
    <header className={`sticky p-1 transition-all duration-500 ease-in-out z-50 
      ${isVisible ? "top-0 bg-white" : "-top-28 bg-transparent"}`}>

      <nav className="border-gray-200 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between mx-auto max-w-screen-xl">
          <a href="/" className="flex items-center">
            <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
          </a>
          <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={`#${item.name.toLowerCase()}`}
                    className={`block py-2 pr-4 pl-3 rounded lg:bg-transparent lg:p-0 
            ${item.current ? "text-blue-700" : "text-gray-700 hover:text-blue-500"}`}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center lg:order-2">
            <button
              onClick={HandleLogin}
              className="text-gray-800 dark:text-white bg-gray-50 hover:bg-pink-300 focus:ring-3 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-yellow-300"
            >
              Log in
            </button>



            <div className="relative">
              <img className="w-10 h-10 rounded-full" src="/assets/img/avatar.jpg" alt="Avatar" />
              <span className="top-0 left-7 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
            </div>

            <button
              onClick={() => setOpen(!open)}
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none"
              aria-expanded={open}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
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

    </header>
  );
};

export default Header;
