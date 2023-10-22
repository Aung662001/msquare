import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import cloudinary from "cloudinary"
import LayoutModel from "../models/layout.model";
import ErrorHandler from "../utils/ErrorHandler";

export const createLayout = catchAsyncErrors(async(req:Request,res:Response,next:NextFunction)=>{
   try{
    const {type} = req.body;
    const typeAlreadyExist =await LayoutModel.findOne({type});
    if(typeAlreadyExist){
        return res.status(400).json({
            status:400,
            error:"Type already exist"
        })
    }
    if(type ==="banner"){
        const {image,title,subTitle}= req.body;
        const upload = await cloudinary.v2.uploader.upload(image,{
            folder:"layout",
        })
        const banner = {
            image:{
                public_id:upload.public_id,
                url:upload.secure_url
            },
            title,
            subTitle
        }
        await LayoutModel.create(banner)
    }
    if(type =="faq"){
        const faq= req.body;
        const faqItems = await Promise.all(
            faq.map(async(item:any)=>{
                return{
                    question:item.question,
                    answer:item.answer
                }
            })
        )
        await LayoutModel.create({type:"faq",faqItems})
    }
    if(type === "categories"){
        const {categories} = req.body;
        const catItems = await Promise.all(
            categories.map(async(item:any)=>{
                return{
                  title:item.title
                }
            })
        )
        await LayoutModel.create({type:'categories',catItems})
    }
    res.status(200).json({success:true,message:"Successfully created Layout."})
   }catch(err:any){
    return next(new ErrorHandler(err.message,500))
   }

})