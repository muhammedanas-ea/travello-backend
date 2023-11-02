import express from 'express'
import { adminLogin } from '../controller/authController/AdminAuthController.js'
import {
    userDetails,
} from '../controller/admin/AdminController.js'


const adminRoute = express ()

adminRoute.get('/userlist',userDetails)
adminRoute.post('/adminLogin',adminLogin)

export default adminRoute