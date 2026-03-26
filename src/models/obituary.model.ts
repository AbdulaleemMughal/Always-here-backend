import mongoose, { Schema } from "mongoose";
import { ObituaryType } from "../@types/obituary.type";

const ObituarySchema = new Schema<ObituaryType>(
  {
    memorialId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Memorial",
      required: true,
    },
    heading: {
      type: String,
      default: "My Story",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    message: {
      type: String,
      default: "<p>You can write the story here</p>",
    },
  },
  {
    timestamps: true,
  },
);

const Obituary = mongoose.model<ObituaryType>("Obituary", ObituarySchema);

export default Obituary;
