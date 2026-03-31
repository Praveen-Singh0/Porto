
import rateLimit from "express-rate-limit";

export const chatLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 10, // max 10 requests
  message: {
    statusCode: 429,
    message: "⚠️ Too many requests. Try again after 5 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});