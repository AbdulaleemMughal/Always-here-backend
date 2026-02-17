import mongoose from "mongoose";

export type TimelineType = {
    memorialId: mongoose.Types.ObjectId;
    year: number;
    month: number;
    day: number;
    headline: string;
    description: string;
}