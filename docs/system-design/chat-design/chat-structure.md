chats
│
├── Chat 1
├── Chat 2
└── Chat 3

messages
│
├── Message 1 → chatId: Chat 1
├── Message 2 → chatId: Chat 1
├── Message 3 → chatId: Chat 1
├── Message 4 → chatId: Chat 2
└── ...

Examples

chat{
  "_id": "chat123",
  "userId": "user456",
  "title": "Introduction to Derivatives",
  "createdAt": "...",
  "updatedAt": "..."
}

message{
  "_id": "message789",
  "chatId": "chat123",
  "role": "user",
  "content": "What is a derivative?",
  "createdAt": "..."
}