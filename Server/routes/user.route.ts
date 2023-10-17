import express from "express";
import {
  activateAccount,
  registerUser,
  loginUser,
  logoutUser,
  updateAccessToken,
  getUserById,
  updateUser,
  socialAuth,
  updateUserPassword,
  updateProfilePicture,
} from "../controllers/user.controller";
import { isAuthenticated, accessedRole } from "../middleware/auth";
import { getAllUsersService } from "../services/user.service";
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

//social auth
router.post("/social-auth", socialAuth);

//update user informations
router.post("/user/update", isAuthenticated, updateUser);

//update user password
router.put("/update-user-password", isAuthenticated, updateUserPassword);

//update user profile picture
router.put("/update-profile-picture", isAuthenticated, updateProfilePicture);
export default router;

//get all users for admin
router.get('/get-users',isAuthenticated,accessedRole('admin'),getAllUsersService)