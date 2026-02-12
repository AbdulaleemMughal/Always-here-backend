import { Document } from "mongoose";

export interface ThemeType extends Document {
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  selectedImage: string;
  thumbnailImage: string;
  themeKeywords: string;
  themeTitle: string;
}
