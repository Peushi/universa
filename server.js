import 'dotenv/config';
import express from "express";
import cors from "cors";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";

import { router as worldRouter } from "./routes/world.js";
import { router as chatRouter } from "./routes/chat.js";
import { router as authRouter } from "./routes/auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || "dev-secret-change-this",
  resave: false,
  saveUninitialized: false,
}));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/world", worldRouter);
app.use("/api/chat", chatRouter);
app.use("/api/auth", authRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Universa running at http://localhost:${PORT}`));