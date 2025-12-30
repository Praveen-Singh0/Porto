import api from "@/lib/api";

export interface heroInfo {
  id: number;
  bio: string;
  createdAt: string;
  updatedAt: string;
}


export const heroService = {
  getInfo: async (): Promise<heroInfo> => {
    try {
      const res = await api.get("/hero/get");
      return res.data.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to fetch hero info"
      );
    }
  },
};
