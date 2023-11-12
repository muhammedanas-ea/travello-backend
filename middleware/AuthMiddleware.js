import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const userAuth = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization?.split(" ")[1];
    const dicode = jwt.verify(token, process.env.SECRET_KEY);
    const user = await userModel.findById({ _id: dicode.userId });
    if (!user) {
      return res.status(400).json({ message: "user not authorised" });
    } else {
        if(user.is_block){
            return res.status(403).json({message: 'this user is blocked by admin'})
        }else{
        next()
        }
    }
  } else {
    return res.status(400).json({ message: "user not authorised" });
  }
};
