import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiErrors.js";
import { prisma } from "../../lib/prisma.js";
import { getMockReply } from "../utils/mockReply.js";
import { generateGeminiResponse } from "../services/ai.service.js";

const randomDelay = Math.floor(1000 + Math.random() * 5000);
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export const chatController = asyncHandler(async (req, res) => {
  const { message, mode } = req.body;

  if (!message) {
    throw new ApiError(400, "Message is required");
  }

  try {
    let reply = "";

    const mock = getMockReply(message);
    if (mock) {
      await delay(randomDelay);
      reply = mock;
    } else {
      if (mode === "normal") {
        reply = await generateGeminiResponse(message);
      } else {
        reply = "AI not implemented";
      }
    }

    await prisma.chat.create({
      data: {
        query: message,
      },
    });

    return res.status(200).json(new ApiResponse(200, "Chat response", reply));
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

export const getQuery = async (req, res) => {
  try {
    const startTime = Date.now(); // ⏱️ start

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    console.log(`📥 Request received for page: ${page}`);

    const skip = (page - 1) * limit;

    const [chats, total] = await Promise.all([
      prisma.chat.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.chat.count(),
    ]);

    const endTime = Date.now(); // ⏱️ end

    console.log(
      `📤 Response sent for page: ${page} | Time: ${endTime - startTime}ms`
    );

    return res.status(200).json({
      success: true,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data: chats,
    });
  } catch (error) {
    console.error("Fetch Query Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
