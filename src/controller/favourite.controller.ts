import { Request, Response } from "express";
import { UpdateQuery } from "mongoose";
import { FavouriteType } from "../@types/favourite.type";
import Favourite from "../models/favourite.model";

export const updateFavourite = async (req: Request, res: Response) => {
  try {
    const { memorialId, favouriteId } = req.params;
    const { heading, isActive, question, answer } = req.body;

    if (!favouriteId) {
      const updatedObject: UpdateQuery<FavouriteType> = {};

      if (heading !== undefined) updatedObject.heading = heading;
      if (isActive !== undefined) updatedObject.isActive = isActive;
      if (question || answer) {
        updatedObject.$addToSet = { favourites: { question, answer } };
      }

      const updatedFavourite = await Favourite.findOneAndUpdate(
        { memorialId },
        updatedObject,
        { new: true, upsert: true },
      );

      return res.status(200).json({
        success: true,
        message: "Favourite section Updated Successfully.",
        data: updatedFavourite,
      });
    }

    if (!question && !answer) {
      return res.status(400).json({
        success: false,
        message: "Both fields are required",
      });
    }

    const favouriteDoc = await Favourite.findOne({
      memorialId,
      "favourites._id": favouriteId,
    });

    if (!favouriteDoc) {
      return res.status(404).json({
        success: false,
        message: "Favourite item not found",
      });
    }

    const updateFields: any = {};

    if (question !== undefined) {
      updateFields["favourites.$[elem].question"] = question;
    }

    if (answer !== undefined) {
      updateFields["favourites.$[elem].answer"] = answer;
    }

    const updatedFavourite = await Favourite.findOneAndUpdate(
      { memorialId },
      {
        $set: updateFields,
      },
      {
        new: true,
        arrayFilters: [{ "elem._id": favouriteId }],
      },
    );

    console.log(updateFields);

    return res.status(200).json({
      success: true,
      message: "Favourite item updated successfully",
      data: updatedFavourite,
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message || "Error while updating Favourite",
    });
  }
};

export const getFavourites = async (req: Request, res: Response) => {
  try {
    const { memorialId } = req.params;

    if (!memorialId) {
      return res.status(400).json({
        success: false,
        message: "Memorial ID is required.",
      });
    }

    const favouriteData = await Favourite.findOneAndUpdate(
      { memorialId },
      {
        $setOnInsert: {
          memorialId,
          heading: "Favourite",
          isActive: true,
          favourites: [],
        },
      },
      {
        new: true,
        upsert: true,
      },
    );

    res.status(200).json({
      success: true,
      message: "Favourite Section Getted Successfully",
      data: favouriteData,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Error while getting Favourite section.",
    });
  }
};

// export const updateFavourite = async (req: Request, res: Response) => {
//   try {

//     const { memorialId, favouriteId } = req.params;

//   } catch (err: any) {
//     res.status(400).json({
//       success: false,
//       message: err.message || "Error while deleting Favourite section.",
//     });
//   }
// }

export const deleteFavourite = async (req: Request, res: Response) => {
  try {
    const { memorialId, favouriteId } = req.params;

    const updatedFavourite = await Favourite.findOneAndUpdate(
      { memorialId, "favourites._id": favouriteId },
      {
        $pull: { favourites: { _id: favouriteId } },
      },
      { new: true },
    );

    if (!updatedFavourite) {
      return res.status(404).json({
        success: false,
        message: "Favourite section not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Favourite deleted successfully",
      data: updatedFavourite,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Error while deleting Favourite section.",
    });
  }
};
