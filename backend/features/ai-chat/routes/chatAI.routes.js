import { Router } from "express";
import {chatAI} from "../controller/chatAI.controller.js"
import { requireAuth } from "../../../middleware/auth.middleware.js";
const router = Router();

router.post("/ask",requireAuth,chatAI)

export default router;
