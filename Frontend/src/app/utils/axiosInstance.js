// src/utils/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL, // your backend port here
  withCredentials: true, // REQUIRED to send HttpOnly cookies
});

// Request Interceptor (optional – only needed if storing token in localStorage)
// Not needed in your case, since you're using cookies

// Response Interceptor to refresh token on 401
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    console.log("originalRequest : ", originalRequest)

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/refresh`, {}, {
          withCredentials: true,
        });

        return axiosInstance(originalRequest); // Retry original request
      } catch (refreshError) {
        console.error("Refresh failed", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
