import api from "@/lib/api";

export type ChatResponse = {
  statusCode: number;
  success: boolean;
  messgae: string;
  data: string;
};

export const chatService = {
  sendMessage: async (message: string, mode: "normal" | "max") => {
    try {
      const res = await api.post<ChatResponse>("/chatbot", {
        message,
        mode,
      });

      return res.data.data; // 👈 AI reply string
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Chat request failed"
      );
    }
  },
};