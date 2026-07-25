import AskAI from "../service/chatAi.service.js";

export const chatAI = async (req, res, next) => {
  try {
    const { message } = req.body ?? {};
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "message is required" });
    }
    const answer = await AskAI(message);
    return res.status(200).json({ response: answer });
  } catch (error) {
    next(error);
  }
};
