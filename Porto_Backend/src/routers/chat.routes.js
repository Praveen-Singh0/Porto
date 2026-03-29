import express from "express";
import { chatController } from "../controllers/chat.controller.js";
import { chatLimiter } from "../middlewares/rateLimit.js";
const router = express.Router();

router.post("/", chatLimiter, chatController);

export default router;