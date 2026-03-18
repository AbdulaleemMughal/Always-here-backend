import express from "express";
import {
  updateFavourite,
  deleteFavourite,
  getFavourites,
} from "../controller/favourite.controller";
import { userAuth } from "../middlewares/userAuth.middleware";

const favouriteRouter = express.Router();

favouriteRouter.patch("/update-favourite/:memorialId", userAuth, updateFavourite);
favouriteRouter.patch(
  "/update-favourite/:memorialId/:favouriteId",
  userAuth,
  updateFavourite,
);
favouriteRouter.get("/get-favourite/:memorialId", userAuth, getFavourites);
favouriteRouter.delete(
  "/delete-favourite/:memorialId/:favouriteId",
  userAuth,
  deleteFavourite,
);

export default favouriteRouter;
