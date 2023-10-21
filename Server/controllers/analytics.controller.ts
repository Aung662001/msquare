import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import { getPrev12MonthData } from "../utils/analytics.genetor";
import { userModel } from "../models/user.model";
import CourseModel from "../models/course.model";

export const getUserAnalytic = catchAsyncErrors(async(req:Request,res:Response,next:NextFunction)=>{
        try{
       const users = await getPrev12MonthData(userModel)
       res.status(200).json({success:true,users})
        }catch(err:any){
            return next(new ErrorHandler(err.message,500))
        }
})

export const getCoursesAnalytic = catchAsyncErrors(async(req:Request,res:Response,next:NextFunction)=>{
    try{
   const courses = await getPrev12MonthData(CourseModel)
   res.status(200).json({success:true,courses})
    }catch(err:any){
        return next(new ErrorHandler(err.message,500))
    }
})

export const getOrdersAnalytic = catchAsyncErrors(async(req:Request,res:Response,next:NextFunction)=>{
    try{
   const orders = await getPrev12MonthData(userModel)
   res.status(200).json({success:true,orders})
    }catch(err:any){
        return next(new ErrorHandler(err.message,500))
    }
})