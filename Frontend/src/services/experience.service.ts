import api from "@/lib/api";

export interface experienceInfo {
  id: number;
  title: string;
  company: string;
  location: string;
  duration: string;
  period: string;
  type: string;
  responsibilities: string[];
  technologies: string[];
  color: string;
  createdAt: string;
  updatedAt: string;
}

export const experienceService = {
  getInfo: async (): Promise<experienceInfo[]> => {
    try {
      const res = await api.get("/experience/get");
      const experiences: experienceInfo[] = res.data.data;
      return experiences;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to fetch experience info"
      );
    }
  },
};
