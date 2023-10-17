import { getAllNotifications, updateNotificationStatus } from "../controllers/notification.controller";
import { accessedRole, isAuthenticated } from "../middleware/auth";

const express = require("express");
const router = express.Router();

router.get('/get-all-notifications',isAuthenticated,accessedRole('admin'),getAllNotifications)
router.put('/update-notification-status/:id',isAuthenticated,accessedRole('admin'),updateNotificationStatus)
export default router;