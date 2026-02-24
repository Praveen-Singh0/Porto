import axios from "axios";

import { handleApiError } from "./errorHandler";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     handleApiError(error);
//     return Promise.reject(error);
//   }
// );

export default api;