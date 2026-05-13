import { Router } from "express";
import { login, register} from "../controller/auth.controller"

router.post("/login", login);
router.post("/register", register);
const router = Router();
