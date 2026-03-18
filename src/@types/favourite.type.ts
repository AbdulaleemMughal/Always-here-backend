import mongoose from "mongoose";

export type FavouriteType = {
    memorialId?: mongoose.Types.ObjectId;
    isActive?: boolean;
    heading?: string;
    favourites?: {
        id?: mongoose.Types.ObjectId;
        question?: string;
        answer?: string;
    }[];
};