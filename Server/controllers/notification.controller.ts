import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import NotificationModel from "../models/notificaton.model";
import ErrorHandler from "../utils/ErrorHandler";

//get all notifications
export const getAllNotifications = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notifications = await NotificationModel.find().sort({
        createdAt: -1,
      });
      res.status(200).json({ success: true, notifications });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);
//update notification status
export const updateNotificationStatus = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notificaitonId = req.params.id;
      const notification = await NotificationModel.findById(notificaitonId);
      if (!notification) {
        return next(new ErrorHandler("Notification not founc", 400));
      }
      notification.status = "read";
      await notification.save();

      const allNotifications = await NotificationModel.find().sort({createdAt:-1})
      res.status(200).json({ success: true, notification:allNotifications });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);
