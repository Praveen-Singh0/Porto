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
  createdAt?: string;
  updatedAt?: string;
}

export type ExperiencePayload = Omit<
  experienceInfo,
  "id" | "createdAt" | "updatedAt"
>;

export const experienceService = {
  getInfo: async (): Promise<experienceInfo[]> => {
    try {
      const res = await api.get("/experience");
      const experiences: experienceInfo[] = res.data.data;
      return experiences;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to fetch experience info"
      );
    }
  },

  createInfo: async (payload: ExperiencePayload): Promise<experienceInfo> => {
    try {
      const res = await api.post("/experience/create", payload);
      return res.data.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to create exprerience info"
      );
    }
  },

  updateInfo: async (
    id: number,
    payload: ExperiencePayload
  ): Promise<experienceInfo> => {
    try {
      const res = await api.patch(`experience/${id}`, payload);
      return res.data.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to update exprerience info"
      );
    }
  },

  deleteInfo: async (id: number): Promise<void> => {
    try {
      const res = await api.delete(`experience/${id}`);
      return res.data;
    } catch (error : any) {
      throw new Error(
        error.response?.data?.message || "Unable to delete exprerience info"
      );
    }
  },
};
