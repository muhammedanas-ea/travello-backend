import express from 'express'
import { insertUser , verifyUser } from '../controller/user/UserAuthController.js';


const userRoute = express();


//*********USER UTHENTICATION AND AUTHERASATION ROUTES
userRoute.post('/signup', insertUser)
userRoute.get('/:id/verify/:token', verifyUser)



export default  userRoute;