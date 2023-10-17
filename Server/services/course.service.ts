import { NextFunction, Response } from "express";
import CourseModel from "../models/course.model";
import ErrorHandler from "../utils/ErrorHandler";

export const createNewCourse = async (
  data: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const course = await CourseModel.create(data);
    res.status(200).json({ success: true, course });
  } catch (err: any) {
    return next(new ErrorHandler(err.message, 500));
  }
};

//get all courses 
export const getAllCoursesService = async (res: Response) => {
   const courses = await CourseModel.find().sort({ createdAt: -1 });
   res.status(200).json({ success: true, courses });
}
