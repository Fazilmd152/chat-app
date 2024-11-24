import catchAsyncError from "../middlewares/catchAsyncError.js"
import User from "../models/userModel.js"
import ErrorHandler from "../utils/ErrorHandler.js"
import Features from "../utils/Features.js"
import sendToken from "../utils/jwt.js"
import Response from "../utils/Response.js"



export const signUp = catchAsyncError(async (req, res) => {
    const { email, fullName, profilePic, password } = req.body

    const newUser = await User.create({ email, fullName, profilePic, password })

    if (!newUser) return new ErrorHandler("user creation failed", 400)

    sendToken(res, 201, newUser)

})

export const login = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body
    const user = await User.findOne({ email }).select("+password")

    if (!user)
        return next(new ErrorHandler("Invalid username or email"))

    if (!await user.isValidPassword(password))//!await user.isValidPassword(password)
        return next(new ErrorHandler("Invalid email or password"))

    sendToken(res, 200, user)

})

export const getUserProfile = catchAsyncError(async (req, res, next) => {
    const { user } = req

    new Response().authResponse(res, user)
})

export const logout = catchAsyncError(async (req, res, next) => {
    res.status(200).cookie("chat", null, { maxAge: 0 }).json({
        succes: true,
        message: "Loggedout succesfully"
    })
})

export const updateProfile = catchAsyncError(async (req, res, next) => {

    let { img, fullName } = req.body
    const user = await User.findById(req.user._id).select('+password')

//console.log(req);

    if (!user)
        return next(new ErrorHandler("User not found ", 404))

    if (!fullName && !img)
        return next(new ErrorHandler("Enter a value to update", 400))

    if (img) {
        if (user.profilePic)
            await new Features().deleteImg(user)
        img = await new Features().uploadImg(img)
    }

    user.profilePic = img || user.profilePic
    user.fullName = fullName || user.fullName

    await user.save()

    new Response().authResponse(res, user)
}) 