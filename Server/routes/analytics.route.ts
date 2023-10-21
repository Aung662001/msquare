import express from "express"
import { accessedRole, isAuthenticated } from "../middleware/auth";
import { getCoursesAnalytic, getOrdersAnalytic, getUserAnalytic } from "../controllers/analytics.controller";
const router = express.Router();

router.get('/get-users-analytics',isAuthenticated,accessedRole("admin"),getUserAnalytic);

router.get('/get-orders-analytics',isAuthenticated,accessedRole("admin"),getOrdersAnalytic);

router.get('/get-courses-analytics',isAuthenticated,accessedRole("admin"),getCoursesAnalytic);

export default  router;