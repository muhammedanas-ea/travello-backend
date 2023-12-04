import express from "express";
import env from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRoute from "./routes/UserRoute.js";
import adminRoute from './routes/AdminRoute.js'
import propertyRoute from './routes/PropertyRoute.js'
import { Server } from 'socket.io';

const app = express()


env.config();
mongoose.connect(process.env.mongo_url)


app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.use(cors({
    origin:['http://localhost:5173'],
    methods:['GET','POST','PUT','PATCH'],
    credentials:true
}))


//user Route adding sedction
app.use('/',userRoute)
app.use('/admin',adminRoute)
app.use('/property',propertyRoute)


const port = process.env.port || 3000
const server = app.listen(port,()=>{
    console.log(`server is running ${port}`)
})
const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
      origin: ['http://localhost:5173']
    }
  });
  io.on("connection",(socket)=>{
    console.log('connected to socket.io');
  
    socket.on("setup",(userData)=>{
      socket.join(userData._id)
      socket.emit('connected')
    })
  
    socket.on('join chat',(room)=>{
      socket.join(room)
      console.log('user joined in the room: '+room);
    })
  
    socket.on('typing',(room)=>socket.in(room).emit('typing'))
    socket.on('stop typing',(room)=>socket.in(room).emit('stop typing'))
  
    socket.on('new message', (newMessageRecieved) => {
      const chat = newMessageRecieved.chat;
      console.log(newMessageRecieved.sender);
    
      const userKeys = Object.keys(chat.users);
    
      userKeys.forEach((userKey) => {
        const user = chat.users[userKey];
        const senderUserId = newMessageRecieved.sender.user
          ? newMessageRecieved.sender.user?._id
          : newMessageRecieved.sender.owner?._id;
    
        if (userKey !== senderUserId) {
          console.log(user);
          let access = user.user ? user.owner : user.user;
          console.log(access);
          socket.to(access).emit("message received", newMessageRecieved);
        }
      });
    });
    
  })