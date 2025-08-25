import axios from "axios";

const apiUrlFromEnv = import.meta.env.VITE_API_URL;
const isProduction = import.meta.env.PROD;

// Use relative URL in production, full URL in development
const getBaseURL = () => {
    if (apiUrlFromEnv) return apiUrlFromEnv;
    if (isProduction) {
        // In production, use relative URL for same-origin requests
        return '/api';
    }
    // In development, use the development server URL
    return 'http://localhost:5001/api';
};

export const axiosInstance = axios.create({
    baseURL: getBaseURL(),
    withCredentials: true, // send cookies with the request
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to handle errors
axiosInstance.interceptors.request.use(
    (config) => {
        // You can add auth headers here if needed
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);