import dotenv from 'dotenv' ;
import connectDatabase from './database/db.js';
import app from './app.js';
import cloudinary from 'cloudinary'


dotenv.config()
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret:process.env.API_SECRET_KEY 
})





app.listen(process.env.PORT,()=>{
    console.log(`Server listening to port ${process.env.PORT} in ${process.env.NODE_ENV}`)
    connectDatabase()
})