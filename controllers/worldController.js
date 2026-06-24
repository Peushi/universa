import { generateWorld } from "../services/groqService.js";
import { getDb } from "../data/db.js";
import { v4 as uuidv4 } from "uuid";

export async function createWorld(req, res) {
  const { premise, model } = req.body;

  if (!premise || premise.trim().length === 0) {
    return res.status(400).json({ error: "Premise cannot be empty" });
  }

  try {
    const result = await generateWorld({ premise, model });
    const worldData = JSON.parse(result.raw);
    worldData.lore = [];

    const db = await getDb();
    const id = uuidv4();

    await db.run(
      "INSERT OR REPLACE INTO worlds (id, user_id, data) VALUES (?, ?, ?)",
      [id, req.session.userId, JSON.stringify(worldData)]
    );

    res.json({ world: worldData, modelUsed: result.modelUsed });
  } catch (err) {
    console.error("Error creating world:", err);
    res.status(500).json({ error: "Failed to create world" });
  }
}

export async function getWorld(req, res) {
  try {
    const db = await getDb();

    const row = await db.get(
      "SELECT data FROM worlds WHERE user_id = ?",
      [req.session.userId]
    );

    if (!row) {
      return res.status(404).json({ error: "No world found. Please create one first." });
    }

    const world = JSON.parse(row.data);
    res.json({ world });
  } catch (err) {
    console.error("Error fetching world:", err);
    res.status(500).json({ error: "Failed to fetch world" });
  }
}