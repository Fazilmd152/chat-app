import axios from "axios";

export const axiosInstance=axios.create({
    baseURL:'http://localhost:7676/api',
    withCredentials:true
})