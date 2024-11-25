import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from 'socket.io-client'

const BASE_URL = import.meta.env.MODE==="development"? "http://localhost:7676" :"/"


export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
        try {
            const { data } = await axiosInstance.get('/auth/getme')
            set({ authUser: data.user })
            get().connectSocket()
            console.log(process.env.NODE_ENV);
            
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
            const { data } = await axiosInstance.post('/auth/signup', formData)
            set({ authUser: data.user })
            toast.success("account created succesfully")
            get().connectSocket()
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isSigningUp: false })
        }
    },

    LogOut: async () => {
        try {
            await axiosInstance.get('/auth/logout')
            set({ authUser: null })
            toast.success("Logged Out succesfully")
            get().disConnectSocket()
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    Login: async (formData) => {
        set({ isLoggingIn: true })
        try {
            const { data } = await axiosInstance.post('/auth/login', formData)
            set({ authUser: data.user })
            toast.success("Logged in succesfully")
            get().connectSocket()
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isLoggingIn: false })
        }
    },

    updateProfile: async (formData) => {
        set({ isUpdatingProfile: true })
        try {
            const { data } = await axiosInstance.put('/auth/updateprofile', formData)
            set({ authUser: data.user })
            toast.success("Profile picture updated succesfully")
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isUpdatingProfile: false })
        }
    },

    connectSocket: () => {
        const { authUser } = get()
        if (!authUser || get().socket?.connected) return
        
        const socket =  io(BASE_URL,{
            query:{
                userId:authUser._id
            }
        })
        socket.connect() 

        set({socket})

        socket.on('getOnlineUsers',(userId)=>{
          set({onlineUsers:userId})
        })
    },

    disConnectSocket: () => { 
        if(get().socket?.connected)get().socket.disconnect()
    }
}))