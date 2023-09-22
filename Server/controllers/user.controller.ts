import { NextFunction, Request, Response } from "express";
import { userModel } from "../models/user.model";
import ErrorHandler from "../utils/ErrorHandler";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import jwt, { Secret } from "jsonwebtoken";
import path from "path";
import ejs from "ejs";
import sendMail from "../utils/sendMail";
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
