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

export interface AboutFormData {
  bio: string;
  image: File | string;
  specialization: string;
  education: string;
  documents: documents[];
}

export const aboutService = {
  getInfo: async (): Promise<aboutInfo> => {
    const res = await api.get("/about/get");
    return res.data.data;
  },

  updateInfo: async (data: AboutFormData): Promise<aboutInfo> => {
    const formData = new FormData();

    formData.append("bio", data.bio);
    formData.append("specialization", data.specialization);
    formData.append("education", data.education);
    formData.append("documents", JSON.stringify(data.documents));

    if (data.image instanceof File) {
      formData.append("image", data.image);
    }

    const res = await api.post("/about/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data.data;
  },
};
