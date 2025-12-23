"use client";

import { FC, ReactNode } from "react";
import clsx from "clsx";

export interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

const Button: FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  onClick,
  className,
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-lg transition-all active:scale-95 duration-200 focus:outline-none";

  const variantStyles = {
    primary: "bg-pink-600 text-white hover:bg-pink-700",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-white",
    outline:
      "border border-pink-600 text-pink-600 hover:bg-pink-600 hover:dark:text-white hover:text-white dark:border-pink-400 dark:text-pink-400",
    danger: "bg-red-600 text-white hover:bg-red-700",
    ghost:
      "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && "w-full",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
