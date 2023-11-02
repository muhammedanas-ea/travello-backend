import express from 'express'
import {
     insertPropertyOwner
     } from '../controller/authController/PropertyAuthController.js';
const propertyRoute = express();


propertyRoute.post('/propertySignup',insertPropertyOwner)


export default propertyRoute