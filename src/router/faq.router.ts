import express from 'express';
import { addFaq, deleteFaq, getFaq } from '../controller/faq.controller';

const faqRouter = express.Router();

faqRouter.post("/add-faq", addFaq);
faqRouter.get('/get-faq', getFaq);
faqRouter.delete(`/delete-faq/:faq_id`, deleteFaq);

export default faqRouter;