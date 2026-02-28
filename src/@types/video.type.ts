import mongoose from "mongoose";

export type VideoType = {
    memorialId?: mongoose.Types.ObjectId;
    heading?: string;
    isActive?: boolean;
    videos?: [string];
};