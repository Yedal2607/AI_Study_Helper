import { Chat, Message } from "../models/chat.model";

export const createChat = async ({ userID, title }) => {
  return Chat.create({
    userID,
    title,
  });
};
export const saveMessage = async ({ chatID, role, content }) => {
  return Message.create({ chatID, role, content });
};
