import express from "express";
import { accessedRole, isAuthenticated } from "../middleware/auth";
import { createOrder, getAllOrders } from "../controllers/order.controller";
const router = express.Router();

//create new order for course
router.post('/create-order',isAuthenticated,createOrder)

//get all courses for admin
router.get('/get-orders',isAuthenticated,accessedRole('admin'),getAllOrders)

export default router;