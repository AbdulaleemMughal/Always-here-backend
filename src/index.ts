import express from "express";
import { connectDatabase } from "./lib/db";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./router/user.router";

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

app.use("/auth", userRouter)

connectDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
