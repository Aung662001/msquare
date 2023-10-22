import express from "express";
import { accessedRole, isAuthenticated } from "../middleware/auth";
import { createLayout } from "../controllers/layout.controller";
const router = express.Router();

router.post('/create-layout',isAuthenticated,accessedRole('admin'),createLayout)

export default  router;