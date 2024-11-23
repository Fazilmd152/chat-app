import dotenv from 'dotenv';
import mongoose from 'mongoose'


dotenv.config()


async function connectDatabase(){
await mongoose.connect(process.env.DB_URL).then(d=>{
   console.log(`Database connected to ${process.env.DB_URL}`);
}).catch(e=>{
    console.log(`Error in connecting DB:${e.message}`);
})
}
export default connectDatabase