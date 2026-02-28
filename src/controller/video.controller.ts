import { Request, Response } from "express";
import Videos from "../models/video.model";
import { VideoType } from "../@types/video.type";
import { UpdateQuery } from "mongoose";

export const updateVideo = async (req: Request, res: Response) => {
  try {
    const { memorialId } = req.params;
    const { heading, isActive, videoUrl } = req.body;

    const updateObject: UpdateQuery<VideoType> = {};

    if (heading !== undefined) {
      updateObject.heading = heading;
    }

    if (isActive !== undefined) {
      updateObject.isActive = isActive;
    }

    if (videoUrl) {
      updateObject.$addToSet = { videos: videoUrl };
    }

    const updatedVideo = await Videos.findOneAndUpdate(
      { memorialId },
      updateObject,
      {
        new: true,
        upsert: true, 
      },
    );

    res.status(200).json({
      success: true,
      data: updatedVideo,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Error while updating video section.",
    });
  }
};


// https://youtu.be/Oa5AzBDSjls?si=bOFF4TrEiPMwact3