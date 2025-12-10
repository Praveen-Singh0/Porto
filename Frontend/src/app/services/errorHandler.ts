
interface ApiError {
  response?: { data: any };
  request?: any;
  message: string;
}

export const handleApiError = (error : ApiError) => {
  if (error.response) {
    console.error("API Error:", error.response.data);
  } else if (error.request) {
    console.error("Network Error:", error.message);
  } else {
    console.error("Error:", error.message);
  }
};
