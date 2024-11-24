import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server);



io.on("connection",(socket)=>{
    console.log("A user connectd to",socket.id);

    socket.on("disconnect",()=>{
        console.log("A user disconnected",socket.id);
        
    })
    
})


export {io,app,server}
