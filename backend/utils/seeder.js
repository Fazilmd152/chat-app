import { config } from "dotenv";
import User from "../models/userModel.js";
import connectDatabase from "../database/db.js";
import seedUsers from "./users.js";
config()

async function addUsers(){
    try {
        await connectDatabase()
        await User.deleteMany({ _id: { $nin: ['673e4b71fa97f9c2f270deab', '67421a2cdf9ee3954c5b4916'] } })
        console.log("deleted succesfully");
        await User.insertMany(seedUsers)
        console.log("users added succesfully");
        process.exit()
    } catch (error) {
        console.log(error);
        
    }
}
addUsers()