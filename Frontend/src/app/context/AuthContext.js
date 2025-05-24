"use client"
import { createContext, useContext, useEffect, useState } from "react";
import { handleApiError } from "../services/errorHandler";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [loading, setLoading] = useState(true);

  const refreshLogin = async () => {
    try {
       await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/refresh`, { withCredentials: true });
      // console.log("refresh response : ", res)
      setIsLoggedIn(true);
      setLoading(false);
    } catch (error) {
      handleApiError(error);
      setIsLoggedIn(false);
    } finally {
    setLoading(false);
  }
  };

  useEffect(() => {
    refreshLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, refreshLogin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
