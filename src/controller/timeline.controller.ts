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

export const createTimelineItem = async (req: Request, res: Response) => {
  try {
    const { memorialId } = req.params;

    const defaultTimelineItem = {
      headline: "Headline",
      description: "Description",
      year: "",
      month: "",
      day: "",
    };

    const updatedTimeline = await Timeline.findOneAndUpdate(
      { memorialId },
      {
        $push: { timeline: defaultTimelineItem },
      },
      {
        new: true,
        upsert: true,
      },
    );

    return res.status(200).json({
      success: true,
      message: "Timeline Updated Successfully.",
      data: updatedTimeline,
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message || "Error while creating timeline item.",
    });
  }
};

export const updateTimeline = async (req: Request, res: Response) => {
  try {
    const { memorialId, timelineId } = req.params;
    const { heading, isActive, headline, description, year, month, day } =
      req.body;

    const updateFields: UpdateQuery<TimelineType> = {};
    let hasArrayUpdates = false;

    /* Update section fields */
    if (heading !== undefined) updateFields.heading = heading;
    if (isActive !== undefined) updateFields.isActive = isActive;

    /* Update timeline item fields */
    if (timelineId) {
      if (headline !== undefined) {
        updateFields["timeline.$[elem].headline"] = headline;
        hasArrayUpdates = true;
      }

      if (description !== undefined) {
        updateFields["timeline.$[elem].description"] = description;
        hasArrayUpdates = true;
      }

      if (year !== undefined) {
        updateFields["timeline.$[elem].year"] = year;
        hasArrayUpdates = true;
      }

      if (month !== undefined) {
        updateFields["timeline.$[elem].month"] = month;
        hasArrayUpdates = true;
      }

      if (day !== undefined) {
        updateFields["timeline.$[elem].day"] = day;
        hasArrayUpdates = true;
      }
    }

    // Check if there are any fields to update
    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields provided for update",
      });
    }

    // Build the update options
    const updateOptions: any = { new: true };

    // Only add arrayFilters if we're actually updating array elements and timelineId exists
    if (timelineId && hasArrayUpdates) {
      updateOptions.arrayFilters = [{ "elem._id": timelineId }];
    }

    const updatedTimeline = await Timeline.findOneAndUpdate(
      { memorialId },
      { $set: updateFields },
      updateOptions,
    );

    if (!updatedTimeline) {
      return res.status(404).json({
        success: false,
        message: "Timeline not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Timeline updated successfully",
      data: updatedTimeline,
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message || "Error while updating timeline.",
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
