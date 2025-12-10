"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const AdminDashboard = () => {
  const { isLoggedIn, loading } = useAuth();
  const router = useRouter();

  console.log("isLoggedIn adminDashboard : ", isLoggedIn)
  console.log("loading adminDashboard : ", loading)

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, loading,]);

  if (loading) return <p>Loading...</p>;

  return <h1>Admin Dashboard</h1>;
};

export default AdminDashboard;
