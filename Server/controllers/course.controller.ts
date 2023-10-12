import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import cloudinary from "cloudinary";
import ErrorHandler from "../utils/ErrorHandler";
import { createNewCourse } from "../services/course.service";
import { userModel } from "../models/user.model";
import CourseModel from "../models/course.model";
import { redis } from "../utils/redis";
import mongoose from "mongoose";

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
      //search cached in redis
      const redisCached = await redis.get(courseId);

      //if cached exists then send response
      if (redisCached) {
        const course = JSON.parse(redisCached);
        return res.status(200).json({ success: true, course });
      }

      const course = await userModel
        .findById(courseId)
        .select(
          "-courseData.questions -courseData.links -courseData.suggestion -courseData.videoUrl"
        );
      //add cached to redis
      await redis.set(courseId, JSON.stringify(course));
      res.status(200).json({ sucess: true, course });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);

//get all courses -- without purchase any charge
export const getAllCourses = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //search cached in redis
      const redisCached = await redis.get("allCourses");
      if (redisCached) {
        //if cached, then send response with cached
        const courses = JSON.parse(redisCached);
        return res.status(200).json({ success: true, courses });
      }
      const courses = await CourseModel.find().select(
        "-courseData.questions -courseData.links -courseData.suggestion -courseData.videoUrl"
      );
      //set the cached
      await redis.set("allCourses", JSON.stringify(courses));
      //send response to client
      res.status(200).json({ sucess: true, courses });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);
//get course -- purchase course
export const getCourse = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const userCourses = req.user?.courses; //this will be courses Id array
    const courseId = req.params.id;
    //data validation
    if (!userCourses || !courseId) {
      return next(new ErrorHandler("No Course found!", 400));
    }
    //check user own requested courses
    const validCourses = userCourses.find(
      (course) => course._id.toString() === courseId.toString()
    );
    if (!validCourses) {
      return next(new ErrorHandler("No Course found!", 400));
    }

    try {
      const course = await CourseModel.findById(courseId);
      const content = course?.courseData;
      res.status(200).json({ success: true, content });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 400));
    }
  }
);
//add question 
interface QuestionReq {
  courseId: string;
  contentId:string;
  question: string;
}
export const addQuestion = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
   try{
    const {courseId, contentId, question} = req.body as QuestionReq;
   //validate data
     if(!courseId ||!contentId ||!question) {
      return next(new ErrorHandler("Invalid data received!", 400));
     }

     const course = await CourseModel.findById(courseId);

     if(!mongoose.Types.ObjectId.isValid(courseId) ||!course){
      return next(new ErrorHandler("No courses found!", 400));
     }

    const courseContent =  course.courseData.find((item:any)=>item._id.toString() === contentId.toString())!;

    //create new question object
    const questionObj = {
      user:req.user!,
      question,
      questionReplies:[],
    }
    courseContent.questions.push(questionObj);
    //save the updated course
    await course.save();
    res.status(200).json({ success: true,questionObj}) 
   }catch(err:any){
    return next(new ErrorHandler(err.message, 400));
   }
})