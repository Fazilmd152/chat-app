import dotenv from 'dotenv' ;
import connectDatabase from './database/db.js';
import cloudinary from 'cloudinary'
//import app from './app.js';
import { app,server } from './lib/socket.js';


dotenv.config()
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret:process.env.API_SECRET_KEY 
})



server.listen(process.env.PORT,()=>{
    console.log(`Server listening to port ${process.env.PORT} in ${process.env.NODE_ENV}`)
    connectDatabase()
})