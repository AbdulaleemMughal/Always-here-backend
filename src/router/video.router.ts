import express from 'express';
import { deleteVideo, getVideos, updateVideo } from '../controller/video.controller';
import { userAuth } from '../middlewares/userAuth.middleware';

const videoRouter = express.Router();  

videoRouter.patch('/update-video/:memorialId', userAuth, updateVideo);
videoRouter.get('/get-video/:memorialId', userAuth, getVideos);
videoRouter.delete('/delete-video/:memorialId/:videoId', userAuth, deleteVideo)

export default videoRouter;