import mongoose from "mongoose";

export type Obituary = {
  heading: string;
  isActive: boolean;
  memorialId: mongoose.Types.ObjectId;
  message: string;
};
