"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "../context/AuthContext";



const LoginModal = ({ isOpen, setIsModalOpen }) => {
  const router = useRouter();
  const { toast } = useToast()

  const { setIsLoggedIn } = useAuth();


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);



  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;

    if (!email) {
      hasError = true
    } else {
      hasError = false
    }
    if (!password) {
      setPasswordError(true);
      hasError = true;
    } else {
      setPasswordError(false);
    }

    if (!hasError) {
      try {
        const res = await axiosInstance.post('/login', { email, password });
        console.log("response : ", res.data);
        setIsLoggedIn(true)
        setIsModalOpen(false);
        router.push('/admin-dashboard');
      } catch (error) {
        const errorMessage = error?.response?.data?.message;
        const statusCode = error?.response?.status;

        if (statusCode === 401) {
          toast({
            title: "Invalid Credentials",
            description: "Please check your email or password.",
            variant: "destructive",
          });
        } else if (!error.response) {
          toast({
            title: "Server Error",
            description: "Something went wrong, the server is not responding.",
            variant: "destructive",
          });
        } else {
          // Generic fallback
          toast({
            title: "Login Failed",
            description: errorMessage || "An unexpected error occurred.",
            variant: "destructive",
          });
        }

        console.error("Login error:", error);
      }

    }
  };

  const onClose = () => {
    setIsModalOpen(false);
    setPasswordError(false)
    setPassword('')
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
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
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M6 18L18 6M6 6l12 12" />
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
                  className={`w-full px-3 py-2 border rounded-lg border-gray-300 focus:ring-blue-100 focus:outline-none focus:ring-1`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="your password sir.."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${passwordError ? "border-red-500" : "border-gray-300 focus:ring-blue-100"
                      }`}
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-600">Remember me</label>
                </div>
                <a href="#" className="text-sm text-blue-500 hover:underline">Forgot password?</a>
              </div>

              <button disabled={email === ''} type="submit" className={`w-full  text-white py-2 px-4 rounded-lg transition-colors ${password !== '' & email !== '' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-200'}`}>
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
                  <img src="/assets/img/googleIcon.png" alt="Google logo" className="w-5 h-5" />
                  Google
                </button>
                <button
                  type="button"
                  className="w-1/2 border rounded-lg py-2 px-4 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                >
                  <img src="/assets/img/appleIcon.png" alt="Apple logo" className="w-5 h-5" />
                  Apple
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginModal;
