
import rateLimit from "express-rate-limit";

export const chatLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 10, // max 10 requests
  message: {
    statusCode: 429,
    message: "⚠️ Too many requests. Try again after 10 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});