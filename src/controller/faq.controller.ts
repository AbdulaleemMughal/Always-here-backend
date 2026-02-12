import { Request, Response } from "express";
import FAQ from "../models/faq.model";

export const addFaq = async (req: Request, res: Response) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({
        success: false,
        message: "Question and Answer are required!",
      });
    }

    const newFaq = new FAQ({
      question,
      answer,
    });

    await newFaq.save();

    res.status(200).json({
      success: true,
      message: "FAQ added successfully",
      faq: newFaq,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Error while adding faq",
    });
  }
};

export const getFaq = async (_req: Request, res: Response) => {
  try {
    const allFaq = await FAQ.find({});

    res.status(200).json({
      success: true,
      messgae: "Faq getted Successfully",
      faqs: allFaq,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Error while getting faq",
    });
  }
};

export const deleteFaq = async (req: Request, res: Response) => {
  try {
    const { faq_id } = req.params;

    const deletedFaq = await FAQ.findByIdAndDelete({ _id: faq_id });

    res.status(200).json({
      success: true,
      messgae: "Faq deleted Successfully",
      faqs: deletedFaq,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Error while deleting faq",
    });
  }
};
