"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GoogleAuthErrorPage() {
  const router = useRouter();


  useEffect(() => {
    console.log("Google Auth Error:");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 text-center">
        
        <h1 className="text-2xl font-bold text-red-500 mb-3">
          Google Login Failed
        </h1>

        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Something went wrong while signing in with Google.
        </p>

        <button
          onClick={() => router.push("/")}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 active:scale-95 transition"
        >
          Home
        </button>
      </div>
    </div>
  );
}