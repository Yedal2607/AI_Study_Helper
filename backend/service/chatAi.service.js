import { OpenAI } from "openai/client.js";

const baseURL = "https://api.aimlapi.com/v1";

const apiKey = process.env.AI_API_KEY;

const systemPrompt =
  "You are an AI Study Helper, help him in all that you can, and answer his questions";

const api = new OpenAI({
  apiKey,
  baseURL,
});

const AskAI = async (userPrompt) => {
  try {
    const completion = await api.chat.completions.create({
      model: "mistralai/Mistral-7B-Instruct-v0.2",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1200,
    });

    const response = completion.choices[0].message.content;
    return { mensaje: response };
  } catch (error) {
    return {mensaje: error?.error?.message || "An unexpected error has ocurred"}
  }
};

export default AskAI;
