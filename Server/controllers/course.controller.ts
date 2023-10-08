import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import cloudinary from "cloudinary";
import ErrorHandler from "../utils/ErrorHandler";
import { createNewCourse } from "../services/course.service";

//upload course
const uploadCourse = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const thumbnail = data.thumbnail;

      const upload = await cloudinary.v2.uploader.upload(thumbnail, {
        folder: "courses",
      });

      data.thumbnail = {
        public_id: upload.public_id,
        url: upload.secure_url,
      };
      createNewCourse(data, res, next);
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 400));
    }
  }
);
