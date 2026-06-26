import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let db;

export async function getDb() {
  if (db) return db;

  db = await open({
    filename: path.join(__dirname, "universa.db"),
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user',
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS worlds (
      id TEXT PRIMARY KEY,
      user_id TEXT UNIQUE NOT NULL,
      data TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `);

  const adminExists = await db.get(
    "SELECT id FROM users WHERE username = ?",
    ["admin"]
  );

  if (!adminExists) {
    const passwordHash = await bcrypt.hash("admin123", 10);

    await db.run(
      "INSERT INTO users (id, username, password_hash, role) VALUES (?, ?, ?, ?)",
      [uuidv4(), "admin", passwordHash, "admin"]
    );

    console.log("Admin seeded: admin / admin123");
  }

  return db;
}
