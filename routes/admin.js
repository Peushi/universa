import express from "express";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import { getMe, getWorlds, getUsers } from "../controllers/adminController.js";

export const router = express.Router();
router.get('/me', requireAuth, getMe);
router.get('/users', requireAuth, requireAdmin, getUsers);
router.get('/worlds', requireAuth, requireAdmin, getWorlds);
