import express from "express";
import { userAuth } from "../middlewares/userAuth.middleware";
import { getObituary, updateObituary } from "../controller/obituary.controller";

const ObituaryRouter = express.Router();

ObituaryRouter.get("/get-obituary/:memorialId", userAuth, getObituary);
ObituaryRouter.patch("/update-obituary/:memorialId", userAuth, updateObituary);

export default ObituaryRouter;
