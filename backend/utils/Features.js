import cloudinary from 'cloudinary'

class Features {

    async uploadImg(img) {
        const uploadResponse = await cloudinary.uploader.upload(img)
        const profilePic = uploadResponse.secure_url
        return profilePic
    }

    async deleteImg(user){
        await cloudinary.uploader.destroy(user.profilePic.split('/').pop().split('.')[0])
        return true
    }

}

export default Features