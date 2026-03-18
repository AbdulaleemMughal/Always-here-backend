import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_NAME = process.env.MONGODB_NAME;

export const connectDatabase = async () => {
  if (!MONGODB_URI || !MONGODB_NAME) {
    throw new Error("MongoDB environment variables are missing");
  }

  await mongoose.connect(MONGODB_URI + MONGODB_NAME);
  console.log("Database connected successfully!");
}; 
