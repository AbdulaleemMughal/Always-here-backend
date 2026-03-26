import mongoose, { Schema } from "mongoose";
import { VideoType } from "../@types/video.type";

const VideoSchema = new Schema<VideoType>(
  {
    memorialId: {
      type: Schema.Types.ObjectId,
      ref: "Memorial",
      required: true,
    },
    heading: {
      type: String,
      default: "Videos",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    videos: [
      {
        url: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Videos = mongoose.model<VideoType>("Videos", VideoSchema);

export default Videos;
