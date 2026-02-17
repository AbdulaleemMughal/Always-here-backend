import mongoose from "mongoose";

export type UserDetailType = {
  coverImage: string;
  profileImage: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: Date;
  dateOfExpiry: Date;
  location: string;
};

export type MemorialType = {
  userId: mongoose.Types.ObjectId;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  fontWeigth: string;
  userDetail: UserDetailType;
};


