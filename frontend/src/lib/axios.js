import axios from "axios";

export const axiosInstance=axios.create({
    baseURL:import.meta.env.NODE_ENV === "development" ? "http://localhost:7676/api" : "/api",
    withCredentials:true
})

