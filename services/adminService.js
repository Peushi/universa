import { getDb } from "../data/db.js"

export async function getAllUsers() {
  const db = await getDb()
  return db.all("SELECT id, username, role FROM users")
}

export async function getAllWorlds() {
  const db = await getDb()
  const rows = await db.all("SELECT user_id, data FROM worlds")
  return rows.map((r) => ({ userId: r.user_id, world: JSON.parse(r.data) }))
}

export function getSessionInfo(session) {
  return {
    userId: session.userId,
    username: session.username,
    role: session.role,
  }
}
