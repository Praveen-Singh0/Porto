import api from "@/lib/api";
import { PortfolioInfo } from "@/types/portfolio";

export const portfolioService = {
  getInfo: async (): Promise<PortfolioInfo> => {
    try {
      const res = await api.get("/info/get");
      return res.data.data;  
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to fetch portfolio info"
      );
    }
  },
};
