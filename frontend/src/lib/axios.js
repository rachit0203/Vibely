import axios from "axios";

const apiUrlFromEnv = import.meta.env.VITE_API_URL;
const isDevelopment = import.meta.env.MODE === "development";

// Use relative URL when running on the same port, otherwise use full URL
const getBaseURL = () => {
    if (apiUrlFromEnv) return apiUrlFromEnv;
    if (window.location.port === '5001') return '/api';
    return isDevelopment ? 'http://localhost:5001/api' : '/api';
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