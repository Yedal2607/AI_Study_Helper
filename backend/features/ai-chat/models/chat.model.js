import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    userId: mongoose.Schema.Types.ObjectId,
    title: String
  },
  {
    timestamps: true
  }
);

const messageSchema = new mongoose.Schema({
  chatId: mongoose.Schema.Types.ObjectId,
  role: String,
  content: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Chat = mongoose.model("Chat", chatSchema);
const Message = mongoose.model("Message", messageSchema);

export { Chat, Message };
