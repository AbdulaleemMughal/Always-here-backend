import express from "express";
import {
  getLoggedInUser,
  logIn,
  logout,
  signUp,
} from "../controller/user.controller";
import { userAuth } from "../middlewares/userAuth.middleware";

const userRouter = express.Router();

userRouter.post("/signUp", signUp);
userRouter.post("/logIn", logIn);
userRouter.post("/logOut", logout);
userRouter.get("/getUser", userAuth, getLoggedInUser);

export default userRouter;
