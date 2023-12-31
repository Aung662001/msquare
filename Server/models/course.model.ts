import mongoose, { Document, Model, Mongoose, Schema } from "mongoose";
import { Iduser } from "./user.model";
//course > course descirption + course data 
//course data > 
interface IComment {
  user: Iduser;
  question: string;
  questionReplies: IComment[];
}
interface IReview extends Document {
  user: Iduser;
  comment: string;
  rating: number;
  commentReplies: IComment[];
}
interface ILink extends Document {
  title: string;
  url: string;
}
interface ICourseData extends Document {
  title: string;
  description: string;
  videoUrl: string;
  videoThumbnail: object;
  videoSection: string;
  videoLength: number;
  videoPlayer: string;
  links: ILink[];
  suggestion: string;
  questions: IComment[];
}
interface ICourse extends Document {
  name: string;
  description: string;
  price: number;
  estimatedPrice?: number;
  thumbnail: object;
  tags: string;
  lavel: string;
  demoUrl: string;
  benefit: { title: string }[];
  prerequisites: { title: string }[];
  reviews: IReview[];
  courseData: ICourseData[];
  rating?: number;
  purchased?: number;
}
const reviewsSchema: Schema<IReview> = new Schema({
  user: Object,
  rating: {
    type: Number,
    default: 0,
  },
  comment: String,
  commentReplies: [Object],
});
const linkSchema: Schema<ILink> = new Schema({
  title: String,
  url: String,
});
const commentSchema: Schema<IComment> = new Schema({
  user:Object,
  question: String,
  questionReplies: [Object],
});
const courseDataSchema: Schema<ICourseData> = new Schema({
  title: String,
  description: String,
  videoUrl: String,
  videoLength: Number,
  videoSection: String,
  videoPlayer: String,
  links: [linkSchema],
  suggestion: String,
  questions: [commentSchema],
});
const courseSchema: Schema<ICourse> = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  estimatedPrice: Number,
  thumbnail: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
      required: true,
    },
  },
  tags: {
    type: String,
    required: true,
  },
  lavel: {
    type: String,
    required: true,
  },
  demoUrl: {
    type: String,
    required: true,
  },
  benefit: [{ title: String }],
  prerequisites: [{ title: String }],
  reviews: [reviewsSchema],
  courseData: [courseDataSchema],
  rating: {
    type: Number,
    default: 0,
  },
  purchased: {
    type: Number,
    default: 0,
  },
},{timestamps:true});
const CourseModel: Model<ICourse> = mongoose.model("Course", courseSchema);
export default CourseModel;
