import express from "express";
import {
  activateAccount,
  registerUser,
  loginUser,
  logoutUser,
  updateAccessToken,
  getUserById,
  updateUser,
} from "../controllers/user.controller";
import { isAuthenticated, isRoleAccess } from "../middleware/auth";
const router = express.Router();

//register and send activation email notification
router.post("/register", registerUser);
//activate with code
router.post("/validate", activateAccount);
//login route
router.post("/login", loginUser);
//logout route
router.get("/logout", isAuthenticated, logoutUser);
//refresh token
router.get("/refresh", updateAccessToken);
//get user informations
router.get("/user/:id", isAuthenticated, getUserById);
//update user informations
router.post("/user/update", isAuthenticated, updateUser);
export default router;
