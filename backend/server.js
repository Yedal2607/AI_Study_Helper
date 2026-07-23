import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose"
import chatAIRouter from "./features/ai-chat/routes/chatAI.routes.js";
import auth from "./features/authentication/routes/auth.routes.js"

const app = express();
const PORT = process.env.BACKEND_PORT;

/* Middlewares */
app.use(express.json());
app.use(cors());

/* Routes */
app.use("/auth", auth)
app.use("/chat", chatAIRouter);

/* MongoDB connection*/
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });
/* Server */
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
