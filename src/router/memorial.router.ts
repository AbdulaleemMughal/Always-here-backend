import express from 'express';
import { getMemorial } from '../controller/memorial.controller';
import { userAuth } from '../middlewares/userAuth.middleware';

const memorialRouter = express.Router();

memorialRouter.post("/add-memorial/:keyword", userAuth, getMemorial);

export default memorialRouter;