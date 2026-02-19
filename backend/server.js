import "dotenv/config";
import express from 'express';
import cors from "cors";
import chatAIRouter from "./routes/chatAI.routes.js"


const PORT = process.env.BACKEND_PORT;
const app = express();

app.use(express.json());
app.use(cors());
app.use("/chat", chatAIRouter);
app.listen(PORT, () => {

    console.log(`Servidor corriendo en http://localhost:${PORT}`)
    
})
console.log("Hello gente")
    