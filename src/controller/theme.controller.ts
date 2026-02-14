import { Request, Response } from "express";
import Theme from "../models/theme.model";

export const addTheme = async (req: Request, res: Response) => {
  try {
    const {
      accentColor,
      backgroundColor,
      textColor,
      selectedImage,
      thumbnailImage,
      themeKeywords,
      themeTitle,
    } = req.body;

    const newTheme = new Theme({
      accentColor,
      backgroundColor,
      textColor,
      selectedImage,
      thumbnailImage,
      themeKeywords,
      themeTitle,
    });

    await newTheme.save();

    res.status(200).json({
      status: true,
      message: "Theme Added Successfully!",
      theme: newTheme,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Error while adding theme.",
    });
  }
};

export const getTheme = async (_req: Request, res: Response) => {
  try {
    const themes = await Theme.find({});

    res.status(200).json({
      success: true,
      message: "Theme getted successfully",
      themes,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Error while creating user.",
    });
  }
};
