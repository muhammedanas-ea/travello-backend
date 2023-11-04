import express from 'express'
import { adminLogin } from '../controller/authController/AdminAuthController.js'
import {
    userDetails,
    userBlock,
    userUnblock
} from '../controller/admin/AdminController.js'


const adminRoute = express ()

adminRoute.get('/userlist',userDetails)
adminRoute.post('/adminLogin',adminLogin)
adminRoute.put('/blockuser',userBlock)
adminRoute.put('/ublockUser',userUnblock)

export default adminRoute