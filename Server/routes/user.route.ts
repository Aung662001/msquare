import express from "express";
import {
  activateAccount,
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/user.controller";
const router = express.Router();

router.post("/register", registerUser);
router.post("/validate", activateAccount);
//login route
router.post("/login", loginUser);
router.get("/logout", logoutUser);
export default router;
