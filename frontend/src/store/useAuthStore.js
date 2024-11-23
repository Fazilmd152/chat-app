import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const {data} = await axiosInstance.get('/auth/getme')
            set({ authUser:data.user })
        } catch (error) {
            console.log("Error in checkAuth", error);
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    SignUp: async (formData) => {
        set({ isSigningUp: true })
        try {
            const {data} = await axiosInstance.post('/auth/signup', formData)
            set({ authUser:data.user })
            toast.success("account created succesfully")
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isSigningUp:false})
        }
    },

    LogOut:async ()=>{
        try {
           await axiosInstance.get('/auth/logout')
           set({authUser:null})
           toast.success("Logged Out succesfully")
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    Login:async (formData)=>{
        set({isLoggingIn:true})
        try {
           const {data}= await axiosInstance.post('/auth/login',formData)
           set({authUser:data.user})
           toast.success("Logged in succesfully")
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({isLoggingIn:false})
        }
    }
}))