import mongoose, { Schema } from "mongoose";
import {
  MemoryWallType,
  SingleMemoryWallType,
} from "../@types/memorywall.type";

const SingleMemoryWallSchema = new Schema<SingleMemoryWallType>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "selected"],
    default: "pending",
  },
  images: [
    {
      imageUrl: {
        type: String,
        required: true,
      },
    },
  ],
});

const MemoryWallSchema = new Schema<MemoryWallType>(
  {
    memorialId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Memorial",
    },

    heading: {
      type: String,
      default: "Memory Wall",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    memoryWall: {
      type: [SingleMemoryWallSchema],
      default: () => [],
    },
  },
  {
    timestamps: true,
  },
);

const MemoryWall = mongoose.model<MemoryWallType>(
  "MemoryWall",
  MemoryWallSchema,
);

export default MemoryWall;
