import { NextFunction, Request, Response } from "express";
import { userModel } from "../models/user.model";
import ErrorHandler from "../utils/ErrorHandler";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import jwt, { Secret } from "jsonwebtoken";
import path from "path";
import ejs from "ejs";
import sendMail from "../utils/sendMail";
import { sendToken } from "../utils/jwt";
interface User {
  name: string;
  email: string;
  password: string;
}
export const registerUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body;
      //required data validation
      if (!name || !email || !password) {
        return next(
          new ErrorHandler("Please provide all required fields", 400)
        );
      }
      //check for duplicate email
      const emailExists = await userModel.findOne({ email });
      if (emailExists) {
        return next(new ErrorHandler("Email already exists", 400));
      }
      const user: User = {
        name,
        email,
        password,
      };
      const { token, activationCode } = getActivationCode(user);
      const data = { user: { name: user.name }, activationCode };
      const html = await ejs.renderFile(
        path.join(__dirname, "..", "mails", "email.ejs"),
        data
      );
      const options = {
        email: user.email,
        subject: "Account Activation",
        template: "email.ejs",
        data: data,
      };
      try {
        await sendMail(options);
        res.status(200).json({
          success: true,
          message: "Please check your email to activate your account",
          token,
        });
      } catch (err: any) {
        return next(new ErrorHandler(err.message, 400));
      }
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 400));
    }
  }
);

export const getActivationCode = (user: User) => {
  const activationCode = Math.floor(1000 * Math.random());
  const token = jwt.sign(
    { user, activationCode },
    process.env.JWT_SECRET as Secret,
    { expiresIn: "5m" }
  );
  return { token, activationCode };
};
//activate new user and insert into database
interface activateUser {
  token: string;
  activationCode: string;
}
export const activateAccount = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token, activationCode }: activateUser = req.body;

    if (!token || !activationCode) throw new Error("Invalid activation code");

    try {
      const newUser = jwt.verify(token, process.env.JWT_SECRET as Secret) as {
        user: User;
        activationCode: string;
      };
      //activation code validation
      if (newUser.activationCode !== activationCode) {
        return next(new ErrorHandler("Invalid Activation code", 400));
      }
      const { name, email, password } = newUser.user;
      //duplicate email check
      const isExist = await userModel.findOne({ email });
      if (isExist) {
        return next(new ErrorHandler("Email already exist", 400));
      }
      try {
        //insert to database
        const user = new userModel({ name, email, password }).save();

        res.status(201).json({ success: true });
      } catch (err: any) {
        return next(new ErrorHandler(err.message, 500));
      }
    } catch (err: any) {
      // throw new Error(err.message);// this method is work but status code is not included in the error object
      //so the default in error handler is 500
      return next(new ErrorHandler(err.message, 400));
    }
  }
);
//login user

interface LoginUser {
  password: string;
  email: string;
}
export const loginUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password }: LoginUser = req.body;
    //required data validation
    if (!password || !email) {
      return next(new ErrorHandler("Please provide all required fields", 400));
    }
    //retrieve user with email
    try {
      const user = await userModel.findOne({ email });
      if (!user) {
        throw new ErrorHandler("User not found", 400);
      }
      //compare password
      const isPasswordMatched = user.comparePassword(password);
      if (!isPasswordMatched) {
        throw new ErrorHandler("User not found", 400);
      }
      //form jwt.ts
      sendToken(user, 200, res);
    } catch (err: any) {
      console.log(err.message);
      throw new ErrorHandler(err.message, 400);
    }
  }
);
