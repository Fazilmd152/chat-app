import { config } from "dotenv";
import User from "../models/userModel.js";
import connectDatabase from "../database/db.js";
import seedUsers from "./users.js";
config()

async function addUsers(){
    try {
        await connectDatabase()
        await User.deleteMany()
        console.log("deleted succesfully");
        await User.insertMany(seedUsers)
        console.log("users added succesfully");
        process.exit()
    } catch (error) {
        console.log(error);
        
    }
}
addUsers()