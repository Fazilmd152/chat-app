import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/ErrorHandler.js";
import User from "../models/userModel.js";

async function isAuthenticate(req, res, next) {
    const { chat: token } = req.cookies
console.log(token);

    if (!token)
        return next(new ErrorHandler("Login before to access this resources", 400))

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(decodedToken.id)

    if(!user)
        return next(new ErrorHandler("user not found",400))

    req.user=user
    
    next()
}

export default isAuthenticate