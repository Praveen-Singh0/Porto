import express from "express";
import { chatController, getQuery } from "../controllers/aiChatbot.controller.js";
import { chatLimiter } from "../middlewares/rateLimit.js";
const router = express.Router();

router.post("/", chatLimiter, chatController);

router.get("/getAll",  getQuery);
export default router;