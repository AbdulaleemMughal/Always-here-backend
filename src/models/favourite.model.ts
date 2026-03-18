import mongoose, { Schema } from "mongoose";
import { FavouriteType } from "../@types/favourite.type";

const FavouriteSchema = new Schema<FavouriteType>(
  {
    memorialId: {
      type: Schema.Types.ObjectId,
      ref: "Memorial",
    },
    heading: {
      type: String,
      default: "Favourite",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    favourites: [
      {
        question: {
          type: String,
        },
        answer: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Favourite = mongoose.model<FavouriteType>("Favourite", FavouriteSchema);
export default Favourite;
