import { Response } from "express";
import jwt from "jsonwebtoken";
import { Iduser } from "../models/user.model";
import { redis } from "./redis";
interface CookieOptions {
  expires: Date;
  httpOnly: boolean;
  secure?: boolean;
  sameSite: boolean | "lax" | "strict" | "none" | undefined;
}
const accessCookieOptions: CookieOptions = {
  expires: new Date(Date.now() + 1000 * 60 * 60),
  httpOnly: true,
  sameSite: "lax",
};
const refreshCookieOption: CookieOptions = {
  expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
  httpOnly: true,
  sameSite: "lax",
};
export const sendToken = (user: Iduser, statusCode: number, res: Response) => {
  const accessToken = user.getAccessToken();
  const refreshToken = user.getRefreshToken();

  //upload sessions to redis
  redis.set(user._id, JSON.stringify(user));

  res.cookie("access_token", accessToken, accessCookieOptions);
  res.cookie("refresh_token", refreshToken, refreshCookieOption);

  res.send(statusCode).json({
    success: true,
    user: user,
    token: accessToken,
  });
};
