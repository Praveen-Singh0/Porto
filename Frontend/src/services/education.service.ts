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

export type educationPayload = {
  link: string;
  collageImage: File | string; // 👈 change
  collageName: string;
  course: string;
  duration: string;
  subjects: subject[];
};

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

  createInfo: async (payload: educationPayload): Promise<educationInfo> => {
    try {
      const formData = new FormData();

      formData.append("link", payload.link);
      formData.append("collageName", payload.collageName);
      formData.append("course", payload.course);
      formData.append("duration", payload.duration);
      formData.append("subjects", JSON.stringify(payload.subjects));

      if (payload.collageImage instanceof File) {
        formData.append("collageImage", payload.collageImage);
      }

      const res = await api.post("/education/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return res.data.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to create education info"
      );
    }
  },

  updateInfo: async (
    id: number,
    payload: educationPayload
  ): Promise<educationInfo> => {
    try {
      const formData = new FormData();

      formData.append("link", payload.link);
      formData.append("collageName", payload.collageName);
      formData.append("course", payload.course);
      formData.append("duration", payload.duration);
      formData.append("subjects", JSON.stringify(payload.subjects));

      if (payload.collageImage instanceof File) {
        formData.append("collageImage", payload.collageImage);
      }

      const res = await api.patch(`/education/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return res.data.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to update education info"
      );
    }
  },

  deleteInfo: async (id: number): Promise<void> => {
    try {
      const res = await api.delete(`education/${id}`);
      return res.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to delete education info"
      );
    }
  },
};
