import axios, { AxiosError, AxiosResponse } from "axios";

// Create an Axios instance
const apiAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api/v1/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request Interceptor - Adds Token to Headers
apiAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor - Handles Errors Globally
apiAxios.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<{ message?: string }>) => {
    let message = "An unexpected error occurred";

    if (error.response) {
      message =
        error.response.data?.message || `Error: ${error.response.status}`;
    } else if (error.request) {
      message = "Network error. Please check your connection.";
    } else {
      message = error.message;
    }

    console.error("API Error:", message);
    return Promise.reject(new Error(message));
  }
);

// Reusable API Methods
const apiClient = {
  get: <T>(url: string, params = {}): Promise<T> =>
    apiAxios.get(url, { params }).then((res) => res.data),
  post: <T>(url: string, data: any): Promise<T> =>
    apiAxios.post(url, data).then((res) => res.data),
  put: <T>(url: string, data: any): Promise<T> =>
    apiAxios.put(url, data).then((res) => res.data),
  delete: <T>(url: string): Promise<T> =>
    apiAxios.delete(url).then((res) => res.data),
};

export default apiClient;

