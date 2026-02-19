import { Router } from "express";
import {chatAI} from "../controller/chatAI.controller.js"
const router = Router();

router.post("/askai",chatAI)

export default router;