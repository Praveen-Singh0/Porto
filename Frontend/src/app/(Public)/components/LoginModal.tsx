"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { authService } from "@/services/auth.service";
import { useToast } from "../../context/ToastContext";
import { useRouter } from "next/navigation";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignup: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSignup,
}) => {
  const router = useRouter();

  const { login, verify_Its_Me } = authService;
  const { showToast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const isFormValid = email && password;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    try {
      setLoading(true);

      await login({
        email,
        password,
      });

      showToast({
        message: "Login successfully 🎉",
        type: "success",
      });
      setEmail("");
      setPassword("");
      onClose();
      router.push("/admin-dashboard");
    } catch (error: any) {
      showToast({
        message: error.message || "Failed to login",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setEmail("");
    setPassword("");
    setShowPassword(false);
  };

  const neumorphicBase =
    "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900";
  const neumorphicShadow =
    "shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff] dark:shadow-[6px_6px_12px_#0a0a0a,-6px_-6px_12px_#2a2a2a]";
  const neumorphicHover =
    "hover:shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff] dark:hover:shadow-[inset_6px_6px_12px_#0a0a0a,inset_-6px_-6px_12px_#2a2a2a]";

  const inputClass = `w-full px-4 py-3 rounded-xl ${neumorphicBase}
    text-gray-800 dark:text-gray-100 placeholder:text-gray-500
    shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff]
    dark:shadow-[inset_6px_6px_12px_#0a0a0a,inset_-6px_-6px_12px_#2a2a2a]
    focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all`;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm flex justify-center items-center z-50"
          onClick={handleClose}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`max-w-[450px] w-full mx-4 ${neumorphicBase} rounded-3xl dark:shadow-[0px_0px_30px_#0a0a0a,-0px_-0px_30px_#2a2a2a] overflow-hidden relative`}
          >
            <button
              onClick={handleClose}
              className={`absolute top-4 right-4 p-2 rounded-full ${neumorphicBase} shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff] dark:shadow-[5px_5px_10px_#0a0a0a,-5px_-5px_10px_#2a2a2a] hover:shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff] dark:hover:shadow-[inset_5px_5px_10px_#0a0a0a,inset_-5px_-5px_10px_#2a2a2a] transition-all duration-300 z-10`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-700 dark:text-gray-300"
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

            <div className="p-8 md:p-10">
              <motion.div
                className="flex items-center justify-center gap-3 mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  Login
                </span>
              </motion.div>

              <motion.h2
                className="text-center text-xl font-semibold mb-6 text-gray-800 dark:text-gray-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Welcome Back
              </motion.h2>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="your email sir.."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="your password sir.."
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={inputClass}
                    />
                    <button
                      type="button"
                      className={`absolute top-1/2 right-3 transform -translate-y-1/2 p-2 rounded-lg ${neumorphicBase} shadow-[4px_4px_8px_#bebebe,-4px_-4px_8px_#ffffff] dark:shadow-[4px_4px_8px_#0a0a0a,-4px_-4px_8px_#2a2a2a] hover:shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff] dark:hover:shadow-[inset_4px_4px_8px_#0a0a0a,inset_-4px_-4px_8px_#2a2a2a] transition-all duration-300 text-gray-600 dark:text-gray-300`}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center justify-between"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="remember"
                      className="w-4 h-4 rounded text-blue-600 border-gray-300 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 cursor-pointer"
                    />
                    <label
                      htmlFor="remember"
                      className="text-sm text-gray-600 dark:text-gray-300 cursor-pointer select-none"
                    >
                      Remember me
                    </label>
                  </div>
                  <a
                    href="#"
                    className="text-sm text-blue-500 dark:text-blue-400 hover:underline font-medium"
                  >
                    Forgot password?
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <button
                    type="submit"
                    disabled={!isFormValid || loading}
                    className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                      isFormValid
                        ? "bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-[8px_8px_16px_#3b82f680,-8px_-8px_16px_#60a5fa80] hover:shadow-[inset_8px_8px_16px_#3b82f680,inset_-8px_-8px_16px_#60a5fa80] active:scale-95"
                        : `${neumorphicBase} text-gray-400 dark:text-gray-500 ${neumorphicShadow} cursor-not-allowed`
                    }`}
                  >
                    {loading ? "Signing in..." : "Sign in to your account"}
                  </button>
                </motion.div>

                <motion.div
                  className="relative my-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span
                      className={`px-3 ${neumorphicBase} text-gray-500 dark:text-gray-400 font-medium`}
                    >
                      or continue with
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  {["Google", "Apple"].map((provider) => (
                    <button
                      key={provider}
                      type="button"
                      onClick={() => console.log(`${provider} login`)}
                      className={`flex-1 py-3 px-4 rounded-xl ${neumorphicBase} ${neumorphicShadow} ${neumorphicHover} transition-all duration-300 flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300 font-medium`}
                    >
                      <img
                        src={`/assets/img/${provider.toLowerCase()}Icon.png`}
                        alt={provider}
                        className="w-5 h-5"
                      />
                      {provider}
                    </button>
                  ))}
                </motion.div>

                <motion.p
                  className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={onSignup}
                    className="text-blue-500 hover:underline font-medium"
                  >
                    Sign up
                  </button>
                </motion.p>
              </form>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
