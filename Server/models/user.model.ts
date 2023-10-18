import mongoose, { Model, Schema } from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
const emailRegexPattern: RegExp = /^([a-zA-Z0-9._%-]+@[a-zA-Z.-]+\.[a-z]{2,})$/;
export interface Iduser extends mongoose.Document {
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
  courses: Array<string>;
  comparePassword: (password: string) => Promise<boolean>;
  getAccessToken: () => string;
  getRefreshToken: () => string;
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
      type: [ String ],
    },
  },
  { timestamps: true }
);
//if user change password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcryptjs.hash(this.password, 10);
  next();
});

//check if password is correct
userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  const bol = await bcryptjs.compare(password, this.password);
  return bol;
};
// generate access token
userSchema.methods.getAccessToken = function () {
  const accessToken = jwt.sign(
    { _id: this._id },
    process.env.ACCESS_TOKEN || "",
    { expiresIn: "5m" }
  );
  return accessToken;
};

//generate refresh token

userSchema.methods.getRefreshToken = function () {
  const refreshToken = jwt.sign(
    { _id: this._id },
    process.env.REFRESH_TOKEN || "",
    { expiresIn: "3d" }
  );
  return refreshToken;
};

export const userModel: Model<Iduser> = mongoose.model("User", userSchema);

