import { Router } from "express";
import { chatAI, getChatMessages, getChats } from "../controller/chatAI.controller.js";
import { requireAuth } from "../../../middleware/auth.middleware.js";

const router = Router();

router.get("/", requireAuth, getChats);
router.get("/:chatId", requireAuth, getChatMessages);
router.post("/ask", requireAuth, chatAI);

export default router;
