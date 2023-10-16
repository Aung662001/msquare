import mongoose, { Model, Schema } from "mongoose";

export interface Notification extends Document {
  title: string;
  message: string;
  status: string;
  userId:string;
}
const NotificationSchema = new Schema<Notification>({
  title:{
    type: 'string',
    required:true
  },
  message:{
    type:'string',
    required:true
  },
  status:{
    type:String,
    required:true,
    default:"unread"
  }
},{timestamps:true})

const NotificationModel:Model<Notification> = mongoose.model<Notification>("Notification",NotificationSchema);
export default NotificationModel;
