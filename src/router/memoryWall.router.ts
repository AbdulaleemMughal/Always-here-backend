import express from "express";
import { userAuth } from "../middlewares/userAuth.middleware";
import { addMemoryWall, getMemoryWall, updateMemoryWall } from "../controller/memoryWall.controller";

const memoryRouter = express.Router();

memoryRouter.get("/get-memorywall/:memorialId", userAuth, getMemoryWall);
memoryRouter.patch("/add-memorywall/:memorialId",  userAuth, addMemoryWall);
memoryRouter.patch("/update-memorywall/:memorialId/:memorywallId", userAuth, updateMemoryWall);
memoryRouter.delete("/delete-memorywall/:memorialId/:memorywallId", userAuth, updateMemoryWall);

export default memoryRouter;
