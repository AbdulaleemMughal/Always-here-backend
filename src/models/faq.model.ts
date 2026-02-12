import mongoose, { Schema } from "mongoose";
import { FaqType } from "../@types/Faq.type";

const FaqSchema = new Schema<FaqType>(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const FAQ = mongoose.model<FaqType>("FAQ", FaqSchema);

export default FAQ;
