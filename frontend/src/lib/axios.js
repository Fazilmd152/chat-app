import axios from "axios";

export const axiosInstance = axios.create({
    
    baseURL:"/api",
    withCredentials: true
})

//baseURL:import.meta.env.MODE==="development"? "http://localhost:7676/api" : "/api",