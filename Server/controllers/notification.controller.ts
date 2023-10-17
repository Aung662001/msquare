import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import NotificationModel from "../models/notificaton.model";
import ErrorHandler from "../utils/ErrorHandler";
import corn from "node-cron"

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
//delete notifications automatically
corn.schedule("0 0 0 * * *",async()=>{
    const pastThirtyDays = Date.now() - (1000*60*60*24*30);
    await NotificationModel.deleteMany({status:"read",createdAt:{$lt:pastThirtyDays}});
    console.log("Read notifications  successfully deleted.")
})