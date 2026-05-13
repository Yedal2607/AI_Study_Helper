import "dotenv/config";
import express from "express";
import cors from "cors";
import chatAIRouter from "./routes/chatAI.routes.js";
import auth from "./routes/auth.routes.js"

const app = express();
const PORT = process.env.BACKEND_PORT;

/* Middlewares */
app.use(express.json());
app.use(cors());

/* Routes */
app.use("/auth", auth)
app.use("/chat", chatAIRouter);


/* Server */
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
