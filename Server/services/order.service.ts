import { NextFunction, Response } from "express";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import OrderModel, { Order } from "../models/order.model";


export const newOrder = catchAsyncErrors(async (data:Order,res:Response,next:NextFunction)=>{
    const order = await OrderModel.create(data)
    res.status(200).json({success:true,order})
})

//get all orders 
export const getAllOrdersService = async(res:Response)=>{
      const orders = await OrderModel.find().sort({createdAt:-1 })
      res.status(200).json({success:true,orders})
    }