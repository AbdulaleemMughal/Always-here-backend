import type { Response, Request } from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { validateEmail } from "../utils/emailValidation";

dotenv.config();

const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.NODEMAILER_EMAIL_USER,
    pass: process.env.NODEMAILER_EMAIL_PASS,
  },
});

export const sendMail = async (req: Request, res: Response) => {
  try {
    const { fName, lName, email, message } = req.body;

    if (!fName || !lName || !email || !message) {
      throw new Error("All fields are required!");
    }

    validateEmail(email);

    transporter.sendMail({
      to: process.env.NODEMAILER_EMAIL_USER,
      from: email,
      subject: fName + "" + lName,
      html: message,
    });

    res.status(200).json({
      success: true,
      message: "Email sent successfully!",
    });
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
