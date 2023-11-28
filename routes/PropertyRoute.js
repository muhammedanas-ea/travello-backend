import express from "express";
import {
  insertPropertyOwner,
  ownerOtpVerification,
  propertyOwnerLogin,
} from "../controller/authController/PropertyAuthController.js";
import { addProperty , ownerListProperty,propertyDetails ,bookingDetails} from "../controller/property/PropertyController.js";
import { errorHandler } from "../middleware/ErrorHandling.js";
import upload from "../middleware/Multer.js";
const propertyRoute = express();

propertyRoute.post("/propertySignup", insertPropertyOwner);
propertyRoute.post("/otpChecking", ownerOtpVerification);
propertyRoute.post("/propertySignin", propertyOwnerLogin);


propertyRoute.post("/addProperty",upload.array("images",10),addProperty);
propertyRoute.get("/listProperty/:id",ownerListProperty);
propertyRoute.get("/propertydetails/:id",propertyDetails);
propertyRoute.get("/bookingdetails/:id/:active",bookingDetails);

propertyRoute.use(errorHandler);

export default propertyRoute;
