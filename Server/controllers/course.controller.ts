import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import cloudinary from "cloudinary";
import ErrorHandler from "../utils/ErrorHandler";
import { createNewCourse } from "../services/course.service";
import { userModel } from "../models/user.model";
import CourseModel from "../models/course.model";

//upload course
export const uploadCourse = catchAsyncErrors(
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
//edit course
export const editCourse = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const courseId = req.params.id;
    const data = req.body;
    try {
      if (data.thumbnail) {
        await cloudinary.v2.uploader.destroy(data.thumbnail.public_id);
        const newUpload = await cloudinary.v2.uploader.upload(data.thumbnail, {
          folder: "courses",
        });

        data.thumbnail = {
          public_id: newUpload.public_id,
          url: newUpload.secure_url,
        };
      }

      const course = await userModel.findByIdAndUpdate(
        courseId,
        { $set: data },
        { new: true }
      );

      res.status(200).json({ success: true, course });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 400));
    }
  }
);
//get course by courseId

export const getCourseByCourseId = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const courseId = req.params.id;
    if (!courseId) return next(new ErrorHandler("Course not found", 400));
    try {
      const course = await userModel
        .findById(courseId)
        .select(
          "-courseData.questions -courseData.links -courseData.suggestion -courseData.videoUrl"
        );
      res.status(200).json({ sucess: true, course });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);

//get all courses
export const getAllCourses = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courses = await CourseModel.find().select(
        "-courseData.questions -courseData.links -courseData.suggestion -courseData.videoUrl"
      );
      res.status(200).json({ sucess: true, courses });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);
