import { Request, Response } from "express";
import FamilyTree from "../models/familyTree.model";
import { FamilyTreeType } from "../@types/familyTree.type";

export const getFamilyTree = async (req: Request, res: Response) => {
  try {
    const { memorialId } = req.params;

    if (!memorialId) {
      return res.status(400).json({
        success: false,
        message: "Memorial ID is required.",
      });
    }

    let familyTreeData = await FamilyTree.findOne({ memorialId });

    if (!familyTreeData) {
      familyTreeData = await FamilyTree.create({
        memorialId,
        heading: "Family Tree",
        isActive: true,
        treeData: {
          children: [],
          f_grandFather: null,
          f_grandMother: null,
          father: null,
          siblings: [],
          m_grandFather: null,
          m_grandMother: null,
          mother: null,
          wifes: [],
        },
      });
    }

    res.status(200).json({
      success: true,
      message: "Family Tree Retrieved Successfully",
      data: familyTreeData,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Error while fetching family tree.",
    });
  }
};

export const updateFamilyTree = async (req: Request, res: Response) => {
  try {
    const { memorialId } = req.params;
    const { heading, isActive, treeData } = req.body;

    const updateTreeData: FamilyTreeType = {};

    if (heading !== undefined) {
      updateTreeData.heading = heading;
    }

    if (isActive !== undefined) {
      updateTreeData.isActive = isActive;
    }

    if (treeData !== undefined) {
      updateTreeData.treeData = treeData;
    }

    const updatedFamilyTree = await FamilyTree.findOneAndUpdate(
      { memorialId },
      { $set: updateTreeData },
      { new: true },
    );

    res.status(200).json({
      success: true,
      message: "Family Tree Updated Successfully.",
      data: updatedFamilyTree,
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message || "Error while creating timeline item.",
    });
  }
};
