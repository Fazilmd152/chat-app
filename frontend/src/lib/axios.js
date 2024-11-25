import axios from "axios";

export const axiosInstance=axios.create({
    baseURL:'https://chat-app-gal3.onrender.com/api',withCredentials:true
})