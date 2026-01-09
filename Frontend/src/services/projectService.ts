import api from "@/lib/api";

export interface MinorProject {
  id: number;
  header: string;
  html_url: string;
  image: string;
  content: string;
  type?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MajorProject {
  id: number;
  title: string;
  description: string;
  image: string;
  liveUrl: string;
  githubUrl: string | null;
  technologies: string[];
  createdAt: string;
  updatedAt: string;
}

export interface MinorProjectFormData {
  header: string;
  html_url: string;
  content: string;
  image?: File;
}

export interface MajorProjectFormData {
  title: string;
  description: string;
  liveUrl: string;
  githubUrl?: string;
  technologies: string[];
  image?: File;
}

export const minorProjectService = {
  getAll: async (): Promise<MinorProject[]> => {
    try {
      const res = await api.get("/projects/minor");
      return res.data.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to fetch minor projects"
      );
    }
  },

  create: async (data: MinorProjectFormData): Promise<MinorProject> => {
    try {
      if (!data.image) {
        throw new Error("Image is required");
      }

      const formData = new FormData();
      formData.append("header", data.header);
      formData.append("html_url", data.html_url);
      formData.append("content", data.content);
      formData.append("image", data.image);

      const res = await api.post("/projects/minor/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to create minor project"
      );
    }
  },

  update: async (
    id: number,
    data: MinorProjectFormData
  ): Promise<MinorProject> => {
    try {
      const formData = new FormData();
      if (data.header) formData.append("header", data.header);
      if (data.html_url) formData.append("html_url", data.html_url);
      if (data.content) formData.append("content", data.content);
      if (data.image) formData.append("image", data.image); // New image file

      const res = await api.put(`/projects/minor/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to update minor project"
      );
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      await api.delete(`/projects/minor/${id}`);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to delete minor project"
      );
    }
  },
};

// ============ MAJOR PROJECT SERVICE ============

export const majorProjectService = {
  getAll: async (): Promise<MajorProject[]> => {
    try {
      const res = await api.get("/projects/major");
      return res.data.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to fetch major projects"
      );
    }
  },

  create: async (data: MajorProjectFormData): Promise<MajorProject> => {
    try {
      if (!data.image) {
        throw new Error("Image is required");
      }

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("liveUrl", data.liveUrl);

      if (data.githubUrl) {
        formData.append("githubUrl", data.githubUrl);
      }
      formData.append("technologies", JSON.stringify(data.technologies));
      formData.append("image", data.image); // File object

      const res = await api.post("/projects/major/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to create major project"
      );
    }
  },

  update: async (
    id: number,
    data: MajorProjectFormData
  ): Promise<MajorProject> => {
    try {
      const formData = new FormData();

      if (data.title) formData.append("title", data.title);
      if (data.description) formData.append("description", data.description);
      if (data.liveUrl) formData.append("liveUrl", data.liveUrl);
      if (data.githubUrl !== undefined) {
        formData.append("githubUrl", data.githubUrl);
      }
      if (data.technologies) {
        formData.append("technologies", JSON.stringify(data.technologies));
      }
      if (data.image) formData.append("image", data.image);

      const res = await api.put(`/projects/major/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to update major project"
      );
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      await api.delete(`/projects/major/${id}`);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to delete major project"
      );
    }
  },
};
