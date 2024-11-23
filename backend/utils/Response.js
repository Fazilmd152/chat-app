class Response {

    authResponse(res, user) {
        user.password ? user.password = null : ''
        res.status(200).json({
            success: true,
            user
        })
    }

    messageResponse(res, message) {
        res.status(200).json({
            success: true,
            count: message.length || 0,
            message
        })
    }
}

export default Response