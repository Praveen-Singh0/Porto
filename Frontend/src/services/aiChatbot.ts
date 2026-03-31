import api from "@/lib/api";

export type ChatResponse = {
  id?: string;
  statusCode: number;
  success: boolean;
  message: string;
  query: string;
  data: string;
  createdAt: string;
};

export type GetChatsResponse = {
  success: boolean;
  total: number;
  page: number;
  totalPages: number;
  data: ChatResponse[];
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

  getAll: async (page = 1, limit = 10): Promise<GetChatsResponse> => {
    try {
      const res = await api.get(`/chatbot/getAll?page=${page}&limit=${limit}`);
      return res.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Fetch chats failed"
      );
    }
  },
};