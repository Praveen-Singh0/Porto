"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "../context/AuthContext";
import Button from "./ui/Button";

interface LoginModalProps {
  isOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, setIsModalOpen }) => {
  const router = useRouter();
  const { toast } = useToast();
  const { setIsLoggedIn } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let hasError = false;

    if (!email) hasError = true;
    if (!password) {
      setPasswordError(true);
      hasError = true;
    } else {
      setPasswordError(false);
    }
  };

  const onClose = () => {
    setIsModalOpen(false);
    setPasswordError(false);
    setPassword("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex justify-center items-center z-50">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
        className="max-w-[950px] bg-white dark:bg-gray-900 text-black dark:text-gray-100 rounded-lg shadow-lg overflow-hidden relative"
      >
        {/* CLOSE BUTTON */}
        <Button
          variant="ghost"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 "
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
        </Button>

        <div className="flex flex-col md:flex-row">
          {/* IMAGE PANEL */}
          <div className="hidden md:block w-full md:w-[1000px]">
            <Image
              src="/assets/img/loginIllustration.jpg"
              alt="Login illustration"
              width={500}
              height={500}
              priority
            />
          </div>

          {/* RIGHT PANEL */}
          <div className="w-full p-6 md:p-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              </div>
              <span className="text-xl font-semibold dark:text-gray-100">
                Flowbite
              </span>
            </div>

            {/* FORM */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* EMAIL */}
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your email sir.."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg 
                             border-gray-300 dark:border-gray-600
                             bg-white dark:bg-gray-800
                             text-black dark:text-gray-100
                             focus:ring-blue-100 dark:focus:ring-blue-500
                             focus:outline-none focus:ring-1"
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="your password sir.."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg 
                      bg-white dark:bg-gray-800 
                      text-black dark:text-gray-100 
                      focus:outline-none focus:ring-2 
                      ${
                        passwordError
                          ? "border-red-500 focus:ring-red-300"
                          : "border-gray-300 dark:border-gray-600 focus:ring-blue-100 dark:focus:ring-blue-500"
                      }`}
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    className="absolute top-1/2 right-1 transform -translate-y-1/2 "
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </Button>
                </div>
              </div>

              {/* REMEMBER + FORGOT */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 rounded border-gray-300 dark:bg-gray-800 dark:border-gray-600"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 text-sm text-gray-600 dark:text-gray-300"
                  >
                    Remember me
                  </label>
                </div>

                <a
                  href="#"
                  className="text-sm text-blue-500 dark:text-blue-400 hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              {/* BUTTON */}
              <Button
                variant="primary"
                disabled={!email}
                type="submit"
                className={`w-full text-white py-2 px-4 rounded-lg transition-colors
                ${
                  password && email
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-blue-200 dark:bg-gray-700"
                }`}
              >
                Sign in to your account
              </Button>

              {/* DIVIDER */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-300">
                    or
                  </span>
                </div>
              </div>

              {/* SOCIAL BUTTONS */}
              <div className="flex">
                <Button
                  onClick={() => {
                    console.log("Google login");
                  }}
                  variant="outline"
                  className="w-1/2 mr-2 py-2 px-4 flex items-center justify-center gap-2 "
                >
                  <img
                    src="/assets/img/googleIcon.png"
                    alt="Google logo"
                    className="w-5 h-5"
                  />
                  Google
                </Button>

                <Button
                  onClick={() => {
                    console.log("Apple login");
                  }}
                  variant="outline"
                  className="w-1/2 py-2 px-4 flex items-center justify-center gap-2 "
                >
                  <img
                    src="/assets/img/appleIcon.png"
                    alt="Apple logo"
                    className="w-5 h-5"
                  />
                  Apple
                </Button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginModal;
