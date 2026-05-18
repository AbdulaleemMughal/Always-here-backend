import { Request, Response } from "express";
import MemoryWall from "../models/memoryWall.model";
import { validateEmail } from "../utils/emailValidation";
import mongoose, { UpdateQuery } from "mongoose";
import { MemoryWallType } from "../@types/memorywall.type";

export const addMemoryWall = async (req: Request, res: Response) => {
  try {
    const { memorialId } = req.params;
    const { name, email, message } = req.body;

    validateEmail(email);

    const memoryWallDocs = await MemoryWall.findOne({ memorialId });

    if (!memoryWallDocs) {
      return res.status(404).json({
        success: false,
        message: "Memory wall not found",
      });
    }

    memoryWallDocs.memoryWall?.push({
      name,
      email,
      message,
      status: "pending",
    });

    await memoryWallDocs.save();

    return res.status(200).json({
      success: true,
      message: "Memory added successfully",
      data: memoryWallDocs,
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message || "Error while updating Favourite",
    });
  }
};

export const updateMemoryWall = async (req: Request, res: Response) => {
  try {
    const { memorialId, memorywallId } = req.params;

    const { heading, isActive } = req.body;

    if (!memorialId) {
      return res.status(401).json({
        success: false,
        message: "Memorial Id not found.",
      });
    }

    if (!memorywallId) {
      return res.status(401).json({
        success: false,
        message: "Memory not found.",
      });
    }

    const updatedObject: UpdateQuery<MemoryWallType> = {};

    if (heading !== undefined) updatedObject.heading = heading;
    if (isActive !== undefined) updatedObject.isActive = isActive;

    const updateMemory = await MemoryWall.findOneAndUpdate(
      { memorialId },
      updatedObject,
      {
        new: true,
        upsert: true,
      },
    );

    return res.status(200).json({
      success: true,
      message: "Favourite section Updated Successfully.",
      data: updateMemory,
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message || "Error while updating Favourite",
    });
  }
};

export const getMemoryWall = async (req: Request, res: Response) => {
  try {
    const { memorialId } = req.params;

    if (!memorialId) {
      return res.status(401).json({
        success: false,
        message: "Memorial Id not found.",
      });
    }

    const memoryWallData = await MemoryWall.findOneAndUpdate(
      { memorialId },
      {
        $setOnInsert: {
          memorialId,
          heading: "Memory Wall",
          isActive: true,
          memoryWall: [],
        },
      },
      {
        new: true,
        upsert: true,
      },
    );

    res.status(200).json({
      success: true,
      message: "Meomory Wall Section Getted Successfully",
      data: memoryWallData,
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message || "Error while updating Favourite",
    });
  }
};

export const deleteMemoryWall = async (req: Request, res: Response) => {
  try {
    const memorialId = req.params.memorialId as string;
    const memorywallId = req.params.memorywallId as string;

    if (!memorialId) {
      return res.status(400).json({
        success: false,
        message: "Memorial Id not found",
      });
    }

    if (!memorywallId) {
      return res.status(400).json({
        success: false,
        message: "Memory wall id not found",
      });
    }

    const updatedMemoryWall = await MemoryWall.findOneAndUpdate(
      { memorialId: new mongoose.Types.ObjectId(memorialId) },
      {
        $pull: {
          memoryWall: {
            _id: new mongoose.Types.ObjectId(memorywallId),
          },
        },
      },
      { new: true },
    );

    if (!updatedMemoryWall) {
      return res.status(404).json({
        success: false,
        message: "Memory wall not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Memory deleted successfully",
      data: updatedMemoryWall,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message || "Error while deleting memory",
    });
  }
};
