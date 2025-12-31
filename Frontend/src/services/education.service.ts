import api from "@/lib/api";

export interface subject {
    name: string;
}

export interface educationInfo {
  id: number;
  link: string;
  collageImage: string;
  collageName: string;
  course: string;
  duration: string;
  subjects: subject[];
  createdAt: string;
  updatedAt: string;
}

export const educationService = {
  getInfo: async (): Promise<educationInfo[]> => {
    try {
      const res = await api.get("/education/get");
      const education: educationInfo[] = res.data.data;
      return education;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to fetch education info"
      );
    }
  },
};
