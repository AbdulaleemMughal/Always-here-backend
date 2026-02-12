import mongoose, { Model, Schema } from "mongoose";
import { IUser } from "../@types/User.type";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

dotenv.config();

interface IUserMethods {
  getJwtToken(): Promise<string>;
  validatePassword(password: string): boolean;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const UserSchema = new Schema<IUser, Model<IUser, {}, IUserMethods>>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.methods.getJwtToken = function (): string {
  const user = this;
  const jwtSecret = process.env.JWT_SECRET_KEY;

  if (!jwtSecret) {
    throw new Error("JWT Sceret is not present in the enviromental variables.");
  }

  const token = jwt.sign({ _id: user._id }, jwtSecret, {
    expiresIn: "7d",
  });

  return token;
};

UserSchema.methods.validatePassword = async function (
  passwordInputByUser: string,
): Promise<boolean> {
  const user = this;
  const hashedPassword = user.password;

  return await bcrypt.compare(passwordInputByUser, hashedPassword);
};

const User =
  (mongoose.models.User as UserModel) ||
  mongoose.model<IUser, UserModel>("User", UserSchema);

export default User;
