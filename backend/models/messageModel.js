import { Schema, model, Types } from "mongoose";

const messageSchema = Schema({
    senderId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiverId:{
        type:Types.ObjectId,
        required:true,
        ref:'User',
    },
    text:{
        type:String
    },
    img:String
},{ timestamps: true })



const MessageModel=model('Message',messageSchema)

export default MessageModel