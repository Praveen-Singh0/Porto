import fs from "fs";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import { ApiError } from "../utils/ApiErrors.js";

const contextPath = path.resolve("src/services/context.json");
const contextData = JSON.parse(fs.readFileSync(contextPath, "utf-8"));

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});






// const isComplex = userMessage.length > 100;

// const MODELS = isComplex
//   ? ["gemini-2.5-flash", "gemini-3-flash-preview"]
//   : ["gemini-2.5-flash-lite", "gemini-2.5-flash"];




// 🔥 MODEL LIST (priority order)
const MODELS = [
  "gemini-3-flash-preview", // powerful (last fallback)
  "gemini-2.5-flash", // balanced
  "gemini-2.5-flash-lite", // fastest + cheapest
];

export const generateGeminiResponse = async (userMessage) => {
  const context = JSON.stringify(contextData);
  const prompt = `
You are a Software Developer named Praveen.

Answer in under 50 words.

Use ONLY this data:
${context}

User: ${userMessage}
`;

  // 🔥 LOOP THROUGH MODELS
  for (let m = 0; m < MODELS.length; m++) {
    const model = MODELS[m];

    console.log(`🚀 Trying model: ${model}`);

    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        generationConfig: {
          maxOutputTokens: 100,
        },
      });

      if (!response || !response.text) {
        throw new Error("Empty response");
      }

      return response.text;
    } catch (error) {
      console.log(`❌ ${model} failed:`, error.status);

      // 🔥 Only fallback on these errors
      if ([429, 503].includes(error.status)) {
        // last model → throw error
        if (m === MODELS.length - 1) {
          throw new ApiError(
            error.status,
            "⚠️ All AI models are busy or limit reached. Try again later.",
          );
        }

        // try next model
        continue;
      }

      // other errors → stop immediately
      throw new ApiError(500, "Unexpected AI error");
    }
  }

  throw new ApiError(500, "AI fallback failed");
};
