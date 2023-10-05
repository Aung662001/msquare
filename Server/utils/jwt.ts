import { Response } from "express";
import { Iduser } from "../models/user.model";
import { redis } from "./redis";
interface CookieOptions {
  expires: Date;
  httpOnly: boolean;
  secure?: boolean;
  sameSite: boolean | "lax" | "strict" | "none" | undefined;
}
export const accessCookieOptions: CookieOptions = {
  expires: new Date(Date.now() + 1000 * 60 * 60 * 5),
  httpOnly: true,
  sameSite: "lax",
};
const refreshCookieOption: CookieOptions = {
  expires: new Date(Date.now() + 1000 * 60 * 60 * 60 * 24 * 3),
  httpOnly: true,
  sameSite: "lax",
};
export const sendToken = async (
  user: Iduser,
  statusCode: number,
  res: Response
) => {
  const accessToken = user.getAccessToken();
  const refreshToken = user.getRefreshToken();

  //upload sessions to redis
  redis.set(user._id, JSON.stringify(user));
  res.cookie("access_token", accessToken, accessCookieOptions);
  res.cookie("refresh_token", refreshToken, refreshCookieOption);

  res.status(statusCode).json({
    success: true,
    user: user,
    token: accessToken,
  });
};
