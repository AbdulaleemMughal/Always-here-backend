import express from "express";
import { userAuth } from "../middlewares/userAuth.middleware";
import {
  createTimelineItem,
  deleteTimeline,
  getTimeline,
  updateTimeline,
} from "../controller/timeline.controller";

const timelineRouter = express.Router();

timelineRouter.get("/get-timeline/:memorialId", userAuth, getTimeline);
timelineRouter.post(
  "/create-timeline/:memorialId",
  userAuth,
  createTimelineItem,
);
timelineRouter.patch(
  "/update-timeline/:memorialId/:timelineId",
  userAuth,
  updateTimeline,
);
timelineRouter.delete(
  "/delete-timeline/:memorialId/:timelineId",
  userAuth,
  deleteTimeline,
);

export default timelineRouter;
