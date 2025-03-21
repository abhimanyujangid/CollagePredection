// Import necessary modules and utilities
import axios from "axios";
import { LocalStorage } from "../utils";


// Create an Axios instance for API requests
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URI || "http://localhost:8000/api/v1/",
  // withCredentials: true,
  timeout: 120000,
});

// Add an interceptor to set authorization header with user token before requests
apiClient.interceptors.request.use((config) => {
  // Retrieve user token from local storage
  const token = LocalStorage.get("token");
  // Set authorization header with bearer token
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


export default apiClient;