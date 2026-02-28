import mongoose, { Schema } from "mongoose";
import { VideoType } from "../@types/video.type";

const VideoSchema = new Schema<VideoType>(
  {
    memorialId: {
      type: Schema.Types.ObjectId,
      ref: "Memorial",
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
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Videos = mongoose.model<VideoType>("Videos", VideoSchema);

export default Videos;
