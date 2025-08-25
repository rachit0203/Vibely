import axios from "axios";

const apiUrlFromEnv = import.meta.env.VITE_API_URL;
const BASE_URL = apiUrlFromEnv
    ? apiUrlFromEnv
    : (import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api");

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // send cookies with the request 
}); 
