import mongoose, { Schema } from "mongoose";
import { MemorialType, UserDetailType } from "../@types/memorial.type";

const UserDetailSchema = new Schema<UserDetailType>({
  coverImage: {
    type: String,
    default:
      "https://alwayshere.fra1.digitaloceanspaces.com/admin_alwayshere--1722321451631_rose-6799477_1920.jpg",
  },
  profileImage: {
    type: String,
    default:
      "https://always-here.vercel.app/_next/static/media/user.afac4556.jpg",
  },
  firstName: {
    type: String,
    default: "First Name",
  },
  middleName: {
    type: String,
    default: "Middle Name",
  },
  lastName: {
    type: String,
    default: "last Name",
  },
  dateOfBirth: {
    type: Date,
    default: Date.now,
  },
  dateOfExpiry: {
    type: Date,
    default: Date.now,
  },
  location: {
    type: String,
    default: "",
  },
});

const MemorialSchema = new Schema<MemorialType>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    accentColor: {
      type: String,
    },
    backgroundColor: {
      type: String,
      default: "#ffffff",
    },
    textColor: {
      type: String,
      default: "#000000",
    },
    fontWeigth: {
      type: String,
      enum: ["bold", "light"],
      default: "light",
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    userDetail: {
      type: UserDetailSchema,
      default: () => ({}),
    },
  },
  {
    timestamps: true,
  },
);

const Memorial = mongoose.model<MemorialType>("Memorial", MemorialSchema);

export default Memorial;
