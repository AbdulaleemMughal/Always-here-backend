import type { Response, Request } from "express";
import Memorial from "../models/memorial.model";

export const getMemorial = async (req: Request, res: Response) => {
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
