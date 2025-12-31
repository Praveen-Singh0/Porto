import api from "@/lib/api";

export interface skillsInfo {
  id: number;
  name: string;
  proficiency: number;
  category: "FRONTEND" | "BACKEND" | "DATABASE" | "DEVOPS" | "OTHERS";
  icon: string;
  color: string;
  createdAt: string;
  updatedAt: string;
}


export const skillsService = {
  getInfo: async (): Promise<skillsInfo[]> => {
    try {
      const res = await api.get("/skills/get");
      return res.data.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to fetch skills info"
      );
    }
  },
};

