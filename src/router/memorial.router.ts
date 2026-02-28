import express from "express";
import {
  addMemorial,
  deleteMemorial,
  getAllMemorials,
  getMemorialById,
  updateMemorial,
} from "../controller/memorial.controller";
import { userAuth } from "../middlewares/userAuth.middleware";

const memorialRouter = express.Router();

memorialRouter.post("/add-memorial/:keyword", userAuth, addMemorial);
memorialRouter.get("/memorial/:memorialId", userAuth, getMemorialById);
memorialRouter.get("/memorial", userAuth, getAllMemorials);
memorialRouter.delete("/memorial/:memorialId", userAuth, deleteMemorial);
memorialRouter.patch("/memorial/:memorialId", userAuth, updateMemorial);

export default memorialRouter;
