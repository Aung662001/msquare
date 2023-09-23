import express from "express";
import { activateAccount, registerUser } from "../controllers/user.controller";
const router = express.Router();

router.post("/register", registerUser);
router.post("/validate", activateAccount);

export default router;
