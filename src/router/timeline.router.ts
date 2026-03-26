import express from "express";
import { userAuth } from "../middlewares/userAuth.middleware";
import { deleteTimeline, getTimeline, updateTimeline } from "../controller/timeline.controller";

const timelineRouter = express.Router();

timelineRouter.get("/get-timeline/:memorialId", userAuth, getTimeline);
timelineRouter.patch("/update-timeline/:memorialId", userAuth, updateTimeline);
timelineRouter.patch("/update-timeline/:memorialId/:timelineId", userAuth, updateTimeline);
timelineRouter.delete("/delete-timeline/:memorialId/:timelineId", userAuth, deleteTimeline);

export default timelineRouter;
