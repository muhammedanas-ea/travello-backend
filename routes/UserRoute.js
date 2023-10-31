import express from 'express'
import { insertUser , verifyUser , userLogin , forgotPassword } from '../controller/user/UserAuthController.js';


const userRoute = express();


//*********USER UTHENTICATION AND AUTHERASATION ROUTES
userRoute.post('/signup', insertUser)
userRoute.get('/verify/:id/:token', verifyUser)
userRoute.post('/login', userLogin)
userRoute.post('/forgotPassword',forgotPassword)



export default  userRoute;