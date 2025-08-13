// src/api/axios.js
import axios from "axios";
import API_CONFIG from "../config.js";

const axiosInstance = axios.create({
  baseURL: API_CONFIG.getBaseURL(),
  withCredentials: true, // Enable cookies for authentication
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  timeout: 15000, // 15 second timeout
});

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Debug logging for requests (only in development)
    if (import.meta.env.DEV) {
      console.log("🚀 Request:", {
        url: config.url,
        method: config.method,
        baseURL: config.baseURL,
        headers: config.headers,
      });
    }

    return config;
  },
  (error) => {
    console.error("❌ Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
axiosInstance.interceptors.response.use(
  (response) => {
    // Debug logging for responses (only in development)
    if (import.meta.env.DEV) {
      console.log("✅ Response success:", {
        status: response.status,
        url: response.config?.url,
        data: response.data,
      });
    }
    return response;
  },
  (error) => {
    // Debug logging for errors (only in development)
    if (import.meta.env.DEV) {
      console.error("❌ Response error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url,
      });
    }
    
    // Handle different error scenarios
    if (error.response?.status === 401) {
      // Clear invalid token and redirect to login
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      
      // Only redirect if not already on login page and not on signup page
      const currentPath = window.location.pathname;
      if (currentPath !== '/login' && currentPath !== '/signup' && currentPath !== '/forgot-password') {
        window.location.href = "/login";
      }
    } else if (error.response?.status === 429) {
      // Rate limited - show user-friendly message
      console.error("Rate limit exceeded. Please wait before trying again.");
    } else if (error.response?.status === 500) {
      console.error("Server error. Please try again later.");
    } else if (!error.response) {
      // Network error
      console.error("Network error. Please check your connection.");
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
