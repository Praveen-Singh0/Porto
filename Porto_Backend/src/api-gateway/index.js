import express from "express";
import axios from "axios";
const router = express.Router();

router.get("/chatbot/getAll", async (req, res) => {
  try {
    const response = await axios.get(
      "https://ai.praveenio.space/api/chatbot/getAll",
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "chatbot service error" });
  }
});

router.post("/chatbot", async (req, res) => {
  try {
    const response = await axios.post(
      "https://ai.praveenio.space/api/chatbot",
      req.body,
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "chatbot service error" });
  }
});

export default router;
