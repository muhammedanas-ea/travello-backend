import express from 'express'
import { adminLogin } from '../controller/authController/AdminAuthController.js'
import {
    userDetails,
    userBlock,
    userUnblock,
    verifyNotification,
    propertyDetails,
    propertBlock,
    propertUnBlock
} from '../controller/admin/AdminController.js'



const adminRoute = express ()

adminRoute.post('/adminLogin',adminLogin)

adminRoute.get('/userlist/:active/:search',userDetails)
adminRoute.put('/blockuser',userBlock)
adminRoute.put('/ublockUser',userUnblock)

adminRoute.get('/verify',verifyNotification)

adminRoute.get('/propertylistadmin/:active/:search',propertyDetails)
adminRoute.put('/propertyBlock',propertBlock)
adminRoute.put('/propertyUnblock',propertUnBlock)

export default adminRoute