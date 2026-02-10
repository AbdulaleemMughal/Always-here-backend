import { Request, Response } from "express";
import { userValidation } from "../utils/user.validation";
import bcrypt from "bcrypt";
import User from "../models/user.model";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const alReadyExistEmail = await User.findOne({ email });
    if (alReadyExistEmail) {
      throw new Error("Email already exist. Try another!");
    }

    userValidation(name, email, password);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword, // ✅ fixed spelling
    });

    await user.save();

    const token = await user.getJwtToken();

    res.setHeader("Authorization", `Bearer ${token}`);

    res.status(200).json({
      success: true,
      message: "User created Successfully!",
      token,
      data: {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Error while creating user.",
    });
  }
};

export const logIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Email and Password is required.");
    }

    const savedUser = await User.findOne({ email });
    if (!savedUser) {
      throw new Error("Invalid Credentials!");
    }

    const isPasswordValid = savedUser.validatePassword(password);
    if (!isPasswordValid) {
      throw new Error("Invalid Credentials");
    }

    const token = await savedUser.getJwtToken();

    res.setHeader("Authorization", `Bearer ${token}`);

    res.status(200).json({
      success: true,
      message: "Login Successfull",
      token,
      data: {
        _id: savedUser._id,
        email: savedUser.email,
        name: savedUser.name,
      },
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Error while Log In",
    });
  }
};

export const getLoggedInUser = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("Please Log In");
    }

    const loggedInUser = await User.findById(user._id).select("-password");
    if (!loggedInUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User fetched successfully",
      user: loggedInUser,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Error while Log In",
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token");

    res.status(200).json({
      success: true,
      message: "Logged out successfully!",
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Error while Logging out",
    });
  }
};
