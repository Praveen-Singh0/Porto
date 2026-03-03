"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function GoogleAuthErrorPage() {
  const params = useSearchParams();
  const router = useRouter();

  const error = params.get("error") || "Unknown error occurred";

  useEffect(() => {
    console.log("Google Auth Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 text-center">
        
        <h1 className="text-2xl font-bold text-red-500 mb-3">
          Google Login Failed
        </h1>

        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Something went wrong while signing in with Google.
        </p>

        <div className="text-sm text-gray-600 dark:text-gray-400 p-3 mb-6 rounded-lg bg-gray-200 dark:bg-gray-800">
          Error: <span className="font-semibold">{error}</span>
        </div>

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