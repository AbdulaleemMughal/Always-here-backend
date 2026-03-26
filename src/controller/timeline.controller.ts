import { Request, Response } from "express";
import Timeline from "../models/timeline.model";
import { UpdateQuery } from "mongoose";
import type { TimelinePayload, TimelineType } from "../@types/timeline.type";

export const getTimeline = async (req: Request, res: Response) => {
  try {
    const { memorialId } = req.params;
    if (!memorialId) {
      return res.status(400).json({
        success: false,
        message: "Memorial ID is required.",
      });
    }

    const timelineData = await Timeline.findOneAndUpdate(
      { memorialId },
      {
        $setOnInsert: {
          memorialId,
          heading: "Timeline",
          isActive: true,
          timeline: [],
        },
      },
      {
        new: true,
        upsert: true,
      },
    );

    res.status(200).json({
      success: true,
      message: "Timeline Getted Successfully",
      data: timelineData,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Error while getting timeline.",
    });
  }
};

export const updateTimeline = async (req: Request, res: Response) => {
  try {
    const { memorialId, timelineId } = req.params;
    const { heading, isActive, headline, description, year, month, day } =
      req.body;

    if (!timelineId) {
      const updatedObject: UpdateQuery<TimelineType> = {};

      if (heading !== undefined) {
        updatedObject.heading = heading;
      }

      if (isActive !== undefined) {
        updatedObject.isActive = isActive;
      }

      const timelineItem: TimelinePayload = {};

      if (headline !== undefined) timelineItem.headline = headline;
      if (description !== undefined) timelineItem.description = description;
      if (year !== undefined) timelineItem.year = year;
      if (month !== undefined) timelineItem.month = month;
      if (day !== undefined) timelineItem.day = day;

      if (Object.keys(timelineItem).length > 0) {
        updatedObject.$push = {
          timeline: timelineItem,
        };
      }

      const updatedTimeline = await Timeline.findOneAndUpdate(
        { memorialId },
        updatedObject,
        {
          new: true,
          upsert: true,
        },
      );

      return res.status(200).json({
        success: true,
        message: "Timeline Section Updated Successfully.",
        data: updatedTimeline,
      });
    }

    const timelineDoc = await Timeline.findOne({
      memorialId,
      "timeline._id": timelineId,
    });

    if (!timelineDoc) {
      return res.status(404).json({
        success: false,
        message: "Timeline item not found",
      });
    }

    const updateFields: any = {};

    if (headline !== undefined)
      updateFields["timeline.$[elem].headline"] = headline;
    if (description !== undefined)
      updateFields["timeline.$[elem].description"] = description;
    if (year !== undefined) updateFields["timeline.$[elem].year"] = year;
    if (month !== undefined) updateFields["timeline.$[elem].month"] = month;
    if (day !== undefined) updateFields["timeline.$[elem].day"] = day;

    const updatedTimeline = await Timeline.findOneAndUpdate(
      { memorialId },
      {
        $set: updateFields,
      },
      {
        new: true,
        arrayFilters: [{ "elem._id": timelineId }],
      },
    );

    res.status(200).json({
      success: true,
      message: "Timeline Section Updated Successfully.",
      data: updatedTimeline,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Error while getting timeline.",
    });
  }
};

export const deleteTimeline = async (req: Request, res: Response) => {
  try {
    const { memorialId, timelineId } = req.params;

    const updateTimeline = await Timeline.findOneAndUpdate(
      { memorialId },
      { $pull: { timeline: { _id: timelineId } } },
      { new: true },
    );

    if (!updateTimeline) {
      return res.status(404).json({
        success: false,
        message: "Timeline section not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Timeline Delete Successfully.",
      data: updateTimeline,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Error while getting timeline.",
    });
  }
};
