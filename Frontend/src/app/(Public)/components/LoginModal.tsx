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
  const { login } = authService;
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
      await login({ email, password });

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

  // 🔹 Lightweight animations
  const overlayAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.15 },
  };

  const modalAnimation = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 8 },
    transition: { duration: 0.2 },
  };

  const neumorphicBase =
    "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900";
  const neumorphicShadow =
    "shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff] dark:shadow-[6px_6px_12px_#0a0a0a,-6px_-6px_12px_#2a2a2a]";
  const neumorphicHover =
    "hover:shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff] dark:hover:shadow-[inset_6px_6px_12px_#0a0a0a,inset_-6px_-6px_12px_#2a2a2a]";

  const inputClass = `w-full px-4 py-3 rounded-xl ${neumorphicBase}
    text-gray-800 dark:text-gray-100 placeholder:text-gray-500
    shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_#ffffff]
    dark:shadow-[inset_6px_6px_12px_#0a0a0a,inset_-6px_-6px_#2a2a2a]
    focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          {...overlayAnimation}
          className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm flex justify-center items-center z-50"
          onClick={handleClose}
        >
          <motion.div
            {...modalAnimation}
            onClick={(e) => e.stopPropagation()}
            className={`max-w-[450px] w-full mx-4 ${neumorphicBase} rounded-3xl dark:shadow-[0px_0px_30px_#0a0a0a] overflow-hidden relative`}
          >
            {/* Close Button */}
            <motion.button
              onClick={handleClose}
              className={`absolute top-4 right-4 p-2 rounded-full ${neumorphicBase} shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff] dark:shadow-[5px_5px_10px_#0a0a0a,-5px_-5px_10px_#2a2a2a] transition-all duration-200 z-10`}
              whileHover={{ opacity: 0.8 }}
              whileTap={{ opacity: 0.6 }}
            >
              ✕
            </motion.button>

            <div className="p-8 md:p-10">
              <div className="flex items-center justify-center gap-3 mb-8">
                <span className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  Login
                </span>
              </div>

              <h2 className="text-center text-xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
                Welcome Back
              </h2>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
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
                </div>

                <div>
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
                      className={`absolute top-1/2 right-3 -translate-y-1/2 p-2 rounded-lg ${neumorphicBase} ${neumorphicShadow} transition-all duration-200 text-gray-600 dark:text-gray-300`}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!isFormValid || loading}
                  className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                    isFormValid
                      ? "bg-gradient-to-br from-blue-400 to-blue-600 text-white active:scale-95"
                      : `${neumorphicBase} text-gray-400 dark:text-gray-500 ${neumorphicShadow} cursor-not-allowed`
                  }`}
                >
                  {loading ? "Signing in..." : "Sign in to your account"}
                </button>

                {/* Divider */}
                <div className="relative my-6">
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
                </div>

                {/* Social Buttons */}
                <div className="flex gap-4">
                  {["Google", "Apple"].map((provider) => (
                    <button
                      key={provider}
                      type="button"
                      onClick={() => console.log(`${provider} login clicked`)}
                      className={`flex-1 py-3 px-4 rounded-xl ${neumorphicBase} ${neumorphicShadow} ${neumorphicHover} transition-all duration-200 flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300 font-medium`}
                    >
                      <img
                        src={`/assets/img/${provider.toLowerCase()}Icon.png`}
                        alt={provider}
                        className="w-5 h-5"
                      />
                      {provider}
                    </button>
                  ))}
                </div>

                <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={onSignup}
                    className="text-blue-500 hover:underline font-medium"
                  >
                    Sign up
                  </button>
                </p>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
