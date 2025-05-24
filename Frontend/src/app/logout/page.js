"use client"
import { useEffect } from "react";
import axios from "axios";
// import { useRouter } from "next/router";

const page = () => {
  // const router = useRouter();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/logout`, {}, {
          withCredentials: true,
        });

        // Optional: Clear localStorage/sessionStorage if used
        // localStorage.removeItem('userToken');

        // router.push("/login"); // Redirect after logout
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };

    logoutUser();
  }, []);

  return <p>Logging you out...</p>;
};

export default page;
