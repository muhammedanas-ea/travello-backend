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
import {
  userPropertyList,
  updateUserProfile,
  fetchProfileData,
  userSinglePropertyList
} from "../controller/user/UserController.js";

import { userAuth } from "../middleware/AuthMiddleware.js";

const userRoute = express();

//*********USER UTHENTICATION AND AUTHERASATION ROUTES
userRoute.post("/signup", insertUser);
userRoute.get("/verify/:id/:token", verifyUser);
userRoute.post("/login", userLogin);
userRoute.post("/forgotPassword", forgotPassword);
userRoute.post("/restPasword", userRestPassword);
userRoute.post("/googleSignUp", userGoogleSignUp);
userRoute.post("/googleSignin", userGoogleSignin);

userRoute.put("/userprofile",userAuth,updateUserProfile);
userRoute.get("/profileData/:id",userAuth,fetchProfileData)

userRoute.get("/userpropertylist/:active/:sort", userPropertyList);
userRoute.get("/singleproperty/:id",userSinglePropertyList);

export default userRoute;
