class Response {

    authResponse(res, user) {
        user.password ? user.password = null : ''
 
        if (!Array.isArray(user)) {
            res.status(200).json({
                success: true,
                user
            })
        } else {
            res.status(200).json({
                success: true,
                count: user.length || 0,
                users: user
            })
        }
    }

    messageResponse(res, messages) {
        res.status(200).json({
            success: true,
            count: messages.length || 0,
            messages
        })
    }
}

export default Response