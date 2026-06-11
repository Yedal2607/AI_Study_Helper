import { OpenAI } from "openai";

const api = new OpenAI({
  baseURL: "https://api.aimlapi.com/v1",
  apiKey: process.env.AI_API_KEY,
});

async function AskAI(userPrompt) {
  try {
    const response = await api.chat.completions.create({
      model: process.env.AI_MODEL,
      messages: [
        {
          role: "system",
          content: "You are an AI assistant who knows everything.",
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
    });

    const answer =
      response?.choices?.[0]?.message?.content ??
      "AI service returned an unexpected response";
    return { message: answer };
  } catch (error) {
    console.error(error);
    return {
      message: error?.error?.message || "An unexpected error has ocurred",
    };
  }
}

export default AskAI;
