import express from 'express'
import authRouter from './routes/auth.Route.js'
import messageRouter from './routes/messageRoute.js'
import cookieParser from 'cookie-parser'
import errorMiddleware from './middlewares/error.js'
import cors from 'cors'
import cloudinary from 'cloudinary'
import connectDatabase from './database/db.js'
import { app,server } from './lib/socket.js'
import dotenv from 'dotenv' ;
dotenv.config()



app.use(express.json({limit:'2mb'}))
app.use(cookieParser())
app.use(cors({origin: "http://localhost:3000",credentials: true,}))
app.use(express.urlencoded({ extended: true }))
app.use('/api/auth',authRouter)
app.use('/api/message',messageRouter)


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret:process.env.API_SECRET_KEY 
})

app.use(errorMiddleware)

server.listen(process.env.PORT,()=>{
  console.log(`Server listening to port ${process.env.PORT} in ${process.env.NODE_ENV}`)
  connectDatabase()
})
