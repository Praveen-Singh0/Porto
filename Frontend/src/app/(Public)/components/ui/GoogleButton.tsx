"use client";

import { FcGoogle } from "react-icons/fc";

interface GoogleButtonProps {
  onClick: () => void;
}

export default function GoogleButton({ onClick }: GoogleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900
                 shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff]
                 dark:shadow-[6px_6px_12px_#0a0a0a,-6px_-6px_12px_#2a2a2a]
                 hover:shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff]
                 dark:hover:shadow-[inset_6px_6px_12px_#0a0a0a,inset_-6px_-6px_12px_#2a2a2a]
                 flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300 font-medium"
    >
      <FcGoogle size={18} />
      Continue with Google
    </button>
  );
}