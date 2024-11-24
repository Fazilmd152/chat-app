import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter your email"],
        validate: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email address"],
        unique: [true,'Email already exists']

    },
    fullName: {
        type: String,
        required: [true, "Please provide a fullname"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be atleast 6 characters"],
        select: false
    },
    profilePic: {
        type: String,
        default: ""
    }
}, { timestamps: true })


//hashing password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 11)
})

//json web token cookie
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}

//validating password
userSchema.methods.isValidPassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password)
}


const UserModel = mongoose.model('User', userSchema)

export default UserModel