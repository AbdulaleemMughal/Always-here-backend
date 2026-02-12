import express from "express";
import { connectDatabase } from "./lib/db";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./router/user.router";
import faqRouter from "./router/faq.router";
import themeRouter from "./router/theme.router";

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    methods: ["POST", "PUT", "GET", "DELETE", "PATCH"],
    credentials: true,
  }),
);

app.use('/auth', userRouter);
app.use('/api', faqRouter);
app.use('/api', themeRouter)

connectDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
