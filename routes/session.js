import express from "express";
import { requireAuth } from "../middleware/auth.js";
import { getMe } from "../controllers/sessionController.js";

export const router = express.Router();

router.get("/me", requireAuth, getMe);
