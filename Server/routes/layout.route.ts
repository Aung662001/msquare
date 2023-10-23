import express from "express";
import { accessedRole, isAuthenticated } from "../middleware/auth";
import { createLayout, getLayoutByType, updateLayout } from "../controllers/layout.controller";
const router = express.Router();

router.post('/create-layout',isAuthenticated,accessedRole('admin'),createLayout)

router.put('/update-layout',isAuthenticated,accessedRole('admin'),updateLayout)

router.post('/get-layout',getLayoutByType)


export default  router;