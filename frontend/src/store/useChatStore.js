import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set,get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isMessagesLoading: false,
    isUsersLoading: false,

    GetUsers: async () => {
        set({ isUsersLoading: true })
        try {
            const { data } = await axiosInstance.get('/message/users')
            set({ users: data.users })
            console.log('Get users :',data.users);
            console.log('Get users :',data);
            
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isUsersLoading: false })
        }
    },

    GetMessages: async (Id) => {
        set({ isMessagesLoading: true })
        try {
            const { data } = await axiosInstance.get(`message/${Id}`)
            set({messages:data.messages})
            console.log('Get messages :',data.messages);
            
        }catch(error){
            set({messages:[]})
            toast.error(error.response.data.message)
        }finally{
            set({isMessagesLoading:false})
        }
    },

    SendMessage:async(messageData)=>{
        const {selectedUser,messages}=get()
        try {
            const {data}=await axiosInstance.post(`/message/send/${selectedUser._id}`,messageData)
            set({messages:[...messages,data.messages]})
            
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    SetSelectedUser:(selectedUser)=>{set({selectedUser})}

}))


