

 function sendToken(res, statuscode, user) {
    const token = user.getJwtToken()

    const options = {
        maxAge: process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: 'strict'
    }
    user.password = null
    res.status(200).cookie('chat', token, options).json({
        success: true,
        user
    })
}

export default sendToken