import express from 'express'
import {
     insertPropertyOwner,
     ownerOtpVerification,
     propertyOwnerLogin,
     } from '../controller/authController/PropertyAuthController.js';
const propertyRoute = express();


propertyRoute.post('/propertySignup',insertPropertyOwner)
propertyRoute.post('/otpChecking',ownerOtpVerification)
propertyRoute.post('/propertySignin',propertyOwnerLogin)


export default propertyRoute