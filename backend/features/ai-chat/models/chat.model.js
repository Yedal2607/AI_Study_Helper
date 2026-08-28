import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    userId: {
      type:mongoose.Schema.Types.ObjectId,
      require: true,
      index: true
    },
    title: {
      type:String,
      require: true
    },
  },
  {
    timestamps: true
  }
);

const messageSchema = new mongoose.Schema({
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    index: true
  },
  role: {
    type: String,
    enum: ["user","assistant"]
  },
  content: {
    type: String,
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
messageSchema.index({ chatId: 1, createdAt: 1 });

const Chat = mongoose.model("Chat", chatSchema);
const Message = mongoose.model("Message", messageSchema);

export { Chat, Message };
