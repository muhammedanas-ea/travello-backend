import express from 'express'
import { insertUser } from '../controller/user/UserAuthController.js';


const userRoute = express();


//*********USER UTHENTICATION AND AUTHERASATION ROUTES
userRoute.post('/signup',insertUser)



export default  userRoute;