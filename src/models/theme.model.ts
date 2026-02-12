import mongoose, { Schema } from "mongoose";
import { ThemeType } from "../@types/theme.type";

const ThemeSchema = new Schema<ThemeType>({
  accentColor: {
    type: String,
    required: true,
  },
  backgroundColor: {
    type: String,
    required: true,
  },
  textColor: {
    type: String,
    required: true,
  },
  thumbnailImage: {
    type: String,
    required: true,
  },
  selectedImage: {
    type: String,
    required: true,
  },
  themeKeywords: {
    type: String,
  },
  themeTitle: {
    type: String,
    required: true,
  },
}, {
    timestamps: true
});

const Theme = mongoose.model<ThemeType>("Theme", ThemeSchema);

export default Theme;
