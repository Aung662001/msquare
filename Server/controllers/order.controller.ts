import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import { userModel } from "../models/user.model";
import ErrorHandler from "../utils/ErrorHandler";
import CourseModel from "../models/course.model";
import { getAllOrdersService, newOrder } from "../services/order.service";
import sendMail from "../utils/sendMail";
import NotificationModel from "../models/notificaton.model";

interface CourseData {
  courseId: string;
  payment_info: object;
}
export const createOrder = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, payment_info } = req.body as CourseData;

      const user = await userModel.findById(req.user?._id);
      if (!user) {
        return next(
          new ErrorHandler("You need to login first to purchase a course", 401)
        );
      }

      const alreadyPurchased = user?.courses.some(
        (course: any) => course._id.toString() === courseId.toString()
      );

      //request course is already purchased?
      if (alreadyPurchased) {
        return next(
          new ErrorHandler("You have already purchased this course", 400)
        );
      }

      const course = await CourseModel.findById(courseId);
      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }

      const data: any = {
        userId: user._id,
        courseId: courseId,
        payment_info: payment_info ? payment_info : {},
      };

      const mailData: any = {
        order: {
          courseId: courseId.slice(0.5) + "...",
          title: course.name,
          price: course.price,
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit",
          }),
        },
      };
      try {
        if (user) {
          sendMail({
            email: user.email,
            subject: "Order Confirmation",
            template: "order_confirmation.ejs",
            data: mailData,
          });
        }
      } catch (err: any) {
        return next(new ErrorHandler(err.message, 500));
      }

      user.courses.push(courseId);
      await user.save();

      await NotificationModel.create({
        userId: user._id,
        title: "New Order",
        message: "You have a new order",
      });
      course.purchased ? (course.purchased += 1) : (course.purchased = 1);
      newOrder(data, res, next);
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);
//get all orders
export const getAllOrders = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllOrdersService(res);
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);
