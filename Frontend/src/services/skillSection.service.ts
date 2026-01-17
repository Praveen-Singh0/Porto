import api from "@/lib/api";

export interface SkillInfo {
  id: number;
  name: string;
  proficiency: number;
  category: "FRONTEND" | "BACKEND" | "DATABASE" | "DEVOPS" | "OTHERS";
  icon: string;
  color: string;
  createdAt: string;
  updatedAt: string;
}

export type SkillCategory =
  | "FRONTEND"
  | "BACKEND"
  | "DATABASE"
  | "DEVOPS"
  | "OTHERS";


export type SkillPayload = Omit<SkillInfo, "id" | "createdAt" | "updatedAt">;

export const skillsService = {
  getInfo: async (): Promise<SkillInfo[]> => {
    try {
      const res = await api.get("/skills");
      return res.data.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to fetch skills info"
      );
    }
  },

  create: async (payload: SkillPayload): Promise<SkillInfo> => {
    try {
      const res = await api.post("/skills/create", payload);
      return res.data.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to create skills info"
      );
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      await api.delete(`/skills/${id}`);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to delete skills info"
      );
    }
  },
};
