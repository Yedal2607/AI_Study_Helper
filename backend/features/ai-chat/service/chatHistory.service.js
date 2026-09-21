import { Chat, Message } from "../models/chat.model.js";

export const createChat = async ({ userID, title }) =>
  Chat.create({ userId: userID, title });

export const saveMessage = async ({ chatID, role, content }) =>
  Message.create({ chatId: chatID, role, content });

export const getChatsByUser = async (userID) =>
  Chat.find({ userId: userID }).sort({ updatedAt: -1 });

export const getChatByIdForUser = async ({ chatID, userID }) =>
  Chat.findOne({ _id: chatID, userId: userID });

export const getMessagesByChat = async (chatID) =>
  Message.find({ chatId: chatID }).sort({ createdAt: 1 });

export const getNextChatTitle = async (userID) => {
  const chatCount = await Chat.countDocuments({ userId: userID });
  return String(chatCount + 1);
};
