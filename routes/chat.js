import express from "express";
import { requireAuth } from "../middleware/auth.js";
import { sendMessage } from "../controllers/chatController.js";

export const router = express.Router();
router.post('/', requireAuth, sendMessage);
