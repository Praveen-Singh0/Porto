import api from "@/lib/api";
import { AuthUser, SignupPayload, LoginPayload } from "@/types/auth";
export const authService = {
  signup: async (payload: SignupPayload): Promise<AuthUser> => {
    try {
      const res = await api.post("/auth/signup", payload);
      return res.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Signup failed");
    }
  },

  login: async (payload: LoginPayload): Promise<AuthUser> => {
    try {
      const res = await api.post("/auth/login", payload);
      return res.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  },

  logout: async (): Promise<void> => {
    try {
      await api.post("/auth/logout");
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Logout failed");
    }
  },

  verify_Its_Me: async (): Promise<AuthUser> => {
    try {
      const res = await api.get("/auth/me");
      return res.data.data.user;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Varify failed");
    }
  },
};
