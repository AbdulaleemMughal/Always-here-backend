import { Request, Response } from "express";
import Videos from "../models/video.model";
import { VideoType } from "../@types/video.type";
import { UpdateQuery } from "mongoose";
import { isYoutubeLinkIsValid } from "../utils/youtubeLink.validation";

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
      if (!isYoutubeLinkIsValid(videoUrl)) {
        return res.status(404).json({
          success: false,
          message: "Enter the Valid Youtube Link.",
        });
      }
      updateObject.$addToSet = { videos: { url: videoUrl } };
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
      message: "Video Section Updated Successfully.",
      data: updatedVideo,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Error while updating video section.",
    });
  }
};

export const getVideos = async (req: Request, res: Response) => {
  try {
    const { memorialId } = req.params;

    if (!memorialId) {
      return res.status(400).json({
        success: false,
        message: "Memorial ID is required.",
      });
    }

    const videoData = await Videos.findOneAndUpdate(
      { memorialId },
      {
        $setOnInsert: {
          memorialId,
          heading: "Videos",
          isActive: true,
          videos: [],
        },
      },
      {
        new: true,
        upsert: true,
      },
    );

    res.status(200).json({
      success: true,
      message: "Videos Getted Successfully",
      data: videoData,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Error while getting videos.",
    });
  }
};

export const deleteVideo = async (req: Request, res: Response) => {
  try {
    const { memorialId, videoId } = req.params;

    const updatedVideoSection = await Videos.findOneAndUpdate(
      { memorialId, "videos._id": videoId },
      {
        $pull: { videos: { _id: videoId } },
      },
      { new: true },
    );

    if (!updatedVideoSection) {
      return res.status(404).json({
        success: false,
        messgae: "Video section not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Video deleted successfully",
      data: updatedVideoSection,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Error while deleting video.",
    });
  }
};
