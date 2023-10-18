import { Response } from "express";
import { userModel } from "../models/user.model";
import { redis } from "../utils/redis";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";

export const getUserWithId = async (userId: string, res: Response) => {
  try {
    const userJson = await redis.get(userId);
    if (userJson) {
      let user = JSON.parse(userJson);
      res.json({ success: true, user });
    } else {
      res.status(500).json({ success: false, message: "User not found" });
    }
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};
//get all users for admin
export const getAllUsersService = async(res:Response)=>{
try{
  const users = await userModel.find().sort({createdAt:-1 })
  res.status(200).json({success:true,users})
}catch(err:any){
  res.status(500).json({success:false,message:err.message})
}
}

//change user role
export const changeUserRole  = async(res:Response,id:String,role:String)=>{
const user = await userModel.findByIdAndUpdate(id,{role:role},{new:true})
res.status(200).json({success:true,user})
}