import { getReceiverId, io } from "../lib/socket.js";
import catchAsyncError from "../middlewares/catchAsyncError.js";
import Message from "../models/messageModel.js";
import User from "../models/userModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import Features from "../utils/Features.js";
import Response from "../utils/Response.js";

export const getUsers = catchAsyncError(async (req, res, next) => {
    const id = req.user._id
    const user = await User.find({ _id: { $ne: id } }).select("-password")
    if (!user) return next(new ErrorHandler("Users not found", 400))
    new Response().authResponse(res, user)
})

export const getMessages = catchAsyncError(async (req, res, next) => {
    const { id: userToChatId } = req.params
    const myId = req.user._id

    const messages = await Message.find({
        $or: [
            { senderId: myId, receiverId: userToChatId },
            { senderId: userToChatId, receiverId: myId }
        ]
    },{ __v: 0 })

    if (!messages) return next(new ErrorHandler("Messages not found", 400))
    new Response().messageResponse(res, messages)
})

export const sendMessage = catchAsyncError(async (req, res, next) => {
    let { text, img } = req.body
    const senderId = req.user._id
    const { id: receiverId } = req.params

    if(img)
        img=await new Features().uploadImg(img)

    const message = await Message.create({
        senderId,
        receiverId,
        text,
        img: img ? img : ""
    })

    const receiveId=getReceiverId(receiverId)

    if(receiveId){
        io.to(receiveId).emit('newMessage',message)
    }
    new Response().messageResponse(res, message)
})