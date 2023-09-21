import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";
module.exports = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //wrong mongodb id
  if (err.name === "CastError") {
    const message = `Resource not found . Invalid:${err.path}`;
    err = new ErrorHandler(message, 404);
  }
  //duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate key error. Invalid:${err.keyValue} entered`;
    err = new ErrorHandler(message, 400);
  }
  //wrong jwt token
  if (err.name === "JsonWebTokenError") {
    const message = `Josn Token is unvalid . Please try again`;
    err = new ErrorHandler(message, 401);
  }
  //jwt expired error
  if (err.name === "TokenExpiredError") {
    const message = `Token has expired. Please login again`;
    err = new ErrorHandler(message, 401);
  }
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
