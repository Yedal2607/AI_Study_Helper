import { Router } from "express";
import {chatIA} from "../controller/chatAI.controller.js"
const router = Router();

router.post("/askia",chatIA)

export default router;