import { Response } from "express";
import { userModel } from "../models/user.model";
import { redis } from "../utils/redis";

export const getUserWithId = async (userId: string, res: Response) => {
  try {
    const userJson = await redis.get(userId);
    console.log(userId);
    console.log(userJson);
    if (userJson) {
      let user = JSON.parse(userJson);
      res.json({ success: true, user });
    } else {
      res.status(500).json({ success: false, message: "User not found" });
    }
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};
