import axios from "axios";


export const axiosInstance = axios.create({
    baseURL: "https://vibely-2-backend.onrender.com/api",
    withCredentials: true, // send cookies with the request 
});
