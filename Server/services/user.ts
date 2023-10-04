import { Response } from "express";
import { userModel } from "../models/user.model";

export const getUserWithId = async (userId: number, res: Response) => {
  try {
    const user = await userModel.findById(userId);
    console.log(user);
    res.json({ success: true, user });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};
