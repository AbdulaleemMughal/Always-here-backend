import { Request, Response } from "express";
import Obituary from "../models/obituary.model";
import { UpdateQuery } from "mongoose";
import { ObituaryType } from "../@types/obituary.type";
import sanitizeHtml from "sanitize-html";

export const updateObituary = async (req: Request, res: Response) => {
  try {
    const { memorialId } = req.params;
    const { heading, isActive, message } = req.body;

    if (!memorialId) {
      return res.status(400).json({
        success: false,
        message: "Memorial ID is required",
      });
    }

    const updatedObject: UpdateQuery<ObituaryType> = {};

    if (heading !== undefined) updatedObject.heading = heading;

    if (isActive !== undefined) updatedObject.isActive = isActive;

    if (message !== undefined) {
      const cleanedMessage = sanitizeHtml(message);
      updatedObject.message = cleanedMessage;
    }

    const newObituary = await Obituary.findOneAndUpdate(
      { memorialId },
      {
        ...updatedObject,
        memorialId,
      },
      {
        new: true,
        upsert: true,
      },
    );

    res.status(200).json({
      success: true,
      message: "Obituary Section Updated Successfully.",
      data: newObituary,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Error while Updating Obituary",
    });
  }
};

export const getObituary = async (req: Request, res: Response) => {
  try {
    const { memorialId } = req.params;

    if (!memorialId) {
      return res.status(404).json({
        success: false,
        message: "Memorial Id is required!",
      });
    }

    const obituaryData = await Obituary.findOneAndUpdate(
      { memorialId },
      {
        $setOnInsert: {
          memorialId,
          heading: "My Story",
          isActive: true,
          message: "<p>You can write the story here</p>",
        },
      },
      {
        new: true,
        upsert: true,
      },
    );

    res.status(200).json({
      success: true,
      message: "Obituary Getted Successfully!",
      data: obituaryData,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Error while getting Obituary",
    });
  }
};
