import mongoose from "mongoose";
import AskAI, { generateChatTitle } from "../service/chatAi.service.js";
import {
  createChat,
  getChatByIdForUser,
  getChatsByUser,
  getMessagesByChat,
  saveMessage,
} from "../service/chatHistory.service.js";

const isValidChatId = (chatId) => mongoose.isValidObjectId(chatId);

export const getChats = async (req, res, next) => {
  try {
    const chats = await getChatsByUser(req.user.userId);
    return res.status(200).json({ chats });
  } catch (error) {
    next(error);
  }
};

export const getChatMessages = async (req, res, next) => {
  try {
    const { chatId } = req.params;
    if (!isValidChatId(chatId)) return res.status(400).json({ error: "Invalid chat ID" });

    const chat = await getChatByIdForUser({ chatID: chatId, userID: req.user.userId });
    if (!chat) return res.status(404).json({ error: "Chat not found" });

    const messages = await getMessagesByChat(chatId);
    return res.status(200).json({ chat, messages });
  } catch (error) {
    next(error);
  }
};

export const chatAI = async (req, res, next) => {
  try {
    const { message, chatId } = req.body ?? {};
    const content = typeof message === "string" ? message.trim() : "";
    if (!content) return res.status(400).json({ error: "message is required" });

    const isNewChat = !chatId;
    let chat;
    let previousMessages = [];
    if (chatId) {
      if (!isValidChatId(chatId)) return res.status(400).json({ error: "Invalid chat ID" });
      chat = await getChatByIdForUser({ chatID: chatId, userID: req.user.userId });
      if (!chat) return res.status(404).json({ error: "Chat not found" });
      previousMessages = await getMessagesByChat(chat._id);
    } else {
      chat = await createChat({ userID: req.user.userId, title: "Nueva conversación" });
    }

    const answer = await AskAI(content, previousMessages);
    await saveMessage({ chatID: chat._id, role: "user", content });
    const assistantMessage = await saveMessage({ chatID: chat._id, role: "assistant", content: answer.message });

    if (isNewChat) {
      try {
        chat.title = await generateChatTitle(content);
      } catch (titleError) {
        console.warn("Could not generate chat title:", titleError.message);
      }
    }

    chat.updatedAt = new Date();
    await chat.save();
    return res.status(200).json({ chat, response: answer, message: assistantMessage });
  } catch (error) {
    next(error);
  }
};
