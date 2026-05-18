import express from "express";
import { sendMail } from "../controller/contact.controller";

const ContactRouter = express.Router();

ContactRouter.post("/send-mail", sendMail);

export default ContactRouter;
