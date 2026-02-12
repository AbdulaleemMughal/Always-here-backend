import express from 'express';
import { addTheme, getTheme } from '../controller/theme.controller';

const themeRouter = express.Router();

themeRouter.post('/add-theme', addTheme);
themeRouter.get('/get-theme', getTheme);

export default themeRouter;