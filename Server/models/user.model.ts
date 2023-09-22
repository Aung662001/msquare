import mongoose, { Model, Schema } from "mongoose";
import bcryptjs from "bcryptjs";

const emailRegexPattern: RegExp =
  /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
interface Iduser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: string;
  isVerified: boolean;
  //   courses: { courseId: string }[];
  courses: Array<{ courseId: string }>;
  comparePassword: (password: string) => Promise<boolean>;
}
const userSchema: Schema<Iduser> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      validate: {
        validator: (email: string) => {
          return emailRegexPattern.test(email);
        },
        message: "Please enter a valid email",
      },
    },
    password: {
      type: String,
      minlength: [6, "Password must be at least 6 characters long"],
      required: true,
      select: false,
    },
    avatar: {
      public_id: String,
      url: String,
    },
    role: {
      type: String,
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    courses: {
      type: [{ courseId: String }],
    },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcryptjs.hash(this.password, 10);
  next();
});

userSchema.methods.conparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcryptjs.compare(password, this.password);
};
export const userModel: Model<Iduser> = mongoose.model("User", userSchema);
