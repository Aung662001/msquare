import express from "express";
import {
  activateAccount,
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/user.controller";
import { isAuthenticated } from "../middleware/auth";
const router = express.Router();

//register and send activation email notification
router.post("/register", registerUser);
//activate with code
router.post("/validate", activateAccount);
//login route
router.post("/login", loginUser);
//logout route
router.get("/logout", isAuthenticated, logoutUser);
export default router;
