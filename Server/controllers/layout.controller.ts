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
            type:"banner",
            image:{
                public_id:upload.public_id,
                url:upload.secure_url
            },
            title,
            subTitle
        }
        await LayoutModel.create({banner})
    }
    if(type =="faq"){
        const {faq}= req.body;
        const faqItems = await Promise.all(
            faq.map(async(item:any)=>{
                return{
                    question:item.question,
                    answer:item.answer
                }
            })
        )
        console.log(faqItems,"items")
        await LayoutModel.create({type:"faq",faq:faqItems})
    }
    if(type === "categories"){
        const {categories} = req.body;
        const catItems = await Promise.all(
            categories.map(async (item:any)=>{
                return{
                  title:item.title
                }
            })
        )
        await LayoutModel.create({type:'categories',categories:catItems})
    }
    res.status(200).json({success:true,message:"Successfully created Layout."})
   }catch(err:any){
    return next(new ErrorHandler(err.message,500))
   }

})

//update layout 
export const updateLayout= catchAsyncErrors(async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {type} = req.body;
        if(type ==="banner"){
            const {image,title,subTitle}= req.body;
            //delete banner from cloudinary
            const bannerData:any = await LayoutModel.findOne({type:"banner"});
            if(bannerData){
                await cloudinary.v2.uploader.destroy(bannerData.image.public_id)
            }
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
            await LayoutModel.findByIdAndUpdate(bannerData._id,banner);
        }
        if(type =="faq"){
            const {faq}= req.body;
            const FaqData = await LayoutModel.findOne({type:"faq"});
            const faqItems = await Promise.all(
                faq.map(async(item:any)=>{
                    return{
                        question:item.question,
                        answer:item.answer
                    }
                })
            )
            await LayoutModel.findByIdAndUpdate(FaqData?._id,{type:"faq",faq:faqItems})
        }
        if(type === "categories"){
            const {categories} = req.body;
            const categoryData = await LayoutModel.findOne({type:"categories"});
            const catItems = await Promise.all(
                categories.map(async(item:any)=>{
                    return{
                      title:item.title
                    }
                })
            )
            await LayoutModel.findByIdAndUpdate(categoryData?._id,{type:'categories',catItems})
        }
        res.status(200).json({success:true,message:"Successfully updated Layout."})
    }catch(err:any){
        return next(new ErrorHandler(err.message,500))
    }
})

//get layout with type
export const getLayoutByType = catchAsyncErrors(async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {type}= req.body;
        if(!type){
            return res.status(400).json({
                status:400,
                error:"Please provide type"
            })
        }
        const layout = await LayoutModel.findOne({type});
        res.status(200).json({success:true,layout});
    }catch(err:any){
        return next(new ErrorHandler(err.message,500))
    }
})