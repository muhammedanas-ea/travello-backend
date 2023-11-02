import express from "express";
import env from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRoute from "./routes/UserRoute.js";
import adminRoute from './routes/AdminRoute.js'

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


const port = process.env.port || 3000
app.listen(port,()=>{
    console.log(`server is running ${port}`)
})