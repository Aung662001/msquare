import {
  getAllNotifications,
  updateNotificationStatus,
} from "../controllers/notification.controller";
import { accessedRole, isAuthenticated } from "../middleware/auth";

const express = require("express");
const router = express.Router();

//get all notifications for admin
router.get(
  "/get-all-notifications",
  isAuthenticated,
  accessedRole("admin"),
  getAllNotifications
);

//update notification status read or unread for admin
router.put(
  "/update-notification-status/:id",
  isAuthenticated,
  accessedRole("admin"),
  updateNotificationStatus
);
export default router;
