
interface ApiError {
  response?: { data: any };
  request?: any;
  message: string;
}

export const handleApiError = (error : ApiError) => {
  if (error.response) {
    console.error("API Error (Error inside your backend):", error.response.data);
  } else if (error.request) {
    console.error("Network Error (Backend is not working properly):", error.message);
  } else {
    console.error("Error:", error.message);
  }
};
