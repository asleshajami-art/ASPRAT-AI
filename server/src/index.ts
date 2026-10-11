import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing from the environment variables");
}

const ai = new GoogleGenAI({ apiKey });

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "ASPRAT AI backend is running!",
  });
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body as { message?: string };

    if (typeof message !== "string" || !message.trim()) {
      res.status(400).json({
        success: false,
        message: "Please enter a valid message.",
      });
      return;
    }

    if (message.length > 10000) {
      res.status(400).json({
        success: false,
        message: "Message is too long. Please shorten it.",
      });
      return;
    }

    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: message,
    });

    res.json({
      success: true,
      reply: response.text || "Sorry, I couldn't generate a response.",
    });
  } catch (error) {
    console.error("Gemini API request failed:", error);

    res.status(500).json({
      success: false,
      message: "ASPRAT AI couldn't generate a response. Please try again.",
    });
  }
});

export default app;

if (process.env.NODE_ENV !== "production") {
  const PORT = Number(process.env.PORT) || 5000;

  app.listen(PORT, () => {
    console.log(`ASPRAT AI server running at http://localhost:${PORT}`);
  });
}