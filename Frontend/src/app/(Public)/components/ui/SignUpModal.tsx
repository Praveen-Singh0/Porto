"use client";
import React, { useState } from "react";
import { Eye, EyeOff, Github } from "lucide-react";
import { useToast } from "@/app/context/ToastContext";
import { authService } from "@/services/auth.service";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({
  isOpen,
  onClose,
  onLogin,
}) => {
  const { signup } = authService;
  const { showToast } = useToast();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const isValid = form.name && form.email && form.password;

  const onChange =
    (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((p) => ({ ...p, [key]: e.target.value }));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid) return;

    try {
      setLoading(true);
      await signup({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      showToast({
        message: "Account created successfully 🎉",
        type: "success",
      });

      setForm({ name: "", email: "", password: "" });
      onClose();
    } catch (err: any) {
      showToast({
        message: err.message || "Signup failed",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const neumorphicBase =
    "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900";
  const neumorphicShadow =
    "shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff] dark:shadow-[6px_6px_12px_#0a0a0a,-6px_-6px_12px_#2a2a2a]";
  const neumorphicHover =
    "hover:shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff] dark:hover:shadow-[inset_6px_6px_12px_#0a0a0a,inset_-6px_-6px_12px_#2a2a2a]";

  const inputClass = `w-full px-4 py-3 rounded-xl
    ${neumorphicBase}
    text-gray-800 dark:text-gray-100
    placeholder:text-gray-500 dark:placeholder:text-gray-500
    shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff]
    dark:shadow-[inset_6px_6px_12px_#0a0a0a,inset_-6px_-6px_12px_#2a2a2a]
    focus:outline-none focus:ring-2 focus:ring-blue-400/50
    transition-all duration-300`;

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={onClose}
    >
      {/* ONLY ONE POPUP ANIMATION */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`max-w-[450px] w-full mx-4 ${neumorphicBase}
          rounded-3xl shadow-[0px_0px_0px_#bebebe,-0px_-0px_30px_#ffffff]
          dark:shadow-[0px_0px_30px_#0a0a0a,-0px_-0px_30px_#2a2a2a]
          overflow-hidden relative animate-popup`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full ${neumorphicBase}
            shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff]
            dark:shadow-[5px_5px_10px_#0a0a0a,-5px_-5px_10px_#2a2a2a]
            hover:shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff]
            dark:hover:shadow-[inset_5px_5px_10px_#0a0a0a,inset_-5px_-5px_10px_#2a2a2a]
            transition-all duration-300 z-10`}
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

        {/* Content */}
        <div className="p-8 md:p-10">
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              Sign up
            </span>
          </div>

          <h2 className="text-center text-xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
            Create your account
          </h2>

          <form className="space-y-5" onSubmit={onSubmit}>
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
                Name
              </label>
              <input
                type="text"
                placeholder="your name sir.."
                value={form.name}
                onChange={onChange("name")}
                className={inputClass}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
                Email
              </label>
              <input
                type="email"
                placeholder="your email sir.."
                value={form.email}
                onChange={onChange("email")}
                className={inputClass}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="your password sir.."
                  value={form.password}
                  onChange={onChange("password")}
                  className={inputClass}
                />
                <button
                  type="button"
                  className={`absolute top-1/2 right-3 -translate-y-1/2 p-2 rounded-lg
                    ${neumorphicBase}
                    shadow-[4px_4px_8px_#bebebe,-4px_-4px_8px_#ffffff]
                    dark:shadow-[4px_4px_8px_#0a0a0a,-4px_-4px_8px_#2a2a2a]
                    hover:shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff]
                    dark:hover:shadow-[inset_4px_4px_8px_#0a0a0a,inset_-4px_-4px_8px_#2a2a2a]
                    transition-all duration-300 text-gray-600 dark:text-gray-300`}
                  onClick={() => setShowPassword((p) => !p)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                disabled={!isValid || loading}
                className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                  isValid && !loading
                    ? "bg-gradient-to-br from-blue-400 to-blue-600 text-white"
                    : "bg-gray-300 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                }`}
              >
                {loading ? "Creating account..." : "Create account"}
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span
                  className={`px-3 ${neumorphicBase} text-gray-500 dark:text-gray-400 font-medium`}
                >
                  or continue with
                </span>
              </div>
            </div>

            {/* Google + GitHub */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => console.log("Google signup")}
                className={`flex-1 py-3 px-4 rounded-xl ${neumorphicBase} ${neumorphicShadow} ${neumorphicHover}
                  flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300 font-medium`}
              >
                <img
                  src="/assets/img/googleIcon.png"
                  alt="Google"
                  className="w-5 h-5"
                />
                Google
              </button>

              <button
                type="button"
                onClick={() => console.log("GitHub signup")}
                className={`flex-1 py-3 px-4 rounded-xl ${neumorphicBase} ${neumorphicShadow} ${neumorphicHover}
                  flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300 font-medium`}
              >
                <Github size={18} />
                GitHub
              </button>
            </div>

            {/* Login */}
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
              Already have an account?{" "}
              <button
                type="button"
                onClick={onLogin}
                className="text-blue-500 dark:text-blue-400 hover:underline font-medium"
              >
                Login
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;