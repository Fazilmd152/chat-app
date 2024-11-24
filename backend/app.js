import express from 'express'
import authRouter from './routes/auth.Route.js'
import messageRouter from './routes/messageRoute.js'
import cookieParser from 'cookie-parser'
import errorMiddleware from './middlewares/error.js'
import cors from 'cors'

const app=express()

const corsOptions = {
    origin: ['http://localhost:3000'],
    credentials: true
  }

app.use(express.json(
  {limit:'2mb'}
))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions))
app.use('/api/auth',authRouter)
app.use('/api/message',messageRouter)

app.use(errorMiddleware)


export default app