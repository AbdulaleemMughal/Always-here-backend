import express from "express";
import { connectDatabase } from "./lib/db";
import dotenv from "dotenv";
import cors from "cors";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import userRouter from "./router/user.router";
import faqRouter from "./router/faq.router";
import themeRouter from "./router/theme.router";
import memorialRouter from "./router/memorial.router";
import videoRouter from "./router/video.router";
import favouriteRouter from "./router/favourite.router";
import ObituaryRouter from "./router/obituary.router";
import timelineRouter from "./router/timeline.router";
import familyTreeRouter from "./router/familyTree.router";

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
// for uploading files to the server
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
  limits: { fileSize: 5 * 1024 * 1024 }, 
}));

app.use("/auth", userRouter);
app.use("/api", faqRouter);
app.use("/api", themeRouter);
app.use("/api", memorialRouter);
app.use("/api", videoRouter);
app.use("/api", favouriteRouter);
app.use("/api", ObituaryRouter);
app.use("/api", timelineRouter);
app.use("/api", familyTreeRouter);

connectDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
