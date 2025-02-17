"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
// import { useRouter } from 'next/router';

const Header = () => {
  // const router = useRouter();

  const [isVisible, setIsVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navItems = [
    { name: 'Home', current: true },
    { name: 'About', current: false },
    { name: 'Education', current: false },
    { name: 'Experience', current: false },
    { name: 'Projects', current: false },
    { name: 'Contact', current: false }
  ];


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email, 'Password:', password);

    // setIsModalOpen(false)
    setEmail("")
    setPassword("")
  };


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
  

  const onClose = () => {
    setIsModalOpen(false)
  }


  return (
    <header className={`sticky p-1 transition-all duration-500 ease-in-out z-50 
  ${isVisible ? "top-0 bg-white" : "-top-28 bg-transparent"}`} >

      <nav className="border-gray-200 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between  mx-auto max-w-screen-xl">
          <a href="https://flowbite.com" className="flex items-center">
            <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
          </a>
          <div className="flex items-center lg:order-2">

            <button onClick={() => setIsModalOpen(true)} className="text-gray-800 dark:text-white bg-gray-50 hover:bg-pink-300 focus:ring-3 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-yellow-300">Log in</button>

            {isModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 20
                  }}
                  className="max-w-[950px] bg-white rounded-lg shadow-lg overflow-hidden relative"

                >
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>

                  <div className="flex flex-col md:flex-row">
                    <div className="hidden md:block w-full md:w-[1000px]">
                      <Image
                        src="/assets/img/loginIllustration.jpg"
                        alt="Login illustration"
                        width={500}
                        height={500}
                        priority
                      />
                    </div>

                    <div className="w-full p-6 md:p-8">
                      <div className="flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                        </div>
                        <span className="text-xl font-semibold">Flowbite</span>
                      </div>

                      <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                          <label className="block text-sm font-medium mb-2">Email</label>
                          <input
                            type="email"
                            placeholder="your email sir.."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Password</label>
                          <input
                            type="password"
                            value={password}
                            placeholder="your password sir.."
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="remember"
                              className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                            />
                            <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                              Remember me
                            </label>
                          </div>
                          <a href="#" className="text-sm text-blue-500 hover:underline">
                            Forgot password?
                          </a>
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                          Sign in to your account
                        </button>

                        <div className="relative my-6">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                          </div>
                          <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">or</span>
                          </div>
                        </div>

                        <div className="flex">
                          <button
                            type="button"
                            className="w-1/2 mr-2 border rounded-lg py-2 px-4 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                          >
                            <img
                              src="/assets/img/googleIcon.png"
                              alt="Google logo"
                              className="w-5 h-5"
                            />
                            Google
                          </button>
                          <button
                            type="button"
                            className="w-1/2 border rounded-lg py-2 px-4 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                          >
                            <img
                              src="/assets/img/appleIcon.png"
                              alt="Apple logo"
                              className="w-5 h-5"
                            />
                            Apple
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
            <div className="relative">
              <img className="w-10 h-10 rounded-full" src="/assets/img/avatar.jpg" alt="" />
              <span className="top-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
            </div>
            <button onClick={() => setOpen(!open)} data-collapse-toggle="mobile-menu-2" type="button" className={`inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600`} aria-controls="mobile-menu-2" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
              <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
          </div>

          <div
            className={`w-full lg:w-auto ${open
                ? 'max-h-screen opacity-100 visible'
                : 'max-h-0 opacity-0 invisible lg:visible lg:opacity-100'
              } transition-all duration-700 ease-in-out`}
          >
            <ul className="flex flex-col mt-2 font-medium lg:flex-row lg:space-x-8">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href="#"
                    className={`block py-2 pr-4 pl-3 rounded ${item.current
                        ? 'text-white bg-primary-700 lg:bg-transparent lg:text-primary-700'
                        : 'text-gray-700 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700'
                      } lg:p-0 dark:text-gray-400 lg:dark:hover:text-white transition-colors duration-200`}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>



        </div>
      </nav>
    </header>
  )
}

export default Header;