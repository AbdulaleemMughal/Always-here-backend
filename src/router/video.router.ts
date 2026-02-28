import express from 'express';
import { updateVideo } from '../controller/video.controller';
import { userAuth } from '../middlewares/userAuth.middleware';

const videoRouter = express.Router();  

videoRouter.patch('/update-video/:memorialId', userAuth, updateVideo);

export default videoRouter;