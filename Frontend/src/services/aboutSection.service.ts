import api from "@/lib/api";

export interface documents {
  title: string;
  fileUrl: string;
}

export interface aboutInfo {
  id: number;
  bio: string;
  imageUrl: string;
  specialization: string;
  education: string;
  documents: documents[];
  createdAt: string;
  updatedAt: string;
}

export const aboutService = {
  getInfo: async (): Promise<aboutInfo> => {
    try {
      const res = await api.get("/about/get");
      return res.data.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to fetch about info"
      );
    }
  },

  updateInfo: async (data: aboutInfo): Promise<aboutInfo> => {
    try {
      const res = await api.post("/about/create", data);
      return res.data.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to update about info"
      );
    }
  },
};
