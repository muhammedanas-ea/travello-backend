import express from "express";
import {
  insertPropertyOwner,
  ownerOtpVerification,
  propertyOwnerLogin,
} from "../controller/authController/PropertyAuthController.js";
import { addProperty } from "../controller/property/PropertyController.js";
import upload from "../middleware/Multer.js";
const propertyRoute = express();

propertyRoute.post("/propertySignup", insertPropertyOwner);
propertyRoute.post("/otpChecking", ownerOtpVerification);
propertyRoute.post("/propertySignin", propertyOwnerLogin);


propertyRoute.post("/addProperty",upload.array("images",10),addProperty);

export default propertyRoute;
