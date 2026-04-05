import type { Response, Request } from "express";
import type { UploadedFile } from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
import Memorial from "../models/memorial.model";
import Videos from "../models/video.model";
import Timeline from "../models/timeline.model";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

    const videoSection = await Videos.findOne({ memorialId });
    const totalVideos = videoSection?.videos?.length || 0;

    const timelineSection = await Timeline.findOne({ memorialId });
    const totalTimelines = timelineSection?.timeline?.length || 0;

    const memorialWithVideos = {
      ...memorial.toObject(),
      totalVideos,
      totalTimelines,
    };

    res.status(200).json({
      success: true,
      message: "Memorial fetched successfully.",
      data: memorialWithVideos,
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

    const files = req.files as {
      coverImage?: UploadedFile | UploadedFile[];
      profileImage?: UploadedFile | UploadedFile[];
    };


    const updateFields: any = { ...req.body };

    const memorial = await Memorial.findOne({
      _id: memorialId,
      userId: user?._id,
    });

    if (!memorial) {
      return res.status(404).json({
        success: false,
        message: "Memorial not found",
      });
    }

    const profileFile = Array.isArray(files?.profileImage)
      ? files.profileImage[0]
      : files?.profileImage;

    const coverFile = Array.isArray(files?.coverImage)
      ? files.coverImage[0]
      : files?.coverImage;

    if (coverFile) {
      try {
        //deleting the previous image from the cloudinary to avoid the unnecessary storage
        if (memorial.coverImagePublicId) {
          await cloudinary.uploader.destroy(memorial.coverImagePublicId);
        }

        const upload = await cloudinary.uploader.upload(
          coverFile.tempFilePath,
          {
            folder: "memorial_images/covers",
          },
        );
        updateFields["userDetail.coverImage"] = upload.secure_url;
        updateFields["coverImagePublicId"] = upload.public_id;
      } catch (cloudinaryError) {
        console.error("Cloudinary upload error:", cloudinaryError);
        throw cloudinaryError;
      }
    }

    if (profileFile) {
      try {
        if (memorial.profileImagePublicId) {
          await cloudinary.uploader.destroy(memorial.profileImagePublicId);
        }

        const upload = await cloudinary.uploader.upload(
          profileFile.tempFilePath,
          {
            folder: "memorial_images/profiles",
          },
        );
        updateFields["userDetail.profileImage"] = upload.secure_url;
        updateFields["profileImagePublicId"] = upload.public_id;
      } catch (cloudinaryError) {
        console.error("Cloudinary upload error:", cloudinaryError);
        throw cloudinaryError;
      }
    }

    const updatedMemorial = await Memorial.findByIdAndUpdate(
      memorialId,
      updateFields,
      { new: true },
    );

    return res.status(200).json({
      success: true,
      message: "Memorial updated successfully",
      data: updatedMemorial,
    });
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
