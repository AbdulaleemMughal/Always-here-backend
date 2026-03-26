import mongoose from "mongoose";

export type ObituaryType = {
  heading?: string;
  isActive?: boolean;
  memorialId: mongoose.Types.ObjectId;
  message?: string;
};
