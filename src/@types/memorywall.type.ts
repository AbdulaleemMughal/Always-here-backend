import mongoose from "mongoose";

export type MemoryWallImageType = {
  _id: mongoose.Types.ObjectId;
  imageUrl: string;
};

export type SingleMemoryWallType = {
  name: string;
  email: string;
  message: string;
  status: "pending" | "selected";
  images?: MemoryWallImageType[];
};

export type MemoryWallType = {
  memorialId?: mongoose.Types.ObjectId;
  heading?: string;
  isActive?: boolean;
  memoryWall?: SingleMemoryWallType[];
};
