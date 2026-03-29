import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiErrors.js";
import { prisma } from "../../lib/prisma.js";
import { generateGeminiResponse } from "../services/ai.service.js";


export const chatController = asyncHandler(async (req, res) => {
  const { message, mode } = req.body;

  if (!message) {
    throw new ApiError(400, "Message is required");
  }

  try {
    let reply = "";

    if (mode === "normal") {
      reply = await generateGeminiResponse(message);
      console.log("Gemini response:", reply);
    } else {
      reply = "OpenAI not implemented yet";
    }

    await prisma.chat.create({
      data: {
        query: message,
      },
    });

    return res
      .status(200)
      .json(new ApiResponse(200, "Chat response", reply));

  } catch (error) {
    console.error("🔥 Controller Error:", error);

     if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        statusCode: error.statusCode,
        success: false,
        message: error.message,
      });
    }
  }
});