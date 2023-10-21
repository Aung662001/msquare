import mongoose, { Model, Schema } from "mongoose";

interface FaqItem {
    question: string;
    answer:string;
}
interface Category{
    title:string
}
interface BannerImage{
    public_id:string
    url:string
}
interface Layout{
    type:string;
    faq:FaqItem[];
    categories:Category[];
    banner:{
        image:BannerImage;
        title:string;
        subTitle:string;
    }
}

const FaqSchema:Schema<FaqItem> = new Schema({
    question:String,
    answer:String,
})

const Category:Schema<Category> = new Schema({
    title:String
})

const BannerImageSchema:Schema<BannerImage> = new Schema({
    public_id:String,
    url:String
})
const LayoutSchema:Schema<Layout> = new Schema({
   type:{
    type:String,
   },
   faq:[FaqSchema],
   categories:[Category],
   banner:{
    image:BannerImageSchema,
    title:String,
    subTitle:String
   }
})

const LayoutModel:Model<Layout> = mongoose.model("Layout",LayoutSchema)
export default LayoutModel;