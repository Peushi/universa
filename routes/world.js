import express from "express";
import { requireAuth } from "../middleware/auth.js";
import {createWorld, getWorld} from "../controllers/worldController.js";

export const router = express.Router();
router.post('/', requireAuth, createWorld);
router.get('/', requireAuth, getWorld);