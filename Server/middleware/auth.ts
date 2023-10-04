import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redis } from "../utils/redis";
import { catchAsyncErrors } from "./catchAsyncErrors";

export const isAuthenticated = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.cookies.access_token;

    if (!access_token) {
      return next(new ErrorHandler("You need to Login First!", 400));
    }

    const decoded = jwt.verify(
      access_token,
      process.env.ACCESS_TOKEN || ""
    ) as JwtPayload;
    if (!decoded) {
      return next(new ErrorHandler("Invalid token", 400));
    }

    const user = (await redis.get(decoded.id)) as string;

    req.user = JSON.parse(user);
    next();
  }
);
