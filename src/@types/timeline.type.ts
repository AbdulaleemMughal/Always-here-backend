import mongoose from "mongoose";

export type TimelineType = {
  memorialId?: mongoose.Types.ObjectId;
  heading?: string;
  isActive?: boolean;
  timeline?: TimelinePayload[];
};

export type TimelinePayload = {
  _id?: string;
  year?: number;
  month?: string;
  day?: number;
  headline?: string;
  description?: string;
};
