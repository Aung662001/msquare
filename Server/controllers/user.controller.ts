import { NextFunction, Request, Response } from "express";
import { userModel } from "../models/user.model";
import ErrorHandler from "../utils/ErrorHandler";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import path from "path";
import ejs from "ejs";
import sendMail from "../utils/sendMail";
import {
  accessCookieOptions,
  refreshCookieOption,
  sendToken,
} from "../utils/jwt";
import { redis } from "../utils/redis";
import {
  changeUserRole,
  getAllUsersService,
  getUserWithId,
} from "../services/user.service";
import cloudinary from "cloudinary";
import mongoose from "mongoose";
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
  const min = 1000; // Minimum 4-digit number
  const max = 9999; // Maximum 4-digit number
  const activationCode = Math.floor(Math.random() * (max - min + 1) + min).toString();
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
      const user = await userModel.findOne({ email }).select("+password");
      if (!user) {
        throw new ErrorHandler("User not found", 400);
      }
      //compare password
      const isPasswordMatched = await user.comparePassword(password as string);
      if (!isPasswordMatched) {
        throw new ErrorHandler("Password  not match", 400);
      }
      //form jwt.ts
      sendToken(user, 200, res);
    } catch (err: any) {
      console.log(err.message);
      throw new ErrorHandler(err.message, 400);
    }
  }
);
//logout route

export const logoutUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.clearCookie("access_token");
      res.clearCookie("refresh_token");
      //clear cache
      redis.del(req.user?._id);

      res.json({
        success: true,
        message: "Logged out successfully",
      });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);

//update access token
export const updateAccessToken = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const refresh_token = req.cookies.refresh_token;
    //data validate
    if (!refresh_token) {
      return next(new ErrorHandler("Please provide access token", 400));
    }
    try {
      //check if refresh token is valid
      const valid = jwt.verify(
        refresh_token,
        process.env.REFRESH_TOKEN || ""
      ) as JwtPayload;
      if (!valid) {
        return next(new ErrorHandler("Refresh Token is not valid", 400));
      }
      //cached user data
      const cachedUser = await redis.get(valid._id as string);
      if (!cachedUser) {
        return next(new ErrorHandler("Please login!", 400));
      }
      const user = JSON.parse(cachedUser as string);
      const access_token = jwt.sign(
        { _id: user._id },
        process.env.ACCESS_TOKEN as string,
        { expiresIn: "1d" }
      );
      //new refresh token | if don't want this need to create a endpoint for refresh token
      const refresh = jwt.sign(
        { _id: user._id },
        process.env.REFRESH_TOKEN || "",
        { expiresIn: "3d" }
      );
      res.cookie("access_token", access_token, accessCookieOptions);
      res.cookie("refresh_token", refresh, refreshCookieOption);
      redis.set(user._id, JSON.stringify(user), "EX", 604800); //update redis and expire in 7 days
      res.status(200).json({ access_token });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 400));
    }
  }
);
//get user by id
export const getUserById = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;
    if (!userId) {
      return next(new ErrorHandler("User not found", 400));
    }
    getUserWithId(userId, res);
  }
);
//logint with social media
export const socialAuth = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email } = req.body;

    //validate required data
    if (!name || !email) {
      return next(new ErrorHandler("Please provide all required fields", 400));
    }

    try {
      // email already exist check
      const user = await userModel.findOne({ email });
      if (user) {
        //if user is already registered send access token
        sendToken(user, 200, res);
      } else {
        //user is not registered create new user and send access token
        let newUser = await userModel.create({ name, email });
        sendToken(newUser, 200, res);
      }
    } catch (err: any) {
      next(new ErrorHandler(err.message, 400));
    }
  }
);
//update user
interface UpdateUser {
  name?: string;
  email?: string;
}
export const updateUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email } = req.body as UpdateUser;
      const userId = req.user?._id;
      const user = await userModel.findById(userId);
      //data validation
      if (!user) {
        return next(new ErrorHandler("User not found", 400));
      }
      if (name) {
        user.name = name;
      }
      if (email) {
        //email duplicate check
        const emailExists = await userModel.findOne({ email });
        if (emailExists) {
          return next(new ErrorHandler("Email already exist", 400));
        }
        user.email = email;
      }
      await user.save();
      //set user to redis cache
      await redis.set(user._id, JSON.stringify(user));

      res.status(200).json({ success: true, user });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 400));
    }
  }
);
//update user password
export const updateUserPassword = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { oldPassword, newPassword } = req.body;
      //data validation
      if (!oldPassword || !newPassword) {
        return next(
          new ErrorHandler("Please provide old password and new password", 400)
        );
      }
      //same new password and old password
      if (oldPassword === newPassword) {
        return next(
          new ErrorHandler("New password cannot be same as old password", 400)
        );
      }

      const userId = req.user?._id;

      const user = await userModel.findById(userId).select("+password");

      //social user that does not exist password
      if (user?.password == undefined) {
        return next(new ErrorHandler("Unvalid user", 400));
      }
      const matchPassword = await user.comparePassword(oldPassword);
      if (matchPassword) {
        user.password = newPassword;
        await user.save(); //save to database
        redis.set(user._id, JSON.stringify(user)); //update cache in redis
        res.status(200).json({ success: true, message: "Password changed" });
      } else {
        return next(new ErrorHandler("Old password not match", 400));
      }
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 400));
    }
  }
);

//change avater
export const updateProfilePicture = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { avatar } = req.body;
    const userId = req.user?._id;
    //data validation
    if (!avatar) {
      return next(new ErrorHandler("Please provide avatar", 400));
    }
    const user = await userModel.findById(userId);
    if (user) {
      //if avatar is already present
      if (user?.avatar?.public_id) {
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);
      }
      //
      const cloudData = await cloudinary.v2.uploader.upload(avatar, {
        folder: "avatar",
      });

      user.avatar = {
        public_id: cloudData.public_id,
        url: cloudData.secure_url,
      };

      await user.save(); //save to database
      await redis.set(userId, JSON.stringify(user)); //update cache in redis
      res.status(200).json({ success: true, user });
    } else {
      return next(new ErrorHandler("User not found", 400));
    }
  }
);
//get all user
export const getAllUsers = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllUsersService(res);
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);

//update user role -->admin role
interface Role {
  id: string;
  role: string;
}
export const updateUserRoleByAdmin = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, role }: Role = req.body;
      if (!id || !role) {
        return next(
          new ErrorHandler("Please provide all required fields", 400)
        );
      }
      changeUserRole(res, id, role);
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);

//delete user by admin
export const deleteUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Please provide user id", 400));
      }
      const user = await userModel.deleteOne({ id });
      await redis.del(id);

      res.status(200).json({ success: true, message: "User deleted" });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);
