import type { Response, Request } from "express";
import Memorial from "../models/memorial.model";

// when the user select from the theme this api runs
export const addMemorial = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const { keyword } = req.params;

    const newMemorial = new Memorial({
      userId: user?._id,
      accentColor:
        keyword === "cherry"
          ? "#ffc0cb"
          : keyword === "rose"
            ? "#007399"
            : "#ffffff",
    });

    await newMemorial.save();

    res.status(200).json({
      success: true,
      message: "Memorial Update Successfully",
      data: newMemorial,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Error while creating user.",
    });
  }
};

// for fetching the data of the memorial page when the user click on the memorial page from dashboard
export const getMemorialById = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const { memorialId } = req.params;

    const memorial = await Memorial.findOne({
      userId: user?._id,
      _id: memorialId,
    });

    if (!memorial) {
      return res.status(404).json({
        success: false,
        message: "Memorial not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Memorial fetched successfully.",
      data: memorial,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Error while fetching memorial data.",
    });
  }
};

// for dashboard: to show all the memorial of the loggedIn User

export const getAllMemorials = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const memorials = await Memorial.find({ userId: user?._id });

    res.status(200).json({
      success: true,
      message: "Memorials fetched successfully.",
      data: memorials,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Error while fetching memorials.",
    });
  }
};

//for delelting the memorial when the user click on delete button in the dashboard
export const deleteMemorial = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const { memorialId } = req.params;

    const deletedMemorial = await Memorial.findOneAndDelete({
      userId: user?._id,
      _id: memorialId,
    });

    if (!deletedMemorial) {
      return res.status(404).json({
        success: false,
        message: "Memorial not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Memorial deleted successfully.",
      data: deletedMemorial,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Error while deleting memorial.",
    });
  }
};

export const updateMemorial = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const { memorialId } = req.params;
    const updateData = req.body;

    const updatedMemorial = await Memorial.findOneAndUpdate(
      { userId: user?._id, _id: memorialId },
      updateData,
      { new: true },
    );

    if (!updatedMemorial) {
      return res.status(404).json({
        success: false,
        message: "Memorial not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Memorial updated successfully.",
      data: updatedMemorial,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Error while updating memorial.",
    });
  }
};
