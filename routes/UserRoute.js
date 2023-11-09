import express from "express";
import {
  insertUser,
  verifyUser,
  userLogin,
  forgotPassword,
  userRestPassword,
  userGoogleSignUp,
  userGoogleSignin,
} from "../controller/authController/UserAuthController.js";
import { userPropertyList } from "../controller/user/UserController.js";

const userRoute = express();

//*********USER UTHENTICATION AND AUTHERASATION ROUTES
userRoute.post("/signup", insertUser);
userRoute.get("/verify/:id/:token", verifyUser);
userRoute.post("/login", userLogin);
userRoute.post("/forgotPassword", forgotPassword);
userRoute.post("/restPasword", userRestPassword);
userRoute.post("/googleSignUp", userGoogleSignUp);
userRoute.post("/googleSignin", userGoogleSignin);

userRoute.get("/userpropertylist", userPropertyList);

export default userRoute;
