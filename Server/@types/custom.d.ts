import { Request } from "express";
import { Iduser } from "../models/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: Iduser;
    }
  }
}
