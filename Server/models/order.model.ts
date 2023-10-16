import mongoose, { Schema ,Model} from "mongoose";

export interface Order extends Document{
    userId:string;
    courseId:string;
    payment_info:object;
}
const orderSchema = new Schema<Order>({
    userId:{
        type:String,
        required:true
    },
    courseId:{
        type:String,
        required:true,
    },
    payment_info:{
        type:Object,
        // required:true
    }
},{timestamps:true})
const OrderModel:Model<Order> = mongoose.model("Order",orderSchema);
export default OrderModel;