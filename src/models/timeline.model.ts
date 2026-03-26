import mongoose, { Schema } from "mongoose";
import { TimelineType } from "../@types/timeline.type";

const TimelineSchema = new Schema<TimelineType>(
  {
    memorialId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Memorial",
      required: true,
    },
    heading: {
      type: String,
      default: "Timeline",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    timeline: [
      {
        headline: {
          type: String,
          default: "Heading",
        },
        description: {
          type: String,
          default: "Description",
        },
        year: {
          type: Number,
        },
        month: {
          type: String,
          default: ""
        },
        day: {
          type: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Timeline = mongoose.model<TimelineType>("Timeline", TimelineSchema);

export default Timeline;
